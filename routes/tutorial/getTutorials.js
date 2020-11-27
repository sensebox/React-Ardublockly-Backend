// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Tutorial = require('../../models/tutorial');

const getTutorials = async function(req, res){
  try{
    var result = await Tutorial.find({});
    return res.status(200).send({
      message: 'Tutorials found successfully.',
      tutorials: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getTutorials
};
