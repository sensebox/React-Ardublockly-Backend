// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var TutorialRouter = express.Router();

const { upload } = require('../../helper/imageUpload');

TutorialRouter.route('/')
  .post(upload.any(), require('./postTutorial').postTutorial);

TutorialRouter.route('/')
  .get(require('./getTutorials').getTutorials);

TutorialRouter.route('/:tutorialId')
  .get(require('./getTutorial').getTutorial);

module.exports = TutorialRouter;
