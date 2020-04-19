const CustomError = require('./custom');

class NameIsEmpty extends CustomError {
  constructor() {
    super('Name must not be empty');
  }
}

module.exports = NameIsEmpty;
