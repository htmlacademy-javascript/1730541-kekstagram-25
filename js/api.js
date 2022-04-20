const FROM_SERVER = 'https://25.javascript.pages.academy/kekstagram/data';
const TO_SERVER = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onError) => {
  fetch(FROM_SERVER)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error('Ошибка загрузки данных. Попробуйте перезагрузить страницу.');
    })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onError(err);
    });
};

const sendData = (onPositiveResult, onFailResult, body) => {
  fetch(
    TO_SERVER,
    {
      method: 'post',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onPositiveResult();
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      onFailResult(err);
    });
};

export { getData, sendData };
