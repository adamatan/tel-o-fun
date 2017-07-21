/**
 * Scrapes the Tel-O-Fun website into an array of station objects,
 * each having location and bike availability data.
 *
 */

const path = require('path');
const Xray = require('x-ray');
const read = require('fs').readFileSync;

const html = read(path.resolve(__dirname, 'index.html'));
const xray = Xray();

/**
 * Processes the raw web scrape result to a meaningful object.
 *  - Converting strings to numbers
 *  - Rearraniging fields to sub-objects
 */
function processStation(station) {
  return {
    stationId: parseInt(station.stationId, 10),
    location: {
      lat: parseFloat(station.lat),
      lon: parseFloat(station.lon),
      address: station.address,
    },
    bikes: {
      availableBikes: parseInt(station.availableBikes.match(/\d+/)[0]),
      availableParkingSlots: parseInt(station.parkingSlots[1].match(/\d+/)[0]),
    },
  };
}

/**
 * Parses a Tel-O-Fun HTML string or URL into a list of station objects
 * with bike availability and location.
 * @returns {Promise} A promise resolved to a list of station objects.
 */
function scrapeBikeStations(rawHtml) {
  return new Promise((resolve, reject) => {
    xray(rawHtml, '.marker', [
      {
        availableBikes: '.bikes',
        lat: '@data-lat',
        lon: '@data-lng',
        address: '@data-name',
        stationId: '@data-id',
        parkingSlots: xray('.station-data', ['span']),
      },
    ])((err, stations) => {
      if (err) {
        reject(err);
      } else {
        resolve(stations.map(s => processStation(s)));
      }
    });
  });
}

module.exports = scrapeBikeStations;
