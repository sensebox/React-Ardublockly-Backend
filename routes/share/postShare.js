// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Share = require('../../models/share');

const postShare = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    const body = {
      _id: req.body._id,
      name: req.body.name,
      xml: req.body.xml
    };
    const share = new Share(body);
    const savedShare = await share.save();
    return res.status(201).send({
      message: 'Sharing-Content is successfully created.',
      content: savedShare
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postShare
};
