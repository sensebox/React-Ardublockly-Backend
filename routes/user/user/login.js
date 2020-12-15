// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');



/**
 * @api {post} /user/ Sign in
 * @apiName signIn
 * @apiDescription Sign in the user.
 * @apiGroup User
 *
 * @apiParam {String} email email or nickname of the user
 * @apiParam {String} password password of the user
 *
 * @apiSuccess (Success 200) {String} message `Successfully signed in`
 * @apiSuccess (Success 200) {String} token valid JSON Web Token
 * @apiSuccess (Success 200) {String} refreshToken valid refresh token
 * @apiSuccess (Success 200) {Object} user `{
		"name": "nickanme",
		"email": "em@il.de",
		"role": "user",
		"language": "de_DE",
		"boxes": [
			{
				"createdAt": "2020-12-03T11:14:27.537Z",
				"exposure": "indoor",
				"model": "homeV2WifiFeinstaub",
				"name": "Test",
				"updatedAt": "2020-12-03T11:14:27.537Z",
				"currentLocation": {
					"timestamp": "2020-12-03T11:14:27.532Z",
					"coordinates": [
						7.607942,
						51.976097
					],
					"type": "Point"
				},
				"sensors": [
					{
						"title": "Temperatur",
						"unit": "°C",
						"sensorType": "HDC1080",
						"icon": "osem-thermometer",
						"_id": "5fc8c893fab469001ce0b3c0"
					}
				],
				"_id": "5fc8c893fab469001ce0b3b0",
				"loc": [
					{
						"geometry": {
							"timestamp": "2020-12-03T11:14:27.532Z",
							"coordinates": [
								7.607942,
								51.976097
							],
							"type": "Point"
						},
						"type": "Feature"
					}
				],
				"integrations": {
					"mqtt": {
						"enabled": false
					}
				},
				"access_token": "3d2e24edd9196b8ca4b29f88547b085f441d9e76810ba80046232490debec91e",
				"useAuth": true
			}
		],
		"emailIsConfirmed": false,
		"blocklyRole": "user",
		"badge": "5eb3c9e47f4297cd60892bb0",
		"status": [
			{
				"_id": "5fcf7caabd63e209146d3e85",
				"tasks": [
					{
						"_id": "5fcf7caabd63e209146d3e88",
						"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\">\n    <statement name=\"SETUP_FUNC\">\n      <block type=\"sensebox_display_show\" id=\"4nsbNC7n~EqM3pAN5flc\"></block>\n    </statement>\n  </block>\n</xml>",
						"type": "error"
					}
				]
			}
		],
		"badges": [
			"5eb3c3ce7f4297cd60892b98"
		]
}`
 *
 * @apiError (On error) {Object} 403 `{"message": "User and or password not valid."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database or creating a JWT.
 */
const login = function(req, res){
  try{
    var options = {
      body: JSON.stringify(req.body),
      headers: {
        'Content-type': 'application/json'
      }
    };
    request.post('https://api.opensensemap.org/users/sign-in', options)
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
          // get all information about all boxes from signed in user
          request.get('https://api.opensensemap.org/users/me/boxes', {
            headers: {
              'Content-type': 'application/json',
              'Authorization': `Bearer ${body.token}`
            }})
            .on('response', function(response) {
              // concatenate updates from datastream
              var boxesBody = '';
              response.on('data', function(chunk){
                boxesBody += chunk;
              });
              response.on('end', async function(){
                if(response.statusCode !== 200){
                  return res.status(403).send({
                    message: 'User and or password not valid.',
                  });
                }
                boxesBody = JSON.parse(boxesBody);
                body.data.user.boxes = boxesBody.data.boxes;
                // check if user already exists in blockly-user-db
                var user = await User.findOneAndUpdate({email: body.data.user.email}, // query
                                                  {$setOnInsert: {email: body.data.user.email}}, // update if not exist
                                                  {upsert: true}); // options
                body.data.user.blocklyRole = user.role;
                body.data.user.badge = user.badge;
                body.data.user.status = user.status;
                if(user.badge){
                  // get all information about all badges from signed in user
                  request.get(`${process.env.MYBADGES_API}/api/v1/domain/user/${user.badge}`, {
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
                            message: 'Successfully signed in.',
                            user: body.data.user,
                            token: body.token,
                            refreshToken: body.refreshToken
                          });
                        }
                        badgesBody = JSON.parse(badgesBody).user;
                        body.data.user.badges = badgesBody.badge;
                        return res.status(200).send({
                          message: 'Successfully signed in.',
                          user: body.data.user,
                          token: body.token,
                          refreshToken: body.refreshToken
                        });
                      });
                    })
                    .on('error', function(err) {
                      return res.status(500).send(err);
                    });
                }
                else {
                  return res.status(200).send({
                    message: 'Successfully signed in.',
                    user: body.data.user,
                    token: body.token,
                    refreshToken: body.refreshToken
                  });
                }
              });
            });
          })
          .on('error', function(err) {
            return res.status(500).send(err);
          });
      })
      .on('error', function(err) {
        return res.status(500).send(err);
      });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  login
};
