import { renderThumbnails } from './render-thumbnails.js';

import { addFileInputChangeHandler } from './new-publication/new-publication-form.js';

import { showFailMessage } from './web-api/get-data-error.js';

import { getData } from './web-api/ajax-requests.js';

// main section

getData(renderThumbnails, showFailMessage);

addFileInputChangeHandler();
