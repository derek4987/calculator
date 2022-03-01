// Keyboard select for decimal is not working properly

let displayValue = '';
let toCalc = [];
let result;
let toRepeat = [];
const inputDisplay = document.querySelector('.inputDisplay');
function enableDecimalButton() { document.querySelector('.b10').disabled = false };

// Disables decimal once selected once
document.querySelector('.b10').addEventListener('click', function(e) {
    document.querySelector('.b10').disabled = true;
});
// Disables on keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === '.')
    document.querySelector('.b10').disabled = true
});

// Backspace function
function backspace() {
    let currentNumberLength = displayValue.length;
    displayValue = displayValue.slice(0, currentNumberLength -1);
    if (displayValue === '') { 
        inputDisplay.textContent = '0'; 
    } else {
       inputDisplay.textContent = displayValue; 
    };
}

// Backspace button
document.querySelector('.backspace').addEventListener('click', (e) => {
    backspace();    
});
// Backspace button keyboard
document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') { backspace() };
});

// Plus/Minus button
document.querySelector('.plusMinus').addEventListener('click', function(e) {
    if (displayValue === '') { return };
    let newDisplayValue = parseFloat(displayValue) * -1;
    displayValue = `${newDisplayValue}`;
    inputDisplay.textContent = displayValue;
});

// Percent button
document.querySelector('.percent').addEventListener('click', function(e) {
    let newDisplayValue = parseFloat(inputDisplay.textContent) / 100;
    newDisplayValue = `${newDisplayValue}`;
    result = rounding(newDisplayValue);
    inputDisplay.textContent = result;
    displayValue = '';
});

// To clear display
document.querySelector('.clear').addEventListener('click', clear);
document.addEventListener('keydown',(e) => {
    if (e.key === 'Escape') {
        clear();
    } else return;
});

// Input numbers into display
for (let i = 0; i <= 10; i++) {
    const number = document.querySelector(`.b${i}`);
    number.addEventListener('click', function(e) { 
        selectNumber(e);        
        })
    // keyboard functionality
    document.addEventListener('keydown', function(e) {
        if (e.key === `${i}`) {
            selectNumberKeyboard(`${i}`);
        };
    })
    continue;  
}
// Keyboard input for decimal point
document.addEventListener('keydown', (e) => {
    if (e.key === '.') {
        const selected = e.key;
        if (displayValue.search(".") !== -1) {
            return;
        }
        selectNumberKeyboard(selected);
    } else return;
})

// to clear the display and stored values
function clear() {
    document.querySelector('.clear').textContent = 'AC';
    if (displayValue !== '' && toCalc.length !== 0) {
        displayValue = '';
    } else if (displayValue === '' && toCalc.length !== 0) {
        toCalc = [];
        displayValue = '';
        result = '';
    } else {
        displayValue = '';
        result = '';
    }
    inputDisplay.textContent = '0';
    document.querySelector('.b10').disabled = false;
}

// Select operator and calculate
for (let i = 1; i <= 4; i++) {
    const selectOperator = document.querySelector(`.o${i}`);
    selectOperator.addEventListener('click', function(e) {
        // e.target.style.backgroundColor = 'rgb(247, 224, 181)';
        if (toCalc.length === 0 && displayValue === '' && result === '') {
            return;
        } else if ((toCalc.length === 0 || toCalc.length === 3) && displayValue !== '') {
            toCalc = [];
            toCalc[0] = displayValue;
            toCalc[1] = e.target.textContent;
            console.log(toCalc);
            displayValue = ''; 
            enableDecimalButton();
        } else if ((toCalc.length === 0 || toCalc.length === 3) && displayValue === '') {
            toCalc = [];
            toCalc[0] = result;
            toCalc[1] = e.target.textContent;
            console.log(toCalc);
        } else if (toCalc.length === 2 && displayValue !== '') {
            toRepeat = [e.target.textContent ,displayValue];
            toCalc[2] = displayValue;
            displayValue = '';
            console.log(toCalc);
            const value1 = parseFloat(toCalc[0]);
            const value2 = parseFloat(toCalc[2]);
            const operator = toCalc[1];
            result = operate(operator, value1, value2);
            result = rounding(result);
            console.log(result);
            result = `${result}`;
            inputDisplay.textContent = result;
            toCalc = [];
            toCalc[0] = result;
            toCalc[1] = e.target.textContent;
            console.log(toCalc);
            enableDecimalButton();
        } else if (toCalc.length === 2 && displayValue === '') {
            toCalc[1] = e.target.textContent;
            // ^ to change operator without changing stored values
            console.log(toCalc);
        } else { return };
        
    })
    continue;
}

// select operator keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === '-' || e.key === '+') {
        const selectedKey = e.key;
        selectOperatorKeyboard(selectedKey);
    } else if (e.key === '/') {
        const selectedKey = '÷';
        selectOperatorKeyboard(selectedKey);
    } else if (e.key === '*') {
        const selectedKey = 'x';
        selectOperatorKeyboard(selectedKey);
    } else return;
})

// equals button
document.querySelector('.equals').addEventListener('click', function(e) {
    equalsButton();
})
// equals button keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { 
        equalsButton()
    } else return;
});

