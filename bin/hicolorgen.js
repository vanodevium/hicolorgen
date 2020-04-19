#!/usr/bin/env node
'use strict';
const meow = require('meow');
const hicolorgen = require('..');

const cli = meow(`
	Usage
	  $ hicolorgen <source> <destination> <name>

	Options
	  --min, -m  Minimum size
	  --max, -M  Maximum size

	Examples
	  $ hicolorgen original.png . final.png
     Done
`, {
  flags: {
    min: {
      type: 'number',
      alias: 'm',
      default: hicolorgen.MIN
    },
    max: {
      type: 'number',
      alias: 'M',
      default: hicolorgen.MAX
    }
  }
});

if (cli.input.length === 0) {
  cli.showHelp();
}

hicolorgen(cli.input[0], cli.input[1], cli.input[2], cli.flags)
  .then(() => {
    console.log('Done');
    process.exit(0);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
