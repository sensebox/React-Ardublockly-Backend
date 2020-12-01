// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Gallery = require('../../models/gallery');


const putGallery = async function(req, res){
  // const {error} = projectValidation(req.body);
  // if(error) return res.status(422).send({message: error.details[0].message});
  try {
    var oldGallery = await Gallery.findOne({_id: req.params.galleryId});
    if(oldGallery){
      var updatedGallery = {};
      updatedGallery.title = req.body.title || oldGallery.title;
      updatedGallery.description = req.body.description || oldGallery.description;
      updatedGallery.xml = req.body.xml || oldGallery.xml;
      var gallery = await Gallery.findOneAndUpdate({_id: oldGallery._id}, updatedGallery, {upsert: true, new: true});
      return res.status(200).send({
        message: 'Gallery is updated successfully.',
        gallery: gallery
      });
    }
    else {
      return res.status(400).send({
        message: 'Gallery not found.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  putGallery
};