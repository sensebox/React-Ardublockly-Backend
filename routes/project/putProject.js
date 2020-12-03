// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');


const putProject = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    var oldProject = await Project.findOne({_id: req.params.projectId});
    var owner = req.user.me.email;
    if(owner === oldProject.creator){
      if(oldProject){
        var updatedProject = {};
        updatedProject.title = req.body.title || oldProject.title;
        updatedProject.xml = req.body.xml || oldProject.xml;
        var project = await Project.findOneAndUpdate({_id: oldProject._id}, updatedProject, {upsert: true, new: true});
        return res.status(200).send({
          message: 'Project is updated successfully.',
          project: project
        });
      }
      else {
        return res.status(400).send({
          message: 'Project not found.',
        });
      }
    }
    else {
      return res.status(403).send({
        message: 'No permission putting the project.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  putProject
};
