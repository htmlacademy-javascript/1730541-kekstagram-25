const getRandomInt = (min = 0, max = 0) => {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен быть положительный!');
  }
  if (max < min) {
    throw new Error('Минимальное значение не может превышать максимальное!');
  }

  return Math.floor(Math.random() * (max - min)) + min;
};

const isEnterKey = (evt) => evt.key === 'Enter';
const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInt };
export { isEscapeKey };
export { isEnterKey };
