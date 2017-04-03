var express = require('express'),
  path = require('path');
favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  exphbs = require('express-handlebars'),
  config = require('./config/config');
// Mongo connect
var MongoClient = require('mongodb').MongoClient;
var db;
MongoClient.connect(config.dbUrl, (err, database) => {
  if (err) return console.log(err);
  db = database;
})

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.engine('.hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// grant db to req
app.use((req, res, next) => {
  req.db = db;
  next();
})
app.use('/', index);
app.use('/api/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
