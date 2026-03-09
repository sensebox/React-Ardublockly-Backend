const mongoose = require("mongoose");
const { Schema } = mongoose;

const pseudoUserSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    groupId: {
      type: String,
      ref: "Group",
      required: true,
    },
    onlineStatus: { type: Boolean, default: true },
    lastSeen: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "pseudoUsers",
  },
);

pseudoUserSchema.index({ groupId: 1, nickname: 1 }, { unique: true });

module.exports = mongoose.model("PseudoUser", pseudoUserSchema);
