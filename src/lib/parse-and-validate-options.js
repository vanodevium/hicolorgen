const InvalidMinError = require('./errors/invalid-min');
const InvalidMaxError = require('./errors/invalid-max');
const InvalidMinMaxError = require('./errors/invalid-min-max');

/**
 * @param {(null|{
 *   min: (number | undefined),
 *   max: (number | undefined)
 * })} options
 * @param {number} min
 * @param {number} max
 * @param {number[]} sizes
 * @returns {Promise<{min: number, max: number}>}
 */
const parseAndValidateOptions = (options, min, max, sizes) => {
  options = {min, max, ...options || {}};
  options.min = Number.parseInt(options.min.toString(), 10);
  options.max = Number.parseInt(options.max.toString(), 10);

  if (Number.isNaN(options.min) || options.min < min) {
    throw new InvalidMinError(min);
  }

  if (Number.isNaN(options.max) || options.max > max) {
    throw new InvalidMaxError(max);
  }

  if (!sizes.includes(options.min) || !sizes.includes(options.max) || options.min > options.max) {
    throw new InvalidMinMaxError(sizes);
  }

  return Promise.resolve(options);
};

module.exports = parseAndValidateOptions;
