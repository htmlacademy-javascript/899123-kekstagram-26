import {
  generatePublications
} from './generate-mocks.js';

const publications = generatePublications();

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();
publications.forEach((publication) => {
  const pictureTemplateClone = pictureTemplate.cloneNode(true);
  pictureTemplateClone.querySelector('.picture__img').src = publication.url;
  pictureTemplateClone.querySelector('.picture__likes').textContent = publication.likes;
  pictureTemplateClone.querySelector('.picture__comments').textContent = publication.comments.length;

  picturesFragment.appendChild(pictureTemplateClone);
});

picturesContainer.appendChild(picturesFragment);
