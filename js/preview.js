'use strict';

// preview.js

(function () {
  // просмотр фотографий в полноразмерном режиме
  var STEP = 5;

  var body = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var inputComment = document.querySelector('.social__footer-text');
  var socialComments = bigPicture.querySelector('.social__comments');

  var commentsLoader = document.querySelector('.comments-loader');
  var socialCommentCount = document.querySelector('.social__comment-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  // var imgFilters = document.querySelector('.img-filters');
  var count = 0;

  var createComment = function (comments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(window.elementsCreation.renderComment(comments[i]));
    }
    socialComments.appendChild(fragment);
  };

  var generateCommentWithStep = function (comments) {
    var commentsList = comments.slice(count, STEP + count);
    count += STEP;
    createComment(commentsList);
    if (comments.length <= count) {
      commentsLoader.classList.add('hidden');
    } else if (comments.length > count) {
      commentsLoader.classList.remove('hidden');
    }

    var numberOfComment = (comments.length <= count) ? comments.length : count;
    socialCommentCount.firstChild.textContent = numberOfComment + ' из ';
    commentsCount.textContent = comments.length;
  };

  var showBigPicture = function (item) {
    var bigPictureImg = bigPicture.querySelector('img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var socialCaption = document.querySelector('.social__caption');

    bigPictureImg.src = item.url;
    likesCount.textContent = item.likes;
    commentsCount.textContent = item.comments.length;
    socialCaption.textContent = item.description;

    socialComments.innerHTML = '';

    count = 0;
    generateCommentWithStep(item.comments);

    var onCommentsLoaderClick = window.util.debounce(function () {
      generateCommentWithStep(item.comments);
    });

    commentsLoader.addEventListener('click', onCommentsLoaderClick);

    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupCloseByEscPress);

    // imgFilters.classList.remove('img-filters--inactive'); // вот сюда добавила

    return item;
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
      window.elementsCreation.photosData.find(function (photo) {
        return photo.id === id;
      });
      showBigPicture(picture);
    }
  });

  containerOfPictures.addEventListener('keydown', function (evt) {
    var id;
    if (evt.key === window.constants.ENTER_KEY && evt.target.classList.contains('picture')) {
      id = +evt.target.dataset.id;
    }
    if (id) {
      var picture =
      window.elementsCreation.photosData.find(function (photo) {
        return photo.id === id;
      });
      showBigPicture(picture);
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
