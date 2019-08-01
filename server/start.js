require('babel-register')({ presets: ['env']})

// START_HIGHLIGHT
global.isTestServer = () => process.argv[2] === '--test'
// END_HIGHLIGHT

if (global.isTestServer())
  console.log('***test mode*** test functions enabled')
else
  console.log('prod mode; test functions disabled')

module.exports = require('./index.js')
