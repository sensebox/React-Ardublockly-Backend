"use strict";

var express = require('express');
var GroupTutorialRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');

GroupTutorialRouter.route('/:groupId/postTutorials')
  .post(userAuthorization, require('./postGroupTutorial').postGroupTutorial);

GroupTutorialRouter.route('/:groupId/getAllTutorials')
  .get(userAuthorization, require('./getGroupTutorials').getGroupTutorials);

GroupTutorialRouter.route('/:groupId/getTutorialById/:tutorialId')
  .get(userAuthorization, require('./getGroupTutorialById').getGroupTutorialById);

GroupTutorialRouter.route('/:groupId/removeGroupTutorial/')
  .delete(userAuthorization, require('./removeGroupTutorial').removeGroupTutorial);  

module.exports = GroupTutorialRouter;