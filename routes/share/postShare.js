// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const { createId } = require('mnemonic-id');

const Share = require('../../models/share');
const Project = require('../../models/project');

/**
 * @api {post} /share Create sharing content
 * @apiName postShare
 * @apiDescription Create a sharing link with referenced content. Link expires after 30 days. If you want to share a project, you have to specify the Project-Id, otherwise you have to submit the XML-String. XML-String or Project-Id is required.
 * @apiGroup Share
 *
 * @apiParam {String} title name of the sharing content
 * @apiParam {String} xml XML-String of the blockly-content
 * @apiParam {ObjectId} projectId the ID of the project you are referring to
 *
 * @apiSuccess (Success 201) {String} message `Sharing-Content is successfully created.`
 * @apiSuccess (Success 201) {Object} content `{
		"_id": "5fd8a18cd21fca5b98bec4ec",
		"title": "plant-elk",
		"expiresAt": "2021-01-14T11:44:12.131Z",
		"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
		"createdAt": "2020-12-15T11:44:12.143Z",
		"updatedAt": "2020-12-15T11:44:12.143Z",
		"__v": 0
	}`
 *
 * @apiError (On error) {Object} 403 `{"message": Project is already shared."}` or `{"message": "Project not found."}` or `{"message": "XML-String or Project-Id is required."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
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
