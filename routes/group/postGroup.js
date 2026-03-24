"use strict";

const mongoose = require("mongoose");
const Group = require("../../models/group");
const User = require("../../models/user");

/**
 * @api {post} /group Create group
 * @apiName postGroup
 * @apiDescription Create a group.
 * @apiGroup Group
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {String} name name of the group
 *
 * @apiSuccess (Success 201) {String} message `Group is successfully created.`
 * @apiSuccess (Success 201) {Object} group `{
        "_id": "5fd89de648ccd57688c77d3b",
        "name": "Gruppe 1",
         "accessCode": "HDBW134",
        "teacherId": "5fd89de648ccd57688c77d3a",
         "archived": "false",
        "createdAt": "2020-12-15T11:28:38.300Z",
         "updatedAt": "2020-12-15T11:28:38.300Z",
        "__v": 0
    }`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission creating the group."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const postGroup = async function (req, res) {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).send({ message: "Missing or invalid group name." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).send({ message: "No permission creating the group." });
    }

    const group = new Group({
      _id: new mongoose.Types.ObjectId().toString(),
      name: name.trim(),
      teacherId: userId,
      accessCode: generateAccessCode(),
    });
    const result = await group.save();
    return res.status(201).send({
      message: "Group is successfully created.",
      group: result,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error. GEHT NICHT", error: err.message });
  }
};

function generateAccessCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let accessCode = "";
  for (let i = 0; i < 8; i++) {
    accessCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return accessCode;
}

module.exports = {
  postGroup,
};  