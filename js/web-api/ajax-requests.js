const Settings = {
  getFrom: 'https://26.javascript.pages.academy/kekstagram/data',
  sendTo: 'https://26.javascript.pages.academy/kekstagram',
};
const {getFrom, sendTo} = Settings;
Object.freeze(Settings);

/**
 * Получает данные с сервера
 * @param {function} successHandler - колбэк в случае успеха
 * @param {function} errorHandler - колбэк в случае неудачи
 */
const getData = (successHandler, errorHandler) => {
  fetch(getFrom)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response.json();
    })
    .then((json) => successHandler(json))
    .catch(() => {
      errorHandler();
    });
};

/**
 * Отправляет данные на сервер
 * @param {*} body - данные, которые будут отправлены
 * @param {function} cb - колбэк после выполнения запроса
 * @returns {Promise} resolve(isSuccess)
 */
const sendUploadFormData = (body, cb) => {
  let isSuccess = true;
  return fetch(
    sendTo,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        isSuccess = false;
        throw new Error (response.statusText);
      } else {
        cb(isSuccess);
      }
    })
    .catch(() => cb(isSuccess))
    .then(() => isSuccess);
};

export {
  getData,
  sendUploadFormData,
};
