'use strict';

// fileUpload.js

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imgUpload = document.querySelector('.img-upload__preview');
  var previewImg = document.querySelectorAll('.effects__preview');
  var imgEffect = imgUpload.querySelector('img');
  var modalOpen = document.querySelector('#upload-file');

  var createPreview = function (img) {
    previewImg.forEach(function (item) {
      item.style.backgroundImage = 'url(' + img + ')';
    });
  };

  modalOpen.addEventListener('change', function () {
    var file = modalOpen.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgEffect.src = reader.result;
        createPreview(reader.result);
      });

      reader.readAsDataURL(file);
      window.interactWithForm();
    } else {
      var node = document.createElement('div');

      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: tomato;';
      node.style.position = 'absolute';
      node.style.left = '0';
      node.style.right = '0';
      node.style.fontSize = '25px';

      node.textContent = 'Неверный формат документа! Используйте формат gif, jpg, png или jpeg';
      document.body.insertAdjacentElement('afterbegin', node);

      document.addEventListener('click', function () {
        node.remove();
      });
    }
  });
})();
