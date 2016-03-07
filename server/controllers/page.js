var logger = require('../utils/logger.js')
var handleAPI = require('../utils/util.js').handleControllerAPI

exports.controller = function(app) {
	app.get('/test', function(req, resp) {
		handleAPI(req, resp, function(req, resp) {
			var msg = req.query.msg
			resp.json({
				ok: true,
				respMsg: msg + ' from server'
			})
		})
	})

	app.post('/login', function(req, resp) {
		handleAPI(req, resp, function(req, resp) {
			var email = req.body.email
			req.session.email = email
			resp.json({ ok: true })
			logger.info('logined', { email: email })
		})
	})

	app.post('/logout', function(req, resp) {
		handleAPI(req, resp, function(req, resp) {
			req.session.destroy(function(err) {
				if(err) logger.error('error', err)
				resp.json({ ok: true })
			})
		})
	})
}