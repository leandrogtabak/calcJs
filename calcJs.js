//Declaro el array buttons que contendrá los elementos del Dom con la clase Buttons (botones de la calculadora)

let buttons = [];

buttons = document.getElementsByClassName('buttons');
let screen = document.querySelector('#screen');

for (let button of buttons) {
  button.addEventListener('click', (e) => manageButtons(e));
}

//Declaro las variables globales

let operandA = 0;
let operandB = 0;
let resultado = 0;
let operator = '';
let formerOperator = '';
let opIsSelected = false;
let isErr = false;

const replaceComma = (text) => text.replace(',', '.');
const replaceDot = (text) => text.replace('.', ',');
const manageError = () => {
  operandA = operandB = resultado = 0;
  operator = formerOperator = '';
  opIsSelected = false;
};

const checkResult = (res) => {
  if (res <= 99999999 && res >= -99999999) {
    screen.innerHTML = replaceDot((+res.toFixed(7)).toString().substring(0, 9));
    operandA = res;
  } else {
    screen.innerHTML = 'Error';
    isErr = true;
    manageError();
  }
};

const manageButtons = (e) => {
  if (isErr) {
    screen.innerHTML = '0';
    isErr = false;
  }

  if (e.target.dataset.value <= '9' && e.target.dataset.value >= '0') {
    if (screen.innerHTML == '0' || opIsSelected) {
      screen.innerHTML = '';
      opIsSelected = false;
    }
    if (screen.innerHTML.length < 8) {
      screen.innerHTML += e.target.dataset.value;
      operandB = replaceComma(screen.innerHTML);
    }
  } else if (e.target.dataset.value == 'ac') {
    screen.innerHTML = '0';
    operandA = 0;
    operandB = 0;
    resultado = 0;
    operator = '';
    opIsSelected = false;
    isErr = false;
  } else if (e.target.dataset.value == 'ce') {
    screen.innerHTML = '0';
  } else if (e.target.dataset.value == 'del') {
    if (screen.innerHTML.length > 1) {
      screen.innerHTML = screen.innerHTML.slice(0, -1);
    } else {
      screen.innerHTML = '0';
    }
  } else if (e.target.dataset.value == ',' && !screen.innerHTML.includes(',')) {
    screen.innerHTML += ',';
  } else if (e.target.dataset.value == '+') {
    operandA = replaceComma(screen.innerHTML);
    operator = '+';
    opIsSelected = true;
  } else if (e.target.dataset.value == '-') {
    operandA = replaceComma(screen.innerHTML);
    operator = '-';
    opIsSelected = true;
  } else if (e.target.dataset.value == '*') {
    operandA = replaceComma(screen.innerHTML);
    operator = '*';
    opIsSelected = true;
  } else if (e.target.dataset.value == '/') {
    operandA = replaceComma(screen.innerHTML);
    operator = '/';
    opIsSelected = true;
  } else if (e.target.dataset.value == '%') {
    operandB = replaceComma(screen.innerHTML);
    formerOperator = operator;
    operator = '%';
    opIsSelected = true;
  } else if (e.target.dataset.value == '+-') {
    screen.innerHTML = -screen.innerHTML;
    operandA = replaceComma(screen.innerHTML);
  } else if (e.target.dataset.value == 'pow2') {
    resultado = screen.innerHTML ** 2;
    checkResult(resultado);
    operandA = replaceComma(screen.innerHTML);
  } else if (e.target.dataset.value == 'sqrt') {
    resultado = screen.innerHTML ** (1 / 2);
    checkResult(resultado);
    operandA = replaceComma(screen.innerHTML);
  } else if (e.target.dataset.value == 'inverse') {
    resultado = 1 / screen.innerHTML;
    checkResult(resultado);
    operandA = replaceComma(screen.innerHTML);
  } else if (e.target.dataset.value == '=') {
    switch (operator) {
      case '+':
        resultado = parseFloat(operandA) + parseFloat(operandB);
        checkResult(resultado);
        break;
      case '-':
        resultado = parseFloat(operandA) - parseFloat(operandB);
        checkResult(resultado);
        break;
      case '*':
        resultado = parseFloat(operandA) * parseFloat(operandB);
        checkResult(resultado);
        break;
      case '/':
        resultado = parseFloat(operandA) / parseFloat(operandB);
        checkResult(resultado);
        break;
      case '%':
        if (formerOperator == '+') {
          resultado = parseFloat(operandA) * (1 + parseFloat(operandB) / 100);
          checkResult(resultado);
        } else if (formerOperator == '-') {
          resultado = parseFloat(operandA) * (1 - parseFloat(operandB) / 100);
          checkResult(resultado);
        } else {
          screen.innerHTML = 'Error';
          isErr = true;
          manageError();
        }

        break;
      default:
        console.log('No se utiliza operación');
    }
  }
};

const appHeight = () => {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', appHeight);
appHeight();
