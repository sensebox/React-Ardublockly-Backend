// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: Array,
    required: true,
    default: []
  },
  badge: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  role: {
    type: String,
    enum: ['admin', 'creator', 'user'],
    required: true,
    default: 'user'
  }
},{
  timestamps: true
});


module.exports = mongoose.model('User', UserSchema);
