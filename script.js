// **DOM Elements Selection**
// Select elements from the DOM for display and button functionalities
const historyDis = document.querySelector(".historyDis");
const outputDis = document.querySelector(".outputDis");

const clearBtn = document.querySelector(".clearBtn");
const deleteBtn = document.querySelector(".deleteBtn");

const numberBtns = document.querySelectorAll(".numberBtn");
const operatorBtns = document.querySelectorAll(".operatorBtn");

const plusMinusBtn = document.querySelector(".plusMinusBtn");
const dotBtn = document.querySelector(".dotBtn");
const equalBtn = document.querySelector(".equalBtn");


// **Initial Setup**
// Initialize Display and calculation variables
historyDis.textContent = "";
outputDis.textContent = "0";
let firstNumber = "";
let secondNumber = "";
let selectedOperator = null;
let result = null;
let doneCalc = false; // If "true", the calculator is reset

const MAX_LENGTH = 16;


// **Operations Object**
// Define basic arithmetic operations
const operations = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) =>  num1 / num2
};

// **Display Update Functions**
function updateHistoryDisplay(content) {
    historyDis.textContent += content;
}

function updateOutputDisplay(content) {
    outputDis.textContent += content;
}

function resetHistoryDisplay() {
    historyDis.textContent = "";
}

function resetOutputDisplay() {
    outputDis.textContent = "";
}

// **Utility Functions**
// Round a number to a specific number of decimal places
function roundToDecimalPlaces(num, places) {
    const factor = Math.pow(10, places); // "place" determines how many decimal point
    return Math.round(num * factor) / factor;
}

// Calculate the result of an operation between two numbers
function calculateResult(firstNum, secondNum, selectedOperation) {
    if (selectedOperation === "divide" && secondNum === "0") {  // handle division by zero
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

// Perform the calculation based on the selected operator
function doOperation() {
    if (firstNumber && secondNumber && selectedOperator) {
        firstNumber = calculateResult(firstNumber, secondNumber, selectedOperator);

        updateHistoryDisplay(`${secondNumber} =`);
       
        resetOutputDisplay();
        updateOutputDisplay(firstNumber);

        resetCalculation();
    }
}
    
// Reset variables after an operation
// except firstNUmber, because it might be used again when the user clicks another operator
function resetCalculation() {
    result = null;
    selectedOperator = null;
    secondNumber = "";   
}

// Delete last digit of a number
function deleteDigit(num) {
    num = num.toString();
    return num.slice(0, -1) || "0"; // if slice has undefined value, returns "0"
}

// **Event Handlers**
// Handle reseting all variables and displays
function handleClearClick() {
    firstNumber = "";
    secondNumber = "";
    selectedOperator = null;
    result = null;
    resetHistoryDisplay();
    outputDis.textContent = "0";
}

// Handle removing the last digit
function handleDeleteClick() {
    let number = selectedOperator ? secondNumber : firstNumber;
    number = deleteDigit(number);

    resetOutputDisplay();
    updateOutputDisplay(number);

    if (!selectedOperator) firstNumber = number;
    else secondNumber = number;
}

// Handle user clicking number button
function handleNumberClick() {
    const digit = this.getAttribute("data-num");
    if (doneCalc) { // conditional used when calculation is done (equal is clicked)
        handleClearClick();
        doneCalc = false;
    }
    if (outputDis.textContent === "0")  resetOutputDisplay();  // conditional used when the calculator is used for the first time, as the ourput display is "0"

    if (firstNumber === "Can't divide by zero") { // conditional used to clear everything after user divides number by zero
        handleClearClick(); 
    }
    
    let number = selectedOperator ? secondNumber : firstNumber;

    if (number === "0") {   // conditional used when user clicks "0" as the first digit
        if(digit !== "0") { // when user not clicks zero as the second digit
        number = digit;
        resetOutputDisplay();
        }                    // when user clicks zero for second digit onwards, do nothing
    } else {
      number += digit;
    }

    if (number.length >= MAX_LENGTH) return;
    updateOutputDisplay(digit)

    if(!selectedOperator) firstNumber = number;
    else secondNumber = number;
}

// Handle user clicking operator button
function handleOperatorClick(event) {
    if (doneCalc) {
        doneCalc = false;
      }

    if (firstNumber === "Can't divide by zero") {
        handleClearClick(); 
    }

    if (firstNumber) {
        // conditional used when user clicks number, operator, number, and another operator
        // the calculation for the num, op, num will be done first before assigning another operator
        if (firstNumber && secondNumber && selectedOperator) {  
            doOperation();
            // conditional used if user clicks another operator after doing division by zero before
            if (firstNumber === "Can't divide by zero") { 
                handleClearClick();
                return;  // dont continue executing lines of code
            }
        }
        const operatorBtn = event.target;
        selectedOperator = operatorBtn.getAttribute("data-operator");
        resetHistoryDisplay();
        updateHistoryDisplay(firstNumber);
        updateHistoryDisplay(` ${operatorBtn.textContent} `);
        resetOutputDisplay();
    }
}

function handlePlusMinusClick() {
    if (doneCalc) {
        handleClearClick();
        doneCalc = false;
      }
    let number = selectedOperator ? secondNumber : firstNumber;

    if (number) {
        number = ((parseFloat(number)) * -1).toString();

        resetOutputDisplay();
        updateOutputDisplay(number);

        if (!selectedOperator) firstNumber = number;
        else secondNumber = number;
    }
}

// Handle adding a decimal point
function handleDotClick() {
    if (doneCalc) {
        handleClearClick();
        doneCalc = false;
    }
    let number = selectedOperator ? secondNumber : firstNumber;

    // only executes if theres no "."
    if (!number.includes(".")) {
        // checks whether theres number or not before adding "."
        number = (number === "") ? "0." : `${number}.`;

        resetOutputDisplay();
        updateOutputDisplay(number);
        
        if (!selectedOperator) firstNumber = number;
        else secondNumber = number;
    }
}

// Handle equal button
function handleEqualClick() {
    if (firstNumber && secondNumber && selectedOperator) {
      doOperation();
      doneCalc = true;  // set doneCalc to true to reset everything
    }
}


// **Event Listeners**
// Attach event listeners to number, operator, and function buttons
clearBtn.addEventListener("click", handleClearClick);
deleteBtn.addEventListener("click", handleDeleteClick);

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener("click", handleNumberClick);});

operatorBtns.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", handleOperatorClick);});

plusMinusBtn.addEventListener("click", handlePlusMinusClick)
dotBtn.addEventListener("click", handleDotClick);
equalBtn.addEventListener("click", handleEqualClick);
