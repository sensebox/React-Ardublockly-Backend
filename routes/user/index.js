// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var UserRouter = express.Router();


UserRouter.route('/')
  .post(require('./user/login').login);

UserRouter.route('/')
  .get(require('./user/me').me);


module.exports = UserRouter;
