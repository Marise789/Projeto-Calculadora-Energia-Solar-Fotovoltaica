document.addEventListener('DOMContentLoaded', () => {
    const energyInput = document.querySelector('.select');
    const slider = document.querySelector('.thumb');
    const sliderTrack = document.querySelector('.ml-3 .h-3');
    const dropdown = document.querySelector('.dropdown');
    const minValue = 0;
    const maxValue = 800;
    function updateSliderPosition(value) {
        const percentage = (value - minValue) / (maxValue - minValue) * 100;
        slider.style.transform = `translate(${percentage}%, -6px)`;
        sliderTrack.style.background = `linear-gradient(to right, #01B040 0%, #01B040 ${percentage}%, #F8F6F1 ${percentage}%, #F8F6F1 100%)`;
    }
    function updateInputFromSlider(value) {
        energyInput.value = value;
    }
    function startDragging(event) {
        event.preventDefault();
        document.addEventListener('mousemove', moveSlider);
        document.addEventListener('mouseup', stopDragging);
        slider.style.cursor = 'grabbing';
    }
    function moveSlider(event) {
        const sliderRect = sliderTrack.getBoundingClientRect();
        const sliderPosition = event.clientX - sliderRect.left;

        let percentage = (sliderPosition / sliderRect.width) * 100;
        percentage = Math.max(0, Math.min(percentage, 100));

        slider.style.left = `${percentage}%`;
        sliderTrack.style.background = `linear-gradient(to right, #01B040 0%, #01B040 ${percentage}%, #F8F6F1 ${percentage}%, #F8F6F1 100%)`;

        const value = Math.round((percentage / 100) * (maxValue - minValue) + minValue);
        updateInputFromSlider(value);
    }
    function stopDragging() {
        document.removeEventListener('mousemove', moveSlider);
        document.removeEventListener('mouseup', stopDragging);
        slider.style.cursor = 'grab';
    }
    slider.addEventListener('mousedown', startDragging);
    energyInput.addEventListener('input', (event) => {
        let value = parseInt(event.target.value, 10);

        if (isNaN(value) || value < minValue) value = minValue;
        if (value > maxValue) value = maxValue;

        updateSliderPosition(value);
    });
    energyInput.addEventListener('focus', () => {
        dropdown.style.display = 'block';
    });
    energyInput.addEventListener('blur', () => {
        setTimeout(() => {
            dropdown.style.display = 'none';
        }, 200);
    });
    dropdown.addEventListener('mousedown', (event) => {
        if (event.target.tagName === 'LI') {
            const selectedValue = event.target.innerText;
            let value = 0;

            switch (selectedValue) {
                case 'Até R$200':
                    value = 200;
                    break;
                case 'De R$200 a R$400':
                    value = 400;
                    break;
                case 'De R$400 a R$800':
                    value = 800;
                    break;
                case 'Mais de R$800':
                    value = maxValue;
                    break;
                default:
                    value = minValue;
                    break;
            }

            energyInput.value = value;
            updateSliderPosition(value);
        }
    });
});