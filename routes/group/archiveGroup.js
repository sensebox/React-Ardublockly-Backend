"use strict";

const Group = require("../../models/group");

/**
 * @api {patch} /groups/:groupId/archive Archive or unarchive a group
 * @apiName archiveGroup
 * @apiDescription Archive or unarchive a group. Only accessible by the teacher.
 * @apiGroup Group
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 * @apiParam {Boolean} archived whether to archive (true) or unarchive (false) the group (body)
 *
 * @apiSuccess (Success 200) {String} message `Group archived successfully.` or `Group unarchived successfully.`
 * @apiSuccess (Success 200) {Object} group The updated group object
 * @apiError (On error) {Object} 400 `{"message": "Missing required fields."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to archive this group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const archiveGroup = async function (req, res) {
  try {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const { archived } = req.body;

    if (!groupId) {
      return res.status(400).send({ message: "Missing groupId parameter." });
    }

    if (typeof archived !== "boolean") {
      return res.status(400).send({ message: "Missing or invalid 'archived' field. Must be a boolean." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    if (group.teacherId.toString() !== userId) {
      return res.status(403).send({ message: "No permission to archive this group." });
    }

    group.archived = archived;
    group.updatedAt = new Date();
    const result = await group.save();

    const action = archived ? "archived": "unarchived";
    return res.status(200).send({
      message: `Group ${action} successfully.`,
      group: result,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  archiveGroup,
};
