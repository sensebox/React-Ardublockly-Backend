// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Classroom = require('../../models/classroom');

/**
 * @api {put} /classroom/:classroomId/project/:projectId Update project
 * @apiName updateProject
 * @apiDescription Update a specific project.
 * @apiGroup Classroom
 *
 * @apiHeader {String} Authorization allows to send a valid JSON Web Token along with this request with `Bearer` prefix.
 * @apiHeaderExample {String} Authorization Header Example
 *   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTk5OTEwY2QxMDgyMjA3Y2Y1ZGM2ZiIsImlhdCI6MTU3ODg0NDEwOSwiZXhwIjoxNTc4ODUwMTA5fQ.D4NKx6uT3J329j7JrPst6p02d311u7AsXVCUEyvoiTo
 *
 * @apiParam {ObjectId} classroomId the ID of the classroom you are referring to
 * @apiParam {ObjectId} projectId the ID of the project you are referring to
 *
 * @apiSuccess (Success 200) {String} message `Project updated successfully.`
 * @apiSuccess (Success 200) {Object} project Updated project details
 *
 * @apiError (On error) {Object} 500 Complications during querying the database.
 */
const putClassroomProject = async function(req, res){
  try {
    const { classroomId, projectId } = req.params;
    const { title, xml } = req.body;

    // Extract student information from the request object (set by middleware)
    const studentId = req.user._id;

    const classroom = await Classroom.findById(classroomId);
    if (!classroom) {
      return res.status(404).send({ message: 'Classroom not found.' });
    }

    const student = classroom.students.id(studentId);
    if (!student) {
      return res.status(404).send({ message: 'Student not found.' });
    }

    const project = student.projects.id(projectId);
    if (!project) {
      return res.status(404).send({ message: 'Project not found.' });
    }

    if (title) project.title = title;
    if (xml) project.xml = xml;

    await classroom.save();

    return res.status(200).send({
      message: 'Project updated successfully.',
      project: project
    });
  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Server error', error: err });
  }
};

module.exports = {
    putClassroomProject
};
