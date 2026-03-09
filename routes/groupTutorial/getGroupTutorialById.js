"use strict";

const GroupTutorial = require("../../models/groupTutorial");
const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");
const Tutorial = require("../../models/tutorial");

/**
 * @api {get} /groups/:groupId/tutorials/:tutorialId Get a specific released tutorial
 * @apiName getGroupTutorialById
 * @apiDescription Get a specific tutorial that has been released for a group. Available to both teachers and students who are members of the group.
 * @apiGroup GroupTutorial
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 * @apiParam {String} tutorialId id of the tutorial (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Tutorial found successfully.`
 * @apiSuccess (Success 200) {Object} tutorial The tutorial object with full details
 * @apiError (On error) {Object} 400 `{"message": "Missing required parameters."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to access this tutorial."}`
 * @apiError (On error) {Object} 404 `{"message": "Tutorial not released for this group."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const getGroupTutorialById = async function (req, res) {
  try {
    const userId = req.user.id;
    const { groupId, tutorialId } = req.params;

    if (!groupId || !tutorialId) {
      return res.status(400).send({ message: "Missing required parameters." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    const isTeacher = group.teacherId.toString() === userId;
    const isMember = await GroupMember.findOne({ groupId, userId });

    if (!isTeacher && !isMember) {
      return res.status(403).send({ message: "No permission to access this group." });
    }

    const groupTutorial = await GroupTutorial.findOne({ groupId, tutorialId });
    if (!groupTutorial) {
      return res.status(404).send({ message: "Tutorial not released for this group." });
    }

    const tutorial = await GroupTutorial.findById(tutorialId);
    if (!tutorial) {
      return res.status(404).send({ message: "Tutorial not found." });
    }

    return res.status(200).send({
      message: "Tutorial found successfully.",
      tutorial,
      releasedAt: groupTutorial.assignedAt,
      releasedBy: groupTutorial.assignedBy,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getGroupTutorialById,
};
