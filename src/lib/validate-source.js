const fs = require('fs');
const {resolve} = require('path');
const imageType = require('image-type');
const {imageSize} = require('image-size');

const SourceNotExistsError = require('./errors/source-not-exists');
const SourceMustBeSquareError = require('./errors/source-must-be-square');
const SourceUnsupportedFormatError = require('./errors/source-with-unsupported-format');

const FORMATS = ['jpg', 'png', 'webp', 'tif', 'gif'];

/**
 * @param {string} source
 * @returns {Promise<Buffer>}
 */
const validateSource = async source => {
  const sourcePath = resolve(process.cwd(), source);
  if (!fs.existsSync(sourcePath)) {
    throw new SourceNotExistsError();
  }

  const buffer = await fs.promises.readFile(sourcePath);
  const metadata = imageType(buffer);

  if (!metadata || !FORMATS.includes(metadata.ext)) {
    throw new SourceUnsupportedFormatError(FORMATS);
  }

  const dimensions = imageSize(buffer);
  if (dimensions.width !== dimensions.height) {
    throw new SourceMustBeSquareError();
  }

  return buffer;
};

module.exports = validateSource;
