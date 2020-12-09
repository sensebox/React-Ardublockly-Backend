// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');
const request = require('request');

const User = require('../../../models/user');

const disconnectAccount = async function(req, res){
  try{
    var user = await User.findOneAndUpdate({email: req.user.email}, {$set: {badge: null}});
    return res.status(200).send({
      message: 'User is not longer connected to MyBadges.',
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  disconnectAccount
};
