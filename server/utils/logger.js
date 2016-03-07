var winston = require('winston')
var conf = require('../conf.js')

var logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)(conf.logger.console),
		new (winston.transports.File)(conf.logger.file)
	]
})

module.exports = logger