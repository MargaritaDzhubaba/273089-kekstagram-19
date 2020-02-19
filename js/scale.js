'use strict';

// scale.js

(function () {
  // Изменение масштаба
  var STEP = 25;
  var MIN = 25;
  var MAX = 100;

  var controlSmaller = document.querySelector('.scale__control--smaller');
  var controlBigger = document.querySelector('.scale__control--bigger');
  var controlValue = document.querySelector('.scale__control--value');
  var uploadImage = document.querySelector('div.img-upload__preview img');

  var zoomImage = function (zoomValue, direction) {
    var innerValue = zoomValue;
    if (direction === 'zoomOut' && zoomValue < MIN) {
      innerValue = MIN;
    }
    if (direction === 'zoomIn' && zoomValue >= MAX) {
      innerValue = MAX;
    }
    uploadImage.style.transform = 'scale(' + innerValue / 100 + ')';
    controlValue.value = innerValue + '%';
  };

  zoomImage(MAX);

  controlSmaller.addEventListener('click', function () {
    zoomImage((parseInt(controlValue.value, 10) - STEP), 'zoomOut');
  });
  controlBigger.addEventListener('click', function () {
    zoomImage((parseInt(controlValue.value, 10) + STEP), 'zoomIn');
  });

  window.scale = zoomImage;
})();
