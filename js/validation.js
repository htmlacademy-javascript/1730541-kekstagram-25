const MAX_STRING_LENGTH = 140;
const HASHTAGS_QUANTITY = 5;

const loadSection = document.querySelector('.img-upload');
const imageUploadForm = loadSection.querySelector('.img-upload__form');
const hashtagField = loadSection.querySelector('.text__hashtags');
const commentField = loadSection.querySelector('.text__description');
const buttonSubmit = document.querySelector('.img-upload__submit');
const tagRegExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;


const pristine = new Pristine(imageUploadForm, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const getHashtags = (string) => string.split(' ').filter((item) => item !== '');

const checkStringLength = (checkedString) => checkedString.length <= MAX_STRING_LENGTH;

const checkArrayLength = (array) => getHashtags(array).length <= HASHTAGS_QUANTITY;

const checkUniqueHashtags = (value) => {
  const hashTagArray = value.trim().toLowerCase().split(' ');
  const noDuplicate = new Set(hashTagArray);

  return hashTagArray.length === noDuplicate.size;
};

const getHashtagsToLowerCase = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.map((element) => element.toLowerCase());
};

const checkHashtagSymbols = (value) => {
  if (value === '') {
    return true;
  }
  const hashTagArray = value.trim().split(' ');
  return hashTagArray.every((hashtag) => tagRegExp.test(hashtag));
};

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
};

const initFormValidation = () => {

  pristine.addValidator(commentField, checkStringLength, `Не более ${MAX_STRING_LENGTH} символов!`);
  pristine.addValidator(hashtagField, checkArrayLength, `Не более ${HASHTAGS_QUANTITY} хэштегов!`);
  pristine.addValidator(hashtagField, checkUniqueHashtags, 'Хэштеги не могут повторяться!');
  pristine.addValidator(hashtagField, getHashtagsToLowerCase, '');
  pristine.addValidator(hashtagField, checkHashtagSymbols, 'Хэштег должен начинатьтся с #, содержать только буквы и цифры, и быть не длиннее 20 символов!');

  // разблокируем форму при изменении чего либо
  commentField.addEventListener('input', unblockSubmitButton);
  hashtagField.addEventListener('input', unblockSubmitButton);

  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      imageUploadForm.submit();
    } else {
      blockSubmitButton();
    }
  });
};

export { initFormValidation };
