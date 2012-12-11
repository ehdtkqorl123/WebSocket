/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , Logger = require('./lib/Logger');

global.Config = require('./config');
global.log  = new Logger(__dirname + '/logs/debug.log');
global.loge = new Logger(__dirname + '/logs/exception.log');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || Config.app.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('view options', { layout: true });
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/control/:sessid', routes.control);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

/**
 * socket.io server prototype
 */
var d = require('domain').create();
d.on('error', function(e) {
  console.error('domain ===========');
  console.error(e.stack);
  loge.crit(e.stack);
});

var io = require('socket.io').listen(server);
//io.set('log level', 1);
io.sockets.on('connection', function(s) {
  s.on('message', d.bind(function(data)  {
    var a = data.split(':');
    var sessid = a[0];
    var action = a[1];
    log.info('sessid:', sessid);
    log.info('action:', action);
    var to = io.sockets.sockets[sessid];
    if (!to) {
      throw new Error('not found');
      return;
    }
    to.emit('return', action);
  }));
});
