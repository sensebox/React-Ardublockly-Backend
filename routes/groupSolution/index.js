"use strict";

var express = require('express');
var GroupSolutionRouter = express.Router({ mergeParams: true });

const { userAuthorization } = require('../../helper/userAuthorization');

GroupSolutionRouter.route('/postGroupSolution')
  .post(userAuthorization, require('./postGroupSolutions').postGroupSolution);

GroupSolutionRouter.route('/getAllGroupSolutions')
  .get(userAuthorization, require('./getGroupSolutions').getGroupSolutions);

GroupSolutionRouter.route('/removeGroupSolution')
  .delete(userAuthorization, require('./removeGroupSolution').removeGroupSolution);     

module.exports = GroupSolutionRouter;