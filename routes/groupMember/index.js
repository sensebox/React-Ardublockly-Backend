"use strict";

var express = require('express');
var GroupMemberRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');

GroupMemberRouter.route('/createStudent/:groupId')
  .post(userAuthorization, require('./createStudent').createStudent);

GroupMemberRouter.route('/members/:groupId')
  .get(userAuthorization, require('./getGroupMembers').getGroupMembers);

GroupMemberRouter.route('/members/:memberId/:groupId')
  .get(userAuthorization, require('./getMemberById').getMemberById);

GroupMemberRouter.route('/removeStudent/:groupId')
  .delete(userAuthorization, require('./removeStudent').removeStudent);



module.exports = GroupMemberRouter;
