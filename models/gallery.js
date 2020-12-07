// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creator: {
    type: String,
    ref: 'User',
    required: true
  },
  xml: {
    type: String
  }
},{
  timestamps: true
});


module.exports = mongoose.model('Gallery', GallerySchema);
