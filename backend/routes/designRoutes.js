import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { saveDesign,getMyDesigns,deleteDesign } from "../controllers/designController.js";

const router=express.Router();

router.post("/", protect, saveDesign);
router.get("/my", protect, getMyDesigns);
router.delete("/:id", protect, deleteDesign);

export default router;
