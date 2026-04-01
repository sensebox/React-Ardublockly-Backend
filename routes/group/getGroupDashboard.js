"use strict";

const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");
const GroupTutorial = require("../../models/groupTutorial");

/**
 * @api {get} /groups/:groupId/dashboard Get group dashboard with online status
 * @apiName getGroupDashboard
 * @apiDescription Get online/offline status of all students in a group. Only accessible by the teacher.
 * @apiGroup Group
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Dashboard data retrieved successfully.`
 * @apiSuccess (Success 200) {Array} members Array of member status objects
 * @apiError (On error) {Object} 400 `{"message": "Missing groupId parameter."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to view this dashboard."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const getGroupDashboard = async function (req, res) {
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
      return res.status(403).send({ message: "No permission to view this dashboard." });
    }

    const groupTurorials = await GroupTutorial.find({ groupId });
    const studentsTutorials = groupTurorials.map((gt) => gt.tutorialId);

    const students = await GroupMember.find({ groupId, role: "student" });

    const activeStudents = students.filter((s) => s.onlineStatus === true);
    const pendingStudents = students.filter((s) => !s.onlineStatus);


    return res.status(200).send({
      message: "Dashboard data retrieved successfully.",
      members: activeStudents,
      tutorials: studentsTutorials,
      pendingMembers: pendingStudents,
      summary: {
        total: students.length,
        active: activeStudents.length,
        pending: pendingStudents.length,
        online: activeStudents.filter((s) => s.online).length,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getGroupDashboard,
};
