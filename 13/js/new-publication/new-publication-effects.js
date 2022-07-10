const FiltersSettings = {
  chrome: {
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      format: {
        to(value) {
          if (Number.isInteger(value)) {
            return value.toFixed();
          }
          return value.toFixed(1);
        },
        from(value) { return parseFloat(value); }
      },
      start: 1,
      step: 0.1,
    },
    effect: 'grayscale',
    unit: '',
  },
  sepia: {
    slider: {
      range: {
        min: 0,
        max: 1,
      },
      format: {
        to(value) {
          if (Number.isInteger(value)) {
            return value.toFixed();
          }
          return value.toFixed(1);
        },
        from(value) { return parseFloat(value); }
      },
      start: 1,
      step: 0.1,
    },
    effect: 'sepia',
    unit: '',
  },
  marvin: {
    slider: {
      range: {
        min: 0,
        max: 100,
      },
      format: {
        to(value) { return value.toFixed(); },
        from(value) { return parseFloat(value); }
      },
      start: 100,
      step: 1,
    },
    effect: 'invert',
    unit: '%',
  },
  phobos: {
    slider: {
      range: {
        min: 0,
        max: 3,
      },
      format: {
        to(value) {
          if (Number.isInteger(value)) {
            return value.toFixed();
          }
          return value.toFixed(1);
        },
        from(value) { return parseFloat(value); }
      },
      start: 3,
      step: 0.1,
    },
    effect: 'blur',
    unit: 'px',
  },
  heat: {
    slider: {
      range: {
        min: 1,
        max: 3,
      },
      format: {
        to(value) {
          if (Number.isInteger(value)) {
            return value.toFixed();
          }
          return value.toFixed(1);
        },
        from(value) { return parseFloat(value); }
      },
      start: 3,
      step: 0.1,
    },
    effect: 'brightness',
    unit: '',
  },
};

const ScaleSettings = {
  IMAGE_SCALE_STEP: 25,
  PREVIEW_MIN_SCALE: 25,
  PREVIEW_MAX_SCALE: 100,
};
const {IMAGE_SCALE_STEP, PREVIEW_MIN_SCALE, PREVIEW_MAX_SCALE} = ScaleSettings;
Object.freeze(ScaleSettings);

let currentEffect = 'none';

// Элементы DOM

const imgPreviewElement = document.querySelector('.img-upload__preview img');

const scaleElement = document.querySelector('.scale');
const scaleInputElement = scaleElement.querySelector('.scale__control--value');

const effectLevelValueElement = document.querySelector('.effect-level__value');
const effectsSliderElement = document.querySelector('.effect-level__slider');

// Размер

/**
 *
 * @param {integer} step - значение в процентах, на которое будет изменен текущий масштаб
 */
const changeScale = (step) => {
  let scale = parseInt(scaleInputElement.value.slice(0, -1), 10);

  scale += step;
  scale = scale > PREVIEW_MAX_SCALE ? PREVIEW_MAX_SCALE : scale;
  scale = scale < PREVIEW_MIN_SCALE ? PREVIEW_MIN_SCALE : scale;

  imgPreviewElement.style.transform = `scale(${scale}%)`;
  scaleInputElement.value = `${scale}%`;
};

//

const resetPreviewPhoto = () => {
  currentEffect = 'none';
  imgPreviewElement.classList = '';
  imgPreviewElement.style = '';
};

// Слайдер эффектов

const changeSlider = () => {
  if (currentEffect !== 'none') {
    effectsSliderElement.noUiSlider.updateOptions(FiltersSettings[currentEffect].slider);
  }
};

const hideSlider = () => effectsSliderElement.classList.add('hidden');

const showSlider = () => effectsSliderElement.classList.remove('hidden');

const createSlider = () => {
  noUiSlider.create(effectsSliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    format: {
      to(value) { return value.toFixed(1); },
      from(value) { return parseFloat(value); }
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  sliderUpdateHandler();
  hideSlider();
};
createSlider();

// Обработчики

function changeScaleClickHandler (evt) {
  if (evt.target.classList.contains('scale__control--smaller')) {
    changeScale(-IMAGE_SCALE_STEP);
  } else if (evt.target.classList.contains('scale__control--bigger')) {
    changeScale(IMAGE_SCALE_STEP);
  }
}

function effectsListClickHandler (evt) {
  if (evt.target.matches('input')) {
    imgPreviewElement.classList.remove(`effects__preview--${currentEffect}`);
    currentEffect = evt.target.value;
    imgPreviewElement.classList.add(`effects__preview--${currentEffect}`);

    changeSlider();
    if (currentEffect !== 'none') {
      showSlider();
    } else {
      hideSlider();
      imgPreviewElement.style.filter = '';
    }
  }
}

function sliderUpdateHandler () {
  effectsSliderElement.noUiSlider.on('update', () => {
    effectLevelValueElement.value = effectsSliderElement.noUiSlider.get();
    effectLevelValueElement.name = `effect-${currentEffect}`;
    if (currentEffect !== 'none') {
      imgPreviewElement.style.filter = `${FiltersSettings[currentEffect].effect}(${effectLevelValueElement.value}${FiltersSettings[currentEffect].unit})`;
    }
  });
}

export {
  changeScaleClickHandler,
  effectsListClickHandler,
  resetPreviewPhoto,
  hideSlider,
};
