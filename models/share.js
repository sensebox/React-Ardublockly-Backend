// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  board: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    expires: Number(process.env.SHARE_EXPIRES_IN)
  },
  // either XML or Id to the project, from which the XML can be extracted
  xml: {
    type: String
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }
},{
  timestamps: true
});


module.exports = mongoose.model('Share', ShareSchema);
