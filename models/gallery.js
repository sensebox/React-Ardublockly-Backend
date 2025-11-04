const mongoose = require("mongoose");
const { Schema } = mongoose;

const gallerySchema = new Schema(
  {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    xml: { type: String },
    creator: { type: String },
  },
  {
    timestamps: true,
    collection: "galleries",
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);
