import express from "express";

import {
  analyzeTransaction,
  getTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

router.post("/analyze", analyzeTransaction);

// Get transaction history
router.get("/", getTransactions);

export default router;