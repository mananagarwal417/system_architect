import express from "express";
import {
  saveDesign,
  getMyDesigns,
} from "../controllers/architectureController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, saveDesign);
router.get("/", protect, getMyDesigns);

export default router;
