import { initPublication } from './big-picture-mode.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

/**
 * Отрисовывает миниатюры
 * @param {array} publications - массив публикаций
 */
const renderThumbnails = (publications) => {
  const thumbnailsFragment = document.createDocumentFragment();
  publications.forEach((publication) => {
    const newThumbnail = thumbnailTemplate.cloneNode(true);

    newThumbnail.querySelector('.picture__img').src = publication.url;
    newThumbnail.querySelector('.picture__likes').textContent = publication.likes;
    newThumbnail.querySelector('.picture__comments').textContent = publication.comments.length;

    newThumbnail.addEventListener('click', () => initPublication(publication));

    thumbnailsFragment.appendChild(newThumbnail);
  });

  picturesContainer.appendChild(thumbnailsFragment);
};

export { renderThumbnails };
