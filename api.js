// jshint esversion: 8
// jshint node: true
"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var api = express();

//reads in configuration from a .env file
require('dotenv').config();

api.use(cors());

// view engine setup
api.set('views', path.join(__dirname, 'views'));
api.set('view engine', 'jade');

api.use(logger('dev'));
api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(cookieParser());
api.use(express.static(path.join(__dirname, 'public')));

var tutorialRouter = require('./routes/tutorial/index');
var usersRouter = require('./routes/users');

api.use('/tutorial', tutorialRouter);
api.use('/users', usersRouter);

// catch 404 and forward to error handler
api.use(function(req, res, next) {
  next(createError(404));
});

// error handler
api.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

module.exports = api;
