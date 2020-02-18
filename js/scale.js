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
    if (direction === 'zoomOut' && zoomValue < MIN) {
      uploadImage.style.transform = 'scale(' + MIN / 100 + ')';
      controlValue.value = '25%';
      return;
    }
    if (direction === 'zoomIn' && zoomValue >= MAX) {
      uploadImage.style.transform = 'scale(' + 1 + ')';
      controlValue.value = MAX + '%';
      return;
    }
    uploadImage.style.transform = 'scale(' + zoomValue / 100 + ')';
    controlValue.value = zoomValue + '%';
  };

  zoomImage(100);

  controlSmaller.addEventListener('click', function () {
    zoomImage((parseInt(controlValue.value, 10) - STEP), 'zoomOut');
  });
  controlBigger.addEventListener('click', function () {
    zoomImage((parseInt(controlValue.value, 10) + STEP), 'zoomIn');
  });

  window.scale = {
    zoomImage: zoomImage
  };

})();
