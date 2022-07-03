import { generatePublications } from './mocks/generate-mocks.js';

import { renderThumbnails } from './render-thumbnails.js';

import { addFileInputChangeHandler } from './new-publication-form.js';

// main section

const publications = generatePublications();

renderThumbnails(publications);
addFileInputChangeHandler();
