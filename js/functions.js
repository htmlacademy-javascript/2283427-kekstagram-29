//Функция для проверки длины строки

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
