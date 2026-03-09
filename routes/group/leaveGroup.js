"use strict";

const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");
const PseudoUser = require("../../models/pseudoUser");
const Progress = require("../../models/progress");

/**
 * @api {delete} /groups/:groupId/leave Leave a group
 * @apiName leaveGroup
 * @apiDescription Leave a group as a student. Removes membership and associated data.
 * @apiGroup Group
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Successfully left the group.`
 * @apiError (On error) {Object} 400 `{"message": "Missing groupId parameter."}`
 * @apiError (On error) {Object} 403 `{"message": "Teachers cannot leave their own group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 404 `{"message": "You are not a member of this group."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const leaveGroup = async function (req, res) {
  try {
    const userId = req.user.id;
    const groupId = req.params.groupId;

    if (!groupId) {
      return res.status(400).send({ message: "Missing groupId parameter." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    if (group.teacherId.toString() === userId) {
      return res.status(403).send({ message: "Teachers cannot leave their own group. Use delete instead." });
    }

    const membership = await GroupMember.findOne({ groupId, userId });
    if (!membership) {
      return res.status(404).send({ message: "You are not a member of this group." });
    }

    return res.status(200).send({
      message: "Successfully left the group.",
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  leaveGroup,
};
