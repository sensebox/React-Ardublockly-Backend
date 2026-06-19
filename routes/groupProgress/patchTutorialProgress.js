"use strict";

const GroupMember = require("../../models/groupMembers");

/**
 * @api {patch} /progress Update student tutorial progress
 * @apiName patchProgress
 * @apiDescription Update the current progress for a student - tutorial. Uses student session authentication.
 * @apiGroup Progress
 *
 * @apiHeader {String} x-pseudo-user-id Student's pseudo user ID
 * @apiHeader {String} x-group-id Group ID
 * @apiParam {String} tutorialId id of the tutorial (body)
 * @apiParam {Number} currentPage current page number (body)
 * @apiParam {Boolean} [isEditing] whether student is actively editing (body)
 * @apiParam {String} [blocklyXml] optional XML data from Blockly workspace (body)
 *
 * @apiSuccess (Success 200) {String} message `Progress updated successfully.`
 * @apiSuccess (Success 200) {Object} progress The updated progress object
 * @apiError (On error) {Object} 404 `{"message": "Member not found."}`
 * @apiError (On error) {Object} 500 `{"message": "Server error."}`
 */
const patchTutorialProgress = async function (req, res) {
  try {
    const { groupId, memberId } = req.params;
    const { tutorialId, tutorialTitle, currentStep, totalSteps } = req.body;

    const member = await GroupMember.findOneAndUpdate(
      { _id: memberId, groupId },
      { tutorialId, currentTutorialTitle: tutorialTitle, currentStep, totalSteps },
      { new: true }
    );

    if (!member) {
      return res.status(404).send({ message: "Member not found." });
    }

    return res.status(200).send({ message: "Progress updated.", member });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  patchTutorialProgress,
};
