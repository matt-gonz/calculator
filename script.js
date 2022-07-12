const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

// Set defaults for variables
let displayValue = '0';
let operator1 = null;
let operator2 = null;
let operand1 = null;
let operand2 = null;
let result = null;

window.addEventListener('keydown', handleKeyboardInput);

buttons.forEach(btn => btn.addEventListener('click', function(event){
    if (btn.classList.contains('btn-number')){
        let selectedNumber = event.target.textContent;
        inputOperand(selectedNumber);
        updateDisplay();        
    }
    else if (btn.classList.contains('btn-operator')){
        let currentOperator = event.target.textContent;
        inputOperator(currentOperator);
    }
    else if (btn.classList.contains('btn-clear')){
        clearDisplay();
        updateDisplay();
    }
    else if (btn.classList.contains('btn-delete')){
        inputBackspace();
        updateDisplay();
    }
    else if (btn.classList.contains('btn-equals')){
        inputEquals();
        updateDisplay();
    }
    else if (btn.classList.contains('btn-decimal')){
        let decimal = event.target.textContent;
        inputDecimal(decimal);
        updateDisplay();
    }
}))

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9){
        inputOperand(e.key);
        updateDisplay();
    } 
    else if (e.key === '.'){
        inputDecimal('.');
        updateDisplay();
    } 
    else if (e.key === '=' || e.key === 'Enter'){
        inputEquals();
        updateDisplay();
    } 
    else if (e.key === 'Backspace'){
        inputBackspace();
        updateDisplay();
    }
    else if (e.key === 'Escape'){
        clearDisplay();
        updateDisplay();
    } 
    else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/'){
        inputOperator(convertOperator(e.key));
        updateDisplay();
    }
      
}

function convertOperator(operator){
    if (operator === '+'){
        return '+';
    }     
    else if (operator === '-'){
        return '-';
    }
    else if (operator === '/'){
        return '÷';
    }
    else if (operator === '*'){
        return 'x';
    }
}

function inputEquals(){
    if (operator1 === null){
        displayValue = displayValue;
    }
    else if (operator2 !== null){
        operand2 = displayValue;
        result = operate(operator2, Number(operand1), Number(operand2));
        displayValue = roundAccurately(result, 15).toString();
        console.log(result);
        if (result === "Nice try"){
            displayValue = "Nice try";
        }
        else{
            operand1 = displayValue;
            operand2 = null;
            operator1 = null;
            operator2 = null;
            result = null;
        }
    }
    else{
        operand2 = displayValue;
        result = operate(operator1, Number(operand1), Number(operand2));
        displayValue = roundAccurately(result, 15).toString();
        if (result === "Nice try"){
            displayValue = "Nice try";
        }
        else{
            operand1 = displayValue;
            operand2 = null;
            operator1 = null;
            operator2 = null;
            result = null;
        }        
    }
}

function inputOperator(operator){
    if (operator1 !== null && operator2 === null){
        operator2 = operator;
        operand2 = displayValue;
        result = operate(operator1, Number(operand1), Number(operand2));
        operand1 = displayValue;
        result = null;
    }
    else if (operator1 !== null && operator2 !== null){
        operand2 = displayValue;
        result = operate(operator2, Number(operand1), Number(operand2));
        operator2 = operator;
        operand1 = displayValue;
        result = null;
    }
    else{
        operator1 = operator;
        operand1 = displayValue;
    }
}

function inputOperand(operand){
    if (operand1 === null){
        if (displayValue === 0 || displayValue === '0'){
            displayValue = operand;
        }
        else if (displayValue === operand1){
            displayValue = operand;
        }
        else{
            displayValue += operand;
        }
    }
    else{
        if (displayValue === operand1){
            displayValue = operand;
        }
        else{
            displayValue += operand;
        }
    }
}

function inputDecimal(dot) {
    if(displayValue === operand1 || displayValue === operand2) {
        displayValue = '0';
        displayValue += dot;
    }
    else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
}

function inputBackspace(){
    if(displayValue != '0' || displayValue != 0){
        newDisplayValue = displayValue.slice(0, -1);
        displayValue = newDisplayValue;
        updateDisplay();
    }
}

function clearDisplay(){
    displayValue = 0;
    operator1 = null;
    operator2 = null;
    operand1 = null;
    operand2 = null;
    result = null;
}

function updateDisplay(){
    display.textContent = displayValue;
    if (displayValue.length > 10){
        display.textContent = displayValue.substring(0, 10);
    }
}

function roundAccurately(num, places){
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

function operate(operator, num1, num2){
    if (operator === '+'){
        return num1 + num2;
    }
    else if (operator === '-'){
        return num1 - num2;
    }
    else if (operator === 'x'){
        return num1 * num2;
    }
    else if (operator === '÷'){
        if (num2 === 0){
            return "Nice try";
        }
        else{
            return num1 / num2;
        }     
    }
}