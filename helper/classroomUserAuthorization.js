// middlewares/authMiddleware.js

"use strict";

const jwt = require('jsonwebtoken');
const Classroom = require('../models/classroom'); // Update the path as needed

/**
 * Middleware to verify classroom users
 */
const classroomUserAuthorization = async function(req, res, next) {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }
  
  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
    
    // Find the classroom and student based on decoded token
    const classroom = await Classroom.findOne({ 'students._id': decoded._id });
    
    if (!classroom) {
      return res.status(404).send({ message: 'Student not found in any classroom' });
    }
    
    const student = classroom.students.id(decoded._id);
    
    if (!student) {
      return res.status(404).send({ message: 'Student not found' });
    }
    
    // Attach user information to the request object
    req.user = {
      ...student.toObject(),
      classroomId: classroom._id
    };
    
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = {
    classroomUserAuthorization
};
