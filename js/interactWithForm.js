'use strict';

// interactWithForm.js

(function () {
  var DEFAULT_ZOOM_VALUE = 100;
  var body = document.querySelector('body');
  var fieldUploadImage = body.querySelector('#upload-file');
  var formEditImage = body.querySelector('.img-upload__overlay');
  var buttonCloseForm = formEditImage.querySelector('#upload-cancel');
  var uploadImage = formEditImage.querySelector('div.img-upload__preview img');
  var effectDirectory = formEditImage.querySelector('.img-upload__effect-level');
  var inputHashtag = formEditImage.querySelector('.text__hashtags');
  var textDescription = formEditImage.querySelector('.text__description');

  var main = document.querySelector('main');
  var form = main.querySelector('.img-upload__form');
  var submitButton = main.querySelector('.img-upload__submit');

  var onPopupCloseByEscPress = function (evt) {
    if (evt.key === window.constants.ESC_KEY && inputHashtag !== document.activeElement && textDescription !== document.activeElement) {
      closePopup();
    }
  };

  var onAlertCloseByEscPress = function (evt) {
    if (evt.key === window.constants.ESC_KEY) {
      var container = evt.target.querySelector('.success', '.error');
      closeAlert(container);
    }
  };

  var onButtonCloseClick = function (evt) {
    var container = evt.target.closest('section');
    closeAlert(container);
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
    window.effectsApplying(DEFAULT_ZOOM_VALUE);
    inputHashtag.style = 'border: none';
  };

  var closePopup = function () {
    formEditImage.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupCloseByEscPress);
    form.reset();
    inputHashtag.setCustomValidity('');
  };

  var closeAlert = function (element) {
    element.remove();
    document.removeEventListener('keydown', onAlertCloseByEscPress);
    document.removeEventListener('click', onButtonCloseClick);
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

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var onSuccess = function () {
    formEditImage.classList.add('hidden');
    var success = successTemplate.cloneNode(true);
    form.reset();
    main.appendChild(success);
    submitButton.disabled = false;

    success.querySelector('.success__button').addEventListener('click', function () {
      success.remove();
    });
    document.addEventListener('keydown', onAlertCloseByEscPress);
    document.addEventListener('click', onButtonCloseClick);
  };

  var onError = function () {
    formEditImage.classList.add('hidden');
    var error = errorTemplate.cloneNode(true);
    form.reset();
    main.appendChild(error);
    submitButton.disabled = false;
    inputHashtag.value = '';
    textDescription.value = '';

    error.querySelector('.error__button').addEventListener('click', function () {
      error.remove();
    });
    document.addEventListener('keydown', onAlertCloseByEscPress);
    document.addEventListener('click', onButtonCloseClick);
  };

  form.addEventListener('submit', function (e) {
    submitButton.disabled = true;
    window.load(new FormData(form), onSuccess, onError, 'POST', 'https://js.dump.academy/kekstagram');
    e.preventDefault();
  });

  window.interactWithForm = openPopup;
})();
