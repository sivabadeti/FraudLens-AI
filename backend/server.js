import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectDB from "./config/db.js";

import transactionRoutes from "./routes/transactionRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "FraudLens AI Backend is running",
    status: "success",
  });
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
