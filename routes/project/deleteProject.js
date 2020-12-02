// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');


const deleteProject = async function(req, res){
  try{
    var project = await Project.deleteOne({_id: req.params.projectId});
    if(project && project.deletedCount > 0){
      return res.status(200).send({
        message: 'Project deleted successfully.',
      });
    }
    return res.status(404).send({
      message: 'Project not found.',
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteProject
};
