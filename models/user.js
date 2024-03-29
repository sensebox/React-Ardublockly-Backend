// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: Array,
      required: true,
      default: [],
    },

    role: {
      type: String,
      enum: ["admin", "creator", "user"],
      required: true,
      default: "creator",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
