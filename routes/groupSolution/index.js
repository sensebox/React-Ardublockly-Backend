"use strict";

var express = require('express');
var GroupSolutionRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');

GroupSolutionRouter.route('/:groupId/postGroupSolution')
  .post(userAuthorization, require('./postGroupSolutions').postGroupSolution); 

GroupSolutionRouter.route('/:groupId/getAllGroupSolutions')
  .get(userAuthorization, require('./getGroupSolutions').getGroupSolutions);

GroupSolutionRouter.route('/:groupId/removeGroupSolution')
  .delete(userAuthorization, require('./removeGroupSolution').removeGroupSolution);     

module.exports = GroupSolutionRouter;