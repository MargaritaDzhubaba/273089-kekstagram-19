'use strict';

// preview.js

(function () {
  // просмотр фотографий в полноразмерном режиме
  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var inputComment = document.querySelector('.social__footer-text');

  var showBigPicture = function (item) {
    var bigPictureImg = bigPicture.querySelector('img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');
    var socialComments = bigPicture.querySelector('.social__comments');
    var socialCaption = document.querySelector('.social__caption');
    var socialCommentCount = document.querySelector('.social__comment-count');
    var commentsLoader = document.querySelector('.comments-loader');

    bigPictureImg.src = item.url;
    likesCount.textContent = item.likes;
    commentsCount.textContent = item.comments.length;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < item.comments.length; i++) {
      fragment.appendChild(window.pictures.renderComment(item.comments[i]));
    }

    socialComments.innerHTML = '';
    socialComments.appendChild(fragment);

    socialCaption.textContent = item.description;

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupCloseByEscPress);

    return item;
  };

  var openBigPicture = function (evt) {
    var target = evt.target;
    var isClickonPicture = evt.target.classList.contains('picture');
    var isClickInside = target.closest('.picture');
    var id;

    if (evt.key === window.constants.ENTER_KEY && isClickonPicture) {
      id = +evt.target.dataset.id;
    } else if (evt.key === window.constants.ENTER_KEY && isClickInside) {
      id = +isClickInside.dataset.id;
    }
    if (id) {
      var picture =
      window.pictures.photos.find(function (photo) { // window.render.photosData
        return photo.id === id;
      });
      showBigPicture(picture);
    }
  };

  var closePopup = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupCloseByEscPress);
    inputComment.value = '';
  };

  var onPopupCloseByEscPress = function (evt) {
    if (evt.key === window.constants.ESC_KEY && inputComment !== document.activeElement) {
      closePopup();
    }
  };

  var containerOfPictures = document.querySelector('.pictures');

  containerOfPictures.addEventListener('click', function (evt) {
    var target = evt.target;
    var isClickonPicture = evt.target.classList.contains('picture');
    var isClickInside = target.closest('.picture');
    var id;

    if (isClickonPicture) {
      id = +evt.target.dataset.id;
    } else if (isClickInside) {
      id = +isClickInside.dataset.id;
    }
    if (id) {
      var picture =
      window.pictures.photosData.find(function (photo) {
        return photo.id === id;
      });
      showBigPicture(picture);
    }
  });

  containerOfPictures.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      openBigPicture();
    }
  });

  bigPictureCancel.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      closePopup();
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    closePopup();
  });

  window.prewiew = showBigPicture;
})();
