var logger = require('./logger.js')

exports.handleControllerAPI = function(req, resp, callback) {
	try {
		callback(req, resp)
	} catch(err) {
		logger.error(err.stack)
		resp.json({
			ok: false,
			err: err,
			errmsg: JSON.stringify(err)
		})
	}
}