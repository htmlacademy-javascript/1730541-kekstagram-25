import { createImages } from './data.js';
import { renderImages } from './drawing.js';
import './form.js';
import './validation.js';

const images = createImages();
renderImages(images);
