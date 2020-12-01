// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Gallery = require('../../models/gallery');

const postGallery = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try{
    const body = {
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      xml: req.body.xml,
      // TODO: use signed in user
      creator: new mongoose.Types.ObjectId(),
    };
    const gallery = new Gallery(body);
    const savedGallery = await gallery.save();
    return res.status(201).send({
      message: 'Gallery is successfully created.',
      gallery: savedGallery
    });
  }
  catch(err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  postGallery
};
