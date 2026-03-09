const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    accessCode: { type: String, unique: true, required: true },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    archived: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    collection: "groups",
  },
);

module.exports = mongoose.model("Group", groupSchema);
