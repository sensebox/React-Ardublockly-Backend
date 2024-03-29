// jshint esversion: 8
// jshint node: true
"use strict";

var express = require("express");
var UserRouter = express.Router();

const { userAuthorization } = require("../../helper/userAuthorization");

UserRouter.route("/").post(require("./user/login").login);

UserRouter.route("/").get(userAuthorization, require("./user/me").me);

UserRouter.route("/status").put(
  userAuthorization,
  require("./status/putStatus").putStatus
);

module.exports = UserRouter;
