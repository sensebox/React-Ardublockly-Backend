// jshint esversion: 8
// jshint node: true
"use strict";

const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Tutorial = require("../../models/tutorial");
const User = require("../../models/user");

/**
 * @api {put} /tutorial/:tutorialId Update tutorial
 * @apiName putTutorial
 * @apiDescription Update a specific tutorial. All the information of the tutorial must be provided: only the data provided will be stored.
 * @apiGroup Tutorial
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} tutorialId the ID of the tutorial you are referring to
 * @apiParam {String} title name of the tutorial
 * @apiParam {Array} steps an array of all steps of the tutorial. Every step has to be an object.
 *
 * @apiSuccess (Success 200) {String} message `Tutorial is updated successfully.`
 * @apiSuccess (Success 200) {Object} tutorial `{
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
 * @apiError (On error) {Object} 400 `{"message": Tutorial not found."}`
 * @apiError (On error) {Object} 403 `{"message": No permission creating the tutorial."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const putTutorial = async function (req, res) {
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    var oldTutorial = await Tutorial.findOne({ _id: req.params.tutorialId });
    if (oldTutorial) {
      var user = await User.findOne({ email: req.user.email });
      var owner = req.user.email;
      if (owner === oldTutorial.creator) {
        var updatedTutorial = {};
        updatedTutorial.title = req.body.title || oldTutorial.title;
        updatedTutorial.difficulty =
          req.body.difficulty || oldTutorial.difficulty;
        updatedTutorial.steps = req.body.steps || oldTutorial.steps;
        // ensure that the requirement is not related to the tutorial itself
        if (updatedTutorial.steps[0].requirements) {
          updatedTutorial.steps[0].requirements =
            updatedTutorial.steps[0].requirements.filter(
              (requirement) => requirement !== updatedTutorial._id
            );
        }
        // storing new images in mongoDB
        if (req.files) {
          req.files.forEach((file, i) => {
            var index = parseInt(
              file.fieldname.replace("steps[", "").replace("][media][picture]")
            );
            if (
              oldTutorial.steps[index].media &&
              oldTutorial.steps[index].media.picture &&
              oldTutorial.steps[index].media.picture.path
            ) {
              // deleting images that are no longer part of the tutorial
              var imagepath = oldTutorial.steps[index].media.picture.path;
              fs.unlink(
                path.join(__dirname, "..", "..", "upload", imagepath),
                function (err) {
                  // if(err && err.code == 'ENOENT') {
                  // file doens't exist
                  // } else if (err) {
                  // other errors, e.g. maybe we don't have enough permission
                  // } else {
                  // }
                }
              );
            }
            updatedTutorial.steps[index].media = {};
            updatedTutorial.steps[index].media.picture = {
              path: file.filename,
              size: file.size,
              contentType: file.mimetype,
              originalName: file.originalname,
            };
          });
        }
        var tutorial = await Tutorial.findOneAndUpdate(
          { _id: oldTutorial._id },
          updatedTutorial,
          { upsert: true, new: true }
        );
        return res.status(200).send({
          message: "Tutorial is updated successfully.",
          tutorial: tutorial,
        });
      } else {
        return res.status(403).send({
          message: "No permission putting the tutorial.",
        });
      }
    } else {
      return res.status(400).send({
        message: "Tutorial not found.",
      });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  putTutorial,
};
