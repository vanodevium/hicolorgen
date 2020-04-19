const CustomError = require('./custom');

class InvalidMin extends CustomError {
  constructor(min) {
    super(`Parameter min must be an integer and greater than or equal ${min}`);
  }
}

module.exports = InvalidMin;
