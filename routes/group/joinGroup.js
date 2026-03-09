"use strict";

const crypto = require("crypto");
const mongoose = require("mongoose");
const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");
const PseudoUser = require("../../models/pseudoUser");

/**
 * @api {post} /groups/join Join a group using access code and nickname
 * @apiName joinGroup
 * @apiDescription Join a group using an access code and a pre-assigned nickname created by the teacher.
 * @apiGroup Group
 *
 * @apiParam {String} accessCode The access code of the group
 * @apiParam {String} nickname The student's nickname (must be pre-created by the teacher)
 *
 * @apiSuccess (Success 200) {String} message `Successfully joined the group.`
 * @apiSuccess (Success 200) {String} pseudoUserId The pseudo user ID
 * @apiSuccess (Success 200) {String} sessionToken A session token for the student
 * @apiSuccess (Success 200) {String} groupId The group ID
 * @apiSuccess (Success 200) {String} groupName The group name
 * @apiError (On error) {Object} 400 `{"message": "Missing required fields."}`
 * @apiError (On error) {Object} 403 `{"message": "This group is archived."}`
 * @apiError (On error) {Object} 404 `{"message": "Invalid access code or nickname."}`
 * @apiError (On error) {Object} 409 `{"message": "This account has already been claimed."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const joinGroup = async function (req, res) {
  try {
    const { accessCode, nickname } = req.body;

    if (!accessCode || !nickname) {
      return res.status(400).send({ message: "Missing required fields (accessCode, nickname)." });
    }

    const trimmedAccessCode = accessCode.toUpperCase().trim();
    const trimmedNickname = nickname.trim();

    const group = await Group.findOne({ accessCode: trimmedAccessCode });
    if (!group) {
      return res.status(404).send({ message: "Invalid access code or nickname." });
    }

    if (group.archived) {
      return res.status(403).send({ message: "This group is archived and not accepting new members." });
    }

    const student = await PseudoUser.findOne({ 
      groupId: group._id, 
      nickname: trimmedNickname 
    });

    if (!student) {
      return res.status(404).send({ message: "Invalid access code or nickname." });
    }

    if (student.claimed) {
      return res.status(409).send({ message: "This account has already been claimed." });
    }

    student.claimed = true;
    student.sessionToken = sessionToken;
    student.onlineStatus = true;
    student.lastSeen = new Date();
    await student.save();

    const existingMembership = await GroupMember.findOne({ 
      groupId: group._id, 
      pseudoUserId: student._id 
    });

    if (!existingMembership) {
      const groupMember = new GroupMember({
        _id: new mongoose.Types.ObjectId().toString(),
        groupId: group._id,
        userId: new mongoose.Types.ObjectId(),
        pseudoUserId: student._id,
        role: "student",
        joinedAt: new Date(),
      });
      await groupMember.save();
    }

    return res.status(200).send({
      message: "Successfully joined the group.",
      pseudoUserId: student._id,
      sessionToken,
      groupId: group._id,
      groupName: group.name,
      nickname: student.nickname,
      name: student.name,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  joinGroup,
};
