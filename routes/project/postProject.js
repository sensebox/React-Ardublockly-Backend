// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');

const postProject = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    const body = {
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      xml: req.body.xml,
      creator: req.user.email,
    };
    const project = new Project(body);
    const savedProject = await project.save();
    return res.status(201).send({
      message: 'Project is successfully created.',
      project: savedProject
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postProject
};
