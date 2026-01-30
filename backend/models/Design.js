import mongoose from "mongoose";

const designSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nodes: {
      type: Array,
      default: [],
    },
    edges: {
      type: Array,
      default: [],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Design", designSchema);
