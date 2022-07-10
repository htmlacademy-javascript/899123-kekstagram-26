import { initPublication } from './big-picture-mode.js';

const thumbnailTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainerElement = document.querySelector('.pictures');

/**
 * Отрисовывает миниатюры
 * @param {array} publications - массив публикаций
 */
const renderThumbnails = (publications) => {
  const thumbnailsFragment = document.createDocumentFragment();
  publications.forEach((publication) => {
    const newThumbnail = thumbnailTemplateElement.cloneNode(true);

    newThumbnail.dataset.id = publication.id;
    newThumbnail.querySelector('.picture__img').src = publication.url;
    newThumbnail.querySelector('.picture__likes').textContent = publication.likes;
    newThumbnail.querySelector('.picture__comments').textContent = publication.comments.length;

    thumbnailsFragment.appendChild(newThumbnail);
  });

  picturesContainerElement.appendChild(thumbnailsFragment);
  picturesContainerElement.addEventListener('click', thumbnailsContainerClickHandler(publications));
};

// Обработчики

/**
 *
 * @param {array} publications - массив публикаций
 * @returns функция-обработчик события клик на миниатюру
 */
function thumbnailsContainerClickHandler (publications) {
  return function(evt) {
    if (evt.target.closest('.picture') !== null) {
      initPublication(publications.find((publication) => publication.id === Number(evt.target.closest('.picture').dataset.id)));
    }
  };
}

export { renderThumbnails };
