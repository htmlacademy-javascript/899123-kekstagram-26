import { generatePublications } from './mocks/generate-mocks.js';

import { renderThumbnails } from './render-thumbnails.js';

import { fileInputHandler } from './new-publication-form.js';

// main section

const publications = generatePublications();

renderThumbnails(publications);
fileInputHandler();
