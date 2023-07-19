
/** Адрес удаленного сервера */
const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';

/** Путь */
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

/** Метод отправки данных */
const Method = {
  GET: 'GET',
  POST: 'POST',
};

/** Текст ошибки */
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

/** Загрузка данных */
const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

/** Получение данных с сервера */
const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

/** Отправка данных на сервер */
const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export { getData, sendData };
