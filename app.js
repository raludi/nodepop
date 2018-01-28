
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();
var app = express();
var i18n = require('i18n')

require('./lib/connectMongo');

i18n.configure({
    locales:['en', 'es'],
    directory: __dirname + '/locales'
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
//si no usamos estaticos los ponemos despues de las rutas
app.use(express.static(path.join(__dirname, 'public')));//sirve ficheros estaticos de la ruta public

//Ficheros estáticos
app.use('/images/bike.jpg', express.static (__dirname + '/public/images/bike.jpg'));
app.use('/images/iphone.jpg', express.static (__dirname + '/public/images/iphone.jpg'));
app.use('/images/figure.jpg', express.static (__dirname + '/public/images/figure.jpg'));
app.use('/images/display.jpg', express.static (__dirname + '/public/images/display.jpg'));
app.use('/images/mac.jpg', express.static (__dirname + '/public/images/mac.jpg'));

//Cargamos nuestras rutas
app.use('/', require('./routes/index'));
app.use('/apiV1/users', require('./routes/apiV1/users'));
app.use('/apiV1/ads', require('./routes/apiV1/ads'));

//Si ningun middleware(use) es aceptado nos vamos al siguiente que muestra el error
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  return res.json({success: false, 
      error: res.__(err.message),  
      status: err.status});
});


module.exports = app;
