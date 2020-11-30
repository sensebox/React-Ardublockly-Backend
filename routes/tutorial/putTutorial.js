// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Tutorial = require('../../models/tutorial');


const putTutorial = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    var oldTutorial = await Tutorial.findOne({_id: req.params.tutorialId});
    if(oldTutorial){
      var updatedTutorial = {};
      updatedTutorial.title = req.body.title || oldTutorial.title;
      updatedTutorial.steps = req.body.steps || oldTutorial.steps;
      // storing new images in mongoDB
      if(req.files){
        req.files.forEach((file, i) => {
          var index = parseInt(file.fieldname.replace('steps[','').replace('][media][picture]'));
          if(oldTutorial.steps[index].media && oldTutorial.steps[index].media.picture && oldTutorial.steps[index].media.picture.path){
            // deleting images that are no longer part of the tutorial
            var imagepath = oldTutorial.steps[index].media.picture.path;
            fs.unlink(path.join(__dirname, '..', '..', 'upload', imagepath), function(err) {
              if(err && err.code == 'ENOENT') {
                // file doens't exist
              } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
              } else {
              }
            });
          }
          updatedTutorial.steps[index].media = {};
          updatedTutorial.steps[index].media.picture = {
            path: file.filename,
            size: file.size,
            contentType: file.mimetype,
            originalName: file.originalname
          };
        });
      }
      var tutorial = await Tutorial.findOneAndUpdate({_id: oldTutorial._id}, updatedTutorial, {upsert: true});
      return res.status(200).send({
        message: 'Tutoroal is updated successfully.',
        tutorial: tutorial
      });
    }
    else {
      return res.status(400).send({
        message: 'Tutorial not found.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  putTutorial
};
