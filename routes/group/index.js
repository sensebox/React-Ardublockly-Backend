"use strict";

var express = require('express');
var GroupRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');

GroupRouter.use('/:groupId/member', groupMemberRouter);
GroupRouter.use('/:groupId/tutorial', groupTutorialRouter);
GroupRouter.use('/:groupId/solution', groupSolutionRouter);
GroupRouter.use('/:groupId/progress', groupProgressRouter);



GroupRouter.route('/')
  .post(userAuthorization, require('./postGroup').postGroup);

GroupRouter.route('/:groupId/archive')
  .post(userAuthorization, require('./archiveGroup').archiveGroup);

GroupRouter.route('/:groupId')
  .get(userAuthorization, require('./getGroupById').getGroupById);

GroupRouter.route('/dashboard/:groupId')
  .get(userAuthorization, require('./getGroupDashboard').getGroupDashboard);

GroupRouter.route('/:groupId/leave/delete')
  .delete(userAuthorization, require('./leaveAndDeleteGroup').leaveAndDeleteGroup);

GroupRouter.route('/:groupId/join')
  .post(require('./joinGroup').joinGroup);

module.exports = GroupRouter;
