import { isEscapeKey, isEnterKey } from './util.js';

const loadSection = document.querySelector('.img-upload');
const imageUpload = loadSection.querySelector('.img-upload__input');
const editPhoto = loadSection.querySelector('.img-upload__overlay');
const buttonCancel = loadSection.querySelector('.img-upload__cancel');
const bodyTag = document.body;

const openImageUpload = () => {
  editPhoto.classList.remove('hidden');
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
  editPhoto.classList.add('hidden');
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
