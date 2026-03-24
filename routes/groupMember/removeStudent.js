"use strict";

const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");


/**
 * @api {delete} /groups/:groupId/students/:studentId Delete student account
 * @apiName deleteStudentAccount
 * @apiDescription Delete a student account. Only accessible by the teacher.
 * @apiGroup GroupMember
 */
const removeStudent = async function (req, res) {
  try {
    const userId = req.user.id;
    const { groupId, studentId } = req.params;

    if (!groupId || !studentId) {
      return res.status(400).send({ message: "Missing required parameters." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }
    
    if (group.teacherId.toString() !== userId) {
      return res.status(403).send({ message: "No permission to delete students in this group." });
    }

    const deleted = await GroupMember.findOneAndDelete({ _id: studentId, groupId, role: "student" });
    if (!deleted) {
      return res.status(404).send({ message: "Student account not found." });
    }

    return res.status(200).send({
      message: "Student account deleted successfully.",
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  removeStudent,
};