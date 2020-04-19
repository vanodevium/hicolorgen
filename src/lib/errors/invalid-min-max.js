const CustomError = require('./custom');

class InvalidMinMax extends CustomError {
  constructor(sizes) {
    super(`The parameters min must be less than or equal to max
and can only take such values: ${sizes.join(', ')}`);
  }
}

module.exports = InvalidMinMax;
