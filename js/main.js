import { generatePublications } from './mocks/generate-mocks.js';
import { renderThumbnails } from './render-thumbnails.js';

const publications = generatePublications();

renderThumbnails(publications);
