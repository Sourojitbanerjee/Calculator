let display = document.getElementById("display");
let currentInput = "0";
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function appendToDisplay(value) {
  if (shouldResetDisplay) {
    currentInput = "";
    shouldResetDisplay = false;
  }

  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }

  updateDisplay();
}

function clearAll() {
  currentInput = "0";
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
  updateDisplay();
}

function calculate() {
  try {
    let expression = currentInput.replace(/×/g, "*").replace(/÷/g, "/");
    expression = expression.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
    if (!isValidExpression(expression)) {
      throw new Error("Invalid expression");
    }

    let result = eval(expression);

    if (!isFinite(result)) {
      throw new Error("Invalid result");
    }

    currentInput = formatResult(result);
    shouldResetDisplay = true;
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    shouldResetDisplay = true;
    updateDisplay();
  }
}
function calculateSquareRoot() {
  try {
    let number = parseFloat(currentInput);
    if (number < 0) {
      throw new Error("Cannot calculate square root of negative number");
    }
    let result = Math.sqrt(number);
    currentInput = formatResult(result);
    shouldResetDisplay = true;
    updateDisplay();
  } catch (error) {
    currentInput = "Error";
    shouldResetDisplay = true;
    updateDisplay();
  }
}
function isValidExpression(expr) {
  // Check for valid characters
  if (!/^[0-9+\-*/.() ]+$/.test(expr)) {
    return false;
  }
  let openCount = 0;
  for (let char of expr) {
    if (char === "(") openCount++;
    if (char === ")") openCount--;
    if (openCount < 0) return false;
  }
  return openCount === 0;
}

function formatResult(result) {
  if (result % 1 === 0) {
    return result.toString();
  } else {
    return parseFloat(result.toPrecision(12)).toString();
  }
}
document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (key >= "0" && key <= "9") {
    appendToDisplay(key);
  } else if (key === ".") {
    appendToDisplay(".");
  } else if (key === "+") {
    appendToDisplay("+");
  } else if (key === "-") {
    appendToDisplay("-");
  } else if (key === "*") {
    appendToDisplay("*");
  } else if (key === "/") {
    event.preventDefault();
    appendToDisplay("/");
  } else if (key === "%") {
    appendToDisplay("%");
  } else if (key === "(" || key === ")") {
    appendToDisplay(key);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculate();
  } else if (key === "Escape") {
    clearAll();
  } else if (key === "Backspace") {
    event.preventDefault();
    deleteLast();
  }
});
