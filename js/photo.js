'use strict';

(function () {
  var FILES_TYPE = ['gif', 'jpg', 'jpeg', 'png'];
  var imgSizeMap = {
    avatar: {
      width: 40,
      height: 44
    },
    photo: {
      width: 70,
      height: 70
    }
  };
  var defaultAvatar = {
    img: 'img/muffin-grey.svg',
    alt: 'Аватар пользователя'
  };
  var alternativeStringMap = {
    avatar: 'Аватар Пользователя',
    photo: 'Фотография жилья'
  };
  var form = document.querySelector('.ad-form');
  var previewPhoto = form.querySelector('.ad-form__photo');
  var previewAvatar = form.querySelector('.ad-form-header__preview');
  var fileAvatar = form.querySelector('.ad-form-header__upload input[type=file]');
  var filePhoto = form.querySelector('.ad-form__upload input[type=file]');
  var dropZoneAvatar = form.querySelector('.ad-form-header__drop-zone');
  var dropZonePhoto = form.querySelector('.ad-form__drop-zone');
  var dropZones = [dropZoneAvatar, dropZonePhoto];

  var getImg = function (photo, preview, width, height, alt) {
    var img = document.createElement('img');

    img.src = photo;
    img.width = width;
    img.height = height;
    img.alt = alt;
    preview.textContent = '';
    preview.appendChild(img);
  };

  var getPhoto = function (picture, preview, width, height, alt) {
    var file = picture;
    var fileName = file.name.toLowerCase();

    var matches = FILES_TYPE.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        getImg(reader.result, preview, width, height, alt);
      });
      reader.readAsDataURL(file);
    }
  };

  var getReset = function () {
    getImg(defaultAvatar.img, previewAvatar, imgSizeMap.avatar.width, imgSizeMap.avatar.height, defaultAvatar.alt);
    previewPhoto.textContent = '';
  };

  var getDropZone = function (input) {
    input.addEventListener('dragenter', function (enterEvt) {
      enterEvt.preventDefault();
      enterEvt.stopPropagation();
      input.style.borderColor = '#ff5635';
    });
    input.addEventListener('dragleave', function (leaveEvt) {
      leaveEvt.preventDefault();
      leaveEvt.stopPropagation();
      input.style.borderColor = '';
    });
    input.addEventListener('dragover', function (overEvt) {
      overEvt.preventDefault();
      overEvt.stopPropagation();
      input.style.borderColor = '#ff5635';
    });
    input.addEventListener('drop', function (dropEvt) {
      dropEvt.preventDefault();
      dropEvt.stopPropagation();
      input.style.borderColor = '';
    });
  };

  var avatarChangeHandler = function () {
    var pictureFile = fileAvatar.files[0];

    getPhoto(pictureFile, previewAvatar, imgSizeMap.avatar.width, imgSizeMap.avatar.height, alternativeStringMap.avatar);
  };

  var photoChangeHandler = function () {
    var pictureFile = filePhoto.files[0];

    getPhoto(pictureFile, previewPhoto, imgSizeMap.photo.width, imgSizeMap.photo.height, alternativeStringMap.photo);
  };

  var dropAvatarHandler = function (evt) {
    var dataTransfer = evt.dataTransfer;
    var pictureFile = dataTransfer.files[0];

    getPhoto(pictureFile, previewAvatar, imgSizeMap.avatar.width, imgSizeMap.avatar.height, alternativeStringMap.avatar);
  };

  var dropPhotoHandler = function (evt) {
    var dataTransfer = evt.dataTransfer;
    var pictureFile = dataTransfer.files[0];

    getPhoto(pictureFile, previewPhoto, imgSizeMap.photo.width, imgSizeMap.photo.height, alternativeStringMap.photo);
  };

  dropZones.forEach(function (item) {
    getDropZone(item);
  });

  dropZoneAvatar.addEventListener('drop', dropAvatarHandler);
  dropZonePhoto.addEventListener('drop', dropPhotoHandler);
  fileAvatar.addEventListener('change', avatarChangeHandler);
  filePhoto.addEventListener('change', photoChangeHandler);

  window.photo = {
    reset: getReset
  };
})();
