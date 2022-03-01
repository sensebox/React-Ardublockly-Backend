// jshint esversion: 8
// jshint node: true
"use strict";

const express = require("express");
const mongoose = require("mongoose");

const Tutorial = require("../../models/tutorial");
const User = require("../../models/user");

/**
 * @api {post} /tutorial Create tutorial
 * @apiName postTutorial
 * @apiDescription Create a tutorial.
 * @apiGroup Tutorial
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {String} title name of the tutorial
 * @apiParam {Array} steps an array of all steps of the tutorial. Every step has to be an object.
 *
 * @apiSuccess (Success 201) {String} message `Tutorial is successfully created.`
 * @apiSuccess (Success 201) {Object} tutorial `{
		"_id": "5fd89de648ccd57688c77d3b",
		"creator": "em@il.de",
		"title": "WLAN einrichten",
		"steps": [
			{
				"_id": "5fd89de648ccd57688c77d3d",
				"type": "instruction",
				"headline": "Einführung",
				"text": "In diesem Tutorial lernst du wie man diesenseBox mit dem Internet verbindet.",
				"hardware": [
					"senseboxmcu"
				]
			},
			{
				"_id": "5fd89de648ccd57688c77d3e",
				"type": "task",
				"headline": "Aufgabe 1",
				"text": "Stelle eine WLAN-Verbindung mit einembeliebigen Netzwerk her.",
				"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\r\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\r\n</xml>"
			}
		],
		"createdAt": "2020-12-15T11:28:38.300Z",
		"updatedAt": "2020-12-15T11:28:38.300Z",
		"__v": 0
	}`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission creating the tutorial."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const postTutorial = async function (req, res) {
  if (req.fileValidationError) {
    return res.status(422).send({ message: req.fileValidationError });
  }
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    var user = await User.findOne({ email: req.user.email });
    if (user.role !== "user") {
      const body = {
        _id: new mongoose.Types.ObjectId(),
        creator: req.user.email,
        title: req.body.title,
        difficulty: req.body.difficulty,
        public: req.body.public,
        review: req.body.review,
        steps: req.body.steps,
      };
      // storing existing images in mongoDB
      req.files &&
        req.files.forEach((file, i) => {
          var index = parseInt(
            file.fieldname.replace("steps[", "").replace("][media][picture]")
          );
          body.steps[index].media = {};
          body.steps[index].media.picture = {
            path: file.filename,
            size: file.size,
            contentType: file.mimetype,
            originalName: file.originalname,
          };
        });
      const tutorial = new Tutorial(body);
      const savedTutorial = await tutorial.save();
      return res.status(201).send({
        message: "Tutorial is successfully created.",
        tutorial: savedTutorial,
      });
    } else {
      return res.status(403).send({
        message: "No permission creating the tutorial.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postTutorial,
};
