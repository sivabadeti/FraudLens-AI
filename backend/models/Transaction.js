import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    // Transaction Input Details
    TransactionDT: {
      type: Number,
      required: true,
    },

    TransactionAmt: {
      type: Number,
      required: true,
    },

    ProductCD: {
      type: String,
      required: true,
    },

    card1: {
      type: Number,
      required: true,
    },

    card2: {
      type: Number,
      default: null,
    },

    card3: {
      type: Number,
      default: null,
    },

    card4: {
      type: String,
      default: null,
    },

    card5: {
      type: Number,
      default: null,
    },

    card6: {
      type: String,
      default: null,
    },

    addr1: {
      type: Number,
      default: null,
    },

    addr2: {
      type: Number,
      default: null,
    },

    P_emaildomain: {
      type: String,
      default: null,
    },

    R_emaildomain: {
      type: String,
      default: null,
    },

    has_R_emaildomain: {
      type: Number,
      required: true,
    },

    // ML Prediction Results
    fraudProbability: {
      type: Number,
      required: true,
    },

    prediction: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;