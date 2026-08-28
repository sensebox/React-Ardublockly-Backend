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
    },
    role: { type: String, enum: ["teacher", "student"], required: true },
    name: { type: String },
    nickname: { type: String },
    onlineStatus: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    claimed: { type: Boolean, default: false },
    sessionToken: { type: String },
    joinedAt: { type: Date, default: Date.now },
    tutorialId: { type: mongoose.Schema.Types.ObjectId, ref: "Tutorial", default: null }, // NEU
    currentStep: { type: Number, default: null },    
  },
  {
    timestamps: true,
    collection: "groupMembers",
  },
);

// sparse:true allows multiple teacher records with null nickname
groupMemberSchema.index({ groupId: 1, nickname: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("GroupMember", groupMemberSchema);
