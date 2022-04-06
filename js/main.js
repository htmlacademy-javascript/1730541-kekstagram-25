const MAX_ITEM = 25;

const DESCRIPTIONS = [
  'Зимой и летом одним цветом.',
  'Никакой хандры.',
  'Я - фотограф!',
  'Умею видеть красоту.',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Андрей',
  'Артур',
  'Никита',
  'Эдуард',
  'Юлиан',
];

const getRandomInt = (min = 0, max = 0) => {
  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен быть положительный!');
  }
  if (max < min) {
    throw new Error('Минимальное значение не может превышать максимальное!');
  }

  return Math.floor(Math.random() * (max - min)) + min;
};

getRandomInt();

//Источник: https://qna.habr.com/q/517912

const checkLength = (checkedString, maxLength = 140) => {
  if (checkedString.length <= maxLength) {
    return true;
  } else {
    return false;
  }
};

checkLength();

const createComments = (arrayLength = 0) => {
  const result = [];
  for (let commentsLength = 0; commentsLength < arrayLength; commentsLength++) {
    result.push({
      id: commentsLength,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
      name: NAMES[getRandomInt(0, NAMES.length - 1)],
    });

  }
  return result;
}

const createObject = (count = 0) => {
  return {
    id: count,
    url: `photos/${count}.jpg`,
    description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInt(15, 200),
    comments: createComments(getRandomInt(0, 7)),
  };
}

const createArray = (arrayLength = 0) => {
  const result = [];
  for (let length = 0; length < arrayLength; length++) {
    result.push(createObject(length));

  }
  return result;
}

createArray(MAX_ITEM);



