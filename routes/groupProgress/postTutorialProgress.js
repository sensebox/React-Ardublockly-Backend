"use strict";

const GroupMember = require("../../models/groupMembers");

/**
 * @api {post} /progress Create student progress
 * @apiName postProgress
 * @apiDescription Create or initialize current progress for a student.
 * @apiGroup Progress
 */
const postTutorialProgress = async function (req, res) {
  try {
    const { groupId, memberId } = req.params;
    const { tutorialId, tutorialTitle, currentStep, totalSteps } = req.body;

    const member = await GroupMember.findOneAndUpdate(
      { _id: memberId, groupId },
      {
        tutorialId,
        currentTutorialTitle: tutorialTitle,
        currentStep,
        totalSteps,
      },
      { new: true }
    );

    if (!member) {
      return res.status(404).send({ message: "Member not found." });
    }

    return res.status(200).send({ message: "Progress created.", member });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  postTutorialProgress,
};
