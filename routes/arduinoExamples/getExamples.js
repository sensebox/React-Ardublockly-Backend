// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const arduinoExamples = require('../../models/arduinoExamples');

/**
 * @api {get} /arduino/ Get Arduino Examples
 * @apiName getGalleries
 * @apiDescription Get all galleries.
 * @apiGroup Gallery
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiSuccess (Success 200) {String} message `Galleries found successfully.`
 * @apiSuccess (Success 200) {Object} galleries `[
  {
		"_id": "5fd8a66cb40982332c400bc4",
		"title": "flimsy-cougar",
		"description": "Beschreibung",
		"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
		"creator": "em@il.de",
		"createdAt": "2020-12-15T12:05:00.662Z",
		"updatedAt": "2020-12-15T12:05:00.662Z",
		"__v": 0
	}
]`
 *
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const getArduinoExamples = async function(req, res){
  try{
    var result = await arduinoExamples.find({});
    return res.status(200).send({
      message: 'Arduino Examples found successfully.',
      arduinoExamples: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getArduinoExamples
};
