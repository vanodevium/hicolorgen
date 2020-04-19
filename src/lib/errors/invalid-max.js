const CustomError = require('./custom');

class InvalidMax extends CustomError {
  constructor(max) {
    super(`Parameter max must be an integer and less than or equal to ${max}`);
  }
}

module.exports = InvalidMax;
