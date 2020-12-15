// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');

/**
 * @api {put} /project/projectId Update project
 * @apiName putProject
 * @apiDescription Update specific project.
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} projectId the ID of the project you are referring to
 * @apiParam {String} [title] name of the project
 * @apiParam {String} [xml] XML-String of the blockly-content
 *
 * @apiSuccess (Success 200) {String} message `Project is updated successfully.`
 * @apiSuccess (Success 200) {Object} project `{
		"_id": "5fd8a3f4715f9945b85c18f9",
		"title": "thirsty-catfish",
		"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
		"creator": "em@il.de",
		"createdAt": "2020-12-15T11:54:28.897Z",
		"updatedAt": "2020-12-15T11:54:28.897Z",
		"__v": 0
	}`
 *
 * @apiError (On error) {Object} 400 `{"message": Project not found."}`
 * @apiError (On error) {Object} 403 `{"message": No permission putting the project."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const putProject = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    var oldProject = await Project.findOne({_id: req.params.projectId});
    var owner = req.user.email;
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
