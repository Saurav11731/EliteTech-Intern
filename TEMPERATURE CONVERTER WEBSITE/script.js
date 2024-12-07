// JavaScript for Conversion Logic
const convertButton = document.getElementById('convert-button');
const temperatureInput = document.getElementById('temperature-input');
const unitSelect = document.getElementById('unit-select');
const result = document.getElementById('result');

convertButton.addEventListener('click', () => {
    const tempValue = parseFloat(temperatureInput.value);
    const unit = unitSelect.value;

    if (isNaN(tempValue)) {
        result.textContent = "Please enter a valid temperature.";
        return;
    }

    let celsius, fahrenheit, kelvin;

    switch (unit) {
        case "Celsius":
            celsius = tempValue;
            fahrenheit = (tempValue * 9/5) + 32;
            kelvin = tempValue + 273.15;
            break;
        case "Fahrenheit":
            celsius = (tempValue - 32) * 5/9;
            fahrenheit = tempValue;
            kelvin = celsius + 273.15;
            break;
        case "Kelvin":
            celsius = tempValue - 273.15;
            fahrenheit = (celsius * 9/5) + 32;
            kelvin = tempValue;
            break;
    }

    result.innerHTML = `
        <strong>${tempValue}° ${unit}</strong> is equivalent to:
        <ul>
            <li>${celsius.toFixed(2)}° Celsius</li>
            <li>${fahrenheit.toFixed(2)}° Fahrenheit</li>
            <li>${kelvin.toFixed(2)}° Kelvin</li>
        </ul>
    `;
});
