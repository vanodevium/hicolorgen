const fs = require('fs');
const {resolve} = require('path');

const makeFolder = require('./make-folder');

const DestinationPathIsNotWritableError = require('./errors/destination-path-is-not-writable');

/**
 * @param {string} destination
 * @returns {Promise<void>}
 */
const validateDestination = async destination => {
  const destinationPath = resolve(process.cwd(), destination);
  try {
    if (fs.existsSync(destinationPath)) {
      await fs.promises.access(destinationPath, fs.constants.W_OK);
    } else {
      await makeFolder(destinationPath);
    }
  } catch (_) {
    throw new DestinationPathIsNotWritableError();
  }

  return Promise.resolve();
};

module.exports = validateDestination;
