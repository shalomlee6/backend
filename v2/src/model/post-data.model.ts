import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  header: String,
  description: String,
  imagePath: String,
  notes: String
});

//Creating our model
export const PostData = mongoose.model("PostData", PostSchema);