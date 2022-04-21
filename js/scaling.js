const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_VALUE = 100;

const minScaleButton = document.querySelector('.scale__control--smaller');
const maxScaleButton = document.querySelector('.scale__control--bigger');
const imageScaleValue = document.querySelector('.scale__control--value');
const editImageOverlay = document.querySelector('.img-upload__overlay');
const imagePreview = editImageOverlay.querySelector('.img-upload__preview');
const image = imagePreview.querySelector('img');

imageScaleValue.value = `${DEFAULT_SCALE_VALUE}%`;

const getTransformValue = () => parseInt(imageScaleValue.value, 10);

const getScaleImageTransform = () => {
  image.style.transform = `scale(${(parseInt(imageScaleValue.value, 10) / 100)})`;
};

const getLowerValueScale = () => {
  let resultValue = getTransformValue() - SCALE_STEP;
  if (resultValue < MIN_SCALE_VALUE) {
    resultValue = MIN_SCALE_VALUE;
  } else {
    imageScaleValue.value = `${resultValue}%`;
  }
};

const getHigherValueScale = () => {
  let resultValue = getTransformValue() + SCALE_STEP;
  if (resultValue > MAX_SCALE_VALUE) {
    resultValue = MAX_SCALE_VALUE;
  }
  imageScaleValue.value = `${resultValue}%`;
};

function onMinButtonClick() {
  getLowerValueScale();
  getScaleImageTransform();
}

function onMaxButtonClick() {
  getHigherValueScale();
  getScaleImageTransform();
}

minScaleButton.addEventListener('click', onMinButtonClick);
maxScaleButton.addEventListener('click', onMaxButtonClick);

export { getScaleImageTransform };
