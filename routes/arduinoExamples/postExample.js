// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const arduinoExamples = require('../../models/arduinoExamples');
const User = require('../../models/user');


/**
 * @api {post} /arduino Create Arduino Example
 * @apiName postExample
 * @apiDescription Create a Arduino Example.
 * @apiGroup ArduinoExamples
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {String} title name of the project
 * @apiParam {String} description further information about the project
 * @apiParam {String} xml XML-String of the blockly-content
 *
 * @apiSuccess (Success 201) {String} message `Gallery is successfully created.`
 * @apiSuccess (Success 201) {Object} gallery `{
		"_id": "5fd8a66cb40982332c400bc4",
		"title": "flimsy-cougar",
		"description": "Beschreibung",
		"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
		"creator": "em@il.de",
		"createdAt": "2020-12-15T12:05:00.662Z",
		"updatedAt": "2020-12-15T12:05:00.662Z",
		"__v": 0
	}`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission creating the gallery project."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const postExample = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    var user = await User.findOne({email: req.user.email});
    if(user.role !== 'user'){
      const body = {
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        creator: req.user.email,
        board: req.body.board,
        type: req.body.type,
      };
      const example = new arduinoExamples(body);
      const savedExamples = await example.save();
      return res.status(201).send({
        message: 'Gallery is successfully created.',
        arduinoExamples: savedExamples
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission creating the gallery project.',
      });
    }
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postExample
};
