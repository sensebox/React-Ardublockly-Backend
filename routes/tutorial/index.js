var express = require('express');
var TutorialRouter = express.Router();

TutorialRouter.route('/')
  .post(require('./postTutorial').postTutorial);

TutorialRouter.route('/')
  .get(require('./getTutorials').getTutorials);

TutorialRouter.route('/:tutorialId')
  .get(require('./getTutorial').getTutorial);

module.exports = TutorialRouter;
