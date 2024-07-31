// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Classroom = require('../../models/classroom');
const User = require('../../models/user');
const classroom = require('../../models/classroom');

/**
 * @api {put} /gallery/:galleryId Update gallery
 * @apiName putGallery
 * @apiDescription Update a specific gallery.
 * @apiGroup Gallery
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} galleryId the ID of the gallery you are referring to
 * @apiParam {String} [title] name of the project
 * @apiParam {String} [description] further information about the project
 * @apiParam {String} [xml] XML-String of the blockly-content
 *
 * @apiSuccess (Success 200) {String} message `Gallery is updated successfully.`
 * @apiSuccess (Success 200) {Object} gallery `{
    "_id": "5fd8a66cb40982332c400bc4",
    "title": "flimsy-cougar",
    "description": "Beschreibung",
    "xml": "<xml xmlns=\"https://developers.google.com/blockly/xml\">\n  <block type=\"arduino_functions\" id=\"QWW|$jB8+*EL;}|#uA\" deletable=\"false\" x=\"27\" y=\"16\"></block>\n</xml>",
    "creator": "em@il.de",
    "createdAt": "2020-12-15T12:05:00.662Z",
    "updatedAt": "2020-12-15T12:05:00.662Z",
    "__v": 0
  }`
 *
 * @apiError (On error) {Object} 400 `{"message": Gallery not found."}`
 * @apiError (On error) {Object} 403 `{"message": No permission updating the gallery project."}`
 * @apiError (On error) {Obejct} 500 Complications during querying the database.
 */
const putClassroom = async function (req, res) {
  try {
    var result = await Classroom.findById(req.params.classroomId);
    var owner = req.user.email;
    if (owner === result.creator) {
      var oldClassroom = await Classroom.findById(req.params.classroomId);
      console.log(oldClassroom);
      if (oldClassroom) {
          var updatedClassroom = {};
          updatedClassroom.students = req.body.students || oldClassroom.students;
          updatedClassroom.title = req.body.title || oldClassroom.title;
          updatedClassroom.description = req.body.description || oldClassroom.description;
          var Classroom = await Classroom.findOneAndUpdate({ _id: oldClassroom._id }, updatedClassroom, { upsert: true, new: true });
          return res.status(200).send({
            message: 'Classroom is updated successfully.',
            classroom: classroom
          });
        }
        else {
          return res.status(403).send({
            message: 'No permission updating the gallery project.',
          });
        }
      }
      else {
        return res.status(400).send({
          message: 'Classroom not found.',
        });
      }
    }
  catch (err) {
      return res.status(500).send(err);
    }
  };

  module.exports = {
    putClassroom
  };
