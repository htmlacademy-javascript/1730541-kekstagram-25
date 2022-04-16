import { renderFullImage } from './drawing-full.js';

const pictureTemplate = document.querySelector('#picture').content;

const renderImage = ({ url, description, likes, comments }) => {
  const pictureContainer = pictureTemplate.querySelector('.picture').cloneNode(true);
  pictureContainer.querySelector('.picture__img').src = url;
  pictureContainer.querySelector('.picture__img').alt = description;
  pictureContainer.querySelector('.picture__comments').textContent = comments.length;
  pictureContainer.querySelector('.picture__likes').textContent = likes;

  return pictureContainer;
};

const renderImages = (images) => {
  const picturesContainer = document.querySelector('.pictures');
  const imageListFragment = document.createDocumentFragment();
  for (const image of images) {
    const renderedImage = renderImage(image);
    renderedImage.addEventListener('click', () => {
      renderFullImage(image);
    });
    imageListFragment.appendChild(renderedImage);
  }

  picturesContainer.appendChild(imageListFragment);
};

export { renderImages };
