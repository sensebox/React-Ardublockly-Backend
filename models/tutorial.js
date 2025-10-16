// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["instruction", "task", "blockly", "finish", "question"],
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
  questionData: {
    type: [Object],
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
    learnings: {
      type: [Object],
    },
    hardware: {
      type: [String],
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
