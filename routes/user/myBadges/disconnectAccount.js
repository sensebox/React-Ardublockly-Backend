// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

/**
 * @api {put} /user/badge/ Disconnect from myBadges
 * @apiName disconnect
 * @apiDescription Disconnect account of logged in user from stored myBadges.org-account.
 * @apiGroup User
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiSuccess (Success 200) {String} message `User is not longer connected to MyBadges.`
 *
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const disconnectAccount = async function(req, res){
  try{
    var user = await User.findOneAndUpdate({email: req.user.email}, {$set: {badge: null}});
    return res.status(200).send({
      message: 'User is not longer connected to MyBadges.',
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  disconnectAccount
};
