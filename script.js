const upperDis = document.querySelector(".upperDis");
const bottomDis = document.querySelector(".bottomDis");

const numberBtns = document.querySelectorAll(".numberBtn");
const operatorBtns = document.querySelectorAll(".operatorBtn");

bottomDis.textContent = 0;
let firstNumber = "";
let secondNumber = "";
let selectedOperator = null;
let result = null;

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


function resetDisplay() {
    bottomDis.textContent = "";
}

numberBtns.forEach(function(numberBtn) {
    numberBtn.addEventListener("click", function() {
        const digit = this.getAttribute("data-num");
        firstNumber += digit;
        console.log(digit);
        console.log(firstNumber);
    })
})