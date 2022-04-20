const SCALING_STEP = 25;
const SCALING_STEP_MAX = 100;
const SCALING_STEP_MIN = 25;

const imageUploadScale = document.querySelector('.img-upload__scale');
const scaleButtonBigger = imageUploadScale.querySelector('.scale__control--bigger');
const scaleButtonSmaller = imageUploadScale.querySelector('.scale__control--smaller');
const scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

let currentScaleValue = scaleControlValue.value;

const setScaling = () => {
  scaleControlValue.value = `${SCALING_STEP_MAX}%`;
  currentScaleValue = SCALING_STEP_MAX;
  scaleButtonBigger.addEventListener('click', () => {
    if (currentScaleValue < SCALING_STEP_MAX) {
      currentScaleValue += SCALING_STEP;
      scaleControlValue.value = `${currentScaleValue}%`;
      imageUploadPreview.style.transform = `scale(${currentScaleValue / 100})`;
    }
  });

  scaleButtonSmaller.addEventListener('click', () => {
    if (currentScaleValue > SCALING_STEP_MIN) {
      currentScaleValue -= SCALING_STEP;
      scaleControlValue.value = `${currentScaleValue}%`;
      imageUploadPreview.style.transform = `scale(${currentScaleValue / 100})`;
    }
  });
};

const resetScaling = () => {
  imageUploadPreview.style.transform = 'scale(1)';
  scaleControlValue.value = `${SCALING_STEP_MAX}%`;
  currentScaleValue = SCALING_STEP_MAX;
};

export { setScaling, resetScaling };
