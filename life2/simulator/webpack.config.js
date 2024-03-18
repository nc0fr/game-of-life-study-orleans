const path = require('path');

module.exports = {
  entry : './src/simulator.js',
  output : {path : path.resolve(__dirname, 'dist'), filename : 'simulator.js'},
};
