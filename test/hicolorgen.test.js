const test = require('ava');
const rimraf = require('rimraf');
const glob = require('glob');
const hicolorgen = require('./..');
const validateName = require('./../src/lib/validate-name');
const InvalidSourceError = require('../src/lib/errors/invalid-source-path');
const InvalidPathError = require('../src/lib/errors/invalid-destination-path');
const InvalidNameError = require('../src/lib/errors/invalid-name');
const NameIsEmptyError = require('../src/lib/errors/name-is-empty');
const SourceNotExistsError = require('../src/lib/errors/source-not-exists');
const SourceMustBeSquareError = require('../src/lib/errors/source-must-be-square');
const SourceUnsupportedFormatError = require('../src/lib/errors/source-with-unsupported-format');
const DestinationPathIsNotWritableError = require('../src/lib/errors/destination-path-is-not-writable');
const InvalidMinError = require('../src/lib/errors/invalid-min');
const InvalidMaxError = require('../src/lib/errors/invalid-max');
const InvalidMinMaxError = require('../src/lib/errors/invalid-min-max');

const ORIGINAL = './test/original.png';
const FINAL = 'final.png';
const OUT = './test/.out';

const clearOutFolder = () => rimraf.sync(OUT);
const countFiles = () => glob.sync(OUT + '/**/*.png').length;

test('hicolorgen testing...', async t => {
  t.true(await t.throwsAsync(() => hicolorgen('', '', '')) instanceof InvalidSourceError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, '', '')) instanceof InvalidPathError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, '.', '')) instanceof InvalidNameError);
  t.true(await t.throwsAsync(() => hicolorgen('./test/not-exists.png', '.', FINAL)) instanceof SourceNotExistsError);
  t.true(await t.throwsAsync(() => hicolorgen('./test/not-square.png', '.', FINAL)) instanceof SourceMustBeSquareError);
  t.true(await t.throwsAsync(() => hicolorgen('./test/ico.svg', '.', FINAL)) instanceof SourceUnsupportedFormatError);
  t.true(await t.throwsAsync(() => hicolorgen('./test/not-a-picture.txt', '.', FINAL)) instanceof SourceUnsupportedFormatError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, '/', FINAL)) instanceof DestinationPathIsNotWritableError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {min: 1})) instanceof InvalidMinError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {min: 'min'})) instanceof InvalidMinError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {min: 0.3})) instanceof InvalidMinError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {max: 1024})) instanceof InvalidMaxError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {max: 'max'})) instanceof InvalidMaxError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {max: 0.3})) instanceof InvalidMinMaxError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {min: 1024})) instanceof InvalidMinMaxError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {max: 1})) instanceof InvalidMinMaxError);
  t.true(await t.throwsAsync(() => hicolorgen(ORIGINAL, OUT, FINAL, {min: 21, max: 19})) instanceof InvalidMinMaxError);

  clearOutFolder();

  await hicolorgen('./test/original.png', OUT, FINAL);
  t.is(10, countFiles());
  clearOutFolder();

  await hicolorgen('./test/original.png', OUT, FINAL, {min: 22, max: 256});
  t.is(8, countFiles());
  clearOutFolder();

  await hicolorgen('./test/original.png', OUT, FINAL, {min: 64, max: 64});
  t.is(1, countFiles());
  clearOutFolder();
});

test('validate-name testing...', t => {
  t.is(validateName('final'), 'final.png');
  t.is(validateName('final.png'), 'final.png');
  t.is(validateName('final.PNG'), 'final.png');
  t.is(validateName('final.jpg'), 'final.png');
  t.is(validateName('/final.jpg'), 'final.png');
  t.is(validateName('a/b/c/final.jpg'), 'a/b/c/final.png');
  t.is(validateName('/a/b/c/final.jpg'), 'a/b/c/final.png');
  t.true(t.throws(() => validateName('/../..')) instanceof NameIsEmptyError);
  t.true(t.throws(() => validateName('/')) instanceof NameIsEmptyError);
  t.true(t.throws(() => validateName('.')) instanceof NameIsEmptyError);
});
