// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Gallery = require('../../models/gallery');

const getGallery = async function(req, res){
  try{
    var id = req.params.galleryId;
    var result = await Gallery.findById(id);
    // TODO: .populate({path: 'creator', model: 'User', select: 'name'})
    return res.status(200).send({
      message: 'Gallery found successfully.',
      gallery: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getGallery
};
