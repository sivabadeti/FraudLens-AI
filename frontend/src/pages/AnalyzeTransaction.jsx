import { useEffect, useState } from "react";
import axios from "axios";

import {
  X,
  Plus,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ScanLine,
  RotateCcw,
  BrainCircuit,
  IndianRupee,
  CreditCard,
  MapPin,
  Mail,
  CalendarDays,
} from "lucide-react";

const initialFormData = {
  transactionDay: "",
  transactionAmount: "",
  productCD: "",
  card1: "",
  card2: "",
  card3: "",
  card4: "",
  card5: "",
  card6: "",
  addr1: "",
  addr2: "",
  P_emaildomain: "",
  R_emaildomain: "",
};

const AnalyzeTransaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [step, setStep] = useState("form");
  // form | analyzing | result

  const [formData, setFormData] = useState(initialFormData);

  const [visible, setVisible] = useState(false);

  const [result, setResult] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    setVisible(true);
  }, []);

  // ================= OPEN MODAL =================

  const openModal = () => {
    setStep("form");
    setResult(null);
    setError("");
    setIsModalOpen(true);
  };

  // ================= CLOSE MODAL =================

  const closeModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      setStep("form");
      setError("");
    }, 300);
  };

  // ================= HANDLE INPUT =================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= ANALYZE =================

  const handleAnalyze = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    try {
      // Show analyzing animation
      setStep("analyzing");

      // Convert transaction day to seconds
      // Day 1 = 86400 seconds
      const transactionDay = Number(formData.transactionDay);

      const payload = {
        TransactionDT: transactionDay * 24 * 60 * 60,

        TransactionAmt: Number(formData.transactionAmount),

        ProductCD: formData.productCD,

        card1: Number(formData.card1),

        card2:
          formData.card2.trim() !== ""
            ? Number(formData.card2)
            : null,

        card3:
          formData.card3.trim() !== ""
            ? Number(formData.card3)
            : null,

        card4: formData.card4 || null,

        card5:
          formData.card5.trim() !== ""
            ? Number(formData.card5)
            : null,

        card6: formData.card6 || null,

        addr1:
          formData.addr1.trim() !== ""
            ? Number(formData.addr1)
            : null,

        addr2:
          formData.addr2.trim() !== ""
            ? Number(formData.addr2)
            : null,

        P_emaildomain: formData.P_emaildomain || null,

        R_emaildomain: formData.R_emaildomain || null,

        has_R_emaildomain:
          formData.R_emaildomain.trim() !== "" ? 1 : 0,
      };

      console.log("Sending payload:", payload);

      // Send to Express Backend
      const response = await axios.post(
        "http://localhost:5000/api/transactions/analyze",
        payload
      );

      const prediction = response.data.result;

      // Small delay so analyzing animation is visible
      setTimeout(() => {
        setResult({
          fraudProbability: prediction.fraud_probability,
          riskLevel: prediction.risk_level,
          prediction: prediction.prediction,
          threshold: prediction.threshold,
        });

        setStep("result");
      }, 900);
    } catch (err) {
      console.error(
        "Analysis Error:",
        err.response?.data || err.message
      );

      setError(
        err.response?.data?.message ||
          "Unable to analyze the transaction. Please try again."
      );

      setStep("form");
    }
  };

  // ================= ANALYZE AGAIN =================

  const analyzeAgain = () => {
    setStep("form");
    setResult(null);
    setError("");
    setFormData(initialFormData);
  };

  // ================= RISK UI COLORS =================

  const getRiskStyles = (riskLevel) => {
    switch (riskLevel) {
      case "HIGH":
        return {
          iconBg: "bg-red-50 text-red-500",
          badge: "bg-red-50 text-red-600",
          ring: "border-red-500",
          outerRing: "border-red-100",
          message:
            "The transaction shows suspicious patterns and may require additional verification.",
        };

      case "MEDIUM":
        return {
          iconBg: "bg-orange-50 text-orange-500",
          badge: "bg-orange-50 text-orange-600",
          ring: "border-orange-500",
          outerRing: "border-orange-100",
          message:
            "The transaction shows moderate risk patterns and should be reviewed carefully.",
        };

      default:
        return {
          iconBg: "bg-green-50 text-green-600",
          badge: "bg-green-50 text-green-600",
          ring: "border-green-500",
          outerRing: "border-green-100",
          message:
            "The transaction does not show significant fraud patterns based on the model prediction.",
        };
    }
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white pt-20 text-slate-900">

      {/* ================= PAGE HEADER ================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

            {/* PAGE IDENTITY */}
            <div
              className={`max-w-3xl transition-all duration-700 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 text-orange-600">
                  <ScanLine size={19} />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Transaction Risk Screening
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    <span className="text-xs font-medium text-slate-500">
                      AI-powered pre-transfer assessment
                    </span>
                  </div>
                </div>
              </div>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
                Check before you transfer.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg">
                Review a transaction for potential fraud risk before proceeding
                with a payment or money transfer.
              </p>

              <div className="mt-5 flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={15} className="text-amber-600" />
                <span>
                  AI predictions are advisory and should not be the sole basis for critical decisions.
                </span>
              </div>
            </div>

            {/* PRIMARY ACTION */}
            <div
              className={`flex shrink-0 flex-col items-start gap-3 transition-all delay-150 duration-700 lg:items-end ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              <button
                onClick={openModal}
                className="group flex items-center gap-3 rounded-xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-200 active:scale-[0.98]"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:rotate-90 group-hover:bg-white/20">
                  <Plus size={17} />
                </span>

                Start Risk Check
              </button>

              <p className="text-xs text-slate-400">
                Enter details • Run model • Review risk
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MODAL ================= */}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">

          {/* OVERLAY */}

          <div
            onClick={step === "form" ? closeModal : undefined}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300"
          />

          {/* MODAL */}

          <div className="animate-modal relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">

            {/* ================= FORM ================= */}

            {step === "form" && (
              <>
                {/* HEADER */}

                <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white px-6 py-5 sm:px-8">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50">
                      <ScanLine
                        size={18}
                        className="text-orange-600"
                      />
                    </div>

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Transaction Details
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Enter transaction information for analysis
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* ERROR */}

                {error && (
                  <div className="mx-6 mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 sm:mx-8">
                    {error}
                  </div>
                )}

                {/* FORM */}

                <form
  onSubmit={handleAnalyze}
  className="space-y-5 bg-slate-50/60 px-5 py-5 sm:px-7 sm:py-6"
>
  {/* REQUIRED INFO */}
  <div className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3">
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
      <ShieldCheck size={14} />
    </div>

    <p className="text-xs text-slate-600">
      Fields marked with{" "}
      <span className="font-bold text-red-500">*</span> are required for
      analysis.
    </p>
  </div>

  {/* ================= TRANSACTION DETAILS ================= */}

  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* SECTION HEADER */}

    <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-orange-50/70 to-white px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
          <CalendarDays size={18} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Transaction Details
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Basic information about this transaction
          </p>
        </div>
      </div>

      <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-orange-600">
        Required
      </span>
    </div>

    {/* FIELDS */}

    <div className="grid gap-4 p-5 md:grid-cols-2">
      {/* TRANSACTION DAY */}

      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          Transaction Day
          <span className="text-red-500">*</span>
        </label>

        <input
          type="number"
          name="transactionDay"
          min="1"
          placeholder="e.g. 1"
          value={formData.transactionDay}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />

        <p className="mt-1.5 text-[10px] text-slate-400">
          Day number from the reference dataset
        </p>
      </div>

      {/* TRANSACTION AMOUNT */}

      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          Transaction Amount
          <span className="text-red-500">*</span>
        </label>

        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50/40 px-4 transition-all duration-200 hover:border-slate-300 focus-within:bg-white focus-within:border-orange-400 focus-within:ring-4 focus-within:ring-orange-100">
          <IndianRupee
            size={16}
            className="mr-2 shrink-0 text-slate-400"
          />

          <input
            type="number"
            name="transactionAmount"
            min="0"
            step="0.01"
            placeholder="e.g. 1500"
            value={formData.transactionAmount}
            onChange={handleChange}
            required
            className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* PRODUCT CATEGORY */}

      <div className="md:col-span-2">
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          Product Category
          <span className="text-red-500">*</span>
        </label>

        <select
          name="productCD"
          value={formData.productCD}
          onChange={handleChange}
          required
          className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        >
          <option value="">Select transaction category</option>
          <option value="W">W — Web / Online Transaction</option>
          <option value="C">C — Card Transaction</option>
          <option value="R">R — Retail Transaction</option>
          <option value="H">H — Home Transaction</option>
          <option value="S">S — Store Transaction</option>
        </select>
      </div>
    </div>
  </section>

  {/* ================= CARD INFORMATION ================= */}

  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    {/* HEADER */}

    <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-violet-50/70 to-white px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
          <CreditCard size={18} />
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Card Information
          </h3>

          <p className="mt-0.5 text-[11px] text-slate-500">
            Payment card attributes used by the model
          </p>
        </div>
      </div>

      <span className="hidden text-[10px] text-slate-400 sm:block">
        Additional details improve context
      </span>
    </div>

    <div className="grid gap-4 p-5 md:grid-cols-2">
      {/* CARD 1 */}

      <div>
        <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          Card Identifier
          <span className="text-red-500">*</span>
        </label>

        <input
          type="number"
          name="card1"
          placeholder="Enter card identifier"
          value={formData.card1}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* CARD 2 */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Card Attribute 2

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <input
          type="number"
          name="card2"
          placeholder="Optional value"
          value={formData.card2}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* CARD 3 */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Card Attribute 3

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <input
          type="number"
          name="card3"
          placeholder="Optional value"
          value={formData.card3}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* CARD NETWORK */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Card Network

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <select
          name="card4"
          value={formData.card4}
          onChange={handleChange}
          className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        >
          <option value="">Select card network</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="american express">American Express</option>
          <option value="discover">Discover</option>
        </select>
      </div>

      {/* CARD 5 */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Card Attribute 5

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <input
          type="number"
          name="card5"
          placeholder="Optional value"
          value={formData.card5}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* CARD TYPE */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Card Type

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <select
          name="card6"
          value={formData.card6}
          onChange={handleChange}
          className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        >
          <option value="">Select card type</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="charge card">Charge Card</option>
          <option value="debit or credit">Debit or Credit</option>
        </select>
      </div>
    </div>
  </section>

  {/* ================= LOCATION ================= */}

  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-blue-50/70 to-white px-5 py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
        <MapPin size={18} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">
          Location Information
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500">
          Optional address and region identifiers
        </p>
      </div>
    </div>

    <div className="grid gap-4 p-5 md:grid-cols-2">
      {/* ADDR1 */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Billing Location ID

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <input
          type="number"
          name="addr1"
          placeholder="Enter location ID"
          value={formData.addr1}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
      </div>

      {/* ADDR2 */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Address Region ID

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <input
          type="number"
          name="addr2"
          placeholder="Enter region ID"
          value={formData.addr2}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        />
      </div>
    </div>
  </section>

  {/* ================= EMAIL ================= */}

  <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center gap-3 border-b border-slate-100 bg-gradient-to-r from-emerald-50/70 to-white px-5 py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
        <Mail size={18} />
      </div>

      <div>
        <h3 className="text-sm font-bold text-slate-900">
          Email Information
        </h3>

        <p className="mt-0.5 text-[11px] text-slate-500">
          Purchaser and recipient email domains
        </p>
      </div>
    </div>

    <div className="grid gap-4 p-5 md:grid-cols-2">
      {/* PURCHASER EMAIL */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Purchaser Email Domain

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <select
          name="P_emaildomain"
          value={formData.P_emaildomain}
          onChange={handleChange}
          className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        >
          <option value="">Select email domain</option>
          <option value="gmail.com">gmail.com</option>
          <option value="yahoo.com">yahoo.com</option>
          <option value="hotmail.com">hotmail.com</option>
          <option value="outlook.com">outlook.com</option>
          <option value="icloud.com">icloud.com</option>
          <option value="aol.com">aol.com</option>
          <option value="protonmail.com">protonmail.com</option>
        </select>
      </div>

      {/* RECIPIENT EMAIL */}

      <div>
        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
          Recipient Email Domain

          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
            Optional
          </span>
        </label>

        <select
          name="R_emaildomain"
          value={formData.R_emaildomain}
          onChange={handleChange}
          className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/40 px-4 py-3 text-sm outline-none transition-all duration-200 hover:border-slate-300 focus:bg-white focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
        >
          <option value="">No recipient email</option>
          <option value="gmail.com">gmail.com</option>
          <option value="yahoo.com">yahoo.com</option>
          <option value="hotmail.com">hotmail.com</option>
          <option value="outlook.com">outlook.com</option>
          <option value="icloud.com">icloud.com</option>
          <option value="aol.com">aol.com</option>
          <option value="protonmail.com">protonmail.com</option>
        </select>

        <p className="mt-1.5 text-[10px] text-slate-400">
          Leave empty when recipient email information is unavailable
        </p>
      </div>
    </div>
  </section>

  {/* ================= SUBMIT ================= */}

  <div className="sticky bottom-0 -mx-5 border-t border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:-mx-7 sm:px-7">
    <div className="flex items-center justify-between gap-4">
      <p className="hidden max-w-sm text-[11px] leading-5 text-slate-400 sm:block">
        FraudLens AI evaluates transaction patterns and provides an advisory
        risk assessment.
      </p>

      <button
        type="submit"
        className="group ml-auto flex items-center gap-2.5 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-200 active:translate-y-0"
      >
        <BrainCircuit
          size={17}
          className="transition-transform duration-300 group-hover:rotate-12"
        />

        Analyze Transaction

        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-sm transition-transform duration-300 group-hover:translate-x-0.5">
          →
        </span>
      </button>
    </div>
  </div>
</form>
              </>
            )}

            {/* ================= ANALYZING ================= */}

            {step === "analyzing" && (
              <div className="flex min-h-[520px] flex-col items-center justify-center px-6 text-center">

                <div className="relative flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-orange-500 border-t-orange-500" />

                  <div className="absolute inset-3 animate-[spin_3s_linear_infinite_reverse] rounded-full border border-green-500/40" />

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 shadow-xl shadow-slate-900/20">
                    <BrainCircuit
                      size={28}
                      className="animate-pulse text-orange-400"
                    />
                  </div>
                </div>

                <h2 className="mt-10 text-2xl font-bold text-slate-900">
                  Analyzing transaction
                </h2>

                <p className="mt-3 text-sm text-slate-500">
                  Our ML engine is evaluating transaction patterns
                </p>

                <div className="mt-8 space-y-3 text-left">
                  {[
                    "Extracting transaction features",
                    "Detecting behavioral anomalies",
                    "Running fraud prediction model",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-slate-600"
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          index === 2
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {index === 2 ? (
                          <Loader2
                            size={14}
                            className="animate-spin"
                          />
                        ) : (
                          <CheckCircle2 size={14} />
                        )}
                      </div>

                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= RESULT ================= */}

            {step === "result" && result && (() => {
              const styles = getRiskStyles(result.riskLevel);

              return (
                <div className="animate-result">

                  {/* RESULT HEADER */}

                  <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 sm:px-8">

                    <div className="flex items-center gap-3">

                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.iconBg}`}
                      >
                        <AlertTriangle size={20} />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Analysis Complete
                        </p>

                        <h2 className="font-bold text-slate-900">
                          Fraud Risk Assessment
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={closeModal}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="px-6 py-8 sm:px-8">

                    {/* SCORE */}

                    <div className="text-center">

                      <div
                        className={`relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border-[10px] ${styles.outerRing}`}
                      >
                        <div
                          className={`absolute inset-2 animate-spin rounded-full border-[6px] border-t-orange-400 ${styles.ring}`}
                        />

                        <div>
                          <p className="text-4xl font-bold text-slate-900">
                            {Number(result.fraudProbability).toFixed(2)}%
                          </p>

                          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                            Fraud Risk
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">

                        <span
                          className={`inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wider ${styles.badge}`}
                        >
                          {result.riskLevel} RISK
                        </span>

                        <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
                          {styles.message}
                        </p>
                      </div>
                    </div>

                    {/* MODEL DETAILS */}

                    <div className="mt-8 border-t border-slate-100 pt-6">

                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                        Model Assessment
                      </p>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">

                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <p className="text-xs text-slate-400">
                            Prediction
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800">
                            {result.prediction === 1
                              ? "Potential Fraud"
                              : "Legitimate Transaction"}
                          </p>
                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                          <p className="text-xs text-slate-400">
                            Detection Threshold
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-800">
                            {result.threshold}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">

                      <button
                        onClick={analyzeAgain}
                        className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        <RotateCcw size={16} />

                        Analyze Another
                      </button>

                      <button
                        onClick={closeModal}
                        className="rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ================= FEATURE STRIP ================= */}

      <section className="border-t border-slate-100 bg-slate-50/60">

        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:grid-cols-3 sm:px-8 lg:px-10">

          <div className="text-center">
            <p className="text-sm font-bold text-slate-900">
              Real-Time Prediction
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Instant fraud probability calculation
            </p>
          </div>

          <div className="text-center sm:border-x sm:border-slate-200">
            <p className="text-sm font-bold text-slate-900">
              Explainable AI
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Model-driven transaction risk assessment
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm font-bold text-slate-900">
              Risk Intelligence
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Identify anomalies before they become threats
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AnalyzeTransaction;