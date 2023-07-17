// Сортировка
const Sorts = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

/** Количество случайных изображений */
const QUANTITY_IMAGES = 10;

// Глобальные переменные
const filterImg = document.querySelector('.img-filters');
let currentFilter = Sorts.DEFAULT;
let images = [];

/** Случайные изображения */
const randomSort = () => Math.random() - 0.5;

/** Обсуждаемые изображения */
const discussedSort = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

/** Сортировка изображений */
const sortImages = () => {
  switch (currentFilter) {
    case Sorts.RANDOM:
      return [...images].sort(randomSort).slice(0, QUANTITY_IMAGES);
    case Sorts.DISCUSSED:
      return [...images].sort(discussedSort);
    default:
      return [...images];
  }
};

/** Выбор фильтра по клику */
const clickedSort = (cb) => {
  filterImg.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && evt.target.id !== currentFilter) {
      const clickBtn = evt.target;
      filterImg.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      clickBtn.classList.add('img-filters__button--active');
      currentFilter = clickBtn.id;
      cb(sortImages());
    }
  });
};

/** Показ сортировки */
const showSort = (loadedImages, cb) => {
  filterImg.classList.remove('img-filters--inactive');
  images = [...loadedImages];
  clickedSort(cb);
};

export { showSort };
