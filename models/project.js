// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  xml: {
    type: String
  }
},{
  timestamps: true
});


module.exports = mongoose.model('Project', ProjectSchema);
