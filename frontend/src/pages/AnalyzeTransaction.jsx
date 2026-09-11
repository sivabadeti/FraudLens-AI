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
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] pt-20 text-slate-900">
      {/* ================= MODERN PAGE HEADER ================= */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-orange-100/60 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div
            className={`flex flex-col gap-8 transition-all duration-700 lg:flex-row lg:items-end lg:justify-between ${
              visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-100 bg-orange-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                AI Transaction Screening
              </div>

              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Check the risk
                <span className="text-orange-500"> before you transfer.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                Review transaction details with FraudLens AI and receive a
                model-based fraud risk assessment before proceeding.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  ["AI-powered", "Prediction"],
                  ["14 signals", "Transaction data"],
                  ["0.30", "Decision threshold"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm"
                  >
                    <p className="text-xs font-bold text-slate-900">{value}</p>
                    <p className="mt-0.5 text-[9px] text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={openModal}
              className="group flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 py-4 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 hover:shadow-orange-200 active:scale-[0.98]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10">
                <Plus size={17} />
              </span>
              Start Risk Check
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

      {/* ================= INFORMATION STRIP ================= */}
      <section className="border-b border-slate-200 bg-slate-50/80">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-5 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            {
              icon: ShieldCheck,
              title: "Before you pay",
              text: "Screen the transaction before proceeding.",
            },
            {
              icon: BrainCircuit,
              title: "Model-based",
              text: "Risk is estimated from transaction signals.",
            },
            {
              icon: CheckCircle2,
              title: "Decision support",
              text: "Use the result alongside your own verification.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-orange-500">
                  <Icon size={17} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.title}</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5">
          <div
            onClick={step === "form" ? closeModal : undefined}
            className="absolute inset-0 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-300"
          />

          <div className="animate-modal relative z-10 flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-2xl">
            {/* MODAL HEADER */}
            {step === "form" && (
              <>
                <div className="flex shrink-0 items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <ScanLine size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Transaction Risk Check
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        Enter the available transaction details
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Close"
                  >
                    <X size={18} />
                  </button>
                </div>

                {error && (
                  <div className="mx-5 mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600 sm:mx-7">
                    {error}
                  </div>
                )}

                <form
                  onSubmit={handleAnalyze}
                  className="min-h-0 overflow-y-auto bg-[#f7f9fc] px-4 py-5 sm:px-6 sm:py-6"
                >
                  <div className="space-y-4">
                    {/* INTRO */}
                    <div className="rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 via-white to-white p-4 sm:p-5">
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                          <ShieldCheck size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Before you transfer
                          </p>
                          <p className="mt-1 text-[11px] leading-5 text-slate-500">
                            Provide the transaction information available to
                            you. FraudLens will evaluate the supplied signals
                            and return an estimated risk level.
                          </p>
                          <p className="mt-2 text-[10px] text-slate-400">
                            <span className="font-bold text-red-500">*</span>{" "}
                            Required fields
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* TRANSACTION */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                          <CalendarDays size={17} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Transaction Details</p>
                          <p className="text-[10px] text-slate-400">
                            Basic information about the payment
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 p-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                            Transaction Date
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="transactionDate"
                            value={formData.transactionDate || ""}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            required
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          />
                          <p className="mt-1.5 text-[10px] text-slate-400">
                            When are you making this transaction?
                          </p>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                            Transaction Amount
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-orange-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-orange-100">
                            <IndianRupee size={16} className="mr-2 text-slate-400" />
                            <input
                              type="number"
                              name="transactionAmount"
                              min="1"
                              step="0.01"
                              placeholder="e.g. 2,500"
                              value={formData.transactionAmount}
                              onChange={handleChange}
                              required
                              className="w-full bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                            />
                          </div>
                          <p className="mt-1.5 text-[10px] text-slate-400">
                            Enter the amount you plan to transfer or pay
                          </p>
                        </div>

                        <div className="md:col-span-2">
                          <label className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                            Where are you making this payment?
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="productCD"
                            value={formData.productCD}
                            onChange={handleChange}
                            required
                            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          >
                            <option value="">Select payment type</option>
                            <option value="W">Online / Website</option>
                            <option value="C">Card Payment</option>
                            <option value="R">Retail / Merchant</option>
                            <option value="H">Home / Personal Payment</option>
                            <option value="S">Store Payment</option>
                          </select>
                          <p className="mt-1.5 text-[10px] text-slate-400">
                            Choose the option that best describes your transaction
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* PAYMENT */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                          <CreditCard size={17} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Payment Information</p>
                          <p className="text-[10px] text-slate-400">
                            Details related to the payment card
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 p-5 md:grid-cols-2">
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
                            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          >
                            <option value="">Select card network</option>
                            <option value="visa">Visa</option>
                            <option value="mastercard">Mastercard</option>
                            <option value="american express">American Express</option>
                            <option value="discover">Discover</option>
                          </select>
                          <p className="mt-1.5 text-[10px] text-slate-400">
                            The network shown on your card
                          </p>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
                            Payment Card Type
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
                              Optional
                            </span>
                          </label>
                          <select
                            name="card6"
                            value={formData.card6}
                            onChange={handleChange}
                            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          >
                            <option value="">Select card type</option>
                            <option value="credit">Credit Card</option>
                            <option value="debit">Debit Card</option>
                            <option value="charge card">Charge Card</option>
                            <option value="debit or credit">Debit or Credit</option>
                          </select>
                          <p className="mt-1.5 text-[10px] text-slate-400">
                            Choose the type of card being used
                          </p>
                        </div>

                        <div className="md:col-span-2">
                          <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
                            Card Reference
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
                              Optional
                            </span>
                          </label>
                          <input
                            type="number"
                            name="card1"
                            placeholder="Enter your card reference number"
                            value={formData.card1}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          />
                          <div className="mt-2 flex items-start gap-2 rounded-lg bg-slate-50 px-3 py-2">
                            <ShieldCheck size={13} className="mt-0.5 shrink-0 text-slate-400" />
                            <p className="text-[10px] leading-4 text-slate-400">
                              Use a reference value only.{" "}
                              <strong>
                                Do not enter your full card number, CVV, PIN, or password.
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* EMAIL */}
                    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                          <Mail size={17} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">Email Information</p>
                          <p className="text-[10px] text-slate-400">
                            Email providers associated with the transaction
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 p-5 md:grid-cols-2">
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
                            Your Email Provider
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
                              Optional
                            </span>
                          </label>
                          <select
                            name="P_emaildomain"
                            value={formData.P_emaildomain}
                            onChange={handleChange}
                            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          >
                            <option value="">Select email provider</option>
                            <option value="gmail.com">Gmail</option>
                            <option value="yahoo.com">Yahoo</option>
                            <option value="hotmail.com">Hotmail</option>
                            <option value="outlook.com">Outlook</option>
                            <option value="icloud.com">iCloud</option>
                            <option value="aol.com">AOL</option>
                            <option value="protonmail.com">ProtonMail</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
                            Recipient Email Provider
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
                              Optional
                            </span>
                          </label>
                          <select
                            name="R_emaildomain"
                            value={formData.R_emaildomain}
                            onChange={handleChange}
                            className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                          >
                            <option value="">No recipient email</option>
                            <option value="gmail.com">Gmail</option>
                            <option value="yahoo.com">Yahoo</option>
                            <option value="hotmail.com">Hotmail</option>
                            <option value="outlook.com">Outlook</option>
                            <option value="icloud.com">iCloud</option>
                            <option value="aol.com">AOL</option>
                            <option value="protonmail.com">ProtonMail</option>
                          </select>
                          <p className="mt-1.5 text-[10px] text-slate-400">
                            Select "No recipient email" if it does not apply
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* LOCATION */}
                    <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <MapPin size={17} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">Location Details</p>
                            <p className="text-[10px] text-slate-400">
                              Optional transaction context
                            </p>
                          </div>
                        </div>
                        <ChevronDownIcon />
                      </summary>

                      <div className="border-t border-slate-100 p-5">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
                              Billing Location Reference
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
                                Optional
                              </span>
                            </label>
                            <input
                              type="number"
                              name="addr1"
                              placeholder="Optional reference"
                              value={formData.addr1}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            />
                            <p className="mt-1.5 text-[10px] text-slate-400">
                              Use a reference value, not your full address
                            </p>
                          </div>

                          <div>
                            <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700">
                              Region Reference
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-medium text-slate-400">
                                Optional
                              </span>
                            </label>
                            <input
                              type="number"
                              name="addr2"
                              placeholder="Optional reference"
                              value={formData.addr2}
                              onChange={handleChange}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                            />
                            <p className="mt-1.5 text-[10px] text-slate-400">
                              No need to enter your actual address
                            </p>
                          </div>
                        </div>
                      </div>
                    </details>

                    {/* PRIVACY */}
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50/50 px-4 py-3">
                      <ShieldCheck size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                      <p className="text-[10px] leading-5 text-emerald-800/70">
                        For your security, never enter sensitive information
                        such as your full card number, CVV, PIN, password, or
                        banking credentials.
                      </p>
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <div className="sticky bottom-0 mt-5 border-t border-slate-200 bg-[#f7f9fc]/95 pt-4 backdrop-blur">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="hidden sm:block">
                        <p className="text-xs font-semibold text-slate-700">
                          Ready to check this transaction?
                        </p>
                        <p className="mt-0.5 text-[10px] text-slate-400">
                          Get an AI-powered risk assessment.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500 hover:shadow-orange-200 active:scale-[0.98] sm:w-auto"
                      >
                        <BrainCircuit size={17} />
                        Check Transaction Risk
                        <span className="transition-transform group-hover:translate-x-1">
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
              <div className="flex min-h-[540px] flex-col items-center justify-center bg-white px-6 text-center">
                <div className="relative flex h-28 w-28 items-center justify-center">
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-orange-500 border-t-orange-500" />
                  <div className="absolute inset-3 animate-[spin_3s_linear_infinite_reverse] rounded-full border border-emerald-500/40" />
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 shadow-xl">
                    <BrainCircuit size={28} className="animate-pulse text-orange-400" />
                  </div>
                </div>

                <p className="mt-9 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                  FraudLens AI
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Analyzing transaction
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Evaluating transaction patterns and risk signals
                </p>

                <div className="mt-8 w-full max-w-xs space-y-3 text-left">
                  {[
                    "Extracting transaction features",
                    "Detecting behavioral anomalies",
                    "Running fraud prediction model",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600"
                    >
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full ${
                          index === 2
                            ? "bg-orange-100 text-orange-600"
                            : "bg-emerald-100 text-emerald-600"
                        }`}
                      >
                        {index === 2 ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <CheckCircle2 size={13} />
                        )}
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ================= RESULT ================= */}
            {step === "result" &&
              result &&
              (() => {
                const styles = getRiskStyles(result.riskLevel);

                return (
                  <div className="animate-result bg-[#f8fafc]">
                    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.iconBg}`}
                        >
                          <AlertTriangle size={19} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            Analysis complete
                          </p>
                          <p className="mt-0.5 text-sm font-bold text-slate-900">
                            Fraud Risk Assessment
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={closeModal}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="px-5 py-8 sm:px-8">
                      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                        <div className="text-center">
                          <div
                            className={`relative mx-auto flex h-44 w-44 items-center justify-center rounded-full border-[10px] ${styles.outerRing} bg-white shadow-sm`}
                          >
                            <div
                              className={`absolute inset-2 animate-spin rounded-full border-[5px] border-t-orange-400 ${styles.ring}`}
                            />
                            <div>
                              <p className="text-4xl font-bold tracking-tight text-slate-900">
                                {Number(result.fraudProbability).toFixed(2)}%
                              </p>
                              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                                Fraud Risk
                              </p>
                            </div>
                          </div>

                          <span
                            className={`mt-5 inline-flex rounded-full px-4 py-2 text-xs font-bold tracking-wider ${styles.badge}`}
                          >
                            {result.riskLevel} RISK
                          </span>

                          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                            {styles.message}
                          </p>
                        </div>

                        <div>
                          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <div className="flex items-center gap-2">
                              <BrainCircuit size={17} className="text-orange-500" />
                              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                                Model Assessment
                              </p>
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                              <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-[10px] text-slate-400">
                                  Prediction
                                </p>
                                <p className="mt-1 text-sm font-bold text-slate-800">
                                  {result.prediction === 1
                                    ? "Potential Fraud"
                                    : "Legitimate Transaction"}
                                </p>
                              </div>

                              <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-[10px] text-slate-400">
                                  Detection Threshold
                                </p>
                                <p className="mt-1 text-sm font-bold text-slate-800">
                                  {result.threshold}%
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3">
                            <div className="flex items-start gap-2">
                              <ShieldCheck size={15} className="mt-0.5 text-amber-600" />
                              <p className="text-[10px] leading-5 text-amber-800/75">
                                This is an AI-generated assessment. Verify
                                suspicious payment requests independently and
                                never share sensitive credentials.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-7 grid gap-3 border-t border-slate-200 pt-6 sm:grid-cols-2">
                        <button
                          onClick={analyzeAgain}
                          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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

      {/* ================= BOTTOM FEATURE STRIP ================= */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            ["Real-Time Prediction", "Instant fraud probability calculation", BrainCircuit],
            ["Explainable Assessment", "Model-driven transaction risk analysis", ScanLine],
            ["Risk Intelligence", "Identify suspicious patterns before proceeding", ShieldCheck],
          ].map(([title, text, Icon], index) => (
            <div
              key={title}
              className={`flex items-start gap-3 px-2 ${
                index !== 0 ? "sm:border-l sm:border-slate-200 sm:pl-6" : ""
              }`}
            >
              <Icon size={18} className="mt-0.5 shrink-0 text-orange-500" />
              <div>
                <p className="text-xs font-bold text-slate-900">{title}</p>
                <p className="mt-1 text-[10px] leading-5 text-slate-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

/* Small local UI helpers — presentation only. */
const ArrowRightIcon = () => (
  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
    →
  </span>
);

const ChevronDownIcon = () => (
  <span className="text-slate-400 transition-transform duration-200 group-open:rotate-180">
    ↓
  </span>
);

export default AnalyzeTransaction;
