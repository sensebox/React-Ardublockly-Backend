// jshint esversion: 8
// jshint node: true
"use strict";

const express = require("express");
const mongoose = require("mongoose");
const request = require("request");

const User = require("../../../models/user");

const me = async function (req, res) {
  try {
    const user = req.user;

    // 🔍 Prüfe: Ist es ein **nativer Nutzer**?
    // (d.h. req.user hat _id und authProvider === "native")
    if (user && user._id && user.authProvider === "native") {
      // ✅ Nur Daten aus deiner DB zurückgeben – KEIN openSenseMap-Aufruf
      return res.status(200).json({
        message: "User found successfully.",
        user: {
          email: user.email,
          role: user.role,
          blocklyRole: user.role,
          status: user.status || [],
          language: "en_US", // oder aus DB, falls gespeichert
          boxes: [], // native Nutzer haben keine senseBoxes (optional: eigene Boxen-Logik)
        },
      });
    }

    // 🔁 Fallback: openSenseMap-Nutzer (wie bisher)
    if (!user || !user.email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    request
      .get("https://api.opensensemap.org/users/me/boxes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: req.headers.authorization,
        },
      })
      .on("response", function (response) {
        let boxesBody = "";
        response.on("data", (chunk) => (boxesBody += chunk));
        response.on("end", async () => {
          if (response.statusCode !== 200) {
            return res.status(401).json({ message: "Unauthorized" });
          }

          try {
            const boxesData = JSON.parse(boxesBody);
            // Hole ggf. erweiterte Daten aus deiner DB (z. B. status, role)
            const dbUser = await User.findOne({ email: user.email });
            const blocklyRole = dbUser ? dbUser.role : "user";
            const status = dbUser ? dbUser.status : [];

            const enrichedUser = {
              ...user,
              blocklyRole,
              status,
              boxes: boxesData.data.boxes || [],
              language: "en_US", // oder aus DB
            };

            return res.status(200).json({
              message: "User found successfully.",
              user: enrichedUser,
            });
          } catch (parseErr) {
            return res
              .status(500)
              .json({ message: "Invalid response from openSenseMap" });
          }
        });
      })
      .on("error", () => {
        return res.status(500).json({ message: "openSenseMap unreachable" });
      });
  } catch (err) {
    console.error("GET /user error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  me,
};
