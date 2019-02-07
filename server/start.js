require('babel-register')({ presets: ['env']})

// START_HIGHLIGHT
global.isTestServer = () => process.argv[2] === '--test'
// END_HIGHLIGHT

module.exports = require('./index.js')
