// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');
const { createId } = require('mnemonic-id');

const ShareSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
    default: createId(10)
  },
  name: {
    type: String,
    required: true
  },
  xml: {
    type: String,
    required: true
  }
},{
  timestamps: true
});


module.exports = mongoose.model('Share', ShareSchema);
