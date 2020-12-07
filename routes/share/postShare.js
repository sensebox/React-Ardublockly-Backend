// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const { createId } = require('mnemonic-id');

const Share = require('../../models/share');
const Project = require('../../models/project');

const postShare = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    if(req.body.xml || req.body.projectId){
      if(req.body.projectId){
        var share = await Share.findById(req.body.projectId);
        if(share){
          return res.status(400).send({
            message: 'Project is already shared.',
          });
        }
        var project = await Project.findById(req.body.projectId);
        if(!project){
          return res.status(400).send({
            message: 'Project not found.',
          });
        }
      }
      const body = {
        _id: req.body.projectId ? req.body.projectId : new mongoose.Types.ObjectId(),
        title: req.body.title,
        expiresAt: moment.utc().add(Number(process.env.SHARE_EXPIRES_IN),'seconds').toDate(),
      };
      if(req.body.xml){ body.xml = req.body.xml; }
      else if(req.body.projectId){ body.project = req.body.projectId; }
      const newShare = new Share(body);
      const savedShare = await newShare.save();
      return res.status(201).send({
        message: 'Sharing-Content is successfully created.',
        content: savedShare
      });
    }
    else{
      return res.status(400).send({
        message: 'XML-String or Project-Id is required.',
      });
    }
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postShare
};
