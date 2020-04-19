const CustomError = require('./custom');

class InvalidName extends CustomError {
  constructor() {
    super('Parameter name must be a string');
  }
}

module.exports = InvalidName;
