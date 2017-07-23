/**
 * Scrape the stations from a local file (index.html downloaded from https://www.tel-o-fun.ga/).
 */
const path = require('path');
const read = require('fs').readFileSync;
const telofun = require('../../tel-o-fun.js');
const html = read(path.resolve(__dirname, 'index.html'));

telofun(html)
.then((stations) => { console.log(stations); });
