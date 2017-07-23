import test from 'ava';

const path = require('path');
const read = require('fs').readFileSync;
const telofun = require('.');

const html = read(path.resolve(__dirname, 'examples/local/index.html'));

let stations;

test.before(async () => {
  stations = await telofun(html);
});

test('Station Count', (t) => {
  t.is(stations.length > 200, true);
});

test('Every station object has all expected fields', (t) => {
  t.is(stations.every((station) => {
    return ('stationId' in station);
  }), true);
});

