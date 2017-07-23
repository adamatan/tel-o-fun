import test from 'ava';
const assert = require('assert');
const path = require('path');
const read = require('fs').readFileSync;
const telofun = require('.');
const html = read(path.resolve(__dirname, 'examples/local/index.html'));

test('foo', (t) => {
  t.pass();
});

test('Station Count', (t) => {
  return telofun(html).then((result) => {
    t.is(result.length > 200, true);
  });
});
