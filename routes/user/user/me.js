// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

const me = async function(req, res){
  try{
    var body = req.user;
    var user = await User.findOne({email: body.email});
    body.blocklyRole = user.role;
    body.badge = user.badge;
    return res.status(200).send({
      message: 'User found successfully.',
      user: body
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  me
};
