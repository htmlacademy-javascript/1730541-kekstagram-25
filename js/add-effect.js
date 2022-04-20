const EFFECTS_LIST = {
  'effect-none': {
    filter: 'none',
    unit: '',
    class: '',
    noUiSlider: {
      range: {
        min: 0,
        max: 0
      },
      start: 0,
      step: 0,
    }
  },
  'effect-chrome': {
    filter: 'grayscale',
    unit: '',
    class: 'chrome',
    noUiSlider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }
  },
  'effect-sepia': {
    filter: 'sepia',
    unit: '',
    class: 'sepia',
    noUiSlider: {
      range: {
        min: 0,
        max: 1
      },
      start: 1,
      step: 0.1,
    }
  },
  'effect-marvin': {
    filter: 'invert',
    unit: '%',
    class: 'marvin',
    noUiSlider: {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
    }
  },
  'effect-phobos': {
    filter: 'blur',
    unit: 'px',
    class: 'phobos',
    noUiSlider: {
      range: {
        min: 0,
        max: 3
      },
      start: 3,
      step: 0.1,
    }
  },
  'effect-heat': {
    filter: 'brightness',
    unit: '',
    class: 'heat',
    noUiSlider: {
      range: {
        min: 1,
        max: 3
      },
      start: 3,
      step: 0.1,
    }
  }
};

const imageUploadEffects = document.querySelector('.img-upload__effects');
const effectsList = imageUploadEffects.querySelector('.effects__list');
const effectLevelValue = imageUploadEffects.querySelector('.effect-level__value');
const effectSlider = imageUploadEffects.querySelector('.effect-level__slider');
const effectLevel = imageUploadEffects.querySelector('.effect-level');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => (
      parseFloat(value)
    ),
  }
});

const onEffectSliderUpdate = (evt) => {
  imageUploadPreview.classList = '';
  if (evt.target.id === 'effect-none') {
    effectLevel.classList.add('hidden');
    imageUploadPreview.style.filter = 'none';
  } else {
    effectLevel.classList.remove('hidden');
    effectSlider.noUiSlider.updateOptions(EFFECTS_LIST[evt.target.id].noUiSlider);
    imageUploadPreview.classList.add(`effects__preview--${EFFECTS_LIST[evt.target.id].class}`);
  }
};

effectSlider.noUiSlider.on('update', () => {
  const selectedEffect = effectsList.querySelector('input: checked').id;
  effectLevelValue.value = effectSlider.noUiSlider.get();
  imageUploadPreview.style.filter = `${EFFECTS_LIST[selectedEffect].filter}(${effectSlider.noUiSlider.get()}${EFFECTS_LIST[selectedEffect].unit})`;
});

effectsList.addEventListener('change', onEffectSliderUpdate);

export { onEffectSliderUpdate };
