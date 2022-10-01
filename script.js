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

const calculator = {
    displayValue: "0",
    num1: null,
    expectNum2: false,
    operator: null,
};

function inputNumber(num) {
    const { displayValue } = calculator;
    calculator.displayValue = displayValue === "0" ? num : displayValue + num;
}

function inputDecimal(dot) {
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default:
            return num2;
    }
};

function updateDisplay() {
    const display = document.querySelector(".display");
    display.value = calculator.displayValue;
}

updateDisplay();

const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", (event) => {
    const { target } = event;
    if (!target.matches("button")) {
        return;
    }

    if (target.classList.contains("operator")) {
        console.log("operator", target.value);
        return;
    }

    if (target.classList.contains("decimal")) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains("clear")) {
        console.log("clear", target.value);
        return;
    }

    inputNumber(target.value);
    updateDisplay();
})