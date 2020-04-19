const CustomError = require('./custom');

class SourceWithUnsupportedFormat extends CustomError {
  constructor(formats) {
    super(`Source must be an image in one of these formats: ${formats.join(', ')}`);
  }
}

module.exports = SourceWithUnsupportedFormat;
