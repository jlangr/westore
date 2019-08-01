require('babel-register')({ presets: ['env']})

global.isTestServer = () => process.argv[2] === '--test'

if (global.isTestServer())
  console.log('***test mode*** test functions enabled')
else
  console.log('prod mode; test functions disabled')

module.exports = require('./index.js')
