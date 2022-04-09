const getRandomInt = (min = 0, max = 0) => {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен быть положительный!');
  }
  if (max < min) {
    throw new Error('Минимальное значение не может превышать максимальное!');
  }

  return Math.floor(Math.random() * (max - min)) + min;
};

/*
const checkLength = (checkedString, maxLength = 140) => {
  if (checkedString.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};
*/

export { getRandomInt };
