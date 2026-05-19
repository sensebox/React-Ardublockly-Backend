"use strict";

const GroupMember = require("../../models/groupMembers");

/**
 * @api {get} /progress/:groupId/:memberId Get tutorial progress
 * @apiName getTutorialProgress
 * @apiDescription Get the current progress for a student. Uses student session authentication.
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
 * @apiError (On error) {Object} 400 `{"message": "Missing required fields."}`
 * @apiError (On error) {Object} 401 `{"message": "Invalid session."}`
 * @apiError (On error) {Object} 404 `{"message": "Tutorial not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const getTutorialProgress = async function (req, res) {
  try {
    const { groupId, memberId } = req.params;

    const member = await GroupMember.findById(memberId)
      .populate("tutorialId", "title steps");

    if (!member) {
      return res.status(404).send({ message: "Member not found." });
    }

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