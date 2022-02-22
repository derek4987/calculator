let displayValue = '';
let toCalc = [];

// have function(e) as separate function. right now only adds the fist .standard to the dislplay.;
const buttonSelect = document.querySelector('.buttons-grid');
// document.querySelector('.standard').addEventListener('click', selectNumbers);
selectNumbers();

function selectNumbers() {
    for (let i = 0; i <= 10; i++) {
        const number = document.querySelector(`.b${i}`);
        number.addEventListener('click', function(e) {
            const numberText = e.target;
            displayValue = displayValue + numberText.textContent;
            if (displayValue.length > 9) { return };
            document.querySelector('.inputDisplay').textContent = displayValue;
        })
        continue;
    }
}

function disableDecimal() {
    document.querySelector('.b10')
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