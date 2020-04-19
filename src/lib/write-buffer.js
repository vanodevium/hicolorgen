const fs = require('fs');

const makeFolder = require('./make-folder');

/**
 * @param {string} destination
 * @param {Buffer} buffer
 * @returns {Promise<void>}
 */
const writeBuffer = async (destination, buffer) => {
  await makeFolder(destination);
  return fs.promises.writeFile(destination, buffer);
};

module.exports = writeBuffer;
