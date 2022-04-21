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
const commentBigPicture = document.querySelector('.social__comment');
let commentData = [];
let commentsCounter = 5;

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

const addComment = (comment) => {
  const commentElement = commentBigPicture.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const createCommentFragment = (commentArray) => {
  const fragment = document.createDocumentFragment();
  commentArray.forEach((comment) => {
    const newComment = addComment(comment);
    fragment.appendChild(newComment);
  });
  socialComments.appendChild(fragment);
};

const getCurentCountComment = (comments) => comments ? comments.children.length : 0;

const clickCommentsLoader = () => {
  createCommentFragment(commentData.slice(commentsCounter, commentsCounter += SHOWING_COMMENTS_COUNT));
  if (commentsCounter >= commentData.length) {
    commentLoader.classList.add('hidden');
    commentLoader.removeEventListener('click', clickCommentsLoader);
    commentsCounter = SHOWING_COMMENTS_COUNT;
  }
  socialCommentCount.firstChild.textContent = `${getCurentCountComment(socialComments)} из `;
  if (commentData.length === 0) {
    commentLoader.classList.add('hidden');
    commentLoader.removeEventListener('click', clickCommentsLoader);
  }
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
  socialCommentCount.firstChild.textContent = `${SHOWING_COMMENTS_COUNT} из `;
  commentData = comments.slice();
  if (comments.length <= SHOWING_COMMENTS_COUNT) {
    socialCommentCount.firstChild.textContent = `${comments.length} из `;
    createCommentFragment(commentData);
    commentLoader.classList.add('hidden');
  }
  if (comments.length >= SHOWING_COMMENTS_COUNT) {
    createCommentFragment(commentData.slice(0, SHOWING_COMMENTS_COUNT));
    commentLoader.classList.remove('hidden');
    commentLoader.addEventListener('click', clickCommentsLoader);
  }
};

const closeFullImage = () => {
  imageSection.classList.add('hidden');
  bodyTag.classList.remove('modal-open');
};

imageCancel.addEventListener('click', () => {
  closeFullImage();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeFullImage();
  }
});

export { renderFullImage };
