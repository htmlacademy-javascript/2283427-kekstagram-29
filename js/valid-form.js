import { closesModal, opensModal, checksDuplicateElements, normalizeString } from './utilities.js';
import { loadScale, resetScale } from './scale.js';
import { loadEffects, resetEffects } from './effects.js';
import { MAX_QUANTITY_TAGS, MAX_LENGTH_TAG, IS_VALIDE_HASHTAGS, MessageError } from './data.js';

// Глобальные переменные
const uploadImg = document.querySelector('.img-upload');
const uploadInputImg = uploadImg.querySelector('.img-upload__input');
const uploadOverlayImg = uploadImg.querySelector('.img-upload__overlay');
const uploadFormImg = uploadImg.querySelector('.img-upload__form');
const textHashtags = uploadFormImg.querySelector('.text__hashtags');
const textDescription = uploadFormImg.querySelector('.text__description');
const closeFormButton = uploadFormImg.querySelector('.img-upload__cancel');

// Если поле в фокусе, то форма не закроется через Esc
const inputInFocused = function () {
  if (document.activeElement === textHashtags || document.activeElement === textDescription) {
    return true;
  }
};

// Закрытие Esc
const onModalEsc = (evt) => {
  if (evt.key === 'Escape' && !inputInFocused()) {
    closeModalForm();
  }
};

// Валидация PristineJS
const pristine = new Pristine(uploadFormImg, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

/*
 Закрытие формы.
 Используется function declaration, т.к. при использовании
 стрелочной функции, линтер ругается на использование функции
 до её объявления (в блоке "Закрытие Esc")
*/
function closeModalForm() {
  uploadFormImg.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  closesModal(uploadOverlayImg);
  document.removeEventListener('keydown', onModalEsc);
  closeFormButton.removeEventListener('click', closeModalForm);
}

// Открытие формы
const openModalForm = () => {
  opensModal(uploadOverlayImg);
  document.addEventListener('keydown', onModalEsc);
  closeFormButton.addEventListener('click', closeModalForm);
  loadScale();
  loadEffects();
};

uploadInputImg.addEventListener('change', () => {
  openModalForm();
});

// Сброс ошибок при пустом поле
const resetErrors = () => textHashtags.value === '';

// Проверка хэштегов на уникальность
const hasUniqueHashtags = (value) => {
  const toLowerCaseTag = normalizeString(value).map((tag) => tag.toLowerCase());
  return checksDuplicateElements(toLowerCaseTag);
};

// Проверка валидности хэштега
const hasValidHashtags = (value) => normalizeString(value).every((tag) => IS_VALIDE_HASHTAGS.test(tag));

// Максимальное количество хэштегов
const hasValidQuantity = (value) => normalizeString(value).length <= MAX_QUANTITY_TAGS;

// Максимальная длина хэштега
const hasMaxLengthTag = (value) => normalizeString(value).every((tag) => tag.length <= MAX_LENGTH_TAG);

// Результаты проверок валидности хэштегов
pristine.addValidator(
  textHashtags,
  resetErrors,
  MessageError.RESET_ERROR,
  1,
  true
);

pristine.addValidator(
  textHashtags,
  hasUniqueHashtags,
  MessageError.REPEAT_HASHTAGS,
  2,
  true
);

pristine.addValidator(
  textHashtags,
  hasValidHashtags,
  MessageError.INVALID_HASHTAG,
  3,
  true
);

pristine.addValidator(
  textHashtags,
  hasValidQuantity,
  MessageError.QUANTITY_HASHTAGS,
  4,
  true
);

pristine.addValidator(
  textHashtags,
  hasMaxLengthTag,
  MessageError.MAX_LENGTH_HASHTAG,
  5,
  true
);

// Блокировка отправки невалидной формы
uploadFormImg.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});
