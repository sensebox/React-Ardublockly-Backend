// routes/auth.js

"use strict";

const express = require('express');
const mongoose = require('mongoose');
const Classroom = require('../../models/classroom');

/**
 * @api {post} /logout Logout
 * @apiName logout
 * @apiDescription Logout a user by removing their refresh token.
 * @apiGroup Auth
 *
 * @apiHeader {String} Authorization JWT token for authentication.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiError (On error) {Object} 401 Unauthorized if token is invalid or expired.
 * @apiError (On error) {Object} 500 Internal server error.
 */
const postLogoutClassroomUser = async function(req, res) {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Find the classroom and student based on decoded token
    const classroom = await Classroom.findOne({ 'students._id': decoded._id });
    
    if (!classroom) {
      return res.status(404).send({ message: 'Student not found in any classroom' });
    }
    
    const student = classroom.students.id(decoded._id);
    
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    
    // Clear the refresh token
    student.refreshToken = null;
    
    // Save the parent document (classroom) to persist changes
    await classroom.save();
    
    res.status(200).send({ message: 'Successfully logged out.' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = {
    postLogoutClassroomUser
  
};
