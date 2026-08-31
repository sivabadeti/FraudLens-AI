import axios from "axios";
import Transaction from "../models/Transaction.js";

export const analyzeTransaction = async (req, res) => {
  try {
    const transactionData = req.body;

    // Send transaction to Flask ML service
    const mlResponse = await axios.post(
      `${process.env.ML_SERVICE_URL}/predict`,
      transactionData
    );

    const predictionData = mlResponse.data;

    // Check ML service response
    if (!predictionData.success) {
      return res.status(400).json({
        success: false,
        message: "ML prediction failed",
        error: predictionData,
      });
    }

    // Save transaction + prediction result in MongoDB
    const savedTransaction = await Transaction.create({
      ...transactionData,

      prediction: predictionData.prediction,
      fraudProbability: predictionData.fraud_probability,
      riskLevel: predictionData.risk_level,
    });

    // Send result back to frontend
    return res.status(200).json({
      success: true,
      message: "Transaction analyzed and saved successfully",

      result: {
        ...predictionData,
        transactionId: savedTransaction._id,
        createdAt: savedTransaction.createdAt,
      },
    });
  } catch (error) {
    console.error(
      "Transaction analysis error:",
      error.response?.data || error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to analyze transaction",
      error: error.response?.data || error.message,
    });
  }
};


// GET TRANSACTION HISTORY
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Fetch transactions error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch transactions",
    });
  }
};