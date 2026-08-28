"use strict";

var express = require('express');
var GroupTutorialRouter = express.Router({ mergeParams: true });

const { userAuthorization } = require('../../helper/userAuthorization');

GroupTutorialRouter.route('/:tutorialId/postTutorial')
  .post(userAuthorization, require('./postGroupTutorial').postGroupTutorial);

GroupTutorialRouter.route('/getAllTutorials')
  .get(userAuthorization, require('./getGroupTutorials').getGroupTutorials);

GroupTutorialRouter.route('/getTutorialById/:tutorialId')
  .get(userAuthorization, require('./getGroupTutorialById').getGroupTutorialById);

GroupTutorialRouter.route('/:tutorialId/removeGroupTutorial')
  .delete(userAuthorization, require('./removeGroupTutorial').removeGroupTutorial);  

module.exports = GroupTutorialRouter;