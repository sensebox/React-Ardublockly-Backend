const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupTutorialSchema = new Schema(
  {
    _id: { type: String }, 
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    tutorialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tutorial",
      required: true,
    },
    assignedAt: { type: Date, default: Date.now },
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
    collection: "groupTutorials",
  },
);

module.exports = mongoose.model("GroupTutorial", groupTutorialSchema);
