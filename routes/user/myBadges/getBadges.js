// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');
const Tutorial = require('../../../models/tutorial');

/**
 * @api {get} /user/badge/ Get all Badges of User
 * @apiName getBadges
 * @apiDescription Get all Badges of logged in user in context of Blokly for senseBox: all badges which can be achieved in the tutorials.
 * @apiGroup User
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiSuccess (Success 200) {String} message `Badges successfully found.`
  * @apiSuccess (Success 200) {Object} badges `{
	[
		{
			"_id": "5eb3c1ec7f4297cd60892b91",
			"category": "professional skill",
			"exists": true,
			"name": "Python II",
			"description": "Erweiterte Grundlagen von Python",
			"criteria": "Beherschung der erweiterten Grundlagen von Python (Klassen und Objekte)",
			"issuer": [
				{
					"_id": "5eb3bc947f4297cd60892b84",
					"lastname": "Max",
					"firstname": "Mustermann"
				}
			],
			"mentor": [],
			"image": {
				"path": "5eb3bc947f4297cd60892b84_1588838892038_python_2.jpg",
				"size": 62982,
				"contentType": "image/jpeg",
				"originalName": "python_2.jpg"
			},
			"__v": 9,
			"requestor": []
		}
	]`
 *
 * @apiError (On error) {Object} 400 `{"message": User is not connected to MyBadges."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const getBadges = async function(req, res){
  try{
    var user = await User.findOne({email: req.user.email});
    if(user && user.badge){
      // get all badges from signed in user
      request.get(`${process.env.MYBADGES_API}/api/v1/domain/badge?userId=${user.badge}`, {
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
              return res.status(200).send({
                message: 'Badges successfully found.',
                badges: null
              });
            }
            badgesBody = JSON.parse(badgesBody);
            // get all badges that are connected with a tutorial and that are assigned to the user
            var userBadges = badgesBody.badges;
            var tutorialBadges = await Tutorial.find({badge: { $ne: null}});
            var tutorialBadgeIds = tutorialBadges.map(tutorial => tutorial.badge.toString());
            var userBadgesBlockly = userBadges.filter(badge => tutorialBadgeIds.includes(badge._id));
            return res.status(200).send({
              message: 'Badges successfully found.',
              badges: userBadgesBlockly
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
  getBadges
};
