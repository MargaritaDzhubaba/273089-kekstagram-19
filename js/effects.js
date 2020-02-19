'use strict';

// effects.js
(function () {
  var DEFAULT_EFFECT_VALUE = 100;
  var DEFAULT_ZOOM_VALUE = 100;
  var EMPTY_FILTER = 'none';
  var uploadImage = document.querySelector('div.img-upload__preview img');
  var effectDirectory = document.querySelector('.img-upload__effect-level');
  var effectLevel = effectDirectory.getElementsByTagName('input[name=effect-level]');
  var effectLine = effectDirectory.querySelector('.effect-level__line');
  var effectDepth = effectDirectory.querySelector('.effect-level__depth');
  var effectPin = effectDirectory.querySelector('.effect-level__pin');
  var effectRadios = document.querySelectorAll('.effects__radio');

  var filters = {
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

  var calculatePinPosition = function (positionX, scaleWidth) {
    return Math.round(positionX * 100 / scaleWidth);
  };

  var getNewPosition = function (shiftValue) { // Считаемположение ползунка в заданных границах
    var position = effectPin.offsetLeft - shiftValue;

    var limits = {
      min: effectLine.offsetLeft - effectPin.offsetWidth, // край шкалы - ширина ползунка
      max: effectLine.offsetLeft + effectLine.offsetWidth - effectPin.offsetWidth// край шкалы + ширина шкалы + ширина ползунка
    };

    if (position < limits.min) {
      position = limits.min;
    } else if (position > limits.max) {
      position = limits.max;
    }
    return position + 'px';
  };

  effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX; // Ищем начальное положение ползунка

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var effectsList = document.querySelector('.effects__list');
      var selectedEffect = effectsList.querySelector('.effects__radio:checked').value;

      var shiftX = startCoords - moveEvt.clientX;// вычисляем дельту

      startCoords = moveEvt.clientX;// новое положение с учетом дельты

      effectPin.style.left = getNewPosition(shiftX);// передаем ползунку в стили новое значение

      var positionPinPercent = calculatePinPosition(effectPin.offsetLeft, effectLine.offsetWidth); // Определяем положение ползунка в % b меняем value
      effectDepth.style.width = positionPinPercent + '%';
      effectLevel.value = positionPinPercent;

      setImageFilter(selectedEffect, effectLevel.value);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });

  // Расчитываем насыщенность применяемого фильтра
  var getValue = function (maxValue, minValue, neededValue) {
    return (((maxValue - minValue) * neededValue) / 100) + minValue;
  };

  var setImageFilter = function (effect, value) {
    if (effect === EMPTY_FILTER) {
      return;
    }

    var currentFilter = filters[effect];
    var calculateValueDepth = getValue(currentFilter.max, currentFilter.min, value);
    var resultFilterValue = currentFilter.type + '(' + calculateValueDepth + currentFilter.unit + ')';

    uploadImage.style.filter = resultFilterValue;
  };

  var changeEffect = function (effectValue) {
    effectPin.style.left = DEFAULT_EFFECT_VALUE + '%';
    effectDepth.style.width = DEFAULT_EFFECT_VALUE + '%';
    effectLevel.value = DEFAULT_EFFECT_VALUE;

    window.scale(DEFAULT_ZOOM_VALUE);

    uploadImage.className = '';
    uploadImage.classList.add('effects__preview--' + effectValue);

    if (effectValue === EMPTY_FILTER) {
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
})();
