import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import architectureRoutes from "./routes/architectureRoutes.js";
import explainRoutes from "./routes/explainRoutes.js";
import designRoutes from "./routes/designRoutes.js"

dotenv.config();
connectDB(process.env.MONGO_URI);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/designs", architectureRoutes);
app.use("/api/designs",designRoutes);
app.use("/api/explain", explainRoutes);

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running")
);
