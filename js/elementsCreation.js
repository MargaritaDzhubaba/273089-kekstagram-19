'use strict';

// elementsCreation.js

(function () {

  var imgFilters = document.querySelector('.img-filters');
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
    pictureElement.dataset.id = picture.id;

    imgFilters.classList.remove('img-filters--inactive');
    return pictureElement;
  };

  var newComments = document.querySelector('.social__comments');
  var newComment = newComments.querySelector('.social__comment');

  var renderComment = function (comment) {
    var commentElement = newComment.cloneNode(true);

    var socialCommentImg = commentElement.querySelector('.social__picture');
    var socialText = commentElement.querySelector('.social__text');

    socialCommentImg.src = comment.avatar;
    socialCommentImg.alt = comment.name;
    socialText.textContent = comment.message;
    return commentElement;
  };

  window.elementsCreation = {
    renderPicture: renderPicture,
    renderComment: renderComment
  };
})();
