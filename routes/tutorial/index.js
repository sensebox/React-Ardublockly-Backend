// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var TutorialRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');
const { upload } = require('../../helper/imageUpload');

TutorialRouter.route('/')
  .post(userAuthorization, upload.any(), require('./postTutorial').postTutorial);

TutorialRouter.route('/:tutorialId')
  .put(userAuthorization, upload.any(), require('./putTutorial').putTutorial);

TutorialRouter.route('/:tutorialId')
  .delete(userAuthorization, require('./deleteTutorial').deleteTutorial);

TutorialRouter.route('/')
  .get(require('./getTutorials').getTutorials);

TutorialRouter.route('/:tutorialId')
  .get(require('./getTutorial').getTutorial);

module.exports = TutorialRouter;
