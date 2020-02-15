'use strict';

// effects.js
(function () {
  // Ловим событие на mouseup
  var uploadImage = document.querySelector('div.img-upload__preview img');
  var effectDirectory = document.querySelector('.img-upload__effect-level');
  var effectLevel = effectDirectory.getElementsByTagName('input[name=effect-level]');
  var effectLine = effectDirectory.querySelector('.effect-level__line');
  var effectDepth = effectDirectory.querySelector('.effect-level__depth');
  var effectPin = effectDirectory.querySelector('.effect-level__pin');
  var effectRadios = document.querySelectorAll('.effects__radio');
  // var effectsList = document.querySelector('.effects__list');
  // var selectedEffect = effectsList.querySelector('.effects__radio:checked').value;

  effectPin.addEventListener('mouseup', function () {
    var x = effectPin.offsetLeft; // Вычисляем положение ползунка относительно начала шкалы
    var computedStyle = getComputedStyle(effectLine); // Получаем стили шкалы
    var scaleWidth = parseInt(computedStyle.width, 10); // Узнаем длину шкалы

    var positionPinPercent = (Math.floor((x * 100) / scaleWidth)); // Определяем положение ползунка в % b меняем value
    effectLevel.value = positionPinPercent;

    effectDepth.style.width = positionPinPercent + '%'; // Заполняем шкалу на нужное количество %
  });

  // Расчитываем насыщенность применяемого фильтра
  var getValue = function (maxValue, minValue, neededValue) {
    return (((maxValue - minValue) * neededValue) / 100) + minValue;
  };

  var setImageFilter = function (effect, value) {
    var currentFilter = filters[effect];
    var calculateValueDepth = getValue(currentFilter.max, currentFilter.min, value);
    var resultFilterValue = currentFilter.type + '(' + calculateValueDepth + currentFilter.unit + ')';

    uploadImage.style.filter = resultFilterValue;
  };

  var changeEffect = function (effectValue) {
    effectPin.style.left = '100%'; // добавить ползунку стиль left 100%
    effectDepth.style.width = '100%'; // добавить шкале 100% effect-levev__depth
    effectLevel.value = '100'; // в скрытый инпут положить значение 100

    window.scale.zoomImage(100);

    uploadImage.className = '';
    uploadImage.classList.add('effects__preview--' + effectValue);

    if (effectValue === 'none') {
      effectDirectory.classList.add('hidden');
      uploadImage.style.filter = '';
    } else {
      effectDirectory.classList.remove('hidden');
    }
    setImageFilter(effectValue, effectLevel.value);
  };

  for (var i = 0; i < effectRadios.length; i++) {
    var radio = effectRadios[i];

    radio.addEventListener('change', function (evt) {
      changeEffect(evt.target.value);
    });
  }

  // Фильтры
  var filters = {
    none: {
      type: '',
      min: '',
      max: '',
      unit: ''
    },
    chrome: {
      type: 'grayscale',
      min: 0,
      max: 1,
      unit: ''
    },
    sepia: {
      type: 'sepia',
      min: 0,
      max: 1,
      unit: ''
    },
    marvin: {
      type: 'invert',
      min: 0,
      max: 100,
      unit: '%'
    },
    phobos: {
      type: 'blur',
      min: 0,
      max: 3,
      unit: 'px'
    },
    heat: {
      type: 'brightness',
      min: 1,
      max: 3,
      unit: ''
    }
  };
})();
