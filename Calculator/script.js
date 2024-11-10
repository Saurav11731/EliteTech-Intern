// Get references to the display and buttons
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');
const clearButton = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let currentInput = '';
let operator = '';
let firstOperand = null;

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Function to handle button clicks
function handleButtonClick(e) {
    const value = e.target.innerText;

    if (value === 'C') {
        currentInput = '';
        firstOperand = null;
        operator = '';
        updateDisplay('');
    } else if (value === '=') {
        if (firstOperand !== null && operator) {
            currentInput = calculate(firstOperand, currentInput, operator);
            updateDisplay(currentInput);
            firstOperand = null;
            operator = '';
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        if (firstOperand === null) {
            firstOperand = currentInput;
            operator = value;
            currentInput = '';
        } else {
            currentInput = calculate(firstOperand, currentInput, operator);
            firstOperand = currentInput;
            operator = value;
        }
    } else {
        currentInput += value;
        updateDisplay(currentInput);
    }
}

// Function to perform the calculation
function calculate(firstOperand, secondOperand, operator) {
    firstOperand = parseFloat(firstOperand);
    secondOperand = parseFloat(secondOperand);
    switch (operator) {
        case '+':
            return (firstOperand + secondOperand).toString();
        case '-':
            return (firstOperand - secondOperand).toString();
        case '*':
            return (firstOperand * secondOperand).toString();
        case '/':
            return secondOperand === 0 ? 'Error' : (firstOperand / secondOperand).toString();
        default:
            return secondOperand;
    }
}

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
