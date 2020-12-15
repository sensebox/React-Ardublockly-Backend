// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Tutorial = require('../../models/tutorial');

/**
 * @api {delete} /tutorial/:tutorialId Delete tutorial
 * @apiName deleteTutorial
 * @apiDescription Delete a specific tutorial.
 * @apiGroup Tutorial
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} tutorialId the ID of the tutorial you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Tutorial deleted successfully.`
 *
 * @apiError (On error) {Object} 404 `{"message": Tutorial not found."}`
 * @apiError (On error) {Object} 403 `{"message": No permission deleting the tutorial."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const deleteTutorial = async function(req, res){
  try{
    var tutorial = await Tutorial.findById(req.params.tutorialId);
    if(tutorial){
      var owner = req.user.email;
      if(owner === tutorial.creator){
        await Tutorial.deleteOne({_id: req.params.tutorialId});
        // // remove links to the deleted tutorial
        await Tutorial.updateMany({}, {$pull: {'steps.$[].requirements': req.params.tutorialId}}, {multi: true});
        // remove images of the deleted tutorial
        var imagePaths = [];
        tutorial.steps.forEach((step, i) => {
          if(step.media && step.media.picture && step.media.picture.path){
            imagePaths.push(step.media.picture.path);
          }
        });
        imagePaths.forEach((imagePath, i) => {
          fs.unlink(path.join(__dirname, '..', '..', 'upload', imagePath), function(err) {
            // if(err && err.code == 'ENOENT') {
              // file doens't exist
            // } else if (err) {
              // other errors, e.g. maybe we don't have enough permission
            // } else {
            // }
          });
        });
        return res.status(200).send({
          message: 'Tutorial deleted successfully.',
        });
      }
      else {
        return res.status(403).send({
          message: 'No permission deleting the tutorial.',
        });
      }
    }
    return res.status(404).send({
      message: 'Tutorial not found.',
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteTutorial
};
