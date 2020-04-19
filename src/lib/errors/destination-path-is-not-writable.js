const CustomError = require('./custom');

class DestinationPathIsNotWritable extends CustomError {
  constructor() {
    super('Destination path is not writable');
  }
}

module.exports = DestinationPathIsNotWritable;
