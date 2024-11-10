document.getElementById("convert-button").addEventListener("click", function() {
    const temperatureInput = document.getElementById("temperature-input").value;
    const unit = document.getElementById("unit-select").value;
    const resultElement = document.getElementById("result");

    if (temperatureInput === "" || isNaN(temperatureInput)) {
        resultElement.textContent = "Please enter a valid number!";
        return;
    }

    let convertedTemperature;

    if (unit === "Celsius") {
        convertedTemperature = {
            Fahrenheit: (temperatureInput * 9/5) + 32,
            Kelvin: parseFloat(temperatureInput) + 273.15
        };
        resultElement.textContent = `${temperatureInput}°C = ${convertedTemperature.Fahrenheit.toFixed(2)}°F = ${convertedTemperature.Kelvin.toFixed(2)} K`;
    } else if (unit === "Fahrenheit") {
        convertedTemperature = {
            Celsius: (temperatureInput - 32) * 5/9,
            Kelvin: ((temperatureInput - 32) * 5/9) + 273.15
        };
        resultElement.textContent = `${temperatureInput}°F = ${convertedTemperature.Celsius.toFixed(2)}°C = ${convertedTemperature.Kelvin.toFixed(2)} K`;
    } else if (unit === "Kelvin") {
        convertedTemperature = {
            Celsius: temperatureInput - 273.15,
            Fahrenheit: ((temperatureInput - 273.15) * 9/5) + 32
        };
        resultElement.textContent = `${temperatureInput} K = ${convertedTemperature.Celsius.toFixed(2)}°C = ${convertedTemperature.Fahrenheit.toFixed(2)}°F`;
    }
});
