// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var UserRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');


UserRouter.route('/')
  .post(require('./user/login').login);

UserRouter.route('/')
  .get(userAuthorization, require('./user/me').me);

UserRouter.route('/badge')
  .post(userAuthorization, require('./myBadges/connectAccount').connectAccount);

UserRouter.route('/badge/')
  .put(userAuthorization, require('./myBadges/disconnectAccount').disconnectAccount);

UserRouter.route('/badge/:badgeId')
  .put(userAuthorization, require('./myBadges/assigneBadge').assigneBadge);

UserRouter.route('/badge')
  .get(userAuthorization, require('./myBadges/getBadges').getBadges);


module.exports = UserRouter;
