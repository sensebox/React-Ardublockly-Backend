// jshint esversion: 8
// jshint node: true
"use strict";

const express = require("express");
const mongoose = require("mongoose");

const Tutorial = require("../../models/tutorial");

/**
 * @api {get} /tutorial Get tutorials
 * @apiName getTutorials
 * @apiDescription Get all tutorials by one user.
 * @apiGroup Tutorial
 *
 * @apiSuccess (Success 200) {String} message `Tutorials found successfully.`
 * @apiSuccess (Success 200) {Object} tutorials `[
    {
			"_id": "5fcf7caabd63e209146d3e85",
			"creator": "em@il.de",
			"title": "Test",
			"steps": [
				{
					"_id": "5fcf7caabd63e209146d3e87",
					"type": "instruction",
					"headline": "Einführung",
					"text": "In diesem Tutorial lernst du wie man die senseBox mit dem Internet verbindest.",
					"hardware": [
						"senseboxmcu",
						"wifi-bee"
					]
				},
				{
					"_id": "5fcf7caabd63e209146d3e88",
					"type": "task",
					"headline": "Aufgabe 1",
					"text": "Stelle eine WLAN-Verbindung mit einem beliebigen Netzwerk her.",
					"xml": "<xml xmlns='https://developers.google.com/blockly/xml'><block type='arduino_functions' id='QWW|$jB8+*EL;}|#uA' deletable='false' x='27' y='16'><statement name='SETUP_FUNC'><block type='sensebox_wifi' id='W}P2Y^g,muH@]|@anou}'><field name='SSID'>SSID</field><field name='Password'>Password</field></block></statement></block></xml>"
				}
			],
			"createdAt": "2020-12-08T13:16:26.722Z",
			"updatedAt": "2020-12-13T19:25:40.529Z",
			"__v": 0
		}
  ]`
 *
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const getUserTutorials = async function (req, res) {
  try {
    var userTutorials = await Tutorial.find({ creator: req.user.email });
    var publicTutorials = await Tutorial.find({ public: true });
    var result = userTutorials.concat(publicTutorials);
    return res.status(200).send({
      message: "All User Tutorials found successfully.",
      tutorials: result,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  getUserTutorials,
};
