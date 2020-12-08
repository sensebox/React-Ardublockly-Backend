// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');
const Share = require('../../models/share');

const getProject = async function(req, res){
  try{
    var id = req.params.projectId;
    var result = await Project.findById(id).lean().populate({path: '_id', select: 'expiresAt'});
    var owner = req.user.email;
    if(owner === result.creator){
      // check if project has already been shared and add expire date if necessary
      result.shared = result._id ? result._id.expiresAt : null;
      result._id = id;
      return res.status(200).send({
        message: 'Project found successfully.',
        project: result
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission getting the project.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getProject
};
