import { generatePublications } from './mocks/generate-mocks.js';
import { renderThumbnails } from './render-thumbnails.js';
import './new-publication-form.js';

const publications = generatePublications();

renderThumbnails(publications);
