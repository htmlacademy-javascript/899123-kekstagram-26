import { isEscape } from './utils.js';

import {
  addFileInputChangeHandler,
  removeFileInputChangeHandler,
} from './new-publication/new-publication-form.js';

const COMMENTS_PORTION_LENGTH = 5;

let publication;
let loadedComments = 0;

const modalWindowElement = document.querySelector('.big-picture');
const bigPhotoElement = modalWindowElement.querySelector('.big-picture__img img');
const likesCountElement = modalWindowElement.querySelector('.likes-count');
const descriptionElement = modalWindowElement.querySelector('.social__caption');

const commentsContainerElement = modalWindowElement.querySelector('.social__comments');
const commentsElement = commentsContainerElement.querySelectorAll('.social__comment');
const commentsCountElement = modalWindowElement.querySelector('.social__comment-count');
const commentsAmountElement = commentsCountElement.querySelector('.comments-count');
const loadedCommentsAmountElement = commentsCountElement.querySelector('.loaded-comments-count');
const commentsLoaderElement = modalWindowElement.querySelector('.comments-loader');

const closeBtnElement = modalWindowElement.querySelector('#picture-cancel');

const commentTemplate = commentsElement[0];
commentsElement.forEach((comment) => comment.remove());

// Наполнение окна

/**
 * Заполняет раздел комментариев данными, из массива комментариев.
 * @param {Array} commentsList - массив комментариев
 */
const fillComments = (commentsList) => {
  const commentsFragment = document.createDocumentFragment();
  commentsList.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = comment.avatar;
    picture.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;
    commentsFragment.appendChild(newComment);
  });

  commentsContainerElement.appendChild(commentsFragment);
};

const loadCommentsPortion = () => {
  fillComments(publication.comments.slice(loadedComments, loadedComments + COMMENTS_PORTION_LENGTH));

  loadedComments += COMMENTS_PORTION_LENGTH;

  if (publication.comments.length > loadedComments) {
    commentsLoaderElement.classList.remove('hidden');
  } else {
    commentsLoaderElement.classList.add('hidden');
    commentsLoaderElement.removeEventListener('click', loadCommentsPortion);

    loadedComments = publication.comments.length;
  }

  loadedCommentsAmountElement.textContent = loadedComments;
};

/**
 * Заполняет модальное окно информацией из выбранной публикации
 * @param {object} publication - Полная информация об одной публикации
 */
const fillModal = () => {
  loadedComments = 0;

  bigPhotoElement.src = publication.url;
  likesCountElement.textContent = publication.likes;
  commentsAmountElement.textContent = publication.comments.length;
  loadCommentsPortion();
  descriptionElement.textContent = publication.description;
};

// Управление окном

const closeModal = () => {
  modalWindowElement.classList.add('hidden');
  document.body.classList.remove('modal-open');

  addFileInputChangeHandler();

  closeBtnElement.removeEventListener('click', closeModal);
  commentsLoaderElement.removeEventListener('click', loadCommentsPortion);
  document.removeEventListener('keydown', modalKeydownHandler);
  commentsContainerElement.innerHTML = '';
};

/**
 *
 * @param {object} publication - Полная информация об одной публикации
 */
const openModal = () => {
  modalWindowElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  removeFileInputChangeHandler();

  commentsLoaderElement.addEventListener('click', loadCommentsPortion);
  closeBtnElement.addEventListener('click', closeModal);
  document.addEventListener('keydown', modalKeydownHandler);
  fillModal();
};

const initPublication = (data) => {
  publication = data;
  openModal();
};

// Обработчики

/**
 * Закрывает модальное окно, если был нажат Escape.
 * @param {object} evt - событие, считанное при нажатии клавиши
 */
function modalKeydownHandler (evt) {
  if (isEscape(evt.code)) {
    evt.preventDefault();
    closeModal();
  }
}

export { initPublication };
