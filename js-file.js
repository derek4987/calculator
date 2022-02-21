let displayValue = '';

// have function(e) as separate function. right now only adds the fist .standard to the dislplay.;
const numberButtons = document.querySelector('.standard');
numberButtons.addEventListener('click',function(e) {
    const buttonText = e.target;
    displayValue = displayValue + buttonText.textContent;
    if (displayValue.length > 9) { return };
    document.querySelector('.inputDisplay').textContent = displayValue;
})

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