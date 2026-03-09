"use strict";

const mongoose = require("mongoose");
const Group = require("../../models/group");
const PseudoUser = require("../../models/pseudoUser");

/**
 * @api {post} /groups/:groupId/students Create student account
 * @apiName createStudentAccount
 * @apiDescription Create a student account with a predefined nickname. Only accessible by the teacher.
 * @apiGroup GroupMember
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 * @apiParam {String} name student's display name (body)
 * @apiParam {String} nickname student's unique nickname for joining (body)
 *
 * @apiSuccess (Success 201) {String} message `Student account created successfully.`
 * @apiSuccess (Success 201) {Object} student The created student account
 * @apiError (On error) {Object} 400 `{"message": "Missing required fields."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to create students in this group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 409 `{"message": "Nickname already exists in this group."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const createStudentAccount = async function (req, res) {
  try {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const { name, nickname } = req.body;

    if (!groupId) {
      return res.status(400).send({ message: "Missing groupId parameter." });
    }

    if (!name || !nickname || typeof name !== "string" || typeof nickname !== "string") {
      return res.status(400).send({ message: "Missing required fields (name, nickname)." });
    }

    const trimmedName = name.trim();
    const trimmedNickname = nickname.trim();

    if (!trimmedName || !trimmedNickname) {
      return res.status(400).send({ message: "Name and nickname cannot be empty." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    if (group.teacherId.toString() !== userId) {
      return res.status(403).send({ message: "No permission to create students in this group." });
    }

    const existingStudent = await PseudoUser.findOne({ groupId, nickname: trimmedNickname });
    if (existingStudent) {
      return res.status(409).send({ message: "Nickname already exists in this group." });
    }

    const student = new PseudoUser({
      _id: new mongoose.Types.ObjectId().toString(),
      name: trimmedName,
      nickname: trimmedNickname,
      groupId,
      onlineStatus: false,
    });

    await student.save();

    return res.status(201).send({
      message: "Student account created successfully.",
      student: {
        _id: student._id,
        name: student.name,
        nickname: student.nickname,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ message: "Nickname already exists in this group." });
    }
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  createStudentAccount,
};
