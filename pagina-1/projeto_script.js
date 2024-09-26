document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('.select');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = dropdown.querySelectorAll('li');
    const slider = document.querySelector('.thumb');
    const maxValue = 800; 

    function updateInputAndSlider(value) {
        inputField.value = value;
        updateSliderFromInput(value);
    }

    function updateSliderFromInput(value) {
        const min = 0;
        const percentage = (value - min) / (maxValue - min) * 100;
        slider.parentElement.style.background = `linear-gradient(to right, #01B040 0%, #01B040 ${percentage}%, #F8F6F1 ${percentage}%, #F8F6F1 100%)`;
        const sliderWidth = slider.parentElement.offsetWidth;
        slider.style.transform = `translate(${(percentage / 100) * (sliderWidth - 12)}px, -6px)`;
    }
    dropdownItems.forEach((item) => {
        item.addEventListener('click', () => {
            let value = 0;
            switch (item.textContent.trim()) {
                case 'Até R$200':
                    value = 200;
                    break;
                case 'De R$200 a R$400':
                    value = 300;
                    break;
                case 'De R$400 a R$800':
                    value = 600;
                    break;
                case 'Mais de R$800':
                    value = 900;
                    break;
                default:
                    console.log(`Texto do item desconhecido: "${item.textContent.trim()}"`);
                    return;
            }
            updateInputAndSlider(value); // Atualiza o valor do input e do slider
            dropdown.classList.remove('show'); // Fecha a lista suspensa
        });
    });


    inputField.addEventListener('click', () => {
        dropdown.classList.add('show');
    });

    document.addEventListener('click', (event) => {
        if (!dropdown.contains(event.target) && !inputField.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });

    inputField.addEventListener('input', () => {
        let value = parseInt(inputField.value);
        if (!isNaN(value)) {
            if (value > maxValue) value = maxValue;
            if (value < 0) value = 0;
            updateSliderFromInput(value);
        }
    });

    slider.addEventListener('mousedown', (event) => {
        const sliderWidth = slider.parentElement.offsetWidth;
        const min = 0;

        function onMouseMove(e) {
            const rect = slider.parentElement.getBoundingClientRect();
            let offsetX = e.clientX - rect.left;
            if (offsetX < 0) offsetX = 0;
            if (offsetX > sliderWidth) offsetX = sliderWidth;

            const value = Math.round((offsetX / sliderWidth) * (maxValue - min) + min);
            updateInputAndSlider(value);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, { once: true });
    });

    document.querySelector('.simulate-button').addEventListener('click', () => {
        const value = inputField.value;
        if (value && !isNaN(value) && value >= 0) {
            localStorage.setItem('valorContaAtual', value); // Armazenando o valor correto
            window.location.href = '../pagina-2/cadastro_index.html';
        } else {
            alert('Por favor, insira um valor válido.');
        }
    });

});







