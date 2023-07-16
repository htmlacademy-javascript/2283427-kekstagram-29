import { closesModal, opensModal, checksDuplicateElements, normalizeString, isEscapeKey } from './utilities.js';
import { loadScale, resetScale } from './scale.js';
import { loadEffects, resetEffects } from './effects.js';
import { MAX_QUANTITY_TAGS, MAX_LENGTH_TAG, IS_VALIDE_HASHTAGS, MessageError } from './data.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

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

const SubmitButtonText = {
  REST: 'Сохранить',
  SENDING: 'Сохраняю...'
};

/** Если поле в фокусе, то форма не закроется через Esc */
const inputInFocused = () => {
  if (document.activeElement === textHashtags || document.activeElement === textDescription) {
    return true;
  }
};

/** Закрытие Esc */
const onModalEsc = (evt) => {
  if (isEscapeKey(evt) && !inputInFocused()) {
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
};

uploadInputImg.addEventListener('change', () => {
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
const createSendForm = () => {
  uploadFormImg.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    const formData = new FormData(evt.target);

    if (isValid) {
      blockSubmitButton();
      sendData(formData)
        .then(() => {
          closeModalForm();
          showSuccessMessage();
        })
        .catch(
          () => {
            showErrorMessage();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
  const uploadFileEditor = () => {
    uploadFile.addEventListener('change', openModalForm);
  };
  uploadFileEditor();
};

export { onModalEsc, closeModalForm, createSendForm };
