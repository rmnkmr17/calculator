function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
};

// Create the functions that populate the display when you click the number buttons. You should be storing the ‘display value’ in a variable somewhere for use in the next step.

let displayValue = "";
let display = document.querySelector(".display");


let numbers = document.querySelectorAll(".number");
numbers.forEach((number) => number.addEventListener("click", function(e){
    showNumber(e.target.textContent);
    display.textContent = displayValue;
}));

function showNumber(num) {
    if (displayValue.length <= 5) {
        displayValue += num;
    }
}