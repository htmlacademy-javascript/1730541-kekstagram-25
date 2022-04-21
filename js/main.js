import { createImages } from './data.js';
import { renderImages } from './drawing.js';
import { initForm } from './form.js';
import { initFormValidation } from './validation.js';
import { getData } from './api.js';
import './add-effect.js';

getData((images) => {
  createImages();
  renderImages(images);
  initForm();
  initFormValidation();
});
