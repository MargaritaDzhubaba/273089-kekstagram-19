'use strict';

// filtration.js
(function () {
  var RANDOM_PHOTOS_NUMBER = 10;

  var imgFilters = document.querySelector('.img-filters');
  var filterButtons = imgFilters.querySelectorAll('.img-filters__button');

  filterButtons.forEach(function (item) {
    item.addEventListener('click', function () {
      var activeButton = imgFilters.querySelector('.img-filters__button--active');
      activeButton.classList.remove('img-filters__button--active');
      item.classList.add('img-filters__button--active');
    });
  });

  var renderPhotos = function (photos) {
    var containerOfPictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.elementsCreation.renderPicture(photos[i]));
    }
    var galleryPhotos = document.querySelectorAll('.picture');
    galleryPhotos.forEach(function (item) {
      containerOfPictures.removeChild(item);
    });
    containerOfPictures.appendChild(fragment);
  };

  var onSuccess = function (data) {
    data.forEach(function (photo, index) {
      photo.id = index + 1;
    });
    window.elementsCreation.photosData = data;
    renderPhotos(data);
  };

  var filterDefault = function () {
    renderPhotos(window.elementsCreation.photosData);
  };

  var filterRandom = function () {
    var photosRandom = window.elementsCreation.photosData.slice(0, RANDOM_PHOTOS_NUMBER).sort(function () {
      return window.util.getRundomNumber(window.elementsCreation.photosData.length);
    });
    renderPhotos(photosRandom);
  };

  var filterDiscussed = function () {
    var photosDiscussed = window.elementsCreation.photosData.slice().sort(function (first, second) {
      if (second.comments.length > first.comments.length) {
        return 1;
      } else if (second.comments.length < first.comments.length) {
        return -1;
      } else {
        return 0;
      }
    });
    renderPhotos(photosDiscussed);
  };

  var filterPhotos = window.util.debounce(function (evt) {
    var target = evt.target;

    if (target.id === 'filter-default') {
      filterPhotos = filterDefault();
    } else if (target.id === 'filter-random') {
      filterPhotos = filterRandom();
    } else if (target.id === 'filter-discussed') {
      filterPhotos = filterDiscussed();
    }
  });

  filterButtons.forEach(function (item) {
    item.addEventListener('click', filterPhotos);
  });

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 10px; text-align: center; background-color: tomato;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '25px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    node.addEventListener('click', function () {
      node.remove();
    });
  };

  window.load('', onSuccess, onError, 'GET', 'https://js.dump.academy/kekstagram/data');

})();
