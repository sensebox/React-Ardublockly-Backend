const mongoose = require("mongoose");
const { Schema } = mongoose;

const solutionSchema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "PseudoUser" },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    tutorialId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutorial" },
    blocklyXml: { type: String },
    publishedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "solutions",
  },
);

module.exports = mongoose.model("Solution", solutionSchema);
