
import { getData } from './api.js';
import { renderImages } from './drawing.js';

const RANDOM_PHOTOS = 10;
const TIMEOUT_DELAY = 500;

const imageArray = document.querySelectorAll('.pictures .picture');
const imageFilters = document.querySelector('.img-filters');
const imageFilterForm = imageFilters.querySelector('.img-filters__form');
const discussedFilterNode = imageFilters.querySelector('#filter-discussed');
const randomFilter = imageFilters.querySelector('#filter-random');
const defaultFilter = imageFilters.querySelector('#filter-default');
const activeButton = imageFilters.querySelector('.img-filters__button--active');

let photosArray;

const setActiveClass = (element) => {
  if (activeButton) {
    activeButton.classList.remove('img-filters__button--active');
  }
  element.classList.add('img-filters__button--active');
};

const removePhotos = () => {
  imageArray.forEach((photo) => {
    photo.remove();
  });
};

const getDefaultPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const defaultPhotos = photosCopyArray;
  renderImages(defaultPhotos);
};

const sortPhotosByComments = (photoArray) => {
  photoArray.sort((first, second) => second.comments.length - first.comments.length);
  return photoArray;
};

const getDiscussedPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const discussedPhotos = sortPhotosByComments(photosCopyArray);
  renderImages(discussedPhotos);
};

const mixArray = (array) => {
  let k;
  let temp;
  for (let i = array.length - 1; i > 0; i--) {
    k = Math.floor(Math.random() * (i + 1));
    temp = array[k];
    array[k] = array[i];
    array[i] = temp;
  }
  return array;
};

const getRandomPhotos = () => {
  const photosCopyArray = Array.from(photosArray);
  const randomPhotos = mixArray(photosCopyArray).slice(0, RANDOM_PHOTOS);
  renderImages(randomPhotos);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onFilterClick = debounce((evt) => {
  const target = evt.target;
  removePhotos();
  setActiveClass(target);
  switch (target) {
    case randomFilter:
      getRandomPhotos();
      break;
    case defaultFilter:
      getDefaultPhotos();
      break;
    case discussedFilterNode:
      getDiscussedPhotos();
      break;
    default:
      getDefaultPhotos();
  }
}, TIMEOUT_DELAY);

imageFilterForm.addEventListener('click', onFilterClick);

const receiveData = (photos) => {
  photosArray = photos;
  renderImages(photos);
  imageFilters.classList.remove('img-filters--inactive');
};

getData(receiveData);
