// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Tutorial = require('../../models/tutorial');

/**
 * @api {get} /tutorial/:tutorialId Get tutorial
 * @apiName getTutorial
 * @apiDescription Get specific tutorial.
 * @apiGroup Tutorial
 *
 * @apiParam {ObjectId} tutorialId the ID of the tutorial you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Tutorial found successfully.`
 * @apiSuccess (Success 200) {Object} tutorial `{
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
		}`
 *
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const getTutorial = async function(req, res){
  try{
    var id = req.params.tutorialId;
    var result = await Tutorial.findById(id)
                               .populate({path: 'steps.requirements', select: 'title'})
                               .then(res => {
                                 var steps = res.steps.map((step,i) => {
                                   if(i > 0){
                                     step.requirements = undefined;
                                   }
                                   return step;
                                 });
                                 res.steps = steps;
                                 return res;
                               });
    return res.status(200).send({
      message: 'Tutorial found successfully.',
      tutorial: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getTutorial
};
