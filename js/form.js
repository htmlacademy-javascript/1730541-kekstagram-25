import { isEscapeKey, isEnterKey } from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imageUpload = imgUploadForm.querySelector('.img-upload__input');
const editPhoto = imgUploadForm.querySelector('.img-upload__overlay');
const buttonCancel = imgUploadForm.querySelector('.img-upload__cancel');
const bodyTag = document.body;

const openImageUpload = () => {
  editPhoto.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
};

const initForm = () => {
  imageUpload.addEventListener('change', () => {
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
    imgUploadForm.reset();
  };

  buttonCancel.addEventListener('click', () => {
    closeImageUpload();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      // если нажали на esc находясь в инпуте или текстарее, то не закрываем имадж
      if (['TEXTAREA', 'INPUT'].includes(evt.target.tagName)) {
        return;
      }
      evt.preventDefault();
      closeImageUpload();
    }
  });
};

export { initForm };
