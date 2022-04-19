import { createImages } from './data.js';
import { renderImages } from './drawing.js';
import { initForm } from './form.js';
import { initFormValidation } from './validation.js';

const images = createImages();
renderImages(images);
initForm();
initFormValidation();
