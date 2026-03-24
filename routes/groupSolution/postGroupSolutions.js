"use strict";

const mongoose = require("mongoose");
const GroupMember = require("../../models/groupMembers");

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
const postGroupSolution = async function(req, res){

  try{
    var student = await GroupMember.findOne({id : req.user.id});
    if(student.role !== 'student'){
      const body = {
        _id: new mongoose.Types.ObjectId(),
        tutorialId: req.body.tutorialId,
        groupId: req.body.groupId,
        blocklyXml: req.body.xml,
        xml: req.body.xml,
        studentId: student._id,
      };
      const solution = new Solution(body);
      const savedSolution = await solution.save();
      return res.status(201).send({
        message: 'Solution is successfully created.',
        solution: savedSolution
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission creating the solution.',
      });
    }
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postGroupSolution
      };