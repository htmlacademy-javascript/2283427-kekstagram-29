// Глобальные переменные
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/** Создает миниатюру */
const createThumbnail = ({ description, url, likes, comments, id}) => {
  const pictureItem = pictureTemplate.cloneNode(true);

  pictureItem.querySelector('.picture__img').src = url;
  pictureItem.querySelector('.picture__img').alt = description;
  pictureItem.querySelector('.picture__comments').textContent = comments.length;
  pictureItem.querySelector('.picture__likes').textContent = likes;
  pictureItem.dataset.pictureItemId = id;
  pictureItem.addEventListener('click', (evt) => {
    evt.preventDefault();

  });
  return pictureItem;
};

/** Создает миниатюры */
const createThumbnails = (pictures, container) => {
  container.querySelectorAll('.picture').forEach((element) => element.remove());
  const pictureFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const miniature = createThumbnail(picture);
    pictureFragment.append(miniature);
  });

  container.append(pictureFragment);
};

export { createThumbnails };
