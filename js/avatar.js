import { FILE_TYPES } from './data.js';

// Глобальные переменные
const uploadInput = document.querySelector('.img-upload__input');
const uploadImgPreview = document.querySelector('.img-upload__preview img');
const uploadEffectsPreview = document.querySelectorAll('.effects__preview');

/** Показ загруженной пользователем фотографии */
const showUploadPhoto = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((extention) => fileName.endsWith(extention));

  if (matches) {
    uploadImgPreview.src = URL.createObjectURL(file);
    uploadEffectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${uploadImgPreview.src})`;
    });
  }
};

export { showUploadPhoto };
