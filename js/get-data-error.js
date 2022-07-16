const ErrorMessageStyles = {
  'display': 'block',
  'position': 'absolute',
  'z-index': 100,
  'top': 0,
  'left': 0,
  'padding': '15px 0',
  'width': '100vw',
  'font-size': 'larger',
  'font-weight': 'bolder',
  'text-align': 'center',
  'text-decoration': 'underline',
  'cursor': 'pointer',
  'color': 'white',
  'background-color': 'red',
};
Object.freeze(ErrorMessageStyles);

const showFailMessage = () => {
  const element = document.createElement('a');
  element.classList.add('get-data-fail');
  element.textContent = 'Произошла ошибка при загрузке данных. Нажмите для перезагрузки страницы';
  Object.assign(element.style, ErrorMessageStyles);

  element.addEventListener('click', () => location.reload());

  document.body.appendChild(element);
};

export { showFailMessage };
