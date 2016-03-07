module.exports = {
	port: 1234,
	logger: {
		console: {
			level: 'debug',
			colorize: true,
			timestamp: true,
			prettyPrint: true 
		},
		file: {
			level: 'debug',
			json: false,
			colorize: false,
			timestamp: true,
			prettyPrint: true,
			filename: 'app.log',
			maxsize: 5242880,
			maxFiles: 5
		}
	}
}