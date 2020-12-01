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
                               .populate({path: 'steps.requirements', select: 'title'})
                               .then(res => {
                                 var steps = res.steps.map((step,i) => {
                                   if(i > 0){
                                     step.requirements = undefined;
                                   }
                                   return step;
                                 });
                                 res.steps = steps;
                                 return res;
                               });
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
