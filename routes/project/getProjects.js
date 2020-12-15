// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');
const Share = require('../../models/share');

/**
 * @api {get} /project Get projects
 * @apiName getProjects
 * @apiDescription Get all projects.
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiSuccess (Success 200) {String} message `Projects found successfully.`
 * @apiSuccess (Success 200) {Object} projects `[
  {
		"_id": "5fd8a3f4715f9945b85c18f9",
		"title": "thirsty-catfish",
		"xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
		"creator": "em@il.de",
		"createdAt": "2020-12-15T11:54:28.897Z",
		"updatedAt": "2020-12-15T11:54:28.897Z",
		"__v": 0,
    "shared": null
	}
]`
 *
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const getProjects = async function(req, res){
  try{
    var result = await Project.find({creator: req.user.email});
    var populateResult = await Project.find({creator: req.user.email}).lean().populate({path: '_id', select: 'expiresAt'});
    // check if project has already been shared and add expire date if necessary
    var projects = populateResult.map((res, i) => {
      res.shared = null;
      if(res._id && res._id._id){
        res.shared = res._id.expiresAt;
      }
      res._id = result[i]._id;
      return res;
    });
    return res.status(200).send({
      message: 'Projects found successfully.',
      projects: projects
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getProjects
};
