'use strict';

// upload.js
// Это я использовала в блоке openingClosing, но npm ругается, поэтому я его закомментировала, пока не разберусь до конца с этим заданием.
(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
