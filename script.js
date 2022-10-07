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
    const { displayValue, expectNum2 } = calculator;

    if (expectNum2 === true) {
        calculator.displayValue = num;
        calculator.expectNum2 = false;
    } else {
        calculator.displayValue = displayValue === "0" ? num : displayValue + num;
    }
}

function inputDecimal(dot) {
    if (calculator.expectNum2 === true) {
        calculator.displayValue = "0.";
        calculator.expectNum2 = false;
        return;
    }

    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    const { num1, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.expectNum2) {
        calculator.operator = nextOperator;
        return;
    }

    if (num1 === null && !isNaN(inputValue)) {
        calculator.num1 = inputValue;
    } else if (operator) {
        const result = operate(num1, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.num1 = result;
    }

    calculator.expectNum2 = true;
    calculator.operator = nextOperator;
    console.log(calculator)
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

function clearCalculator() {
    calculator.displayValue = "0";
    calculator.num1 = null;
    calculator.expectNum2 = false;
    calculator.operator = null;

}

function undoNumber() {
    if (calculator.expectNum2 === true &&
        calculator.operator === "+" ||
        calculator.operator === "-" ||
        calculator.operator === "*" ||
        calculator.operator === "/"
    ) {
        calculator.operator = null;
        calculator.expectNum2 = false;
        calculator.num1 = null;
    } else if (calculator.operator === "=" || calculator.operator === "Enter" && calculator.expectNum2 === true) {
        calculator.operator = null;
        calculator.num1 = null;
        calculator.expectNum2 = false;
        calculator.displayValue = calculator.displayValue.slice(0, -1);
    }
    else {
        calculator.displayValue = calculator.displayValue.slice(0, -1);
    }
    console.log(calculator)
}

function updateDisplay() {
    const display = document.querySelector(".display");
    display.value = calculator.displayValue;
}

const buttons = document.querySelector(".buttons");
buttons.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }
    switch (value) {
        case "+":
        case "-":
        case "*":
        case "/":
        case "=":
            handleOperator(value);
            break;
        case ".":
            inputDecimal(value);
            break;
        case "C":
            clearCalculator();
            break;
        case "delete":
            undoNumber();
            break;
        default:
            if (Number.isInteger(parseFloat(value))) {
                inputNumber(value);
            }
    }
    updateDisplay();
    console.log(calculator)

});

function addKeyboardSupport(e) {
    document.addEventListener("keydown", getKeyboardInput)
}

function getKeyboardInput(event) {
    if (event.key >= "0" && event.key <= "9") {
        inputNumber(event.key);
        updateDisplay();
    }

    if (event.key === "Backspace") {
        undoNumber();
        updateDisplay();
    }
    if (event.key === ".") {
        inputDecimal(event.key);
        updateDisplay();
    }

    if (event.key === "Delete") {
        clearCalculator();
        updateDisplay();
    }

    if (event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/" ||
        event.key === "=" ||
        event.key === "Enter") {
        handleOperator(event.key);
        updateDisplay();
    }
}

updateDisplay();
addKeyboardSupport();
