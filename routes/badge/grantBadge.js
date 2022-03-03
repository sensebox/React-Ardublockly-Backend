// jshint esversion: 8
// jshint node: true
"use strict";

const API = require("@geobadges/badgr-api-client");

const badgesClient = new API({
  endpoint: process.env.BADGES_ENDPOINT,
  username: process.env.BADGES_USERNAME,
  password: process.env.BADGES_PASSWORD,
});

/**
 * @api {post} /grant Grant a badge
 * @apiName grandBadge
 * @apiDescription Grant a badge to a user.
 * @apiGroup Badge
 *
 * @apiParam {String} email Users Email
 * @apiParam {String} badgeClassEntityId ID of the badge class
 * @apiParam {boolean} createNotification User receives an email notification
 * @apiParam {String} issuerEntityId ID of the issuer
 *
 * @apiSuccess (Success 200) {String} message `Badge granted successfully.`
 * @apiError (On error) {Obejct} 500 Complications when granting badge
 */
const grantBadge = async (req, res) => {
  try {
    const { email, badgeClassEntityId, createNotification, issuerEntityId } = req.body;

    if (!email) {
      return res.status(400).send({
        message: "email missing",
      });
    }

    const status = await badgesClient.grant({
      badgeClassEntityId,
      createNotification,
      email,
      issuerEntityId,
    });

    if (!status) {
      throw new Error("Could not grant badge");
    }

    res.status(200).send({
      message: "Badge granted successfully.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  grantBadge,
};
