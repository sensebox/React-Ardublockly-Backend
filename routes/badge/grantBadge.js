// jshint esversion: 8
// jshint node: true
"use strict";

const API = require("@geobadges/badgr-api-client");

const badgesClient = new API({
  endpoint: process.env.BADGES_ENDPOINT,
  username: process.env.BADGES_USERNAME,
  password: process.env.BADGES_PASSWORD,
});

const grantBadge = async function (req, res) {
  try {
    const email = req.user?.email || req.body.email;
    const { badgeClassEntityId, createNotification, issuerEntityId } = req.body;

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