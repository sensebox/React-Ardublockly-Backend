// jshint esversion: 8
// jshint node: true
"use strict";

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user"); // Passe Pfad

const userAuthorization = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 🔍 Versuche zuerst, das Token als **native JWT** zu verifizieren
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hole Nutzer aus deiner DB
    const user = await User.findOne({
      _id: decoded.id,
      authProvider: "native",
    });
    if (user) {
      req.user = user;
      return next();
    }
    // Wenn kein nativer Nutzer gefunden → falle zu openSenseMap zurück
  } catch (jwtError) {
    // Token ist kein gültiges natives JWT → weiter mit openSenseMap
  }

  // 🔁 Fallback: openSenseMap-Auth (wie bisher)
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  };

  const { get } = require("request");
  get("https://api.opensensemap.org/users/me", options)
    .on("response", function (response) {
      let body = "";
      response.on("data", (chunk) => (body += chunk));
      response.on("end", () => {
        if (response.statusCode !== 200) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        try {
          const osemUser = JSON.parse(body).data.me;
          // Optional: Nutzer in deiner DB anlegen/aktualisieren
          req.user = osemUser;
          next();
        } catch (e) {
          return res
            .status(401)
            .json({ message: "Invalid openSenseMap response" });
        }
      });
    })
    .on("error", () => {
      return res.status(401).json({ message: "openSenseMap unreachable" });
    });
};

module.exports = {
  userAuthorization,
};
