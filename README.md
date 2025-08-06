# Vanilla JavaScript Calculator🧮 
A fully-functional calculator built from scratch using **vanilla JavaScript** — no frameworks, no libraries, just raw logic and DOM manipulation. 

Every line of logic was handcrafted. No `eval()`, no shortcuts — just pure JavaScript.✨

## Live Demo🚀
[Click here to view the live demo](https://vanilla-js-calculator-xi.vercel.app/)

## Preview
<img src="./images/preview/vanilla-js -calculator-preview.gif" width="425"/>

## Why This Project Matters
Though simple on the surface, building this calculator demanded **complete control over state**, **edge-case handling**, and a deep understanding of how users interact with interfaces. It was a full-stack logic challenge disguised as a frontend project.

> This is more than just buttons and numbers — it's a tribute to clean logic, usability, and the joy of making things work **exactly right**.

## Features
- **Real-time calculation history** — persists on screen until cleared or overwritten
- **Chained operations** — press an operator after a calculation to continue with the result
- **Clear (`C`)** — instantly wipes all input and history
- **Delete (`DEL`)** — remove the last digit without clearing the entire expression
- **Plus/Minus (`±`)** — switch between positive and negative numbers
- **Add**, **Subtract**, **Multiply**, **Divide**, and **Equals (`=`)** — core operations
- **Decimal (`.`)** support — precise floating-point calculations
- **Intelligent input behavior** — clean resets after results, graceful operator handling, and safe input sanitization

## How It Works
- When an expression is evaluated using `=`, the result appears. 
- Typing a **new number after that** clears the old expression and starts fresh.
- If you enter **`number → operator → number → operator`** (instead of pressing `=`), it will:
  1. Calculate the result of the current expression
  2. Automatically use the result as the first number in a new calculation with the latest operator.
- Built-in logic ensures accurate state transitions and intuitive flow — just like how a real calculator behaves.

## What I Learned🧠
- Writing complex conditional logic without relying on `eval()` or math libraries
- Managing dynamic UI states in a clean and scalable way
- Deepened understanding of **event delegation**, **input sanitization**, and **UI feedback**
- Thoughtful UX decisions to make the calculator feel “natural”

## Getting Started
1. **Clone the repo**  
   ```bash
   git clone https://github.com/ivanajeo/vanilla-js-calculator.git
   cd vanilla-js-calculator
   ```
2. **Open** `index.html` **in your browser** <br />

## License
MIT📜 — feel free to use, remix, and share.

## About This Project
This calculator was built as part of a freeCodeCamp challenge.  
I created everything from scratch using vanilla JavaScript — no frameworks, just pure logic and a lot of love.  
Through this project, I got hands-on with DOM manipulation, event handling, and crafting my own calculation logic.  

It might be a small project, but finishing it felt incredibly rewarding.😊

