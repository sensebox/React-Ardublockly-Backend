// jshint esversion: 8
// jshint node: true
"use strict";

var express = require("express");
var UserRouter = express.Router();

const { userAuthorization } = require("../../helper/userAuthorization");
const { requestPasswordReset, resetPassword } = require("./user/resetPassword");

// 🔹 Neuer Endpunkt: Eigenständige Registrierung
UserRouter.route("/register").post(require("./user/register").register);

// 🔹 Neuer Endpunkt: Eigenständiges Login (native)
UserRouter.route("/login").post(require("./user/nativeLogin").nativeLogin);

// 🔸 Bestehender Endpunkt: Login via openSenseMap (umbenannt für Klarheit)
UserRouter.route("/login/opensensemap").post(require("./user/login").login);

// 🔹 GET /user/me – bleibt gleich (für authentifizierte Nutzer)
UserRouter.route("/").get(userAuthorization, require("./user/me").me);

UserRouter.route("/me").delete(
  userAuthorization,
  require("./user/nativeLogin").deleteUser
);
// 🔹 Status-Update
UserRouter.route("/status").put(
  userAuthorization,
  require("./status/putStatus").putStatus
);

// POST /user/reset-password/request
UserRouter.route("/reset-password/request").post(requestPasswordReset);

// POST /user/reset-password/reset
UserRouter.route("/reset-password/reset").post(resetPassword);

module.exports = UserRouter;
