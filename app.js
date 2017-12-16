
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
app.use('/ads/bike.png', express.static (__dirname + '/public/images/ads/bike.jpg'));
app.use('/ads/iphone.png', express.static (__dirname + '/public/images/ads/iphone.jpg'));
app.use('/ads/figure.png', express.static (__dirname + '/public/images/ads/figure.jpg'));
app.use('/ads/display.png', express.static (__dirname + '/public/images/ads/display.jpg'));
app.use('/ads/mac.png', express.static (__dirname + '/public/images/ads/mac.jpg'));

//Cargamos nuestras rutas
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/apiV1/users'));
app.use('/ads', require('./routes/apiV1/ads'));

//Si ningun middleware(use) es aceptado nos vamos al siguiente que muestra el error
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  if(err.status === 422) {
    return res.json({ success: false, error: err.message, status: err.status });
  }
  res.status(err.status || 500);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Error para una página web
  return res.json({success: false,
      error: i18n.__({phrase:err.message , locale: (err.language !== undefined ? err.language : 'es')}),
       status: err.status});
});


module.exports = app;
