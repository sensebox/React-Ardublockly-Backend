"use strict";   


const Group = require("../../models/group");

/**
 * @api {put} /group Update group
 * @apiName putGroup
 * @apiDescription Update a group.  
 * @apiGroup Group
 *
 * 
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {String} groupId id of the group
 * @apiParam {String} name name of the group
 *
 * @apiSuccess (Success 200) {String} message `Group is successfully updated.`
 * @apiSuccess (Success 200) {Object} group `{
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
 * @apiError (On error) {Object} 403 `{"message": No permission updating the group."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const putGroup = async function (req, res) {
  try {
    const userId = req.user.id;
    const groupId = req.params.groupId;
    const { name } = req.body;

    if (!groupId || !name || typeof name !== "string" || !name.trim()) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).send({ message: "Group not found." });
    }
    if (group.teacherId.toString() !== userId) {
      return res.status(403).send({ message: "No permission updating the group." });
    }

    group.name = name.trim();
    const result = await group.save();
    return res.status(200).send({
      message: "Group is successfully updated.",
      group: result,
    });
  } catch (err) {
    return res.status(500).send({ message: "Server error.", error: err.message });
  }
};

module.exports = {
  putGroup,
};
