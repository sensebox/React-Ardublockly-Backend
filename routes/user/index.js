// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var UserRouter = express.Router();


UserRouter.route('/')
  .post(require('./user/login').login);


module.exports = UserRouter;
