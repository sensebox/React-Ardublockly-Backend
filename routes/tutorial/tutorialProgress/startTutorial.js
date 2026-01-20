// jshint esversion: 8
// jshint node: true
"use strict";

const mongoose = require("mongoose");

const Tutorial = require("../../../models/tutorial");
const TutorialProgress = require("../../../models/tutorialProgress");

/**
 * @api {post} /tutorial/:tutorialId/start Start tutorial
 * @apiName startTutorial
 * @apiDescription Initializes tutorial progress for the current user.
 * @apiGroup Tutorial
 *
 * @apiParam {ObjectId} tutorialId ID of the tutorial to start
 *
 * @apiSuccess (200) {String} message Tutorial started successfully.
 * @apiSuccess (200) {Object} progress Tutorial progress document
 *
 * @apiError (404) Tutorial not found
 * @apiError (500) Database error
 */
const startTutorial = async function (req, res) {
  try {
    const tutorialId = req.params.tutorialId;
    const userId = req.user._id;

    // 🔍 Tutorial existiert?
    const tutorialExists = await Tutorial.exists({ _id: tutorialId });
    if (!tutorialExists) {
      return res.status(404).send({
        message: "Tutorial not found.",
      });
    }

    // 🔁 Progress schon vorhanden?
    let progress = await TutorialProgress.findOne({
      user: userId,
      tutorial: tutorialId,
    });

    // 🆕 Falls nicht → anlegen
    if (!progress) {
      progress = await TutorialProgress.create({
        user: userId,
        tutorial: tutorialId,
        steps: {},
      });
    }

    return res.status(200).send({
      message: "Tutorial started successfully.",
      progress,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  startTutorial,
};
