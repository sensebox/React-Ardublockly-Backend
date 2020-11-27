// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Tutorial = require('../../models/tutorial');

const getTutorial = async function(req, res){
  try{
    var id = req.params.tutorialId;
    var result = await Tutorial.findById(id)
                               .populate('requirementts', {title: 1});
    return res.status(200).send({
      message: 'Tutorial found successfully.',
      tutorial: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getTutorial
};
