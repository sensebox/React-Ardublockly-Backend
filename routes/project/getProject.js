// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');

const getProject = async function(req, res){
  try{
    var id = req.params.projectId;
    // TODO: query of the creator: creator === requester
    var result = await Project.findById(id);
    return res.status(200).send({
      message: 'Project found successfully.',
      project: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getProject
};
