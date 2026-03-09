"use strict";

const PseudoUser = require("../../models/pseudoUser");
const Group = require("../../models/group");

/**
 * @api {post} /status/heartbeat Student heartbeat (polling fallback)
 * @apiName studentHeartbeat
 * @apiDescription Send a heartbeat to update online status. Use this as a polling fallback if WebSocket is unavailable.
 * @apiGroup Status
 *
 * @apiParam {String} sessionToken The student's session token
 * @apiParam {String} pseudoUserId The student's pseudo user ID
 * @apiParam {String} groupId The group ID
 *
 * @apiSuccess (Success 200) {String} message `Heartbeat received.`
 * @apiError (On error) {Object} 401 `{"message": "Invalid session."}`
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const studentHeartbeat = async function (req, res) {
  try {

    const { pseudoUserId, groupId } = req.body;

    if (!pseudoUserId || !groupId) {
      return res.status(400).send({ message: "Missing required fields." });
    }

    await PseudoUser.findOneAndUpdate(
      { _id: pseudoUserId, groupId: groupId },
      { lastSeen: new Date() }
    );

    return res.status(200).send({ message: "Heartbeat received" });

  } catch (err) {
    return res.status(500).send({
      message: "Server error.",
      error: err.message
    });
  }
};

module.exports = {
  studentHeartbeat,
};

