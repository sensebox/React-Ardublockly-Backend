// routes/auth.js

"use strict";

const express = require('express');
const mongoose = require('mongoose');
const Classroom = require('../../models/classroom');

/**
 * @api {post} /login Login with classroom code and nickname
 * @apiName loginWithCodeAndUser
 * @apiDescription Authenticate a student using classroom code and nickname.
 * @apiGroup Auth
 *
 * @apiParam {String} classroomCode Classroom code of the classroom.
 * @apiParam {String} nickname Nickname of the student.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {String} token JWT token for authentication.
 * @apiSuccess {String} refreshToken Refresh token for renewing JWT.
 * @apiSuccess {Object} student Student object with additional details.
 *
 * @apiError (On error) {Object} 404 Student not found or classroom not found.
 * @apiError (On error) {Object} 500 Internal server error.
 */
const loginWithCodeAndUser = async function(req, res) {
  try {
    const { classroomCode, nickname } = req.body;
    const classroom = await Classroom.findOne({ classroomCode });

    if (!classroom) {
      return res.status(404).send({ message: 'Classroom not found' });
    }

    const student = classroom.students.find(s => s.nickname === nickname);

    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }

    // Generate tokens
    const token = student.generateAuthToken();
    const refreshToken = student.generateRefreshToken();
    
    // Set the new refresh token in the student subdocument
    student.refreshToken = refreshToken;

    // Save the parent document (classroom) to persist changes
    await classroom.save();

    // Send the response
    res.status(200).send({
      message: 'Successfully logged in.',
      token,
      refreshToken,
      student: {
        ...student.toObject(),
        classroomId: classroom._id
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
  loginWithCodeAndUser
};
