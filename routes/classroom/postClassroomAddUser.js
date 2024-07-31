// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Classroom = require('../../models/classroom');

/**
 * @api {get} /gallery/:galleryId Get gallery
 * @apiName getGallery
 * @apiDescription Get a specific gallery.
 * @apiGroup Gallery
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} galleryId the ID of the gallery you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Gallery found successfully.`
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
 * @apiError (On error) {Obejct} 500 Complications during querying the database.req_5366cf7eae95425aa06fd36ee92813b7
 */
const postClassroomAddUser = async function (req, res) {
  try {
    var classroom = await Classroom.findById(req.params.classroomId);
    var owner = req.user.email;
    if (owner === classroom.creator) {
      var students = req.body.students;
      var classroomStudents = classroom.students;
      for (const student of students) {
        classroomStudents.push(student);
      }
      await classroom.save();
      return res.status(200).send({
        message: 'Students successfully added',
        students: students
      });
    } else {
      return res.status(404).send({
        message: 'No permissions.',
      });
    }
  }
  catch (err) {
    return res.status(500).send(err);
  }
};

module.exports = {
  postClassroomAddUser
};
