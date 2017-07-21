const path = require('path');
const Xray = require('x-ray');
const read = require('fs').readFileSync;

const html = read(path.resolve(__dirname, 'index.html'));
const xray = Xray();

xray(html, '.marker', [
  {
    bikes: '.bikes',
    lat: '@data-lat',
    lon: '@data-lng',
    address: '@data-name',
    stationId: '@data-id' },
])((err, stations) => {
  const processedStations = stations.map(s =>
    Object.assign({}, s, { stationId: parseInt(s.stationId, 10) }));
  console.log(processedStations.slice(0, 2));
});

