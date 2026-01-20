// jshint esversion: 8
// jshint node: true
"use strict";

const express = require("express");
const TutorialRouter = express.Router();

const { userAuthorization } = require("../../helper/userAuthorization");
const { upload } = require("../../helper/imageUpload");

// Tutorial CRUD
const { postTutorial } = require("./postTutorial");
const { putTutorial } = require("./putTutorial");
const { deleteTutorial } = require("./deleteTutorial");
const { getTutorial } = require("./getTutorial");
const { getTutorials } = require("./getTutorials");
const { getAllTutorials } = require("./getAllTutorials");
const { getUserTutorials } = require("./getUserTutorials");

// Tutorial Progress
const { startTutorial } = require("./tutorialProgress/startTutorial");
const { markStepSeen } = require("./tutorialProgress/markStepSeen");
const { answerQuestion } = require("./tutorialProgress/answerQuestion");
const { getProgress } = require("./tutorialProgress/getProgress");
const { deleteProgress } = require("./tutorialProgress/deleteProgress");
const { getAllProgress } = require("./tutorialProgress/getAllProgress");

/* ---------- LIST ROUTES ---------- */

TutorialRouter.get("/", getTutorials);
TutorialRouter.get("/getAllTutorials", userAuthorization, getAllTutorials);
TutorialRouter.get("/getUserTutorials", userAuthorization, getUserTutorials);

/* ---------- PROGRESS ROUTES (FIRST!) ---------- */

// 🔥 alle Progresse des Users
TutorialRouter.get("/progress", userAuthorization, getAllProgress);

// 🔥 Progress eines Tutorials
TutorialRouter.get("/:tutorialId/progress", userAuthorization, getProgress);

TutorialRouter.post(
  "/:tutorialId/steps/:stepId/seen",
  userAuthorization,
  markStepSeen
);

TutorialRouter.post(
  "/:tutorialId/steps/:stepId/questions/answer",
  userAuthorization,
  answerQuestion
);

TutorialRouter.post("/:tutorialId/start", userAuthorization, startTutorial);

TutorialRouter.delete(
  "/:tutorialId/progress",
  userAuthorization,
  deleteProgress
);

/* ---------- CRUD ROUTES ---------- */

TutorialRouter.post("/", userAuthorization, upload.any(), postTutorial);

TutorialRouter.put(
  "/:tutorialId",
  userAuthorization,
  upload.any(),
  putTutorial
);

TutorialRouter.delete("/:tutorialId", userAuthorization, deleteTutorial);

/* ---------- LAST: SINGLE TUTORIAL ---------- */

TutorialRouter.get("/:tutorialId", getTutorial);

module.exports = TutorialRouter;
