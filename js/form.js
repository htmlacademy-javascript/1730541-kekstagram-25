import { isEscapeKey } from './util.js';
import { getScaleImageTransform } from './scaling.js';

const DEFAULT_SCALE_VALUE = 100;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'heic'];

const bodyTag = document.body;
const uploadFileInput = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__form');
const editImageOverlay = document.querySelector('.img-upload__overlay');
const imageUpload = document.querySelector('.img-upload__input');
const editImageCloseButton = editImageOverlay.querySelector('.img-upload__cancel');
const inputHashtags = document.querySelector('.text__hashtags');
const commentTextarea = document.querySelector('.text__description');
const imageScaleValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const fileChooser = document.querySelector('.img-upload__input');
const sliderBlock = document.querySelector('.effect-level');

const uploadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    image.src = URL.createObjectURL(file);
  }
};

const openImageUpload = () => {
  editImageOverlay.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
};

const initForm = () => {
  imageUpload.addEventListener('change', () => {
    uploadImage();
    openImageUpload();
    getScaleImageTransform();
  });
  document.addEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.addEventListener('click', onImageOverlayClose);
  imageScaleValue.value = `${DEFAULT_SCALE_VALUE}%`;
  getScaleImageTransform();
  image.style.filter = '';
  sliderBlock.classList.add('hidden');
};

function onUploadChange() {
  initForm();
}
uploadFileInput.addEventListener('change', onUploadChange);

const closeForm = () => {
  editImageOverlay.classList.add('hidden');
  bodyTag.classList.remove('modal-open');
  uploadForm.reset();
  document.removeEventListener('keydown', onImageOverlayEscPress);
  editImageCloseButton.removeEventListener('click', onImageOverlayClose);
};

function onImageOverlayClose() {
  closeForm();
}

function onImageOverlayEscPress(evt) {
  const active = document.activeElement;
  if (inputHashtags !== active && commentTextarea !== active) {
    isEscapeKey(evt, closeForm);
  }
}

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
  const successOverlay = document.querySelector('.success');
  const successMessageButton = successTemplate.querySelector('.success__button');
  successMessageButton.removeEventListener('click', onSuccessMessageCloseClick);
  document.removeEventListener('keydown', onSuccessMessageEscPress);
  bodyTag.removeChild(successOverlay);
};

function onSuccessMessageCloseClick() {
  closeSuccessMessage();
}

const closeSuccessForm = () => {
  createSuccessMessage();
  const successOverlay = document.querySelector('.success');
  const successMessageButton = successTemplate.querySelector('.success__button');
  document.addEventListener('keydown', onSuccessMessageEscPress);
  successMessageButton.addEventListener('click', onSuccessMessageCloseClick);
  const successField = document.querySelector('.success__inner');
  successOverlay.addEventListener('click', (evt) => {
    if (evt.target !== successField) {
      closeSuccessMessage();
    }
  });
};

function onSuccessMessageEscPress(evt) {
  isEscapeKey(evt, closeSuccessMessage);
}

const createErrorMessage = () => {
  closeForm();
  createStatusMessage(errorTemplate);
};

const closeErrorMessage = () => {
  const errorOverlay = document.querySelector('.error');
  const errorMessageButton = errorOverlay.querySelector('.error__button');
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  document.removeEventListener('keydown', onErrorMessageEscPress);
  bodyTag.removeChild(errorOverlay);
};

function onErrorMessageCloseClick() {
  closeErrorMessage();
}

function onErrorMessageEscPress(evt) {
  isEscapeKey(evt, closeErrorMessage);
}

const closeErrorForm = () => {
  createErrorMessage();
  const errorOverlay = document.querySelector('.error');
  const errorMessageButton = errorTemplate.querySelector('.error__button');
  document.addEventListener('keydown', onErrorMessageEscPress);
  errorMessageButton.addEventListener('click', onErrorMessageCloseClick);
  const errorField = document.querySelector('.error__inner');
  errorOverlay.addEventListener('click', (evt) => {
    if (evt.target !== errorField) {
      closeErrorMessage();
    }
  });
};

export { initForm, closeErrorForm, closeSuccessForm };
