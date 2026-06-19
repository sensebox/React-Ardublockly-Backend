"use strict";

const GroupMember = require("../../models/groupMembers");

/**
 * @api {get} /progress/:groupId/:memberId Get tutorial progress
 * @apiName getTutorialProgress
 * @apiDescription Get the current progress for a student.
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
 * @apiError (On error) {Object} 400 `{"message": "Missing required parameters."}`
 * @apiError (On error) {Object} 403 `{"message": "Member does not belong to this group."}`
 * @apiError (On error) {Object} 500 `{"message": "Server error."}`
 */
const getTutorialProgress = async function (req, res) {
  try {
    const { groupId, memberId } = req.params;

    if (!groupId || !memberId) {
      return res.status(400).send({ message: "Missing required parameters.", groupId, memberId });
    }

    const member = await GroupMember.findById(memberId)
      .populate("tutorialId", "title steps");

    if (member.groupId.toString() !== groupId) {
      return res.status(403).send({ message: "Member does not belong to this group." });
    }

    return res.status(200).send({
      tutorialTitle: member.tutorialId?.title || null,
      currentStep: member.currentStep || null,
      totalSteps: member.tutorialId?.steps?.length || null,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getTutorialProgress,
};