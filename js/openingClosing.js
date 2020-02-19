'use strict';

// openingClosing.js
(function () {
  var DEFAULT_ZOOM_VALUE = 100;
  var formEditImage = document.querySelector('.img-upload__overlay');
  var fieldUploadImage = document.querySelector('#upload-file');
  var buttonCloseForm = document.querySelector('#upload-cancel');
  var body = document.querySelector('body');
  var uploadImage = document.querySelector('div.img-upload__preview img');
  var effectDirectory = document.querySelector('.img-upload__effect-level');
  var inputHashtag = document.querySelector('input[name=hashtags]');
  var textDescription = document.querySelector('.text__description');

  var onPopupCloseByEscPress = function (evt) {
    if (evt.key === window.constants.ESC_KEY && inputHashtag !== document.activeElement && textDescription !== document.activeElement) {
      closePopup();
    }
  };

  fieldUploadImage.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      openPopup();
    }
  });

  buttonCloseForm.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      closePopup();
    }
  });

  var openPopup = function () {
    formEditImage.classList.remove('hidden');
    document.addEventListener('keydown', onPopupCloseByEscPress);
    uploadImage.style.filter = window.constants.DEFAULT_FILTER;
    effectDirectory.classList.add('hidden');
    window.scale(DEFAULT_ZOOM_VALUE);
  };

  var closePopup = function () {
    formEditImage.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupCloseByEscPress);
    inputHashtag.value = '';
    textDescription.value = '';
  };

  fieldUploadImage.addEventListener('change', function () {
    body.classList.add('modal-open');
    openPopup();
  });

  buttonCloseForm.addEventListener('click', function () {
    body.classList.remove('modal-open');
    closePopup();
  });

  fieldUploadImage.value = '';
})();
