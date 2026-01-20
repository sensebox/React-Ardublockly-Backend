// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require("mongoose");

const QuestionProgressSchema = new mongoose.Schema(
  {
    answered: {
      type: Boolean,
      default: false,
    },
    correct: {
      type: Boolean,
      default: false,
    },
    answer: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { _id: false }
);

const StepProgressSchema = new mongoose.Schema(
  {
    seen: {
      type: Boolean,
      default: false,
    },

    questions: {
      type: Map,
      of: QuestionProgressSchema,
      default: {},
    },
  },
  { _id: false }
);

const TutorialProgressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    tutorial: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
      required: true,
      index: true,
    },

    steps: {
      type: Map,
      of: StepProgressSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Ein User darf pro Tutorial nur EIN Progress-Dokument haben
TutorialProgressSchema.index({ user: 1, tutorial: 1 }, { unique: true });

module.exports = mongoose.model("TutorialProgress", TutorialProgressSchema);
