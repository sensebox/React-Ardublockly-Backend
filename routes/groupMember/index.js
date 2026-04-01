"use strict";

var express = require('express');
var GroupMemberRouter = express.Router({ mergeParams: true });

const { userAuthorization } = require('../../helper/userAuthorization');

GroupMemberRouter.route('/createStudent')
  .post(userAuthorization, require('./createStudent').createStudent);

GroupMemberRouter.route('/getAll')
  .get(userAuthorization, require('./getGroupMembers').getGroupMembers);

GroupMemberRouter.route('/:memberId/')
  .get(userAuthorization, require('./getMemberById').getMemberById);

GroupMemberRouter.route('/removeStudent')
  .delete(userAuthorization, require('./removeStudent').removeStudent);

  GroupMemberRouter.route('/dashboard')
  .get(userAuthorization, require('./getGroupMemberDashboard').getGroupMemberDashboard);

module.exports = GroupMemberRouter;
