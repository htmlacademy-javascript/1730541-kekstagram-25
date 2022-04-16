import { getRandomInt } from './util.js';

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

const createComments = (arrayLength) => {
  const result = [];
  for (let commentsLength = 1; commentsLength < arrayLength; commentsLength++) {
    result.push({
      id: commentsLength,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: MESSAGES[getRandomInt(0, MESSAGES.length - 1)],
      name: NAMES[getRandomInt(0, NAMES.length - 1)],
    });

  }
  return result;
};

const createImage = (count = 0) => ({
  id: count,
  url: `photos/${count}.jpg`,
  description: DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInt(15, 200),
  comments: createComments(getRandomInt(1, 7)),
});

const createImages = () => {
  const result = [];
  for (let length = 1; length < MAX_ITEM; length++) {
    result.push(createImage(length));

  }
  return result;
};

export { createImages };
