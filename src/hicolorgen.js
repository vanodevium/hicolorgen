const {resolve} = require('path');
const sharp = require('sharp');

const isStringArgumentValid = require('./lib/validate-string-argument');
const validateSource = require('./lib/validate-source');
const validateDestination = require('./lib/validate-destination');
const validateName = require('./lib/validate-name');
const parseAndValidateOptions = require('./lib/parse-and-validate-options');
const writeBuffer = require('./lib/write-buffer');

const InvalidSourceError = require('./lib/errors/invalid-source-path');
const InvalidDestinationError = require('./lib/errors/invalid-destination-path');
const InvalidNameError = require('./lib/errors/invalid-name');

const MIN = 16;
const MAX = 512;
const SIZES = [
  MIN, 22, 24, 32, 48, 64, 96, 128, 256, MAX
];

/**
 * @param {string} source
 * @param {string} destination
 * @param {string} name
 * @param {({
 *   min: (number | undefined),
 *   max: (number | undefined)
 * }|null)} options
 * @returns {Promise<void>}
 */
const hicolorgen = async (source, destination, name, options = null) => {
  if (!isStringArgumentValid(source)) {
    throw new InvalidSourceError();
  }

  if (!isStringArgumentValid(destination)) {
    throw new InvalidDestinationError();
  }

  if (!isStringArgumentValid(name)) {
    throw new InvalidNameError();
  }

  const sourceBuffer = await validateSource(source);
  await validateDestination(destination);
  name = await validateName(name);

  options = await parseAndValidateOptions(options, MIN, MAX, SIZES);

  const sharpedSource = sharp(sourceBuffer);

  await Promise.all(
    SIZES
      .filter(size => size >= options.min && size <= options.max)
      .map(async size => {
        const buffer = await sharpedSource
          .clone()
          .resize(size)
          .png()
          .toBuffer();

        return writeBuffer(resolve(destination, `${size}x${size}`, name), buffer);
      })
  );
};

hicolorgen.MIN = MIN;
hicolorgen.MAX = MAX;

module.exports = hicolorgen;

