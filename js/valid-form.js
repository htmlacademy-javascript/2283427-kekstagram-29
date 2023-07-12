import { closesModal, opensModal, checksDuplicateElements, normalizeString } from './utilities.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effect.js';

const uploadImg = document.querySelector('.img-upload');
const uploadInputImg = uploadImg.querySelector('.img-upload__input');
const uploadOverlayImg = uploadImg.querySelector('.img-upload__overlay');
const uploadFormImg = uploadImg.querySelector('.img-upload__form');
const textHashtags = uploadFormImg.querySelector('.text__hashtags');
const textDescription = uploadFormImg.querySelector('.text__description');
const closeFormButton = uploadFormImg.querySelector('.img-upload__cancel');

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

const pristine = new Pristine(uploadFormImg, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

// Закрытие формы
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
function openModalForm() {
  opensModal(uploadOverlayImg);
  document.addEventListener('keydown', onModalEsc);
  closeFormButton.addEventListener('click', closeModalForm);
}

uploadInputImg.addEventListener('change', () => {
  openModalForm();
});

// Валидация PristineJS
const MAX_QUANTITY_TAGS = 5;
const MAX_LENGTH_TAG = 20;
const IS_VALIDE_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;

const messageError = {
  REPEAT_HASHTAGS: 'хэш-теги повторяются',
  INVALID_HASHTAG: 'введён невалидный хэш-тег',
  QUANTITY_HASHTAGS: 'превышено количество хэш-тегов',
  MAX_LENGTH_HASHTAG: `максимальная длина одного хэш-тега ${MAX_LENGTH_TAG} символов, включая решётку`,
  RESET_ERROR: '',
};

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

pristine.addValidator(
  textHashtags,
  resetErrors,
  messageError.RESET_ERROR,
  1,
  true
);

pristine.addValidator(
  textHashtags,
  hasUniqueHashtags,
  messageError.REPEAT_HASHTAGS,
  2,
  true
);

pristine.addValidator(
  textHashtags,
  hasValidHashtags,
  messageError.INVALID_HASHTAG,
  3,
  true
);

pristine.addValidator(
  textHashtags,
  hasValidQuantity,
  messageError.QUANTITY_HASHTAGS,
  4,
  true
);

pristine.addValidator(
  textHashtags,
  hasMaxLengthTag,
  messageError.MAX_LENGTH_HASHTAG,
  5,
  true
);

// Блокировка отправки невалидной формы

uploadFormImg.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});
