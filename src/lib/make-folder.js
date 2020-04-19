const fs = require('fs');
const {dirname} = require('path');

/**
 * @param {string} destination
 * @returns {Promise<string|void>}
 */
const makeFolder = async destination => {
  const dir = dirname(destination);
  if (fs.existsSync(dir)) {
    return Promise.resolve();
  }

  return fs.promises.mkdir(dir, {recursive: true});
};

module.exports = makeFolder;
