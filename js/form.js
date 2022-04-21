import { isEscapeKey, isEnterKey } from './util.js';
import { getScaleImageTransform } from './scaling.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'heic'];

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUpload = imageUploadForm.querySelector('.img-upload__input');
const editPhoto = imageUploadForm.querySelector('.img-upload__overlay');
const bodyTag = document.body;
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successOverlay = document.querySelector('.success');
const successMessageButton = successTemplate.querySelector('.success__button');
const errorOverlay = document.querySelector('.error');
const errorMessageButton = errorTemplate.querySelector('.error__button');
const imagePreview = document.querySelector('.img-upload__preview img');
const fileChooser = document.querySelector('.img-upload__input');
const uploadCancel = document.querySelector('.img-upload__cancel');

const uploadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};

const openImageUpload = () => {
  editPhoto.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
};

const initForm = () => {
  imageUpload.addEventListener('change', () => {
    openImageUpload();
    getScaleImageTransform();
    uploadImage();
  });
};


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

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    if (['TEXTAREA', 'INPUT'].includes(evt.target.tagName)) {
      return;
    }
    evt.preventDefault();
    closeImageUpload();
  }
});

const createStatusMessage = (template) => {
  const statusMessage = template.cloneNode(true);
  const fragment = document.createDocumentFragment();
  fragment.appendChild(statusMessage);
  bodyTag.appendChild(fragment);
};

const createSuccessMessage = () => {
  createStatusMessage(successTemplate);
};

const closeSuccessMessage = () => {
  successMessageButton.removeEventListener('click', onSuccessMessageCloseClick);
  document.removeEventListener('keydown', onSuccessMessageEscPress);
  bodyTag.removeChild(successOverlay);
};

const closeSuccessForm = () => {
  createSuccessMessage();
  document.addEventListener('keydown', onSuccessMessageEscPress);
  successMessageButton.addEventListener('click', onSuccessMessageCloseClick);
  const successField = document.querySelector('.success__inner');
  successOverlay.addEventListener('click', (evt) => {
    if (evt.target !== successField) {
      closeSuccessMessage();
    }
  });
};

const createErrorMessage = () => {
  closeImageUpload();
  createStatusMessage(errorTemplate);
};

const closeErrorMessage = () => {
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  document.removeEventListener('keydown', onErrorMessageEscPress);
  bodyTag.removeChild(errorOverlay);
};

const closeErrorForm = () => {
  createErrorMessage();
  document.addEventListener('keydown', onErrorMessageEscPress);
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  const errorField = document.querySelector('.error__inner');
  errorOverlay.addEventListener('click', (evt) => {
    if (evt.target !== errorField) {
      closeErrorMessage();
    }
  });
};

function onSuccessMessageCloseClick() {
  closeSuccessMessage();
}

function onSuccessMessageEscPress(evt) {
  isEscapeKey(evt, closeSuccessMessage);
}

function onErrorMessageCloseClick() {
  closeErrorMessage();
}

function onErrorMessageEscPress(evt) {
  isEscapeKey(evt, closeErrorMessage);
}
uploadCancel.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeImageUpload();
  }
});

uploadCancel.addEventListener('click', closeImageUpload());

export { initForm, closeErrorForm, closeSuccessForm };
