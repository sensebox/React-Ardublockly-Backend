const mongoose = require("mongoose");
const { Schema } = mongoose;

const progressSchema = new Schema(
  {
    _id: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "PseudoUser" },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    tutorialId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutorial" },
    currentPage: { type: Number },
    totalPages: { type: Number },
    lastSeen: { type: Date },
    updatedAt: { type: Date },
    blocklyXml: { type: String }
  },
  {
    timestamps: true,
    collection: "progress",
  },
);

module.exports = mongoose.model("Progress", progressSchema);
