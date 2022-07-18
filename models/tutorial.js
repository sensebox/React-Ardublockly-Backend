// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["instruction", "task"],
    required: true,
  },
  headline: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  requirements: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tutorial",
    default: undefined,
  },
  hardware: {
    type: [String],
    default: undefined,
  },
  xml: {
    type: String,
  },
});

const TutorialSchema = new mongoose.Schema(
  {
    creator: {
      type: String,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    public: {
      type: Boolean,
      required: true,
      default: false,
    },
    review: {
      type: Boolean,
      required: false,
      default: false,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    steps: [
      {
        type: StepSchema,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tutorial", TutorialSchema);
