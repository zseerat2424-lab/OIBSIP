
// Get HTML elements

const form = document.getElementById("converter-form");

const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");

const errorMessage = document.getElementById("error-message");
const resultsSection = document.getElementById("results-section");

// Get result elements

const celsiusResult = document.getElementById("celsius-result");
const fahrenheitResult = document.getElementById("fahrenheit-result");
const kelvinResult = document.getElementById("kelvin-result");

// Convert temperature

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const value = temperatureInput.value.trim();
    const temperature = Number(value);
    const unit = unitSelect.value;

    // Check empty input

    if (value === "") {
        showError("Please enter a temperature.");
        return;
    }

    // Check numeric input

    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid number.");
        return;
    }

    // Check absolute zero

    if (
        (unit === "C" && temperature < -273.15) ||
        (unit === "F" && temperature < -459.67) ||
        (unit === "K" && temperature < 0)
    ) {
        showError("Temperature cannot be below absolute zero.");
        return;
    }

    // Convert into Celsius

    let celsius;

    if (unit === "C") {
        celsius = temperature;
    }
    else if (unit === "F") {
        celsius = (temperature - 32) * 5 / 9;
    }
    else {
        celsius = temperature - 273.15;
    }

    // Convert into Fahrenheit and Kelvin

    const fahrenheit = (celsius * 9 / 5) + 32;
    const kelvin = celsius + 273.15;

    // Display results

    celsiusResult.textContent = celsius.toFixed(2);
    fahrenheitResult.textContent = fahrenheit.toFixed(2);
    kelvinResult.textContent = kelvin.toFixed(2);

    errorMessage.textContent = "";
    resultsSection.hidden = false;

});

// Show error

function showError(message) {
    errorMessage.textContent = message;
    resultsSection.hidden = true;
}

// Clear form

form.addEventListener("reset", function() {
    errorMessage.textContent = "";
    resultsSection.hidden = true;
});
