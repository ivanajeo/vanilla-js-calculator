const upperDis = document.querySelector(".upperDis");
const bottomDis = document.querySelector(".bottomDis");

const clearBtn = document.querySelector(".clearBtn");
const deleteBtn = document.querySelector(".deleteBtn");
const nineBtn = document.querySelector(".nineBtn");
const eightBtn = document.querySelector(".eightBtn");
const sevenBtn = document.querySelector(".sevenBtn");
const sixBtn = document.querySelector(".sixBtn");
const fiveBtn = document.querySelector(".fiveBtn");
const fourBtn = document.querySelector(".fourBtn");
const threeBtn = document.querySelector(".threeBtn");
const twoBtn = document.querySelector(".twoBtn");
const oneBtn = document.querySelector(".oneBtn");
const plusMinusBtn = document.querySelector(".plusMinusBtn");
const zeroBtn = document.querySelector(".zeroBtn");
const dotBtn = document.querySelector(".dotBtn");

const rootBtn = document.querySelector(".rootBtn");
const divisionBtn = document.querySelector(".divisionBtn");
const percentBtn = document.querySelector(".percentBtn");
const multiplicationBtn = document.querySelector(".multiplicationBtn");
const equalBtn = document.querySelector(".equalBtn");
const subtractionBtn = document.querySelector(".subtractionBtn");
const additionBtn = document.querySelector(".additionBtn");

const numberBtn = document.querySelectorAll(".numberBtn");
const operatorBtn = document.querySelectorAll(".operatorBtn");

let firstNumber = "";
let secondNumber = "";
let selectedOperator = null;
bottomDis.textContent = "";

const operations = {
    add: (num1, num2) => num1 + num2,
    subtract: (num1, num2) => num1 - num2,
    multiply: (num1, num2) => num1 * num2,
    divide: (num1, num2) => num2 !== 0 ? num1 / num2 : 'Error' ,
    root: (num1) => Math.sqrt(num1),
    percent: (num1) => num1 / 100
};


function updateDisplay(content) {
    bottomDis.textContent += content;
}

numberBtn.forEach((button) => {
    button.addEventListener("click", function () {
        const digit = this.getAttribute("data-num");
        if (selectedOperator === null) {
            firstNumber += digit
            updateDisplay(digit);
            console.log('First Number:', firstNumber);
            console.log('digit', digit);

        } else {
            secondNumber += digit;
            updateDisplay(digit);
            console.log('Second Number:', secondNumber);
        }
    });
});

operatorBtn.forEach((button) => {
    button.addEventListener("click", function() {
        selectedOperator = this.getAttribute('data-operator');
        updateDisplay(` ${button.textContent} `);
        console.log('Selected Operator:', selectedOperator);
});
})


equalBtn.addEventListener("click", function() {
    let result;
    if (firstNumber !== "" && secondNumber !== "") {
        result = operations[selectedOperator](parseFloat(firstNumber), parseFloat(secondNumber));
        updateDisplay(` = ${result}`);
        firstNumber = result;
        secondNumber = '';
        selectedOperator = null;
    }
    
    
    console.log('first number(new): ', firstNumber);
});

