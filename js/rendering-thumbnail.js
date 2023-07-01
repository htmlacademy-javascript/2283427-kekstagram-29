import { someCreateDescription } from './descriptions-photo.js';

const pictureTemplate = document.querySelector('#picture').content;
const pictureItemTemplate = pictureTemplate.querySelector('.picture');
const picturesUser = someCreateDescription();
const picturesListFragment = document.createDocumentFragment();

const createItem = (item) => {
  const pictureItem = pictureItemTemplate.cloneNode(true);
  const pictureImg = pictureItem.querySelector('.picture__img');
  const pictureComments = pictureItem.querySelector('.picture__comments');
  const pictureLikes = pictureItem.querySelector('.picture__likes');

  pictureImg.src = item.url;
  pictureImg.alt = item.description;
  pictureComments.textContent = item.comments.length;
  pictureLikes.textContent = item.likes;

  return pictureItem;
};

picturesUser.forEach((picture) => {
  const pictureItem = createItem(picture);
  picturesListFragment.append(pictureItem);
});

export { picturesListFragment };
