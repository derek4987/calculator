let displayValue = '';
let toCalc = ['8'];
// const gridButtons = document.querySelector('.buttons-grid');

// input numbers into display
selectNumbers();

// Disables decimal once selected once
document.querySelector('.b10').addEventListener('click', function(e) {
    document.querySelector('.b10').disabled = true;
});

// To clear display
document.querySelector('.clear').addEventListener('click', clear);

// function to inputs numbers into display
function selectNumbers() {
    for (let i = 0; i <= 10; i++) {
        const number = document.querySelector(`.b${i}`);
        number.addEventListener('click', function(e) {
            if (displayValue === '0') { displayValue = '' };
            const numberText = e.target;
            displayValue = displayValue + numberText.textContent;
            if (displayValue.length > 9) { return };
            if (displayValue[0] === '.') { displayValue = '0.' }; 
            document.querySelector('.inputDisplay').textContent = displayValue;
            // change clear button text
            document.querySelector('.clear').textContent = 'C'
        })
        continue;
        
    }
}

// to clear the display and stored values
function clear() {
    document.querySelector('.clear').textContent = 'AC';
    if (displayValue !== '0' && toCalc.length !== 0) {
        displayValue = '0';
    } else if (displayValue === '0' && toCalc.length !== 0) {
        toCalc = [];
        displayValue = '0';
    } else {
        displayValue = '0';
    }
    document.querySelector('.inputDisplay').textContent = displayValue;
    document.querySelector('.b10').disabled = false;
}



function add(a, b) {
    if (a === 0) { return 0;}
    let total = a + b;
    return total;
}

function subtract(a, b) {
    if (a === 0) { return 0;}
    let total = a - b;
    return total;
}

function multiply(a, b) {
    if (a === 0) { return 0;}
    let total = a * b;
    return total;
}

function divide(a, b) {
    if (a === 0) { return 0;}
    let total = a / b;
    return total;
}

function plusMinus(a) {
    if (a === 0) { return 0;}
    let total = a * -1;
    return total;
}

function percent(a) {
    if (a === 0) { return 0;}
    let total = a * 100;
    return total
}

function operate() {

}