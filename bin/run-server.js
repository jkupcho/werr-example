var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');
var config;

try {
  config = JSON.parse(babelrc);
} catch (err) {
  console.error(err);
}

// Load babel
require('babel-register')(config);

// Start server
require('../src/server');