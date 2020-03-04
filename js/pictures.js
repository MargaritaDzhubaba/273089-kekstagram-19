'use strict';

// pictures.js
(function () {

  // var containerOfPictures = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPicture = function (picture) {
    var pictureElement = similarPictureTemplate.cloneNode(true);

    var pictureImg = pictureElement.querySelector('.picture__img');
    var pictureComments = pictureElement.querySelector('.picture__comments');
    var pictureLikes = pictureElement.querySelector('.picture__likes');

    pictureImg.src = picture.url;
    pictureLikes.textContent = picture.likes;
    pictureComments.textContent = picture.comments.length;
    pictureImg.dataset.id = picture.id;

    return pictureElement;
  };

  var createFragment = function (photos) {
    var containerOfPictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    return containerOfPictures.appendChild(fragment);
  };

  var newComments = document.querySelector('.social__comments');
  var newComment = newComments.querySelector('.social__comment');

  var renderComment = function (comment) {
    var commentElement = newComment.cloneNode(true);

    var socialCommentImg = newComments.querySelector('.social__picture');
    var socialText = newComments.querySelector('.social__text');

    socialCommentImg.src = comment.avatar;
    socialCommentImg.alt = comment.name;
    socialText.textContent = comment.message;

    return commentElement;
  };

  var onSuccess = function (data) {
    createFragment(data);

    var gallery = document.querySelectorAll('a.picture');

    for (var i = 0; i < gallery.length; i++) {
      (function (element) {
        gallery[i].addEventListener('click', function () {
          window.prewiew(element);
        });
      })(data[i]);
    }
  };

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

  window.upload('', onSuccess, onError, 'GET', 'https://js.dump.academy/kekstagram/data');

  window.pictures = {
    renderPicture: renderPicture,
    renderComment: renderComment
  };
})();
