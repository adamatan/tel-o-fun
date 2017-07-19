const Xray = require('x-ray');

const xray = Xray();

const url = 'https://www.tel-o-fun.ga/';

xray(url, '.marker', [['.title']])((err, value) => {
  console.log(value);
});

