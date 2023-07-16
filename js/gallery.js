import { openBigPicture } from './open-big-picture.js';
import { createThumbnails } from './rendering-thumbnail.js';

const container = document.querySelector('.pictures');

const renderPictureModal = (evt, pictures) => {
  const miniature = evt.target.closest('[data-miniature-id]');

  if (miniature) {
    const picture = pictures.find(
      (item) => item.id === Number(miniature.dataset.miniatureId)
    );
    return openBigPicture(picture);
  }
};

const renderGallery = (pictures) => {
  container.addEventListener('click', renderPictureModal);
  createThumbnails(pictures);
};


export { renderGallery };

