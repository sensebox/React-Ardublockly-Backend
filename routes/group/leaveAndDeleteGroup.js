"use strict";

const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");
const GroupTutorial = require("../../models/groupTutorial");
const Progress = require("../../models/progress");

/**
 * @api {delete} /groups/:groupId/leave/delete Leave and delete all group data
 * @apiName leaveAndDeleteGroup
 * @apiDescription Leave a group and delete all associated data including pseudo users and progress. For teachers, this deletes the entire group.
 * @apiGroup Group
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Successfully left and deleted all data.`
 * @apiError (On error) {Object} 400 `{"message": "Missing groupId parameter."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const leaveAndDeleteGroup = async function (req, res) {
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

    const isTeacher = group.teacherId.toString() === userId;

    if (isTeacher) {
      const members = await GroupMember.find({ groupId });
      
      for (const member of members) {
        if (member.role === "student") {
          await Progress.deleteMany({ userId: member._id, groupId });
        }
      }

      await GroupMember.deleteMany({ groupId });
      await GroupTutorial.deleteMany({ groupId });
      await Group.findByIdAndDelete(groupId);

      return res.status(200).send({
        message: "Group and all associated data successfully deleted.",
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  leaveAndDeleteGroup,
};
