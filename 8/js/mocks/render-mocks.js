import {
  OPTIONS,
  generatePublications
} from './generate-mocks.js';

const publications = generatePublications();

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();
for (let i = 0; i < OPTIONS.GENERATED_PUBLICATIONS_AMOUNT; i++) {
  const pictureTemplateClone = pictureTemplate.cloneNode(true);
  pictureTemplateClone.querySelector('.picture__img').src = publications[i].url;
  pictureTemplateClone.querySelector('.picture__likes').textContent = publications[i].likes;
  pictureTemplateClone.querySelector('.picture__comments').textContent = publications[i].comments.length;

  picturesFragment.appendChild(pictureTemplateClone);
}

picturesContainer.appendChild(picturesFragment);
