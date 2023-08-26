import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  id: { type: String },
  creator: { type: String, required: true },
  creatorUsername: { type: String, required: true },
  name: { type: String, required: true },
  likes: { type: [String], default: [] },
  starredBy: { type: [String], default: [] },
  html: { type: String },
  css: { type: String },
  js: { type: String },
});

export default mongoose.model("Project", projectSchema);
