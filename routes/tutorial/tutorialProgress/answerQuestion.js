// jshint esversion: 8
// jshint node: true
"use strict";

const TutorialProgress = require("../../../models/tutorialProgress");

/**
 * @api {post} /tutorial/:tutorialId/steps/:stepId/questions/:questionId/answer
 * @apiName answerQuestion
 * @apiDescription Stores the user's answer for a question.
 * @apiGroup Tutorial
 */
const answerQuestion = async function (req, res) {
  try {
    const { tutorialId, stepId } = req.params;
    const userId = req.user._id;
    const { correct, questionId } = req.body;
    await TutorialProgress.findOneAndUpdate(
      { user: userId, tutorial: tutorialId },
      {
        $set: {
          [`steps.${stepId}.questions.${questionId}`]: {
            answered: true,
            correct: !!correct,
          },
        },
      },
      { upsert: false }
    );

    return res.status(200).send({
      message: "Question answered.",
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  answerQuestion,
};
