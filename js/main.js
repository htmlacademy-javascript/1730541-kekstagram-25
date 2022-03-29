function getRandomInt(min = 0, max = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
}

getRandomInt();

//Источник: https://qna.habr.com/q/517912

function getLength(checkedString, maxLength = 140) {
  if (checkedString.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}

getLength();
