// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var ProjectRouter = express.Router();

const { userAuthorization } = require('../helper/userAuthorization');

ProjectRouter.route('/')
  .post(userAuthorization, require('./postProject').postProject);

ProjectRouter.route('/:projectId')
  .put(userAuthorization, require('./putProject').putProject);

ProjectRouter.route('/:projectId')
  .delete(userAuthorization, require('./deleteProject').deleteProject);

ProjectRouter.route('/')
  .get(userAuthorization, require('./getProjects').getProjects);

ProjectRouter.route('/:projectId')
  .get(userAuthorization, require('./getProject').getProject);

module.exports = ProjectRouter;
