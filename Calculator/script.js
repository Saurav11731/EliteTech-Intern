const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
const sin = document.getElementById('sin');
const cos = document.getElementById('cos');
const tan = document.getElementById('tan');

let currentInput = ""; // Current input string

// Update the display
function updateDisplay(value) {
    display.value = value || "0";
}

// Append values to the input
function appendToInput(value) {
    if (["+", "-", "*", "/"].includes(value) && ["+", "-", "*", "/"].includes(currentInput.slice(-1))) {
        // Prevent multiple operators in a row
        currentInput = currentInput.slice(0, -1);
    }
    currentInput += value;
    updateDisplay(currentInput);
}

// Clear the input and display
clear.addEventListener('click', () => {
    currentInput = "";
    updateDisplay("");
});

// Evaluate the arithmetic expression
equals.addEventListener('click', () => {
    try {
        const result = evaluateExpression(currentInput);
        updateDisplay(result);
        currentInput = result.toString(); // Update input to the result
    } catch (error) {
        updateDisplay("Error");
    }
});

// Evaluate an arithmetic expression
function evaluateExpression(expression) {
    try {
        // Use Function constructor to evaluate the expression safely
        const sanitizedExpression = expression.replace(/[^0-9+\-*/.]/g, ""); // Remove invalid characters
        return new Function(`return ${sanitizedExpression}`)();
    } catch (error) {
        throw new Error("Invalid Expression");
    }
}
const backspace = document.getElementById('backspace');

// Handle backspace functionality
backspace.addEventListener('click', () => {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1); // Remove the last character
        updateDisplay(currentInput);
    }
});
const sqrt = document.getElementById('sqrt');
const cbrt = document.getElementById('cbrt');

// Handle square root functionality
sqrt.addEventListener('click', () => {
    try {
        const value = parseFloat(currentInput);
        if (isNaN(value)) throw new Error("Invalid Input");
        if (value < 0) throw new Error("Invalid for √"); // √ of negative numbers not handled
        const result = Math.sqrt(value);
        updateDisplay(result.toFixed(5)); // Display result rounded to 5 decimals
        currentInput = result.toString();
    } catch (error) {
        updateDisplay("Error");
    }
});

// Handle cube root functionality
cbrt.addEventListener('click', () => {
    try {
        const value = parseFloat(currentInput);
        if (isNaN(value)) throw new Error("Invalid Input");
        const result = Math.cbrt(value); // Calculate cube root
        updateDisplay(result.toFixed(5)); // Display result rounded to 5 decimals
        currentInput = result.toString();
    } catch (error) {
        updateDisplay("Error");
    }
});


// Handle trigonometric operations
sin.addEventListener('click', () => handleTrigFunction("sin"));
cos.addEventListener('click', () => handleTrigFunction("cos"));
tan.addEventListener('click', () => handleTrigFunction("tan"));

function handleTrigFunction(func) {
    try {
        const value = parseFloat(currentInput);
        if (isNaN(value)) throw new Error("Invalid Input");

        const radians = toRadians(value); // Convert to radians
        let result;
        if (func === "sin") result = Math.sin(radians);
        if (func === "cos") result = Math.cos(radians);
        if (func === "tan") {
            if (Math.abs(Math.cos(radians)) < 1e-10) throw new Error("Undefined (tan)");
            result = Math.tan(radians);
        }
        updateDisplay(result.toFixed(5)); // Show result rounded to 5 decimals
        currentInput = result.toString(); // Update input with result
    } catch (error) {
        updateDisplay("Error");
    }
}

// Helper: Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Handle button clicks for digits and operators
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if (e.target.classList.contains("digit") || e.target.classList.contains("dot")) {
            appendToInput(value);
        } else if (e.target.classList.contains("operator")) {
            appendToInput(` ${value} `);
        }
    });
});
