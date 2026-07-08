// jshint esversion: 6
// jshint node: true
"use strict";

const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: String,
    answers: [Object],
    h5plink: String,
    type: String,
    multipleChoice: Boolean,
  },
  { _id: true }
);

const StepSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "instruction",
      "task",
      "blockly",
      "finish",
      "question",
      "blocklyExample",
      "h5p",
    ],
    required: true,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  text: {
    type: String,
  },
  requirements: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tutorial",
    default: undefined,
  },
  questionData: {
    type: [QuestionSchema],
    default: undefined,
  },
  svg: {
    type: String,
  },
  xml: {
    type: String,
  },
  h5psrc: {
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
    },
    subtitle: {
      type: String,
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
    customHardware: {
      type: Object,
      default: undefined,
    },
    duration: {
      type: String,
    },
    year: {
      type: String,
    },
    subjects: {
      type: [String],
    },
    topics: {
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

TutorialSchema.pre("save", function (next) {
  this.steps.forEach((step) => {
    if (step.type === "question" && Array.isArray(step.questionData)) {
      step.questionData.forEach((q) => {
        if (!q.id) {
          q.id = q._id?.toString();
        }
      });
    }
  });

  next();
});

module.exports = mongoose.model("Tutorial", TutorialSchema);
