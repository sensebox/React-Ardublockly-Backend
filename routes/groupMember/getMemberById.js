"use strict";

const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");


/**
 * @api {get} /groups/:groupId/members/:memberId Get a specific group member
 * @apiName getMemberById
 * @apiDescription Get a specific member of a group by their member ID (pseudo user ID). Only accessible by the teacher.
 * @apiGroup GroupMember
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 * @apiParam {String} memberId id of the member (pseudo user ID) (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Group member found successfully.`
 * @apiSuccess (Success 200) {Object} member Member object with pseudoUserId, name, nickname, online status, lastSeen
 * @apiError (On error) {Object} 400 `{"message": "Missing required parameters."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to view this member."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 404 `{"message": "Member not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const getMemberById = async function (req, res) {
  try {
    const userId = req.user.id;
    const { groupId, memberId } = req.params;

    if (!groupId || !memberId) {
      return res.status(400).send({ message: "Missing required parameters." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    if (group.teacherId.toString() !== userId) {
      return res.status(403).send({ message: "No permission to view this member." });
    }

    const member = await GroupMember.findOne({ _id: memberId, groupId, role: "student" });

    if (!member) {
      return res.status(404).send({ message: "Member not found." });
    }

    // Calculate online status: online if lastSeen within last 60 seconds
    const onlineStatus = member.lastSeen && (Date.now() - new Date(member.lastSeen).getTime()) < 60000;

    return res.status(200).send({
      message: "Group member found successfully.",
      member: {
        ...member.toObject(),
        onlineStatus,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getMemberById,
};
