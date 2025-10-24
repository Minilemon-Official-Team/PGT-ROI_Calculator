import express from "express";
import {
  getAllRoiResults,
  calculateRoi,
} from "../controllers/CalculatorController.js";

const router = express.Router();

router.get("/api/roi-results/", getAllRoiResults);
router.post("/api/calculate-roi", calculateRoi);

export default router;
