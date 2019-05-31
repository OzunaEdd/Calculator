let add = (leftOperand, rightOperand) => {
  return leftOperand + rightOperand;
};
let subtract = (leftOperand, rightOperand) => {
  return leftOperand - rightOperand;
};
let multiply = (leftOperand, rightOperand) => {
  return leftOperand * rightOperand;
};
let divide = (leftOperand, rightOperand) => {
  return leftOperand / rightOperand;
};
let operate = (operator, leftOperand, rightOperand) => {
  let answer = 0;
  switch (operator) {
    case '+':
      answer = add(leftOperand, rightOperand);
      break;
    case '-':
      answer = subtract(leftOperand, rightOperand);
      break;
    case '×':
      answer = multiply(leftOperand, rightOperand);
      break;
    case '÷':
      answer = divide(leftOperand, rightOperand);
      break;

  }
  return answer;
};
let precedence = (operator) => {
  let level = 0;
  switch (operator) {
    case '+':
      level = 1;
      break;
    case '-':
      level = 1;
      break;
    case '×':
      level = 2;
      break;
    case '÷':
      level = 2;
      break;

  }
  return level;
};
const container = document.querySelector('.container');
const input = document.querySelector('.input-screen');
const output = document.querySelector('.output-screen');
container.onclick = (event) => {
  let expression = 0;
  let operand = [];
  let operator = [];
  let leftNumber = 0;
  let rightNumber = 0;
  let result = 0;
  if (input.innerHTML == 0) {
    input.innerHTML = '';
  }
  if (event.target.innerHTML == "C") {
    input.textContent = 0;
    output.textContent = 0;
  } else if (event.target.innerHTML == "=") {
    expression = input.innerHTML;
    for (let i = expression.length - 1; i >= 0; i--) {
      if (!isNaN(expression[i])) {
        let digit = 0;
        let ten = 1;
        digit += expression[i] * ten;
        while (!isNaN(expression[i - 1])) {
          ten *= 10;
          digit += expression[i - 1] * ten;
          i--;
        }
        operand.push(digit);
      } else {
        while (operator.length > 0 && precedence(operator[operator.length - 1]) >= precedence(expression[i])) {
          leftNumber = operand.pop();
          rightNumber = operand.pop();
          result = operate(operator.pop(), leftNumber, rightNumber);
          operand.push(result);
        }
        operator.push(expression[i]);
      }

    }
    while (operator.length > 0) {
      leftNumber = operand.pop();
      rightNumber = operand.pop();
      console.log(leftNumber);
      console.log(rightNumber);
      result = operate(operator.pop(), leftNumber, rightNumber);
      operand.push(result);
    }
    output.textContent = operand.pop();
  } else {
    input.textContent += event.target.innerHTML;
  }
}