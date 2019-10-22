var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var foodsRouter = require('./routes/api/foods');

var app = express();

// Swagger 
var swaggerJSDoc = require('swagger-jsdoc');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var options = {
  swaggerDefinition: {
    info: {
      title: 'ExpressRESTfulAPI',
      version: '0.0.0.'
    },
    "schemes": ["http", "https"]
  },
  apis: ['./routes/api/foods.js'],
};
var swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', function(req, res){
  res.setHeader('Content-Type','application/json');
  res.send(swaggerSpec);
});

// DB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/db', { useNewUrlParser: true, useUnifiedTopology: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/foods', foodsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
