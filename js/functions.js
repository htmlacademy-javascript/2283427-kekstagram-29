// Функция для проверки длины строки

const lengthString = function (checkedString, maxLength) {
  if (checkedString.length <= maxLength) {
    return true;
  }

  return false;
};

lengthString('Добрый вечер!', 15);

// Функция для проверки, является ли строка палиндромом

const palindromeString = function (checkedString) {
  checkedString = checkedString.toLowerCase().replaceAll(' ', '');
  const lastIndex = checkedString.length - 1;
  for (let i = 0; i < checkedString.length / 2; i++) {
    if (checkedString[i] !== checkedString[lastIndex - i]) {
      return false;
    }
  }
  return true;
};

palindromeString('Лёша на полке клопа нашёл ');

/*

Функция, которая принимает строку, извлекает содержащиеся в ней цифры
от 0 до 9 и возвращает их в виде целого положительного числа

*/

function getNumbersFromString(string) {
  string = typeof string === 'number' ? string.toString() : string;
  let result = '';
  for (let i = 0; i <= string.length - 1; i++) {
    const number = parseInt(string[i], 10);
    if (Number.isNaN(number) === false) {
      result += number;
    }
  }
  return result.length > 0 ? Number(result) : NaN;
}

getNumbersFromString('dfgsdfg 324q2asdf ');

/*

Функция, которая принимает время начала и конца рабочего дня,
а также время старта и продолжительность встречи в минутах и возвращает true,
если встреча не выходит за рамки рабочего дня, и false, если выходит.

*/

const calcMinInHour = function (timeInHour) {
  const timeParts = timeInHour.split(':');
  return Number(timeParts[0]) * 60 + Number(timeParts[1]);
};

const getWorkTime = function (from, to, start, durationMin) {
  if ((calcMinInHour(start) + durationMin) <= calcMinInHour(to) && calcMinInHour(from) <= calcMinInHour(start)) {
    return true;
  } else {
    return false;
  }
};

getWorkTime();

/*

Проверка
console.log(getWorkTime('08:00', '17:30', '14:00', 90)); // true
console.log(getWorkTime('8:0', '10:0', '8:0', 120));     // true
console.log(getWorkTime('08:00', '14:30', '14:00', 90)); // false
console.log(getWorkTime('14:00', '17:30', '08:0', 90));  // false
console.log(getWorkTime('8:00', '17:30', '08:00', 900)); // false

*/
