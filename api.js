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
// api.use(express.urlencoded({ extended: true, limit: '10mb' }));
api.use(cookieParser());

// uploaded images
api.use('/media', express.static(path.join(__dirname, 'upload')));

var tutorialRouter = require('./routes/tutorial/index');
var shareRouter = require('./routes/share/index');
var galleryRouter = require('./routes/gallery/index');

api.use('/tutorial', tutorialRouter);
api.use('/share', shareRouter);
api.use('/gallery', galleryRouter);

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
