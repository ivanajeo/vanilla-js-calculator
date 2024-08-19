// **DOM Elements Selection**
// Select elements from the DOM for display and button functionalities
const historyDis = document.querySelector(".historyDis");
const outputDis = document.querySelector(".outputDis");

const clearBtn = document.querySelector(".clearBtn");
const deleteBtn = document.querySelector(".deleteBtn");

const plusMinusBtn = document.querySelector(".plusMinusBtn");
const dotBtn = document.querySelector(".dotBtn");
const equalBtn = document.querySelector(".equalBtn");

const numberBtns = document.querySelectorAll(".numberBtn");
const operatorBtns = document.querySelectorAll(".operatorBtn");


// **Initial Setup**
// Initialize Display and calculation variables
historyDis.textContent = "";
outputDis.textContent = "0";
let firstNumber = "";
let secondNumber = "";
let selectedOperator = null;
let result = null;

const MAX_LENGTH = 16;


// **Operations Object**
// Define basic arithmetic operations
const operations = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) =>  num1 / num2
};

// **Utility Functions**
// Round a number to a specific number of decimal places
function roundToDecimalPlaces(num, places) {
    const factor = Math.pow(10, places);
    return Math.round(num * factor) / factor;
}

// Delete last digit of a number
function deleteDigit(num) {
    num = num.toString();
    return num.slice(0, -1) || "";
}

// Calculate the result of an operation between two numbers
function calculateResult(firstNum, secondNum, selectedOperation) {
    if (selectedOperation === "divide" && parseFloat(secondNum) === 0) {
        result = "Can't divide by zero";
    } else {
        result = operations[selectedOperation](parseFloat(firstNum), parseFloat(secondNum));
        result = (roundToDecimalPlaces(result, 15)).toString();

        if (result.length > MAX_LENGTH) {
            result = result.slice(0, MAX_LENGTH);
        }
    }
    return result;
}

// **Main Operation Function**
// Perform the calculation based on the selected operator
function doOperation() {
    if (firstNumber && secondNumber && selectedOperator) {
        firstNumber = calculateResult(firstNumber, secondNumber, selectedOperator)

        updateHistoryDisplay(`${secondNumber} =`);
       
        resetOutputDisplay();
        updateOutputDisplay(firstNumber);

        resetCalculation();
    }
    }
    
// Reset variables after an operation
function resetCalculation() {
    result = null;
    selectedOperator = null;
    secondNumber = "";   
}

// **Display Update Functions**
function updateHistoryDisplay(content) {
    historyDis.textContent += content;
}

function updateOutputDisplay(content) {
    outputDis.textContent += content;
}

function resetOutputDisplay() {
    outputDis.textContent = "";
}

function resetHistoryDisplay() {
    historyDis.textContent = "";
}


// **Event Handlers**
function handleNumberClick() {
    const digit = this.getAttribute("data-num");
    if (firstNumber === "Can't divide by zero") {
        handleClearClick();  // Clear all the displays and reset the variables
    }
    if (outputDis.textContent === "0")  resetOutputDisplay();

    let number = selectedOperator ? secondNumber : firstNumber;

    if (number.length >= MAX_LENGTH) return;
    number += digit;
    updateOutputDisplay(digit)

    if(!selectedOperator) firstNumber = number;
    else secondNumber = number;
}


function handleOperatorClick(event) {
    if (firstNumber === "Can't divide by zero") {
        handleClearClick();  // Clear all the displays and reset the variables
    }
    if (firstNumber) {
        const operatorBtn = event.target;
        if (selectedOperator  && firstNumber && secondNumber) {
            doOperation(firstNumber, secondNumber, selectedOperator);
        }
        selectedOperator = operatorBtn.getAttribute("data-operator");
        resetHistoryDisplay();
        updateHistoryDisplay(firstNumber);
        updateHistoryDisplay(` ${operatorBtn.textContent} `);
        resetOutputDisplay();
    }
}

// Handle adding a decimal point
function handleDotClick() {
    let number = selectedOperator ? secondNumber : firstNumber;
    if (!number.includes(".")) {
        number = (number === "") ? "0." : `${number}.`;

        resetOutputDisplay();
        updateOutputDisplay(number);
        if (!selectedOperator) firstNumber = number;
        else secondNumber = number;
    }
}


function handlePlusMinusClick() {
    let number = selectedOperator ? secondNumber : firstNumber;
    if (number) {
        number = ((parseFloat(number)) * -1).toString();
        resetOutputDisplay();
        updateOutputDisplay(number);
        if (!selectedOperator) firstNumber = number;
        else secondNumber = number;
    }
}

// Handle removing the last digit
function handleDeleteClick() {
    let number = selectedOperator ? secondNumber : firstNumber;
    number = deleteDigit(number);
    resetOutputDisplay();
    updateOutputDisplay(number || "0");
    if (!selectedOperator) firstNumber = number;
    else secondNumber = number;
}

// Handle reseting all variables and displays
function handleClearClick() {
    firstNumber = "";
    secondNumber = "";
    selectedOperator = null;
    result = null;
    resetHistoryDisplay();
    resetOutputDisplay();
    outputDis.textContent = "0";
}


// **Event Listeners**
// Attach event listeners to number, operator, and function buttons
numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener("click", handleNumberClick);});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", handleOperatorClick);});

dotBtn.addEventListener("click", handleDotClick);
plusMinusBtn.addEventListener("click", handlePlusMinusClick)
equalBtn.addEventListener("click", doOperation);
clearBtn.addEventListener("click", handleClearClick);
deleteBtn.addEventListener("click", handleDeleteClick);
