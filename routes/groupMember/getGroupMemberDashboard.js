"use strict";

const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");
const GroupTutorial = require("../../models/groupTutorial");

/**
 * @api {get} /groups/:groupId/member/dashboard Get group member dashboard
 * @apiName getGroupMemberDashboard
 * @apiDescription Get the dashboard data for a specific group member.
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
const getGroupMemberDashboard = async function (req, res) {
  try {
      const groupMember = req.GroupMember.id;
      const groupId = req.params.groupId;
  
      if (!groupId) {
        return res.status(400).send({ message: "Missing groupId parameter." });
      }
  
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).send({ message: "Group not found." });
      }
  
      const groupTurorials = await GroupTutorial.find({ groupId });
  
      return res.status(200).send({
        message: "Dashboard data retrieved successfully.",
        members: groupMember,
        tutorials: groupTurorials.map((gt) => gt.tutorialId),
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
  getGroupMemberDashboard,
};
