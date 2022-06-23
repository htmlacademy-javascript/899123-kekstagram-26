import { generatePublications } from './mocks/generate-mocks.js';

import { openModal } from './big-picture-mode';

const publications = generatePublications();

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const thumbnailsFragment = document.createDocumentFragment();
publications.forEach((publication) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);

  newThumbnail.querySelector('.picture__img').src = publication.url;
  newThumbnail.querySelector('.picture__likes').textContent = publication.likes;
  newThumbnail.querySelector('.picture__comments').textContent = publication.comments.length;

  newThumbnail.addEventListener('click', () => openModal(publication));

  thumbnailsFragment.appendChild(newThumbnail);
});

picturesContainer.appendChild(thumbnailsFragment);
