import {openBigPicture} from './open-big-picture.js';
import { picturesUser } from './rendering-thumbnail.js';

const container = document.querySelector('.pictures');

const renderPictureModal = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnailPicture = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnailPicture) {
      return;
    }
    const thumbnail = pictures.find (
      (item) => item.id === +thumbnailPicture.dataset.thumbnailId
    );
    openBigPicture(thumbnail);
  });
  picturesUser(pictures);
};

export { renderPictureModal };
