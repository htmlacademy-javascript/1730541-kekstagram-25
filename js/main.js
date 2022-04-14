import { createImages } from './data.js';
import { renderImage } from './drawing.js';

const images = createImages();
for (const image of images) {
  renderImage(image);
}

// eslint-disable-next-line no-console
console.log(images);
