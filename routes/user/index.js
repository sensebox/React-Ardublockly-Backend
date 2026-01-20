// jshint esversion: 8
// jshint node: true
"use strict";

var express = require("express");
var UserRouter = express.Router();

const { userAuthorization } = require("../../helper/userAuthorization");
const { requestPasswordReset, resetPassword } = require("./user/resetPassword");
const { refresh } = require("./user/refresh");
UserRouter.route("/register").post(require("./user/register").register);

UserRouter.route("/login").post(require("./user/nativeLogin").nativeLogin);

UserRouter.route("/login/opensensemap").post(require("./user/login").login);

UserRouter.route("/").get(userAuthorization, require("./user/me").me);

UserRouter.route("/me").delete(
  userAuthorization,
  require("./user/nativeLogin").deleteUser
);
UserRouter.route("/status").put(
  userAuthorization,
  require("./status/putStatus").putStatus
);

// POST /user/reset-password/request
UserRouter.route("/reset-password/request").post(requestPasswordReset);

// POST /user/reset-password/reset
UserRouter.route("/reset-password/reset").post(resetPassword);

// POST user/refresh-token
UserRouter.route("/refresh-token").post(refresh);

module.exports = UserRouter;
