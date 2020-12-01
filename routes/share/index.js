// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var ShareRouter = express.Router();

ShareRouter.route('/')
  .post(require('./postShare').postShare);

ShareRouter.route('/:shareId')
  .get(require('./getShare').getShare);

module.exports = ShareRouter;
