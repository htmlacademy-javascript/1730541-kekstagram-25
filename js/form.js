import { isEscapeKey, isEnterKey } from './util.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUpload = imageUploadForm.querySelector('.img-upload__input');
const editPhoto = imageUploadForm.querySelector('.img-upload__overlay');
const buttonCancel = imageUploadForm.querySelector('.img-upload__cancel');
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
    imageUploadForm.reset();
  };

  buttonCancel.addEventListener('click', () => {
    closeImageUpload();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      if (['TEXTAREA', 'INPUT'].includes(evt.target.tagName)) {
        return;
      }
      evt.preventDefault();
      closeImageUpload();
    }
  });
};

export { initForm };
