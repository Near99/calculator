const kbdNumbers = document.querySelectorAll('[data-kbd]');
const kbdOperator = document.querySelectorAll('[date-operator]');
const currentEntry = document.querySelector('.cur-entry');
const preEntry = document.querySelector('.pre-entry');
const clearAll = document.querySelector('[data-clear]');
const period = document.querySelector('[data-dot]');
const kbdequal = document.querySelector('[date-equal]');
const kbdPercent = document.querySelector('[date-percent]');
const kbdpm = document.querySelector('[date-pm]');

currentEntry.innerHTML = '0';
let previousOperator = '';
let splitUsedOperator = '';

// Calculation
const add = (num1, num2) => num1 + num2;
const subtract = (num1, num2) => num1 - num2;
const multiply = (num1, num2) => num1 * num2;
const divide = (num1, num2) => num1 / num2;

const operate = (num1, num2, operate) => {
  switch (operate) {
    case '+':
      return add(num1, num2).toString();
    case '−':
      return subtract(num1, num2).toString();
    case '×':
      return multiply(num1, num2).toString();
    case '÷':
      return divide(num1, num2).toString();
  }
};

// DOM
const KbdNumbers = kbdNumbers.forEach((item) =>
  item.addEventListener('click', (e) => {
    if (currentEntry.innerHTML == '0' && e.target.innerHTML == '0') return;
    if (currentEntry.innerHTML == '0' && e.target.innerHTML !== '0') {
      currentEntry.innerHTML = e.target.innerHTML;
    } else {
      currentEntry.innerHTML += e.target.innerHTML;
    }
  })
);

const KbdOperator = kbdOperator.forEach((item) =>
  item.addEventListener('click', (e) => {
    previousOperator = e.target.innerHTML;
    if (splitUsedOperator == '') {
      splitUsedOperator = previousOperator;
    }
    if (
      currentEntry.innerHTML.includes('+') ||
      currentEntry.innerHTML.includes('−') ||
      currentEntry.innerHTML.includes('×') ||
      currentEntry.innerHTML.includes('÷')
    ) {
      let [num1, num2] = currentEntry.innerHTML.split(splitUsedOperator);
      preEntry.innerHTML = currentEntry.innerHTML;
      currentEntry.innerHTML = operate(
        Number(num1),
        Number(num2),
        splitUsedOperator
      );
      currentEntry.innerHTML += e.target.innerHTML;
      splitUsedOperator = e.target.innerHTML;
    } else {
      currentEntry.innerHTML += e.target.innerHTML;
    }
  })
);

const dot = period.addEventListener('click', (e) => {
  if (currentEntry.innerHTML.includes('.')) return;
  if ((currentEntry.innerHTML = '0')) {
    currentEntry.innerHTML += e.target.innerHTML;
  } else {
    currentEntry.innerHTML = e.target.innerHTML;
  }
});

const clear = clearAll.addEventListener('click', () => {
  currentEntry.innerHTML = '0';
  previousOperator = '';
  splitUsedOperator = '';
});

const equal = kbdequal.addEventListener('click', () => {
  let [num1, num2] = currentEntry.innerHTML.split(previousOperator);
  preEntry.innerHTML = currentEntry.innerHTML;
  currentEntry.innerHTML = operate(
    Number(num1),
    Number(num2),
    previousOperator
  );
  previousOperator = '';
  splitUsedOperator = '';
});

const precent = kbdPercent.addEventListener('click', (e) => {
  if (
    currentEntry.innerHTML.includes('+') ||
    currentEntry.innerHTML.includes('−') ||
    currentEntry.innerHTML.includes('×') ||
    currentEntry.innerHTML.includes('÷')
  ) {
    return;
  }
  currentEntry.innerHTML = (Number(currentEntry.innerHTML) / 100).toString();
});

const pm = kbdpm.addEventListener('click', () =>
  alert('WOW, You have just found that I have not completed this feature!')
);
