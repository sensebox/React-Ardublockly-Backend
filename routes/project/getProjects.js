// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');

const getProjects = async function(req, res){
  try{
    var result = await Project.find({creator: req.user.me.email});
    return res.status(200).send({
      message: 'Projects found successfully.',
      projects: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getProjects
};
