import { closesModal, opensModal, checksDuplicateElements, normalizeString, isEscapeKey } from './utilities.js';
import { loadScale, resetScale } from './scale.js';
import { loadEffects, resetEffects } from './effects.js';
import { MAX_QUANTITY_TAGS, MAX_LENGTH_TAG, IS_VALIDE_HASHTAGS } from './data.js';
import { showUploadPhoto } from './avatar.js';

/** Текст ошибки при нарушении валидации */
const MessageError = {
  REPEAT_HASHTAGS: 'хэш-теги повторяются',
  INVALID_HASHTAG: 'введён невалидный хэш-тег',
  QUANTITY_HASHTAGS: 'превышено количество хэш-тегов',
  MAX_LENGTH_HASHTAG: `максимальная длина одного хэш-тега ${MAX_LENGTH_TAG} символов, включая решётку`,
  RESET_ERROR: '',
};

/** Текст на кнопке отправки формы. Меняется в зависимости от процесса отправки */
const SubmitButtonText = {
  REST: 'Сохранить',
  SENDING: 'Сохраняю...'
};

// Глобальные переменные
const uploadFile = document.querySelector('#upload-file');
const uploadImg = document.querySelector('.img-upload');
const uploadInputImg = uploadImg.querySelector('.img-upload__input');
const uploadOverlayImg = uploadImg.querySelector('.img-upload__overlay');
const uploadFormImg = uploadImg.querySelector('.img-upload__form');
const textHashtags = uploadFormImg.querySelector('.text__hashtags');
const textDescription = uploadFormImg.querySelector('.text__description');
const closeFormButton = uploadFormImg.querySelector('.img-upload__cancel');
const submitButton = uploadFormImg.querySelector('.img-upload__submit');

/** Если поле в фокусе, то форма не закроется через Esc */
const getInputInFocused = () => document.activeElement === textHashtags || document.activeElement === textDescription;

/** Закрытие по Esc */
const onModalEsc = (evt) => {
  if (isEscapeKey(evt) && !getInputInFocused()) {
    closeModalForm();
  }
};

/** Конструктор PristineJS */
const pristine = new Pristine(uploadFormImg, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

/** Закрытие формы */
function closeModalForm() {
  uploadFormImg.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  closesModal(uploadOverlayImg);
  document.removeEventListener('keydown', onModalEsc);
  closeFormButton.removeEventListener('click', closeModalForm);
}

/** Открытие формы */
const openModalForm = () => {
  opensModal(uploadOverlayImg);
  document.addEventListener('keydown', onModalEsc);
  closeFormButton.addEventListener('click', closeModalForm);
  loadScale();
  loadEffects();
  textDescription.value = '';
};

uploadInputImg.addEventListener('change', () => {
  showUploadPhoto();
  openModalForm();
});

/** Проверка хэштегов на уникальность */
const hasUniqueHashtags = (value) => {
  const toLowerCaseTag = normalizeString(value).map((tag) => tag.toLowerCase());
  return checksDuplicateElements(toLowerCaseTag);
};

/** Проверка валидности хэштега */
const hasValidHashtags = (value) => normalizeString(value).every((tag) => IS_VALIDE_HASHTAGS.test(tag));

/** Максимальное количество хэштегов */
const hasValidQuantity = (value) => normalizeString(value).length <= MAX_QUANTITY_TAGS;

/** Максимальная длина хэштега */
const hasMaxLengthTag = (value) => normalizeString(value).every((tag) => tag.length <= MAX_LENGTH_TAG);

// Результаты проверок валидности хэштегов

pristine.addValidator(
  textHashtags,
  hasUniqueHashtags,
  MessageError.REPEAT_HASHTAGS,
  1,
  true
);

pristine.addValidator(
  textHashtags,
  hasValidHashtags,
  MessageError.INVALID_HASHTAG,
  2,
  true
);

pristine.addValidator(
  textHashtags,
  hasValidQuantity,
  MessageError.QUANTITY_HASHTAGS,
  3,
  true
);

pristine.addValidator(
  textHashtags,
  hasMaxLengthTag,
  MessageError.MAX_LENGTH_HASHTAG,
  4,
  true
);

// Блокировка отправки невалидной формы
uploadFormImg.addEventListener('submit', (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
  }
});

/** Блокировка кнопки отправки формы */
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

/** Разблокировка кнопки отправки формы */
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.REST;
};

/** Обработчик отправки формы */
const createSendForm = (cb) => {
  uploadFormImg.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      blockSubmitButton();
      await cb(new FormData(uploadFormImg));
      unblockSubmitButton();
    }
  });
};

uploadFile.addEventListener('change', openModalForm);

export { onModalEsc, closeModalForm, createSendForm };
