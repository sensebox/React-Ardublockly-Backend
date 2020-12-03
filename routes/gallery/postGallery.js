// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Gallery = require('../../models/gallery');
const User = require('../../models/user');

const postGallery = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    var user = await User.findOne({email: req.user.email});
    if(user.role !== 'user'){
      const body = {
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        xml: req.body.xml,
        creator: req.user.email,
      };
      const gallery = new Gallery(body);
      const savedGallery = await gallery.save();
      return res.status(201).send({
        message: 'Gallery is successfully created.',
        gallery: savedGallery
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission creating the gallery project.',
      });
    }
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postGallery
};
