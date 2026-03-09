"use strict";

const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");
const PseudoUser = require("../../models/pseudoUser");

/**
 * @api {get} /groups/:groupId/members Get group members
 * @apiName getGroupMembers
 * @apiDescription Get all members of a group. Only accessible by the teacher.
 * @apiGroup GroupMember
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Group members found successfully.`
 * @apiSuccess (Success 200) {Array} members Array of member objects with pseudoUserId, name, nickname, online status, lastSeen
 * @apiError (On error) {Object} 400 `{"message": "Missing groupId parameter."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to view members of this group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */

const ONLINE_THRESHOLD = 500000;

function isOnline(lastSeen) {
  if (!lastSeen) return false;
  return Date.now() - new Date(lastSeen).getTime() < ONLINE_THRESHOLD;
}

const getGroupMembers = async function (req, res) {
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

    if (group.teacherId.toString() !== userId) {
      return res.status(403).send({ message: "No permission to view members of this group." });
    }

    const members = await GroupMember.find({ groupId, role: "student" })
      .populate("pseudoUserId");

    const formattedMembers = members.map((member) => {
      const pseudoUser = member.pseudoUserId;
      if (!pseudoUser) return null;

      return {
        pseudoUserId: pseudoUser._id,
        name: pseudoUser.name,
        nickname: pseudoUser.nickname,
        online: isOnline(pseudoUser.lastSeen),
        lastSeen: pseudoUser.lastSeen || null,
      };
    }).filter((m) => m !== null);

    return res.status(200).send({
      message: "Group members found successfully.",
      members: formattedMembers,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getGroupMembers,
};
