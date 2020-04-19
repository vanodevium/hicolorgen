const path = require('path');
const validFilename = require('valid-filename');
const EXTENSION = '.png';

const NameIsEmptyError = require('./errors/name-is-empty');

/**
 * @param {string} name
 * @returns string
 */
const validateName = name => {
  let extension = path.extname(name);
  const nameWithoutExtension = name.replace(extension, '').replace(/^\//, '');
  const basename = path.basename(nameWithoutExtension).trim();

  extension = (extension || EXTENSION).toLowerCase();
  if (extension !== EXTENSION) {
    extension = EXTENSION;
  }

  if (!validFilename(basename)) {
    throw new NameIsEmptyError();
  }

  return `${nameWithoutExtension}${extension}`;
};

module.exports = validateName;
