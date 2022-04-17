import { isEscapeKey, isEnterKey, checkStringLength, checkArrayLength } from './util.js';

const loadSection = document.querySelector('.img-upload');
const imageUpload = loadSection.querySelector('.img-upload__input');
const editPhoto = loadSection.querySelector('.img-upload__overlay');
const loadForm = loadSection.querySelector('.img-upload__form');
const buttonCancel = loadSection.querySelector('.img-upload__cancel');
const buttonSubmit = loadSection.querySelector('.img-upload__submit');
const bodyTag = document.body;
const hashtagField = loadSection.querySelector('.text__hashtags');
const commentField = loadSection.querySelector('.text__description');
const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const openImageUpload = () => {
  loadSection.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
};

imageUpload.addEventListener('click', () => {
  openImageUpload();
});

imageUpload.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openImageUpload();
  }
});

const closeImageUpload = () => {
  loadSection.classList.add('hidden');
  bodyTag.classList.remove('modal-open');
};

buttonCancel.addEventListener('click', () => {
  closeImageUpload();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageUpload();
  }
});

const pristine = new Pristine(loadForm, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

pristine.addValidator(commentField, checkStringLength, 'Не более 140 символов');
pristine.addValidator(hashtagField, getUniqueHashtags, 'Хэштеги не могут повторяться');
pristine.addValidator(hashtagField, checkArrayLength, 'Не более 5 хэштегов');
pristine.addValidator(hashtagField, getHashtagsToLowerCase, '');
pristine.addValidator(hashtagField, checkHashtagSymbols, 'Хэштег должен начинатьтся с #, содержать только буквы и цифры, не более 20 символов');

export { openImageUpload };
export { closeImageUpload };
