#!/usr/bin/env node

const program = require('commander');
const telofun = require('..');
const Table = require('cli-table');

let stationIds = [];

program
  .version('0.1.0')
  .arguments('[station] [otherStations...]')
  .action((station, otherStations) => {
    stationIds = [station].concat(otherStations);
    stationIds = stationIds.map(i => parseInt(i, 10));
  });

const table = new Table({
  head: ['id', 'Address', 'Available bikes', 'Available slots'],
  chars: { mid: '', 'left-mid': '', 'mid-mid': '', 'right-mid': '' },
});

program.parse(process.argv);
telofun('https://www.tel-o-fun.ga/en').then((stations) => {
  for (let i = 0; i < stations.length; i += 1) {
    const station = stations[i];
    if (stationIds.length === 0 || stationIds.indexOf(station.stationId) > -1) {
      table.push([station.stationId, station.location.address, station.bikes.availableBikes,
        station.bikes.availableParkingSlots]);
    }
  }
  console.log(table.toString());
});
