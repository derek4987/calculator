/* Using toCalc to store inputed numbers
    - Add first number on display to toCalc when an operator is pressed
        -When using percent, function will multiply by 100 and input value on display. when normal operator is selected, that number will be added to toCalc, so will not be stored until operator is selected.
        - Same with plus/minus except multiply by -1
    - Order: 
        1: display number
        2: select operator. This adds the display number to toCalc[0], and the operator symbol to toCalc[1] 
        3: another display number 
        4: select second operator. This adds the display number to ToCalc[2], runs the result between toCalc[0] and toCalc[2] using the operator assigned to toCalc[1]. Then clears toCalc (toCalc = [];), adds the result to toCalc[0], and adds the operator selected in step 4 to toCalc[1].
        5: If equals is selected instead of a second operator, this adds the display value to toCalc[2], runs and displays the result between toCalc[0] and toCalc[2] using the operator assigned to toCalc[1]. then clears toCalc (toCalc = [];), and adds the result to toCalc[0]
        6: an operator selected after 'equals' assigns the selected operator to toCalc[1] and the display number to toCalc[0]

        Will need to add several if/else if statements to define different scenarios when toCalc[0],[1],or [2] are defined if (toCalc[i] !== defined) ... 

        when doing an operater, when you press = multiple times it repeats the operator.
*/
let displayValue = '';
let toCalc = [];
// const gridButtons = document.querySelector('.buttons-grid');

// input numbers into display
selectNumbers();

// Disables decimal once selected once
document.querySelector('.b10').addEventListener('click', function(e) {
    document.querySelector('.b10').disabled = true;
});

// Backspace button
document.querySelector('.backspace').addEventListener('click', function(e) {
    let currentNumberLength = displayValue.length;
    displayValue = displayValue.slice(0, currentNumberLength -1);
    if (displayValue === '') { displayValue = '0' };
    document.querySelector('.inputDisplay').textContent = displayValue;
});

// Plus/Minus button
// bug type 9 numbers then minus works but minus at 0 returns Nan or can only fit 8 numbers and the negative
document.querySelector('.plusMinus').addEventListener('click', function(e) {
    let newDisplayValue = parseFloat(displayValue) * -1;
    displayValue = `${newDisplayValue}`;
    document.querySelector('.inputDisplay').textContent = displayValue;
});

// Percent button
// bugs: some numbers too long for line
document.querySelector('.percent').addEventListener('click', function(e) {
    let newDisplayValue = parseFloat(displayValue) / 100;
    displayValue= `${newDisplayValue}`;
    document.querySelector('.inputDisplay').textContent = displayValue;
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