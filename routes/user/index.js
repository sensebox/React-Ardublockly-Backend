// jshint esversion: 8
// jshint node: true
"use strict";

var express = require("express");
var UserRouter = express.Router();

const { userAuthorization } = require("../../helper/userAuthorization");
const { adminAuthorization } = require("../../helper/adminAuthorization");

UserRouter.route("/").post(require("./user/login").login);

UserRouter.route("/").get(userAuthorization, require("./user/me").me);

UserRouter.route("/status").put(
  userAuthorization,
  require("./status/putStatus").putStatus
);

UserRouter.route("/users").get(
  adminAuthorization,
  require("./user/getAllUser").getAllUser
);

UserRouter.route("/role").put(
  adminAuthorization,
  require("./user/putRole").putRole
);


module.exports = UserRouter;
