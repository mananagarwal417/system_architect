import express from "express";
import { explainArchitecture } from "../controllers/explainController.js";

const router = express.Router();

router.post("/", explainArchitecture);

export default router;
