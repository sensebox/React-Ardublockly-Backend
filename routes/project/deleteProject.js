// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Project = require('../../models/project');
const Share = require('../../models/share');

/**
 * @api {delete} /project/projectId Delete project
 * @apiName deleteProject
 * @apiDescription Delete specific project.
 * @apiGroup Project
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} projectId the ID of the project you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Project deleted successfully.`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission deleting the project."}`
 * @apiError (On error) {Object} 404 `{"message": Project not found."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const deleteProject = async function(req, res){
  try{
    var result = await Project.findById(req.params.projectId);
    var owner = req.user.email;
    if(owner === result.creator){
      var project = await Project.deleteOne({_id: req.params.projectId});
      var share = await Share.deleteOne({project: req.params.projectId});
      if(project && project.deletedCount > 0){
        return res.status(200).send({
          message: 'Project deleted successfully.',
        });
      }
      return res.status(404).send({
        message: 'Project not found.',
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission deleting the project.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteProject
};
