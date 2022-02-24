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
let result;
function enableDecimalButton() { document.querySelector('.b10').disabled = false };
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
document.querySelector('.plusMinus').addEventListener('click', function(e) {
    if (displayValue === '0') { return };
    let newDisplayValue = parseFloat(displayValue) * -1;
    displayValue = `${newDisplayValue}`;
    document.querySelector('.inputDisplay').textContent = displayValue;
});

// Percent button
document.querySelector('.percent').addEventListener('click', function(e) {
    let inputDisplay = document.querySelector('.inputDisplay').textContent;
    let newDisplayValue = parseFloat(inputDisplay) / 100;
    displayValue= `${newDisplayValue}`;
    displayValue = rounding(displayValue);
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
            if (displayValue.length > 8) { return };
            // for selecting number after pressing '='
            if (toCalc[0] === result) { toCalc = [];}
            const numberText = e.target;
            displayValue = displayValue + numberText.textContent;
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
        result = '';
    } else {
        displayValue = '0';
    }
    document.querySelector('.inputDisplay').textContent = displayValue;
    document.querySelector('.b10').disabled = false;
}

// Select operator and calculate
// some problems with changing operators in chain calc
for (let i = 1; i <= 4; i++) {
    const selectOperator = document.querySelector(`.o${i}`);
    selectOperator.addEventListener('click', function(e) {
        // e.target.style.backgroundColor = 'rgb(247, 224, 181)';
        if (toCalc.length === 0) {
            toCalc = [];
            toCalc[0] = displayValue;
            toCalc[1] = e.target.textContent;
            console.log(toCalc);
            displayValue = '0'; 
            enableDecimalButton();
        } else if (toCalc.length === 1) {
            toCalc[1] = e.target.textContent;
            console.log(toCalc);
            displayValue = '0'; 
            enableDecimalButton();
        } else if (toCalc.length === 2 && displayValue !== '0') {
            toCalc[2] = displayValue;
            displayValue = '0';
            console.log(toCalc);
            const value1 = parseFloat(toCalc[0]);
            const value2 = parseFloat(toCalc[2]);
            const operator = toCalc[1];
            result = operate(operator, value1, value2);
            result = rounding(result);
            console.log(result);
            result = `${result}`;
            document.querySelector('.inputDisplay').textContent = result;
            toCalc = [];
            toCalc[0] = result;
            toCalc[1] = e.target.textContent;
            console.log(toCalc);
            enableDecimalButton();
        } else if (toCalc.length === 2 && displayValue === '0') {
            toCalc[1] = e.target.textContent;
            // ^ to change operator without changing stored values
            console.log(toCalc);
        } else { return };
        
    })
    continue;
}

// equals button
document.querySelector('.equals').addEventListener('click', function(e) {
    if (toCalc.length === 0) {
        return;
    // } else if (toCalc.length === 2 && displayValue === '0') {
    //     const repeatingAddend = toCalc[0]
    //     displayValue = '0';
    //     const value1 = parseFloat(toCalc[0]);
    //     const value2 = parseFloat(repeatingAddend);
    //     const operator = toCalc[1];
    //     result = operate(operator, value1, value2);
    //     console.log(result);
    //     result = `${result}`;
    //     result = rounding(result);
    //     toCalc = [result, operator, repeatingAddend];
    //     console.log(toCalc);
    // } else if (toCalc.length === 3 && displayValue === '0') {
    //     const value1 = parseFloat(toCalc[0]);
    //     const value2 = parseFloat(toCalc[2]);
    //     const operator = toCalc[1];
    //     result = operate(operator, value1, value2);
    //     console.log(result);
    //     result = `${result}`;
    //     result = rounding(result);
    //     toCalc = [result, operator, `${value2}`];
    //     console.log(toCalc);
    } else if (toCalc.length === 2) {
        toCalc[2] = displayValue;
        displayValue = '0';
        const value1 = parseFloat(toCalc[0]);
        const value2 = parseFloat(toCalc[2]);
        const operator = toCalc[1];
        result = operate(operator, value1, value2);
        console.log(result);
        result = `${result}`;
        result = rounding(result);
        document.querySelector('.inputDisplay').textContent = result;
        toCalc = [ result ];
        console.log(toCalc);
    } else return;
})

// round results to fit inputDisplay
// only covers number between -1 and 1 for now
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

// Remove operator highlight when selected
// function removeHighlight() {
    // const clearButton = document.querySelector('.clear');
    // clearButton.addEventListener('click', function(e) {
        // for (let i = 1; i <= 4; i++) {
        //     let operator = document.querySelector(`.o${i}`);
        //     operator.style.backgroundColor = 'rgb(223, 168, 68)';
        //     continue;
        // }    
        // document.querySelector('.divide').style.backgroundColor = 'rgb(223, 168, 68)';
    // })
    
// }