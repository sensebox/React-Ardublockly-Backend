// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');

/**
 * @api {post} /project Create project
 * @apiName postProject
 * @apiDescription Create a project.
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {String} title name of the project
 * @apiParam {String} xml XML-String of the blockly-content
 *
 * @apiSuccess (Success 201) {String} message `Project is successfully created.`
 * @apiSuccess (Success 201) {Object} project `{
		"_id": "5fd8a3f4715f9945b85c18f9",
		"title": "thirsty-catfish",
		"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
		"creator": "em@il.de",
		"createdAt": "2020-12-15T11:54:28.897Z",
		"updatedAt": "2020-12-15T11:54:28.897Z",
		"__v": 0
	}`
 *
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const postProject = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    const body = {
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      xml: req.body.xml,
      creator: req.user.email,
    };
    const project = new Project(body);
    const savedProject = await project.save();
    return res.status(201).send({
      message: 'Project is successfully created.',
      project: savedProject
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postProject
};
