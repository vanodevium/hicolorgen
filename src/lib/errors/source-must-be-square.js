const CustomError = require('./custom');

class SourceMustBeSquare extends CustomError {
  constructor() {
    super('Source must be a square image');
  }
}

module.exports = SourceMustBeSquare;
