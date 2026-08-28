"use strict";

const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");

/**
 * @api {delete} /groups/:groupId/leave Leave a group
 * @apiName leaveGroup
 * @apiDescription Leave a group as a student. Resets claimed status so the student can rejoin later.
 * @apiGroup Group
 *
 * @apiParam {String} groupId id of the group (URL param)
 * @apiParam {String} memberId id of the member (body param)
 *
 * @apiSuccess (Success 200) {String} message `Successfully left the group.`
 * @apiError (On error) {Object} 400 `{"message": "Missing groupId parameter."}`
 * @apiError (On error) {Object} 400 `{"message": "Missing memberId parameter."}`
 * @apiError (On error) {Object} 403 `{"message": "Teachers cannot leave their own group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 404 `{"message": "You are not a member of this group."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const leaveGroup = async function (req, res) {
  try {
    const { memberId } = req.body;
    const groupId = req.params.groupId;

    if (!groupId) {
      return res.status(400).send({ message: "Missing groupId parameter." });
    }

    if (!memberId) {
      return res.status(400).send({ message: "Missing memberId parameter." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    // Find the member in GroupMember collection
    const member = await GroupMember.findOne({ _id: memberId, groupId });
    if (!member) {
      return res.status(404).send({ message: "You are not a member of this group." });
    }

    // Teachers cannot leave their own group
    if (member.role === "teacher") {
      return res.status(403).send({ message: "Teachers cannot leave their own group." });
    }

    // Reset claimed status so the student can rejoin later
    member.claimed = false;
    member.onlineStatus = false;
    member.sessionToken = null;
    await member.save();

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
