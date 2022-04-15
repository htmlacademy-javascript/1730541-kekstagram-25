import { createImage } from './data.js';

const userImage = document.querySelector('#picture').content;
const newUserImage = userImage.querySelector('.picture');
const imageListFragment = document.createDocumentFragment();
const renderImage = createImage();

renderImage(({ url, description, likes, comments }) => {
  const someImages = newUserImage.cloneNode(true);
  someImages.querySelector('.picture__img').src = url;
  someImages.querySelector('.picture__info').textContent = description;
  someImages.querySelector('.picture__comments').textContent = comments;
  someImages.querySelector('.picture__likes').textContent = likes;
  imageListFragment.appendChild(someImages);
});

newUserImage.appendChild(imageListFragment);

export { renderImage };
