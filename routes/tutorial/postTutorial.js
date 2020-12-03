// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Tutorial = require('../../models/tutorial');
const User = require('../../models/user');

const postTutorial = async function(req, res){
  if(req.fileValidationError){
    return res.status(422).send({message: req.fileValidationError});
  }
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    var user = await User.findOne({email: req.user.email});
    if(user.role !== 'user'){
      const body = {
        _id: new mongoose.Types.ObjectId(),
        creator: req.user.email,
        title: req.body.title,
        steps: req.body.steps
      };
      // storing existing images in mongoDB
      req.files.forEach((file, i) => {
        var index = parseInt(file.fieldname.replace('steps[','').replace('][media][picture]'));
        body.steps[index].media = {};
        body.steps[index].media.picture = {
          path: file.filename,
          size: file.size,
          contentType: file.mimetype,
          originalName: file.originalname
        };
      });
      const tutorial = new Tutorial(body);
      const savedTutorial = await tutorial.save();
      return res.status(201).send({
        message: 'Tutorial is successfully created.',
        tutorial: savedTutorial
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission creating the tutorial.',
      });
    }
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postTutorial
};
