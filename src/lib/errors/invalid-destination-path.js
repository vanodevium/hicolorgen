const CustomError = require('./custom');

class InvalidDestinationPath extends CustomError {
  constructor() {
    super('Parameter path must be a string');
  }
}

module.exports = InvalidDestinationPath;
