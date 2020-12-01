// jshint esversion: 8
// jshint node: true
"use strict";

const express = require('express');
const mongoose = require('mongoose');

const Gallery = require('../../models/gallery');

const getGalleries = async function(req, res){
  try{
    var result = await Gallery.find({});
    return res.status(200).send({
      message: 'Galleries found successfully.',
      galleries: result
    });
  }
  catch(err){
    return res.status(500).send(err);
  }
};

module.exports = {
  getGalleries
};
