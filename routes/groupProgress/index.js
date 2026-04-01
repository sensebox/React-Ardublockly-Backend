"use strict";

var express = require('express');
var GroupProgressRouter = express.Router({ mergeParams: true });

const { userAuthorization } = require('../../helper/userAuthorization');

GroupProgressRouter.route('/patchTutorialProgress')
  .put(userAuthorization, require('./patchTutorialProgress').patchTutorialProgress);


module.exports = GroupProgressRouter;