"use strict";

const Group = require("../../models/group");
const mongoose = require("mongoose");

/** 
 * @api {get} /group Get groups
 * @apiName getAllGroup
 * @apiDescription Get all groups of the user.
 * @apiGroup Group
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiSuccess (Success 200) {String} message `Groups found successfully.`
 * @apiSuccess (Success 200) {Object} groups `[
    {
        "_id": "5fd89de648ccd57688c77d3b",
        "name": "Gruppe 1",
         "accessCode": "HDBW134",
        "teacherId": "5fd89de648ccd57688c77d3a",
         "archived": "false",
        "createdAt": "2020-12-15T11:28:38.300Z",
         "updatedAt": "2020-12-15T11:28:38.300Z",
        "__v": 0
    }
]`
 *
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const getAllGroup = async function (req, res) {
  try {
  const result = await Group.find({});
    return res.status(200).send({
      message: "Get All Groups found successfully.",
      groups: result,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};
module.exports = {
  getAllGroup,
};

