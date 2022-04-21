import { createImages } from './data.js';
import { renderImages } from './drawing.js';
import { initForm } from './form.js';
import { initFormValidation } from './validation.js';
import { getData } from './api.js';
import './add-effect.js';
import { showFilteredPictures } from './filter.js';

getData((images) => {
  createImages();
  renderImages(images);
  showFilteredPictures(images);
});

initForm();
initFormValidation();
