// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');

const getProject = async function(req, res){
  try{
    var id = req.params.projectId;
    var result = await Project.findById(id);
    var owner = req.user.email;
    if(owner === result.creator){
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
