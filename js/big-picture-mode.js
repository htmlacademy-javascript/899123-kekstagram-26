const body = document.querySelector('body');
const modal = document.querySelector('.big-picture');
const photo = modal.querySelector('.big-picture__img img');
const likes = modal.querySelector('.likes-count');
const description = modal.querySelector('.social__caption');

const commentsContainer = modal.querySelector('.social__comments');
const comments = commentsContainer.querySelectorAll('.social__comment');
const commentsAmount = modal.querySelector('.comments-count');
const commentLoader = modal.querySelector('.comments-loader');
const commentCount = modal.querySelector('.social__comment-count');

const closeBtn = modal.querySelector('#picture-cancel');

// Временное отключение(в рамках задания)
commentCount.classList.add('hidden');
commentLoader.classList.add('hidden');

const commentTemplate = comments[0];
comments.forEach((comment) => comment.remove());

/**
 * Переключение классов, в зависимости от выбранного режима.
 */
const toggleModal = () => {
  modal.classList.toggle('hidden');
  body.classList.toggle('modal-open');
};

/**
 * Закрывает модальное окно.
 */
const closeModal = () => {
  document.removeEventListener('keydown', isEscape);
  toggleModal();
  commentsContainer.innerHTML = '';
};

/**
 * Закрывает модальное окно, если был нажат Escape.
 * @param {object} evt - событие, считанное при нажатии клавиши
 */
// При функцональном выражении линтер ругается на использование перед определением в ф-ции closeModal
function isEscape (evt) {
  if (evt.code === 'Escape') {
    closeModal();
  }
}

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

  commentsContainer.appendChild(commentsFragment);
};

/**
 * Заполняет модальное окно информацией из выбранной публикации
 * @param {object} publication - Полная информация об одной публикации
 */
const fillModal = (publication) => {
  photo.src = publication.url;
  likes.textContent = publication.likes;
  commentsAmount.textContent = publication.comments.length;
  fillComments(publication.comments);
  description.textContent = publication.description;
};

/**
 * Осуществляет открытие модального окна
 * @param {object} publication - Полная информация об одной публикации
 */
const openModal = (publication) => {
  toggleModal();
  document.addEventListener('keydown', isEscape);
  fillModal(publication);
};

// Кнопка закрытия окна
closeBtn.addEventListener('click', closeModal);

export {openModal};
