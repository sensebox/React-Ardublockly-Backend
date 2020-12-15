// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

/**
 * @api {post} /user/badge/ Connect to myBadges
 * @apiName connect
 * @apiDescription Connect account of logged in user to an account of myBadges.org.
 * @apiGroup User
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {String} username username of the user
 * @apiParam {String} password password of the user
 *
 * @apiSuccess (Success 200) {String} message `Successfully connect to MyBadges.`
 * @apiSuccess (Success 200) {String} account `5eb3c9e47f4297cd60892bb1`
 * @apiSuccess (Success 200) {Object} badges `[
		"5eb3c3ce7f4297cd60892b97",
		"5eb3c2c37f4297cd60892b96",
	]`
 *
 * @apiError (On error) {Object} 403 `{"message": User and or password not valid."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const connectAccount = function(req, res){
  try{
    console.log(req.headers['origin']);
    if(req.headers['origin'] === process.env.APP_ORIGIN){
      var options = {
        body: JSON.stringify(req.body),
        headers: {
          'Content-type': 'application/json'
        }
      };
      request.post(`${process.env.MYBADGES_API}/api/v1/user/signin`, options)
        .on('response', function(response) {
          // concatenate updates from datastream
          var body = '';
          response.on('data', function(chunk){
            body += chunk;
          });
          response.on('end', async function(){
            if(response.statusCode !== 200){
              return res.status(403).send({
                message: 'User and or password not valid.',
              });
            }
            body = JSON.parse(body);
            var user = await User.findOneAndUpdate({email: req.user.email},{$set: {badge: body.user._id}});
            return res.status(200).send({
              message: 'Successfully connect to MyBadges.',
              account: body.user._id,
              badges: body.user.badge
            });
          });
        })
        .on('error', function(err) {
          return res.status(500).send(err);
        });
    }
    else {
      return res.status(401).send({
        message: 'Unauthorized '
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  connectAccount
};
