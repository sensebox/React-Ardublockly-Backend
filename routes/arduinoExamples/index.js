// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var ArduinoRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');

 ArduinoRouter.route('/')
   .post(userAuthorization, require('./postExample').postExample);

   ArduinoRouter.route('/:exampleId')
   .put(userAuthorization, require('./putExample').putExample);

  ArduinoRouter.route('/:exampleId')
   .delete(userAuthorization, require('./deleteExample').deleteExample);

  ArduinoRouter.route('/')
  .get(require('./getExamples').getArduinoExamples);

   ArduinoRouter.route('/:exampleId')
   .get(require('./getExample').getExample);

module.exports = ArduinoRouter;
