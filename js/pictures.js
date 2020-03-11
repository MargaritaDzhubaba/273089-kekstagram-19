'use strict';

// pictures.js
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

  //  {
  //  var containerOfPictures = document.querySelector('.pictures');
  //  var fragment = document.createDocumentFragment();

  //  for (var i = 0; i < photos.length; i++) {
  //    fragment.appendChild(renderPicture(photos[i]));
  //  }

  //  containerOfPictures.appendChild(fragment);
  // };

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

  // var onSuccess = function (data) {
  //   data.forEach(function (photo, index) {
  //     photo.id = index;
  //   });
  //   window.pictures.photosData = data;
  //   window.renderPhotos(data);
  // };

  // var onError = function (errorMessage) {
  //   var node = document.createElement('div');
  //   node.style = 'z-index: 100; margin: 0 auto; padding: 10px; text-align: center; background-color: tomato;';
  //   node.style.position = 'absolute';
  //   node.style.left = '0';
  //   node.style.right = '0';
  //   node.style.fontSize = '25px';

  //   node.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', node);

  //   node.addEventListener('click', function () {
  //     node.remove();
  //   });
  // };

  // window.load('', onSuccess, onError, 'GET', 'https://js.dump.academy/kekstagram/data');

  window.pictures = {
    renderPicture: renderPicture,
    renderComment: renderComment
  };
})();
