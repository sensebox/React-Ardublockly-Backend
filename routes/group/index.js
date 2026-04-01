"use strict";


var express = require('express');
var GroupRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');

var groupMemberRouter = require('../groupMember/index');
var groupTutorialRouter = require('../groupTutorial/index');
var groupSolutionRouter = require('../groupSolution/index');
var groupProgressRouter = require('../groupProgress/index');

GroupRouter.use('/:groupId/member', groupMemberRouter);
GroupRouter.use('/:groupId/tutorial', groupTutorialRouter);
GroupRouter.use('/:groupId/solution', groupSolutionRouter);
GroupRouter.use('/:groupId/progress', groupProgressRouter);

GroupRouter.route('/')
  .post(userAuthorization, require('./postGroup').postGroup);

GroupRouter.route('/:groupId/archive')
  .patch(userAuthorization, require('./archiveGroup').archiveGroup);

GroupRouter.route('/:groupId/dashboard')
  .get(userAuthorization, require('./getGroupDashboard').getGroupDashboard);

GroupRouter.route('/:groupId/leave/delete')
  .delete(userAuthorization, require('./leaveAndDeleteGroup').leaveAndDeleteGroup);

GroupRouter.route('/join')
  .post(require('./joinGroup').joinGroup);

GroupRouter.route('/:groupId')
  .get(userAuthorization, require('./getGroupById').getGroupById);

GroupRouter.route('/getAll')
  .get(userAuthorization, require('./getAllGroup').getAllGroup);

module.exports = GroupRouter;
