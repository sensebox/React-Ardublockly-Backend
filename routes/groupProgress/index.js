"use strict";

var express = require('express');
var GroupProgressRouter = express.Router({ mergeParams: true });

const { userAuthorization } = require('../../helper/userAuthorization');
const { patchTutorialProgress } = require('./patchTutorialProgress');
const { postTutorialProgress } = require('./postTutorialProgress');
const { getTutorialProgress } = require('./getTutorialProgress');

GroupProgressRouter.route('/patchTutorialProgress/:memberId')
  .put(userAuthorization, patchTutorialProgress);

GroupProgressRouter.route('/postTutorialProgress/:memberId')
  .post(userAuthorization, postTutorialProgress);

GroupProgressRouter.route('/getTutorialProgress/:memberId')
  .get(userAuthorization, getTutorialProgress);


module.exports = GroupProgressRouter;