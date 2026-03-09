const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupMemberSchema = new Schema(
  {
    _id: { type: String, required: true },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
        pseudoUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PseudoUser",
      required: true,
    },
    role: { type: String, enum: ["teacher", "student"], required: true },
    joinedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "groupMembers",
  },
);

module.exports = mongoose.model("GroupMember", groupMemberSchema);
