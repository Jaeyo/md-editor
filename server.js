var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var fs = require('fs');
var conf = require('./server/conf.js');
var logger = require('./server/utils/logger.js');
var app = express();

logger.info('server started', { port: conf.port });

app.set('port', conf.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'server/static')));
app.use(session({
	secret: 'alskjoiw',
	resave: false,
	saveUninitialized: true
}));

fs.readdirSync('./server/controllers').forEach(function(file) {
	if(file.substr(-3) !== '.js') return;
	var route = require('./server/controllers/' + file);
	if(route.controller === undefined) return;
	route.controller(app);
});

var server = app.listen(app.get('port'), function() {
	logger.info('express server listening on port ' + app.get('port'));
});