"use strict";

const mongoose = require("mongoose");
const GroupTutorial = require("../../models/groupTutorial");
const Group = require("../../models/group");
const Tutorial = require('../../models/tutorial');

/**
 * @api {post} /groups/:groupId/tutorials Release a tutorial for a group
 * @apiName postGroupTutorial
 * @apiDescription Release a tutorial for a group. Only accessible by the teacher of the group.
 * @apiGroup GroupTutorial
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiParam {String} groupId id of the group (URL param)
 * @apiParam {String} tutorialId id of the tutorial to release (body)
 *
 * @apiSuccess (Success 201) {String} message `Tutorial released successfully.`
 * @apiSuccess (Success 201) {Object} groupTutorial The created group tutorial object
 * @apiError (On error) {Object} 400 `{"message": "Missing required fields."}`
 * @apiError (On error) {Object} 404 `{"message": "Group not found."}`
 * @apiError (On error) {Object} 409 `{"message": "Tutorial already released for this group."}`
 * @apiError (On error) {Object} 500 `{"message": "Server error."}`
 */
const postGroupTutorial = async function (req, res) {
  try {

    const groupId = req.params.groupId;
    const tutorialId = req.body.tutorialId || req.params.tutorialId;

    if (!groupId || !tutorialId) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }

    const existingRelease = await GroupTutorial.findOne({ groupId, tutorialId });
    if (existingRelease) {
      return res.status(409).send({ message: "Tutorial already released for this group." });
    }

    const groupTutorial = new GroupTutorial({
      _id: new mongoose.Types.ObjectId().toString(),
      groupId,
      tutorialId,
      assignedAt: new Date(),
    });

    const tutorial = await Tutorial.findById(tutorialId);

    const result = await groupTutorial.save();

    return res.status(201).send({
      message: "Tutorial released successfully.",
      groupTutorial: result,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  postGroupTutorial,
};
