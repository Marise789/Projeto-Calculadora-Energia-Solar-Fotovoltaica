document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("#react-select-3-input");
    const arrowButton = document.querySelector(".css-1xc3v61-indicatorContainer");
    if (!input || !arrowButton) {
        console.error("Erro: Elementos necessários não encontrados no DOM.");
        return;
    };
    const dropdownOptions = document.createElement("ul");
    dropdownOptions.classList.add("dropdown-options");
    dropdownOptions.style.display = "none";
    var options = [
        "Abdon Batista",
        "Abelardo Luz",
        "Agrolândia",
        "Agronômica",
        "Alfredo Wagner",
        "Alto Bela Vista",
        "Anchieta",
        "Angelina",
        "Anita Garibaldi",
        "Antônio Carlos",
        "Apiúna",
        "Arabutã",
        "Araquari",
        "Araranguá",
        "Armazém",
        "Arroio Trinta",
        "Atalanta",
        "Aurora",
        "Balneário Arroio do Silva",
        "Balneário Camboriú",
        "Balneário Piçarras",
        "Bandeirante",
        "Barra Bonita",
        "Barra Velha",
        "Bela Vista do Toldo",
        "Belmonte",
        "Benedito Novo",
        "Biguaçu",
        "Blumenau",
        "Bocaina do Sul",
        "Bom Jardim da Serra",
        "Bom Jesus",
        "Bom Retiro",
        "Brunópolis",
        "Brusque",
        "Caçador",
        "Caibi",
        "Calmon",
        "Camboriú",
        "Campestre",
        "Campo Alegre",
        "Campo Belo do Sul",
        "Campo Erê",
        "Campos Novos",
        "Canelinha",
        "Canoinhas",
        "Capão Alto",
        "Capivari de Baixo",
        "Catanduvas",
        "Caxambú do Sul",
        "Celso Ramos",
        "Chapadão do Lageado",
        "Chapecó",
        "Criciúma",
        "Cunha Porã",
        "Cunhataí",
        "Curitibanos",
        "Descanso",
        "Dona Emma",
        "Doutor Pedrinho",
        "Entre Rios",
        "Ermo",
        "Erval Velho",
        "Faxinal dos Guedes",
        "Flor do Sertão",
        "Florianópolis",
        "Formosa do Sul",
        "Forquilhinha",
        "Fraiburgo",
        "Galvão",
        "Garopaba",
        "Garuva",
        "Grão Pará",
        "Gravatal",
        "Guabiruba",
        "Guaramirim",
        "Guatambú",
        "Herval d'Oeste",
        "Ibiporã",
        "Ibiporã",
        "Ibirama",
        "Içara",
        "Ilhota",
        "Imaruí",
        "Imbituba",
        "Inácio Martins",
        "Indaial",
        "Iomerê",
        "Ipira",
        "Ipuaçu",
        "Ipumirim",
        "Itá",
        "Itaiópolis",
        "Itajaí",
        "Itapema",
        "Itapiranga",
        "Itapoá",
        "Ituporanga",
        "Jaborá",
        "Jacinto Machado",
        "Jaguaruna",
        "Jaraguá do Sul",
        "Joaçaba",
        "Joinville",
        "José Boiteux",
        "Jupiá",
        "Lages",
        "Laguna",
        "Lajeado Grande",
        "Lindoia do Sul",
        "Lontras",
        "Luiz Alves",
        "Maracajá",
        "Maravilha",
        "Marema",
        "Mário Campos",
        "Matos Costa",
        "Meleiro",
        "Mirim Doce",
        "Mondaí",
        "Monte Carlo",
        "Monte Castelo",
        "Morro da Fumaça",
        "Morro Grande",
        "Navegantes",
        "Nova Trento",
        "Nova Veneza",
        "Novo Horizonte",
        "Orleans",
        "Otacílio Costa",
        "Paial",
        "Painel",
        "Palhoça",
        "Palma Sola",
        "Palmeira",
        "Papanduva",
        "Passo de Torres",
        "Passos Maia",
        "Pato Branco",
        "Penha",
        "Peritiba",
        "Petrolândia",
        "Pindotiba",
        "Pinhalzinho",
        "Piratuba",
        "Planalto Alegre",
        "Pomerode",
        "Ponte Alta",
        "Ponte Alta do Norte",
        "Ponte Serrada",
        "Porto Belo",
        "Porto União",
        "Pouso Redondo",
        "Presidente Getúlio",
        "Presidente Nereu",
        "Quilombo",
        "Rancho Queimado",
        "Rio das Antas",
        "Rio do Campo",
        "Rio do Oeste",
        "Rio do Sul",
        "Rio dos Cedros",
        "Rio Fortuna",
        "Rio Negrinho",
        "Rio Rufino",
        "Riqueza",
        "Rolante",
        "Romelândia",
        "Salto Veloso",
        "Salto do Sul",
        "Sangão",
        "Santa Cecília",
        "Santa Helena",
        "Santa Rosa de Lima",
        "Santa Tereza",
        "Santa Vitória do Palmar",
        "Santiago do Sul",
        "Santo Amaro da Imperatriz",
        "Santo Antônio de Lisboa",
        "Santo Cristo",
        "Santo Inácio",
        "São Bento do Sul",
        "São Bonifácio",
        "São Carlos",
        "São Cristóvão do Sul",
        "São Domingos",
        "São Francisco do Sul",
        "São João Batista",
        "São João do Itaperiú",
        "São José",
        "São José do Cedro",
        "São José do Cerrito",
        "São Miguel da Boa Vista",
        "São Pedro de Alcântara",
        "São Sebastião do Sul",
        "Seara",
        "Tijucas",
        "Trombudo Central",
        "Três Barras",
        "Três Rios do Sul",
        "Urussanga",
        "Vargeão",
        "Vargem",
        "Vargem Bonita",
        "Vidal Ramos",
        "Videira",
        "Vitor Meireles",
        "Witmarsum",
        "Xanxerê",
        "Xavantina",
        "Xaxim"
    ];
    function createDropdownItems(filteredOptions) {
        dropdownOptions.innerHTML = "";

        filteredOptions.forEach(function (option) {
            const optionItem = document.createElement("li");
            optionItem.textContent = option;
            optionItem.style.padding = "5px";
            optionItem.style.cursor = "pointer";

            optionItem.addEventListener("click", function () {
                input.value = option;
                dropdownOptions.style.display = "none";
            });

            dropdownOptions.appendChild(optionItem);
        });
    }
    createDropdownItems(options);
    document.body.appendChild(dropdownOptions);
    function toggleDropdown() {
        if (dropdownOptions.style.display === "none" || dropdownOptions.style.display === "") {
            dropdownOptions.style.display = "block";
            var rect = input.getBoundingClientRect();
            dropdownOptions.style.top = (rect.bottom + window.scrollY) + "px";
            dropdownOptions.style.left = rect.left + "px";
        } else {
            dropdownOptions.style.display = "none";
        }
    }
    arrowButton.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleDropdown();
    });
    input.addEventListener("click", function (event) {
        event.stopPropagation();
        toggleDropdown();
    });
    document.addEventListener("click", function (event) {
        if (!arrowButton.contains(event.target) && !dropdownOptions.contains(event.target) && !input.contains(event.target)) {
            dropdownOptions.style.display = "none";
        }
    });
    input.addEventListener("input", function () {
        const filterText = input.value.toLowerCase();
        const filteredOptions = options.filter(function (option) {
            return option.toLowerCase().includes(filterText);
        });
        createDropdownItems(filteredOptions);
        dropdownOptions.style.display = "block";
    });
    input.addEventListener("click", function () {
        input.value = "";
        const filteredOptions = options;
        createDropdownItems(filteredOptions);
    });
});
