"use strict";

const GroupTutorial = require("../../models/groupTutorial");
const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");

/**
 * @api {get} /groups/:groupId/tutorials Get released tutorials for a group
 * @apiName getGroupTutorials
 * @apiDescription Get all tutorials released for a group. Available to both teachers and students who are members of the group.
 * @apiGroup GroupTutorial
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Released tutorials found successfully.`
 * @apiSuccess (Success 200) {Array} tutorials Array of released tutorial objects
 * @apiError (On error) {Object} 400 `{"message": "Missing groupId parameter."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to access this group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const getGroupTutorials = async function (req, res) {
  try {
    const groupId = req.params.groupId;

    if (!groupId) {
      return res.status(400).send({ message: "Missing groupId parameter." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    const releasedTutorials = await GroupTutorial.find({ groupId })
      .populate({
        path: "tutorialId",
        select: "title subtitle difficulty duration hardware subjects topics steps",
      })
      .populate("assignedBy", "name");

    return res.status(200).send({
      message: "Released tutorials found successfully.",
      tutorials: releasedTutorials,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getGroupTutorials,
};
