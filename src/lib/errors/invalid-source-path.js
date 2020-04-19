const CustomError = require('./custom');

class InvalidSourcePath extends CustomError {
  constructor() {
    super('Parameter source must be a string');
  }
}

module.exports = InvalidSourcePath;
