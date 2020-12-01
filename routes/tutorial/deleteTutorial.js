// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Tutorial = require('../../models/tutorial');


const deleteTutorial = async function(req, res){
  // try{
    var tutorial = await Tutorial.findById(req.params.tutorialId);
    if(tutorial){
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
    return res.status(404).send({
      message: 'Tutorial not found.',
    });
  // }
  // catch(err){
  //   return res.status(500).send(err);
  // }
};

module.exports = {
  deleteTutorial
};
