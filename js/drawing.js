const userImage = document.querySelector('#picture');

const imageListFragment = document.createDocumentFragment();

const renderImage = ({ url, description, likes, comments }) => {
  const someImages = userImage.cloneNode(true);
  someImages.querySelector('.picture__img').src = url;
  someImages.querySelector('.picture__info').textContent = description;
  someImages.querySelector('.picture__comments').textContent = comments;
  someImages.querySelector('.picture__likes').textContent = likes;
  imageListFragment.appendChild(someImages);
};

export { renderImage };
