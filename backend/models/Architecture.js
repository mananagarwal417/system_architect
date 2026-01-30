import mongoose from "mongoose";

const architectureSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    nodes: Array,
    edges: Array,
  },
  { timestamps: true }
);

export default mongoose.model("Architecture", architectureSchema);
