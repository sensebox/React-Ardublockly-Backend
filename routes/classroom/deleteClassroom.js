// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Classroom = require('../../models/classroom');

/**
 * @api {delete} /gallery/:galleryId Delete gallery
 * @apiName deleteGallery
 * @apiDescription Delete a specific gallery.
 * @apiGroup Gallery
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} galleryId the ID of the gallery you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Gallery deleted successfully.`
 *
 * @apiError (On error) {Object} 403 `{"message": No permission deleting the gallery project."}`
 * @apiError (On error) {Object} 404 `{"message": Gallery not found."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const deleteClassroom = async function(req, res){
  try{
    var result = await Classroom.findById(req.params.classroomId);
    var owner = req.user.email;
    if(owner === result.creator){
      var classroom = await Classroom.deleteOne({_id: req.params.classroomId});
      if(classroom && classroom.deletedCount > 0){
        return res.status(200).send({
          message: 'classroom deleted successfully.',
        });
      }
      return res.status(404).send({
        message: 'classroom not found.',
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission deleting the classroom.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteClassroom
};
