// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10
  },
  title: {
    type: String,
    required: true
  },
  xml: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: Number(process.env.SHARE_EXPIRES_IN)
  }
},{
  timestamps: true
});


module.exports = mongoose.model('Share', ShareSchema);
