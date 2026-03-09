"use strict";

const GroupTutorial = require("../../models/groupTutorial");
const Group = require("../../models/group");
const Tutorial = require("../../models/tutorial");

/**
 * @api {get} /groups/:groupId/tutorials/manage Get all tutorials with release status
 * @apiName getGroupTutorialsManage
 * @apiDescription Get all available tutorials along with their release status for a group. Only accessible by the teacher of the group.
 * @apiGroup GroupTutorial
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Tutorials with release status found successfully.`
 * @apiSuccess (Success 200) {Array} tutorials Array of tutorial objects with `isReleased` and `releaseInfo` fields
 * @apiError (On error) {Object} 400 `{"message": "Missing groupId parameter."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to manage this group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const getGroupTutorialsManage = async function (req, res) {
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
      return res.status(403).send({ message: "No permission to manage this group." });
    }

    const allTutorials = await Tutorial.find({
      $or: [{ public: true }, { creator: userId }],
    }).select("title subtitle difficulty duration hardware subjects topics creator public");

    const releasedTutorials = await GroupTutorial.find({ groupId })
      .populate("assignedBy", "name email");

    const releasedMap = new Map();
    releasedTutorials.forEach((rt) => {
      releasedMap.set(rt.tutorialId.toString(), {
        assignedAt: rt.assignedAt,
        assignedBy: rt.assignedBy,
        groupTutorialId: rt._id,
      });
    });

    const tutorialsWithStatus = allTutorials.map((tutorial) => {
      const releaseInfo = releasedMap.get(tutorial._id.toString());
      return {
        ...tutorial.toObject(),
        isReleased: !!releaseInfo,
        releaseInfo: releaseInfo || null,
      };
    });

    return res.status(200).send({
      message: "Tutorials with release status found successfully.",
      tutorials: tutorialsWithStatus,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getGroupTutorialsManage,
};
