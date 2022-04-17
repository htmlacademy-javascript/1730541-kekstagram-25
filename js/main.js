import { createImages } from './data.js';
import { renderImages } from './drawing.js';
import { openImageUpload } from './form.js';
import { closeImageUpload } from './form.js';

const images = createImages();
renderImages(images);
