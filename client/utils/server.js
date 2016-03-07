import request from 'superagent'

var wrapCallback = function(callback) {
	return function(err, resp) {
		if(err) {
			callback(err)
			return
		}
		if(resp.body.err) {
			callback(resp.body.err)
			return
		}
		callback(null, resp.body)
	}
}

module.exports = {
	test: function(args, callback) {
		request.get('/test')
			.query(args)
			.end(callback)
	}
}