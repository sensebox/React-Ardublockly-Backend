// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');

const ArduinoExamplesSchema = new mongoose.Schema({
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
  board: {
    type: String,
    required: true,
  },
  code: {
    type: String
  }
},{
  timestamps: true
});


module.exports = mongoose.model('ArduinoExamples', ArduinoExamplesSchema);
