var bodyParser = require('body-parser');
var express = require('express');
var flash = require('connect-flash');
var http = require('http');
var logger = require('morgan');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');
var session = require('express-session');

var app = express();
var SessionStore = require('connect-redis')(session);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/contacts');

// Bootstrap models
var models = {
  Contact: require('./app/models/contact')
}

app.set('port', process.env.PORT || 4000);

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.set('view options', { layout: 'layouts/default' });

app.use(logger('dev'));

app.use(session({
  secret: 'shhhhhhhhh!',
  saveUninitialized: false,
  resave: true,
  store: new SessionStore({
    cookie: { },
    db: 1,
    host: 'localhost'
  })
}));
app.use(flash());

app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

require('./config/routes')(app);

var server = http.createServer(app);

require('./config/sockets')(server);

server.listen(app.get('port'), function () {
  console.log('Express server running on http://localhost:' + app.get('port'));
});
