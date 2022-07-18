const ERROR_MSG_TEXT = 'Произошла ошибка при загрузке данных. Нажмите для перезагрузки страницы';
const ERROR_MSG_TAG = 'a';
const ERROR_MSG_CLASS = 'get-data-fail';

const errorMessageStyles = {
  display: 'block',
  position: 'absolute',
  zIndex: 100,
  top: 0,
  left: 0,
  padding: '15px 0',
  width: '100vw',
  fontSize: 'larger',
  fontWeight: 'bolder',
  textAlign: 'center',
  textDecoration: 'underline',
  cursor: 'pointer',
  color: 'white',
  backgroundColor: 'red',
};
Object.freeze(errorMessageStyles);

//

const showFailMessage = () => {
  const element = document.createElement(ERROR_MSG_TAG);
  element.classList.add(ERROR_MSG_CLASS);
  element.textContent = ERROR_MSG_TEXT;
  Object.assign(element.style, errorMessageStyles);

  element.addEventListener('click', () => location.reload());

  document.body.appendChild(element);
};

export { showFailMessage };
