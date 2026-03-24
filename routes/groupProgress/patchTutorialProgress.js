"use strict";

const mongoose = require("mongoose");
const Progress = require("../../models/progress");
const GroupMember = require("../../models/groupMembers");
const Tutorial = require("../../models/tutorial");

/**
 * @api {patch} /progress Update student progress
 * @apiName patchProgress
 * @apiDescription Update the current progress for a student. Uses student session authentication.
 * @apiGroup Progress
 *
 * @apiHeader {String} x-pseudo-user-id Student's pseudo user ID
 * @apiHeader {String} x-group-id Group ID
 * @apiParam {String} tutorialId id of the tutorial (body)
 * @apiParam {Number} currentPage current page number (body)
 * @apiParam {Boolean} [isEditing] whether student is actively editing (body)
 * @apiParam {String} [blocklyXml] optional XML data from Blockly workspace (body)
 *
 * @apiSuccess (Success 200) {String} message `Progress updated successfully.`
 * @apiSuccess (Success 200) {Object} progress The updated progress object
 * @apiError (On error) {Object} 400 `{"message": "Missing required fields."}`
 * @apiError (On error) {Object} 401 `{"message": "Invalid session."}`
 * @apiError (On error) {Object} 404 `{"message": "Tutorial not found."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const patchTutorialProgress = async function (req, res) {
  try {
    const pseudoUserId = req.headers["x-pseudo-user-id"];
    const groupId = req.headers["x-group-id"];

    if (!pseudoUserId || !groupId) {
      return res.status(401).send({ message: "Missing authentication headers." });
    }

    const { tutorialId, currentPage, isEditing, blocklyXml } = req.body;

    if (!tutorialId || currentPage === undefined) {
      return res.status(400).send({ message: "Missing required fields (tutorialId, currentPage)." });
    }

    const student = await GroupMember.findOne({
      _id: pseudoUserId,
      groupId,
      claimed: true,
    });

    if (!student) {
      return res.status(401).send({ message: "Invalid session." });
    }

    const tutorial = await Tutorial.findById(tutorialId);
    if (!tutorial) {
      return res.status(404).send({ message: "Tutorial not found." });
    }

    const totalPages = tutorial.steps ? tutorial.steps.length : 0;

    // Also persist to Progress collection for historical tracking
    let progress = await Progress.findOne({
      userId: pseudoUserId,
      groupId,
      tutorialId,
    });

    if (progress) {
      progress.currentPage = currentPage;
      progress.totalPages = totalPages;
      progress.lastSeen = new Date();
      progress.updatedAt = new Date();
      if (blocklyXml !== undefined) {
        progress.blocklyXml = blocklyXml;
      }
      await progress.save();
    } else {
      progress = new Progress({
        _id: new mongoose.Types.ObjectId().toString(),
        userId: pseudoUserId,
        groupId,
        tutorialId,
        currentPage,
        totalPages,
        lastSeen: new Date(),
        blocklyXml: blocklyXml || null,
      });
      await progress.save();
    }

    return res.status(200).send({
      message: "Progress updated successfully.",
      progress: {
        tutorialId,
        tutorialTitle: tutorial.title,
        currentPage,
        totalPages,
        isEditing: isEditing || false,
      },
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  patchTutorialProgress,
};
