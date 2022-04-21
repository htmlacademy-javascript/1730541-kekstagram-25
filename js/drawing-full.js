import { isEscapeKey } from './util.js';

const SHOWING_COMMENTS_COUNT = 5;

const imageSection = document.querySelector('.big-picture');
const imageCancel = imageSection.querySelector('.big-picture__cancel');
const socialCommentCount = imageSection.querySelector('.social__comment-count');
const commentsCount = socialCommentCount.querySelector('.comments-count');
const commentLoader = imageSection.querySelector('.comments-loader');
const bodyTag = document.body;
const bigPictureImg = imageSection.querySelector('.big-picture__img img');
const socialCaption = imageSection.querySelector('.social__caption');
const likesCount = imageSection.querySelector('.likes-count');
const socialComments = imageSection.querySelector('.social__comments');

let count = 0;

const renderComment = ({ avatar, message, name }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = '35';
  img.height = '35';
  li.appendChild(img);
  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;
  li.appendChild(p);
  socialComments.appendChild(li);

};

const renderFullImage = ({ url, description, likes, comments }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  socialCaption.textContent = description;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialComments.innerHTML = '';
  for (const comment of comments) {
    renderComment(comment);
  }
  imageSection.classList.remove('hidden');
  bodyTag.classList.add('modal-open');
  commentLoader.addEventListener('click', commentsLoaderOnClick);
  renderCommentsSlice(comments);
};

const closeFullImage = () => {
  imageSection.classList.add('hidden');
  bodyTag.classList.remove('modal-open');
};

imageCancel.addEventListener('click', () => {
  closeFullImage();
});

function commentsLoaderOnClick() {
  count += SHOWING_COMMENTS_COUNT;
  renderCommentsSlice();
}

function renderCommentsSlice(comments) {
  socialComments.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  const commentsToShow = comments.slice(0, count + SHOWING_COMMENTS_COUNT);
  commentsToShow.forEach((comment) => {
    commentsFragment.appendChild(renderComment(comment));
  });
  socialComments.appendChild(commentsFragment);
  commentLoader.classList.toggle('hidden', comments.length === commentsToShow.length);
  socialCommentCount.innerHTML = `${commentsToShow.length} из <span class="comments-count">${comments.length}</span> комментариев`;
}

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeFullImage();
  }
});

export { renderFullImage };
