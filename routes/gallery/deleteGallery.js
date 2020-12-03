// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Gallery = require('../../models/gallery');


const deleteGallery = async function(req, res){
  try{
    var result = await Gallery.findById(req.params.galleryId);
    var owner = req.user.email;
    if(owner === result.creator){
      var gallery = await Gallery.deleteOne({_id: req.params.galleryId});
      if(gallery && gallery.deletedCount > 0){
        return res.status(200).send({
          message: 'Gallery deleted successfully.',
        });
      }
      return res.status(404).send({
        message: 'Gallery not found.',
      });
    }
    else {
      return res.status(403).send({
        message: 'No permission deleting the gallery project.',
      });
    }
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  deleteGallery
};
