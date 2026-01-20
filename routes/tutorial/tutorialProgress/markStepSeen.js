// jshint esversion: 8
// jshint node: true
"use strict";

const TutorialProgress = require("../../../models/tutorialProgress");

/**
 * @api {post} /tutorial/:tutorialId/steps/:stepId/seen
 * @apiName markStepSeen
 * @apiDescription Marks a tutorial step as seen for the current user.
 * @apiGroup Tutorial
 */
const markStepSeen = async function (req, res) {
  try {
    const { tutorialId, stepId } = req.params;
    const userId = req.user._id;

    await TutorialProgress.findOneAndUpdate(
      { user: userId, tutorial: tutorialId },
      {
        $set: {
          [`steps.${stepId}.seen`]: true,
        },
      },
      { upsert: false }
    );

    return res.status(200).send({
      message: "Step marked as seen.",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  markStepSeen,
};
