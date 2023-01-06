// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const arduinoExamples = require('../../models/arduinoExamples');

/**
 * @api {delete} /arduino/:exampleId Delete gallery
 * @apiName deleteExample
 * @apiDescription Delete a specific example.
 * @apiGroup ArduinoExamples
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} exampleId the ID of the gallery you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Example deleted successfully.`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission deleting the gallery project."}`
 * @apiError (On error) {Object} 404 `{"message": Example not found."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const deleteExample = async function(req, res){
  try{
    var result = await arduinoExamples.findById(req.params.exampleId);
    var owner = req.user.email;
    if(owner === result.creator || req.user.role === 'admin'){
      var example = await arduinoExamples.deleteOne({_id: req.params.exampleId});
      if(example && example.deletedCount > 0){
        return res.status(200).send({
          message: 'Arduino Example deleted successfully.',
        });
      }
      return res.status(404).send({
        message: 'Example not found.',
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission deleting the example.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteExample
};
