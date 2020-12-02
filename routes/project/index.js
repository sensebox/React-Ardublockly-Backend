// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var ProjectRouter = express.Router();

ProjectRouter.route('/')
  .post(require('./postProject').postProject);

ProjectRouter.route('/:projectId')
  .put(require('./putProject').putProject);

ProjectRouter.route('/:projectId')
  .delete(require('./deleteProject').deleteProject);

ProjectRouter.route('/')
  .get(require('./getProjects').getProjects);

ProjectRouter.route('/:projectId')
  .get(require('./getProject').getProject);

module.exports = ProjectRouter;
