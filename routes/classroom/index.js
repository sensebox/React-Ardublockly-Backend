// jshint esversion: 8
// jshint node: true
"use strict";

var express = require('express');
var ClassroomRouter = express.Router();

const { userAuthorization } = require('../../helper/userAuthorization');
const { classroomUserAuthorization } = require('../../helper/classroomUserAuthorization');

ClassroomRouter.route('/')
  .post(userAuthorization, require('./postClassroom').postClassroom);

ClassroomRouter.route('/')
  .get(userAuthorization, require('./getClassrooms').getClassrooms);

ClassroomRouter.route('/:classroomId')
  .put(userAuthorization, require('./putClassroom').putClassroom);

ClassroomRouter.route('/:classroomId')
  .delete(userAuthorization, require('./deleteClassroom').deleteClassroom);

ClassroomRouter.route('/:classroomId')
  .get(userAuthorization, require('./getClassroom').getClassroom);


ClassroomRouter.route('/:classroomCode')
  .get(require('./getClassroomByCode').getClassroomByCode);


/*
** Add Classroom User
**
*/  

ClassroomRouter.route('/:classroomId/adduser')
  .post(userAuthorization, require('./postClassroomAddUser').postClassroomAddUser);

ClassroomRouter.route('/:classroomId/user')
  .delete(userAuthorization, require('./deleteClassroomDeleteUser').deleteClassroomDeleteUser);

/*
**
** Login/Logout
**
*/

// Login with Code and User
ClassroomRouter.route('/login')
  .post(require('./loginWithCodeAndUser').loginWithCodeAndUser);

// Logout with Code and User
ClassroomRouter.route('/logout')
  .post(require('./postLogoutClassroomUser').postLogoutClassroomUser);


/*
** Classroom Projects
**
*/
// Get all Projects by User
  ClassroomRouter.route('/:classroomId/projects')
  .get(classroomUserAuthorization, require('./getClassroomProjects').getClassroomProjects);

// Get single Project by User
ClassroomRouter.route('/:classroomId/:projectId')
  .get(classroomUserAuthorization, require('./getClassroomProject').getClassroomProject);

  ClassroomRouter.route('/:classroomId/project')
  .post(classroomUserAuthorization, require('./postClassroomProject').postClassroomProject);

  ClassroomRouter.route('/:classroomId/project/:projectId')
  .put(classroomUserAuthorization, require('./putClassroomProject').putClassroomProject);






module.exports = ClassroomRouter;
