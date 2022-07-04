import { generatePublications } from './mocks/generate-mocks.js';

import { renderThumbnails } from './render-thumbnails.js';

import { addFileInputChangeHandler } from './new-publication/new-publication-form.js';

// main section

const publications = generatePublications(25);

renderThumbnails(publications);
addFileInputChangeHandler();
