"use strict";

const GroupTutorial = require("../../models/groupTutorial");
const Group = require("../../models/group");

/**
 * @api {delete} /groups/:groupId/tutorials/:tutorialId Remove tutorial release
 * @apiName deleteGroupTutorial
 * @apiDescription Remove a tutorial release from a group. Only accessible by the teacher of the group.
 * @apiGroup GroupTutorial
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 * @apiParam {String} tutorialId id of the tutorial to remove (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Tutorial release removed successfully.`
 * @apiError (On error) {Object} 400 `{"message": "Missing required parameters."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to manage tutorials for this group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 404 `{"message": "Tutorial release not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const deleteGroupTutorial = async function (req, res) {
  try {
    const userId = req.user.id;
    const { groupId, tutorialId } = req.params;

    if (!groupId || !tutorialId) {
      return res.status(400).send({ message: "Missing required parameters." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    if (group.teacherId.toString() !== userId) {
      return res.status(403).send({ message: "No permission to manage tutorials for this group." });
    }

    const deletedRelease = await GroupTutorial.findOneAndDelete({ groupId, tutorialId });
    if (!deletedRelease) {
      return res.status(404).send({ message: "Tutorial release not found." });
    }

    return res.status(200).send({
      message: "Tutorial release removed successfully.",
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  deleteGroupTutorial,
};