// round results to fit inputDisplay
function rounding(value) {
    let newValue = parseFloat(value);
    if (Math.floor(newValue) === 0 && value.length > 8) {
        newValue = `${Math.round(newValue * Math.pow(10,8)) / Math.pow(10,8)}`;
        newValue = newValue.slice(0,9);
        return newValue;
    } else if (newValue > 999999999 || newValue < -999999999) {
        newValue = 'ERR'
        return newValue;
    } else if ( newValue >= -999999999 && newValue <= 999999999 && value.length > 8) {
        console.log('works');
        newValue = `${Math.round(newValue * Math.pow(10,8)) / Math.pow(10,8)}`;
        newValue = newValue.slice(0,9);
        return newValue;
    } else return value;
}

function add(a, b) {
    let total = a + b;
    return total;
}

function subtract(a, b) {
    let total = a - b;
    return total;
}

function multiply(a, b) {
    let total = a * b;
    return total;
}

function divide(a, b) {
    let total = a / b;
    if (b = 0) { return 'ERR' };
    return total;
}

// select proper function and operate
function operate(operator, value1, value2) {
    if (operator === '+') {
        return add(value1, value2);
    } else if (operator === '-') {
        return subtract(value1, value2);
    } else if (operator === 'x') {
        return multiply(value1, value2);
    } else if (operator === '÷') {
        return divide(value1, value2);
    } else return;
}

// function to inputs numbers into display
function selectNumber(e) {
    if (displayValue.length > 8) { return };
    if (displayValue === '0') { displayValue = ''};
    const numberText = e.target;
    displayValue = displayValue + numberText.textContent;
    if (displayValue[0] === '.') { displayValue = '0.' }; 
    inputDisplay.textContent = displayValue;
    // change clear button text
    document.querySelector('.clear').textContent = 'C';
}

// function to input numbers with keyboard
function selectNumberKeyboard(value) {
    if (displayValue.length > 8) { return };
    if (displayValue === '0') { displayValue = ''};
    const number = value;
    displayValue = displayValue + number;
    if (displayValue[0] === '.') { displayValue = '0.' }; 
    inputDisplay.textContent = displayValue;
    // change clear button text
    document.querySelector('.clear').textContent = 'C';
}

// function to select operator with keyboard
function selectOperatorKeyboard(value) {
    if (toCalc.length === 0 && displayValue === '' && result === '') {
        return;
    } else if ((toCalc.length === 0 || toCalc.length === 3) && displayValue !== '') {
        toCalc = [];
        toCalc[0] = displayValue;
        toCalc[1] = value;
        console.log(toCalc);
        displayValue = ''; 
        enableDecimalButton();
    } else if ((toCalc.length === 0 || toCalc.length === 3) && displayValue === '') {
        toCalc = [];
        toCalc[0] = result;
        toCalc[1] = value;
        console.log(toCalc);
    } else if (toCalc.length === 2 && displayValue !== '') {
        toRepeat = [value ,displayValue];
        toCalc[2] = displayValue;
        displayValue = '';
        console.log(toCalc);
        const value1 = parseFloat(toCalc[0]);
        const value2 = parseFloat(toCalc[2]);
        const operator = toCalc[1];
        result = operate(operator, value1, value2);
        result = rounding(result);
        console.log(result);
        result = `${result}`;
        inputDisplay.textContent = result;
        toCalc = [];
        toCalc[0] = result;
        toCalc[1] = value;
        console.log(toCalc);
        enableDecimalButton();
    } else if (toCalc.length === 2 && displayValue === '') {
        toCalc[1] = value;
        // ^ to change operator without changing stored values
        console.log(toCalc);
    } else { return };
}

// Equals function
function equalsButton() {
    if (toCalc.length === 0 && result === '') {
        return;
    } else if (toCalc.length === 0 && result !== '') {
        const value1 = parseFloat(result);
        const value2 = parseFloat(toRepeat[1]);
        const operator = toRepeat[0];
        result = operate(operator, value1, value2);
        console.log(result);
        result = `${result}`;
        result = rounding(result);
        toCalc = [result, operator, `${value2}`];
        console.log(toCalc);
        inputDisplay.textContent = result;
    } else if (toCalc.length === 2 && displayValue === '') {
        const repeatingAddend = toCalc[0];
        const value1 = parseFloat(toCalc[0]);
        const value2 = parseFloat(repeatingAddend);
        const operator = toCalc[1];
        result = operate(operator, value1, value2);
        console.log(result);
        result = `${result}`;
        result = rounding(result);
        toCalc = [result, operator, repeatingAddend];
        console.log(toCalc);
        inputDisplay.textContent = result;
    } else if (toCalc.length === 3 && displayValue === '') {
        const value1 = parseFloat(toCalc[0]);
        const value2 = parseFloat(toCalc[2]);
        const operator = toCalc[1];
        result = operate(operator, value1, value2);
        console.log(result);
        result = `${result}`;
        result = rounding(result);
        toCalc = [result, operator, `${value2}`];
        console.log(toCalc);
        inputDisplay.textContent = result;
    } else if (toCalc.length === 2) {
        toRepeat = [toCalc[1], displayValue];
        toCalc[2] = displayValue;
        displayValue = '';
        const value1 = parseFloat(toCalc[0]);
        const value2 = parseFloat(toCalc[2]);
        const operator = toCalc[1];
        result = operate(operator, value1, value2);
        console.log(result);
        result = `${result}`;
        result = rounding(result);
        inputDisplay.textContent = result;
        toCalc = [];
        console.log(toCalc);
    } else return;
}