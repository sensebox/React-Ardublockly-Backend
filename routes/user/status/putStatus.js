// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const User = require('../../../models/user');

/**
 * @api {put} /user/status Update status
 * @apiName updateStatus
 * @apiDescription Update status about submitted solutions in the tutorials.
 * @apiGroup User
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {Array} status Array of the updated complete status
 *
 * @apiSuccess (Success 200) {String} message `Status is updated successfully.`
 * @apiSuccess (Success 200) {Object} user `{
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
		"role": "user",
		"_id": "5fce51c6b958a8ea6066c969",
		"email": "em@il.de",
		"__v": 0,
		"createdAt": "2020-12-07T16:01:10.586Z",
		"updatedAt": "2020-12-15T10:57:01.510Z",
		"badge": "5eb3c9e47f4297cd60892bb1"
	}`
 *
 * @apiError (On error) {Object} 400 `{"message": "Status is required and has to be an array."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const putStatus = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    if(req.body.status && Array.isArray(req.body.status)){
      var user = await User.findOneAndUpdate({email: req.user.email}, {$set:{status: req.body.status}}, {upsert: true, new: true});
      return res.status(200).send({
        message: 'Status is updated successfully.',
        user: user
      });
    }
    else {
      return res.status(400).send({
        message: 'Status is required and has to be an array.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  putStatus
};
