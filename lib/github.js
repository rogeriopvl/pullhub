const config = require('./config')
const Github = require('github-api')

module.exports = new Github({ token: config.githubToken })
