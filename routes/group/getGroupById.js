"use strict";

const group = require("../../models/group");
const Group = require("../../models/group");
const GroupMember = require("../../models/groupMembers");

/**
 * @api {get} /groups/:groupId Get group details
 * @apiName getGroupById
 * @apiDescription Get details of a specific group. Available to members and teachers of the group.
 * @apiGroup Group
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 *
 * @apiSuccess (Success 200) {String} message `Group found successfully.`
 * @apiSuccess (Success 200) {Object} group The group object
 * @apiSuccess (Success 200) {Boolean} isTeacher Whether the user is the teacher of this group
 * @apiError (On error) {Object} 400 `{"message": "Missing groupId parameter."}`
 * @apiError (On error) {Object} 403 `{"message": "No permission to access this group."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const getGroupById = async function (req, res) {
    try {
    const result = await Group.findById(req.params.groupId);
    return res.status(200).send({
      message: "Groups found successfully.",
      groups: result,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  getGroupById,
};
