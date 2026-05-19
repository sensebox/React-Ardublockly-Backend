"use strict";

var express = require('express');
var GroupMemberRouter = express.Router({ mergeParams: true });

const { userAuthorization } = require('../../helper/userAuthorization');

GroupMemberRouter.route('/createStudent')
  .post(userAuthorization, require('./createStudent').createStudent);

GroupMemberRouter.route('/getAll')
  .get(userAuthorization, require('./getGroupMembers').getGroupMembers);

GroupMemberRouter.route('/getSingleMember/:memberId/')
  .get(userAuthorization, require('./getMemberById').getMemberById);

GroupMemberRouter.route('/removeStudent')
  .delete(userAuthorization, require('./removeStudent').removeStudent);

  GroupMemberRouter.route('/dashboard/:memberId')
  .get(userAuthorization, require('./getGroupMemberDashboard').getGroupMemberDashboard);

  GroupMemberRouter.route('/heartbeat/:memberId')
  .post(require('./HeartbeatMember').heartbeatMember);

  GroupMemberRouter.route('/leave')
  .put(userAuthorization, require('./leaveGroup').leaveGroup);

module.exports = GroupMemberRouter;
