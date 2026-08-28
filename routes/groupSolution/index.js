"use strict";

var express = require('express');
var GroupSolutionRouter = express.Router({ mergeParams: true });

const { userAuthorization } = require('../../helper/userAuthorization');

GroupSolutionRouter.route('/postGroupSolution')
  .post(userAuthorization, require('./postGroupSolution').postGroupSolution);

GroupSolutionRouter.route('/postSolution')
  .post(userAuthorization, require('./postGroupSolution').postGroupSolution);

GroupSolutionRouter.route('/postSolution/:memberId')
  .post(userAuthorization, require('./postGroupSolution').postGroupSolution);

GroupSolutionRouter.route('/getAllGroupSolutions')
  .get(userAuthorization, require('./getGroupSolutions').getGroupSolutions);

GroupSolutionRouter.route('/getAllSolutions')
  .get(userAuthorization, require('./getGroupSolutions').getGroupSolutions);

GroupSolutionRouter.route('/getSolution/:solutionId')
  .get(userAuthorization, require('./getSolution').getSolution);

GroupSolutionRouter.route('/removeGroupSolution')
  .delete(userAuthorization, require('./removeGroupSolution').removeGroupSolution);     

module.exports = GroupSolutionRouter;