/**
 * @param {string} argument
 * @returns {boolean}
 */
const validateStringArgument = argument => {
  return typeof argument === 'string' && argument.trim().length > 0;
};

module.exports = validateStringArgument;
