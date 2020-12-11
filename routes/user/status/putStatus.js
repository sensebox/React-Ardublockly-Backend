// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const User = require('../../../models/user');


const putStatus = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    if(req.body.status && Array.isArray(req.body.status)){
      var user = await User.findOneAndUpdate({email: req.user.email}, {$set:{status: req.body.status}}, {upsert: true, new: true});
      return res.status(200).send({
        message: 'Status is updated successfully.',
        user: user
      });
    }
    else {
      return res.status(400).send({
        message: 'Status is required and has to be an array.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  putStatus
};
