const effectsList = {
  chrome: {
    csseffect: 'grayscale',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    csseffect: 'sepia',
    min: 0,
    max: 1,
    start: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    csseffect: 'invert',
    min: 0,
    max: 100,
    start: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    csseffect: 'blur',
    min: 0,
    max: 3,
    start: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    csseffect: 'brightness',
    min: 1,
    max: 3,
    start: 3,
    step: 0.1,
    unit: ''
  }
};

const changeEffectsRadioButtonNodes = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview');
const fullSizeImage = imagePreview.querySelector('img');
const sliderEffectLevel = document.querySelector('.effect-level__slider');
const sliderField = document.querySelector('.img-upload__effect-level');
sliderField.classList.add('hidden');

noUiSlider.create(sliderEffectLevel, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

function changeSaturationEffectSlider(evt) {
  const effect = evt;
  const effectParams = effectsList[effect];
  const cssEffect = effectParams.csseffect;

  sliderEffectLevel.noUiSlider.updateOptions({
    range: {
      min: effectParams.min,
      max: effectParams.max
    },
    start: effectParams.start,
    step: effectParams.step
  });

  const unit = effectParams.unit;

  sliderEffectLevel.noUiSlider.on('update', () => {
    fullSizeImage.style.filter = `${cssEffect}(${sliderEffectLevel.noUiSlider.get()}${unit})`;
  });
}

function hideSliderScale() {
  sliderEffectLevel.classList.add('hidden');
  sliderField.classList.add('hidden');
  fullSizeImage.style.filter = '';
}

function onEffectSelect(evt) {
  sliderEffectLevel.classList.remove('hidden');
  sliderField.classList.remove('hidden');

  const selectEffect = evt.target.value;

  if (selectEffect === 'none') {
    hideSliderScale();
  }

  changeSaturationEffectSlider(selectEffect);
}

changeEffectsRadioButtonNodes.forEach((button) => {
  button.addEventListener('change', onEffectSelect);
});
