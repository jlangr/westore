require('babel-register')({ presets: ['env']})

global.isTestServer = () => process.argv[2] === '--test'

module.exports = require('./index.js')
