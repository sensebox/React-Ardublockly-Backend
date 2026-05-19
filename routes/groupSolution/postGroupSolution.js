"use strict";

const mongoose = require("mongoose");
const GroupMember = require("../../models/groupMembers");
const Solution = require("../../models/solution");

/**
 * @api {post} /solutions Create a solution for a tutorial
 * @apiName createSolution
 * @apiDescription Create a solution for a tutorial. Uses student session authentication.
 * @apiGroup Solution
 *
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo

 * @apiParam {String} xml XML-String of the blockly-content
 *
 * @apiSuccess (Success 201) {String} message `Solution is successfully created.`
 * @apiSuccess (Success 201) {Object} solution `{
        "_id": "5fd8a66cb40982332c400bc4",
        "xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
        "creator": "pseudoUserId",
        "createdAt": "2020-12-15T12:05:00.662Z",
        "updatedAt": "2020-12-15T12:05:00.662Z",
        "__v": 0
    }`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission creating the solution."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const postGroupSolution = async function (req, res) {
  try {
    const { groupId, memberId } = req.params;
    const { tutorialId, blocklyXml, userId } = req.body;
    const effectiveUserId = memberId || userId;

    if (!groupId || !tutorialId || !blocklyXml || !effectiveUserId) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    const student = await GroupMember.findOne({ _id: effectiveUserId, groupId });
    if (!student) {
      return res.status(404).send({ message: "Student not found in this group." });
    }

    if (student.role !== "student") {
      return res.status(403).send({ message: "Only students can submit solutions." });
    }

    const solution = await Solution.create({
      _id: new mongoose.Types.ObjectId().toString(), // nur wenn _id im Schema String ist
      userId: student._id,
      groupId,
      tutorialId,
      blocklyXml,
      publishedAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).send({
      message: "Solution is successfully created.",
      solution,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  postGroupSolution,
};