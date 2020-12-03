// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');

const MediaSchema = new mongoose.Schema({
  youtube: {
    type: String
  },
  picture: {
    path: {
      type: String
    },
    size: {
      type: Number
    },
    contentType: {
      type: String
    },
    originalName: {
      type: String
    }
  }
});

const StepSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['instruction','task'],
    required: true
  },
  headline: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  requirements: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Tutorial',
    default: undefined
  },
  hardware: {
    type: [String],
    default: undefined
  },
  media: {
    type: MediaSchema
  },
  xml: {
    type: String
  }
});

const TutorialSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  steps: [{
    type: StepSchema,
    required: true
  }]
},{
  timestamps: true
});


module.exports = mongoose.model('Tutorial', TutorialSchema);
