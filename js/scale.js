const STEP_VALUE = 25;
const MIN_VALUE = 25;
const MAX_VALUE = 100;
const DEFAULT_VALUE = 100;

const uploadImg = document.querySelector('.img-upload');
const smallControl = uploadImg.querySelector('.scale__control--smaller');
const bigControl = uploadImg.querySelector('.scale__control--bigger');
const contolValue = uploadImg.querySelector('.scale__control--value');
const uploadPreviewImg = uploadImg.querySelector('.img-upload__preview img');

const scaleImg = (value) => {
  uploadPreviewImg.style.transform = `scale(${value / 100})`;
  contolValue.value = `${value}%`;
};

const onSmallControlClick = () => {
  const newElement = parseInt(contolValue.value, 10);
  const newValue = newElement - STEP_VALUE;

  if (newValue < MIN_VALUE) {
    scaleImg(MIN_VALUE);
  } else {
    scaleImg(newValue);
  }
};

const onBigControlClick = () => {
  const newElement = parseInt(contolValue.value, 10);
  const newValue = newElement + STEP_VALUE;

  if (newValue > MAX_VALUE) {
    scaleImg(MAX_VALUE);
  } else {
    scaleImg(newValue);
  }
};


const resetScale = () => {
  scaleImg(DEFAULT_VALUE);
  smallControl.removeEventListener('click', onSmallControlClick);
  bigControl.removeEventListener('click', onBigControlClick);
};

const loadScale = () => {
  smallControl.addEventListener('click', onSmallControlClick);
  bigControl.addEventListener('click', onBigControlClick);
};


export { resetScale, loadScale };
