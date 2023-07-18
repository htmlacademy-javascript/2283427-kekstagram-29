import { openBigPicture } from './open-big-picture.js';
import { createThumbnails } from './rendering-thumbnail.js';

// Глобальные переменные
const container = document.querySelector('.pictures');

const renderPictureModal = (evt, pictures) => {
  const miniature = evt.target.closest('[data-picture-item-id]');

  if (miniature) {
    const picture = pictures.find(
      (item) => item.id === Number(miniature.dataset.pictureItemId)
    );
    openBigPicture(picture);
  }
};

/** Создание галереи */
const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    renderPictureModal(evt, pictures);
  });
  createThumbnails(pictures);
};

export { renderGallery };
