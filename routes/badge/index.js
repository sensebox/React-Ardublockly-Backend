// jshint esversion: 8
// jshint node: true
"use strict";

var express = require("express");
var BadgeRouter = express.Router();

BadgeRouter.route("/grant").post(require("./grantBadge").grantBadge);

module.exports = BadgeRouter;
