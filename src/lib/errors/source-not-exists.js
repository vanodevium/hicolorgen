const CustomError = require('./custom');

class SourceNotExists extends CustomError {
  constructor() {
    super('Source file not exists');
  }
}

module.exports = SourceNotExists;
