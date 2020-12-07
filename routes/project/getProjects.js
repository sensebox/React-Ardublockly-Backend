// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');
const Share = require('../../models/share');

const getProjects = async function(req, res){
  // try{
    var result = await Project.find({creator: req.user.email});
    var populateResult = await Project.find({creator: req.user.email}).populate({path: '_id', select: 'expiresAt'});
    var projects = populateResult.map((res, i) => {
      if(!res._id){
        res._id = result[i]._id;
      }
      return res;
    });
    return res.status(200).send({
      message: 'Projects found successfully.',
      projects: projects
    });
  // }
  // catch(err){
  //   return res.status(500).send(err);
  // }
};

module.exports = {
  getProjects
};
