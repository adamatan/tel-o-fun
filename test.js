import test from 'ava';

const path = require('path');
const read = require('fs').readFileSync;
const telofun = require('.');

const html = read(path.resolve(__dirname, 'examples/local/index.html'));

test('Station Count', (t) => {
  return telofun(html).then((result) => {
    t.is(result.length > 200, true);
  });
});
