const display = document.querySelector("#display");
const historyDisplay = document.querySelector("#history");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("theme-toggle");

let currentInput = "0";
let historyInput = "";
let isCalculationFinished = false;

// Theme toggle logic
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});

// Sound or haptic micro-feedback (optional utility, easily extensible)
const playFeedback = () => {
    if (window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(10); // short haptic tap
    }
};

// Main processing logic
const processInput = (value) => {
    playFeedback();

    if (value === "clear") {
        currentInput = "0";
        historyInput = "";
        isCalculationFinished = false;
    } else if (value === "backspace") {
        if (isCalculationFinished) {
            historyInput = "";
            isCalculationFinished = false;
        }
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = "0";
        }
    } else if (value === "equal") {
        if (currentInput !== "") {
            evaluateExpression();
        }
    } else {
        // Handle inputting operators & numbers
        if (isCalculationFinished) {
            // If starting a new number typing after equation completes
            if (["+", "-", "*", "/"].includes(value)) {
                historyInput = currentInput;
                isCalculationFinished = false;
            } else {
                currentInput = "0";
                historyInput = "";
                isCalculationFinished = false;
            }
        }

        if (currentInput === "0" && !["+", "-", "*", "/", "."].includes(value)) {
            currentInput = value;
        } else {
            // Prevent double decimals in the same number segment
            if (value === ".") {
                const parts = currentInput.split(/[\+\-\*\/]/);
                const lastPart = parts[parts.length - 1];
                if (lastPart.includes(".")) return;
            }
            currentInput += value;
        }
    }
    renderDisplays();
};

const renderDisplays = () => {
    // Replace raw math symbols with pretty ones for display
    let displayFormat = currentInput
        .replace(/\*/g, " &times; ")
        .replace(/\//g, " &divide; ")
        .replace(/\-/g, " &minus; ")
        .replace(/\+/g, " + ");

    display.innerHTML = displayFormat === "" ? "0" : displayFormat;
    historyDisplay.innerText = historyInput;

    // Auto scroll display to the right if numbers overflow
    display.scrollLeft = display.scrollWidth;
};

// Safe evaluation of the math expression
const evaluateExpression = () => {
    try {
        // Sanitize the expression to block random code execution (strict whitelist)
        const sanitizedExpression = currentInput.replace(/[^0-9\+\-\*\/\.\(\)]/g, "");
        
        if (sanitizedExpression === "") return;

        // Perform calculation safely using Function constructor
        // We use a self-contained execution to avoid polluting global namespace or executing arbitrary strings
        const result = new Function(`"use strict"; return (${sanitizedExpression})`)();

        if (result === undefined || isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid operation");
        }

        // Format floating numbers cleanly (e.g. 0.1 + 0.2 = 0.3)
        const formattedResult = Number(Math.round(result + "e+10") + "e-10");

        historyInput = currentInput
            .replace(/\*/g, "×")
            .replace(/\//g, "÷")
            .replace(/\-/g, "−") + " =";
        currentInput = formattedResult.toString();
        isCalculationFinished = true;
    } catch (error) {
        currentInput = "Error";
        historyInput = currentInput;
        isCalculationFinished = true;
    }
};

// Add event listeners for screen buttons
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const value = btn.id;
        processInput(value);
    });
});

// Map physical keyboard keys to calculator actions
const keyMap = {
    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
    "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
    ".": ".", "+": "+", "-": "-", "*": "*", "/": "/",
    "(": "(", ")": ")",
    "Enter": "equal",
    "=": "equal",
    "Backspace": "backspace",
    "Escape": "clear",
    "c": "clear",
    "C": "clear"
};

document.addEventListener("keydown", (e) => {
    const action = keyMap[e.key];
    if (action) {
        e.preventDefault();
        
        // Find corresponding button on UI and trigger micro-animation
        const button = document.getElementById(action);
        if (button) {
            button.classList.add("keyboard-active");
            button.click();
            setTimeout(() => {
                button.classList.remove("keyboard-active");
            }, 120);
        }
    }
});
