document.addEventListener('DOMContentLoaded', () => {
    const formPage2 = document.querySelector('#formPage2');
    const energyInput = document.querySelector('#energyInput');
    const absoluteButton = document.querySelector('#absoluteButton');
    const emailInput = document.querySelector('#emailInput');
    const phoneInput = document.querySelector('#phoneInput');
    const nameInput = document.querySelector('input[name="name"]');
    const cityInput = document.querySelector('#react-select-3-input');
    const locationInputs = document.querySelectorAll('input[name="location"]');
    const simulateButton = document.querySelector('#simulateButton');

    // Voltar para a página anterior
    absoluteButton.addEventListener('click', () => {
        window.location.href = '../pagina-1/projeto_index.html';
    });

    // Recuperar o valor do localStorage e preencher o campo de energia
    const storedEnergyValue = localStorage.getItem('valorContaAtual');
    if (storedEnergyValue) {
        energyInput.value = storedEnergyValue;
    }

    // Validação do formulário
    function validateForm() {
        const energyValue = parseFloat(energyInput.value);
        const emailValue = emailInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        const nameValue = nameInput.value.trim();
        const cityValue = cityInput.value.trim();
        const locationSelected = Array.from(locationInputs).some(input => input.checked);

        return (
            energyValue > 0 &&
            emailValue &&
            phoneValue &&
            nameValue &&
            cityValue &&
            locationSelected
        );
    }

    // Atualiza o estado do botão de simulação
    function updateButtonState() {
        simulateButton.disabled = !validateForm();
    }

    // Adiciona listeners aos campos de entrada para atualizar o estado do botão
    [energyInput, emailInput, phoneInput, nameInput, cityInput].forEach(input => {
        input.addEventListener('input', updateButtonState);
    });

    // Formatação do número de telefone
    function formatPhoneNumber(value) {
        value = value.replace(/\D/g, '');
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        }
        return value;
    }

    // Formatar o campo de telefone durante a digitação
    phoneInput.addEventListener('input', (event) => {
        event.target.value = formatPhoneNumber(event.target.value);
    });

    // Função para lidar com a submissão do formulário
    async function handleSubmit(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        if (!validateForm()) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const energyValue = parseFloat(energyInput.value);
        const cityValue = cityInput.value.trim();

        if (!cityValue) {
            alert('Por favor, informe a cidade.');
            return;
        }

        console.log("Energy Value:", energyValue);

        const irradiationData = await fetchIrradiationAndKWh(cityValue);

        if (!irradiationData) {
            alert('Não foi possível obter dados de irradiação para a cidade informada.');
            return;
        }

        const locationValue = Array.from(locationInputs).find(input => input.checked)?.value;
        console.log("Valor de locationValue:", locationValue); // Adicione esta linha para depuração
        
        // Validação do campo s_location_cliente
        const validLocations = ['Residência', 'Empresa', 'Indústria', 'Área Rural'];
        if (!validLocations.includes(locationValue)) {
            alert("Selecione uma opção válida para 'Onde será instalado?'.");
            return;
        }
        console.log("Location Value:", locationValue);
        
        const clientData = {
            s_nome_cliente: nameInput.value.trim(),
            s_email_cliente: emailInput.value.trim(),
            n_telefone_cliente: phoneInput.value.replace(/\D/g, ''), // Salva o telefone sem formatação
            s_cidade_cliente: cityValue,
            n_valor_cliente: energyValue,
            s_location_cliente: locationValue,
            imd: irradiationData.imd,
            valor_kwh: irradiationData.valor_kwh,
        };

        // Envia os dados do cliente para o backend
        const success = await createClient(clientData);
        if (success) {
            window.location.href = '../pagina-3/resultado_index.html'; // Navega para a próxima página
        } else {
            alert('Erro ao criar cliente. Por favor, tente novamente.');
        }
    }

    // // Evento de submissão do formulário
    formPage2.addEventListener('submit', handleSubmit);

     // Função para buscar IMD e KWh da cidade (API [GET] /api/irradiacao/:cidade)
    async function fetchIrradiationAndKWh(city) {
        try {
            const response = await fetch(`http://127.0.0.1:1880/api/irradiacao/${city}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar dados de irradiação');
            }

            return await response.json(); 
        } catch (error) {
            alert(`Erro: ${error.message}`);
            return null;
        }
    }

    // Função para criar o cliente (API [POST] /api/clientes)
    async function createClient(data) {
        try {
            const response = await fetch('http://127.0.0.1:1880/add/clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro do servidor:', errorData);
                throw new Error(errorData.message || 'Erro desconhecido ao criar cliente');
            }

            return true; // Sucesso
        } catch (error) {
            console.error('Erro:', error.message);
            alert(`Erro ao criar cliente: ${error.message}`);
            return false; // Falha
        }
    }

    // Função para buscar clientes (API [GET] /clientes)
    async function fetchClientes() {
        try {
            const response = await fetch('http://127.0.0.1:1880/todosclientes');
            if (!response.ok) {
                throw new Error('Erro ao buscar clientes');
            }
            const clientes = await response.json();
            return clientes; // Retorna os dados dos clientes
        } catch (error) {
            console.error('Erro:', error.message);
            return []; // Retorna um array vazio em caso de erro
        }
    }

    // Chama a função para buscar clientes ao carregar a página
    fetchClientes();
});



