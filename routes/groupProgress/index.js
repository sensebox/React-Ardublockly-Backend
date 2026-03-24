"use strict";

var express = require('express');
var GroupProgressRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');

GroupProgressRouter.route('/:groupId/patchTutorialProgress')
  .put(userAuthorization, require('./patchTutorialProgress').patchTutorialProgress);


module.exports = GroupProgressRouter;