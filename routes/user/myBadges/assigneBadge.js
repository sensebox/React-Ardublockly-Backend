// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');


/**
 * @api {put} /user/badge/:badgeId Assigne Badge
 * @apiName assigneBadge
 * @apiDescription Assign a badge to the logged in user.
 * @apiGroup User
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} badgeId the ID of the badge you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Badge successfully assigned to user.`
 * @apiSuccess (Success 200) {Object} badge `{
		"image": {
			"path": "5eb3bc947f4297cd60892b84_1588838892038_python_2.jpg",
			"size": 62982,
			"contentType": "image/jpeg",
			"originalName": "python_2.jpg"
		},
		"issuer": [
			"5eb3bc947f4297cd60892b85",
			"5eb3be547f4297cd60892b84"
		],
		"mentor": [],
		"requestor": [],
		"exists": true,
		"_id": "5eb3c1ec7f4297cd60892b91",
		"category": "professional skill",
		"name": "Python II",
		"description": "Erweiterte Grundlagen von Python",
		"criteria": "Beherrschung der erweiterten Grundlagen von Python (Klassen und Objekte)",
		"__v": 9
	}`
 *
 * @apiError (On error) {Object} 400 `{"message": "Badges is already assigned to user."}` or `{"message": "User is not connected to MyBadges."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const assigneBadge = async function(req, res){
  try{
    var user = await User.findOne({email: req.user.email});
    if(user && user.badge){
      // assigne badge to user
      request.put(`${process.env.MYBADGES_API}/api/v1/domain/badge/${req.params.badgeId}/assigne/user/${user.badge}`, {
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${process.env.MYBADGES_API_DOMAIN_TOKEN}`
        }})
        .on('response', function(response) {
          // concatenate updates from datastream
          var badgesBody = '';
          response.on('data', function(chunk){
            badgesBody += chunk;
          });
          response.on('end', async function(){
            if(response.statusCode !== 200){
              return res.status(400).send({
                message: 'Badges is already assigned to user.',
              });
            }
            badgesBody = JSON.parse(badgesBody);
            return res.status(200).send({
              message: 'Badge successfully assigned to user.',
              badge: badgesBody.badge
            });
          });
      })
      .on('error', function(err) {
        return res.status(500).send(err);
      });
    }
    else {
      return res.status(400).send({
        message: 'User is not connected to MyBadges.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  assigneBadge
};
