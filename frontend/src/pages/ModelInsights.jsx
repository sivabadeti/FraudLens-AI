import { useEffect, useState } from "react";
import {
  Activity,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  CreditCard,
  Database,
  GitBranch,
  Mail,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Workflow,
  Zap,
} from "lucide-react";

const ModelInsights = () => {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    setVisible(true);
  }, []);

  const features = [
    {
      name: "TransactionDT",
      category: "Transaction",
      description: "Time elapsed since the reference transaction.",
    },
    {
      name: "TransactionAmt",
      category: "Transaction",
      description: "Monetary value of the transaction.",
    },
    {
      name: "ProductCD",
      category: "Transaction",
      description: "Product category associated with the transaction.",
    },
    {
      name: "card1",
      category: "Card",
      description: "Primary card identifier.",
    },
    {
      name: "card2",
      category: "Card",
      description: "Secondary card-related identifier.",
    },
    {
      name: "card3",
      category: "Card",
      description: "Card verification or category identifier.",
    },
    {
      name: "card4",
      category: "Card",
      description: "Card network or provider.",
    },
    {
      name: "card5",
      category: "Card",
      description: "Additional card identifier.",
    },
    {
      name: "card6",
      category: "Card",
      description: "Card type or payment category.",
    },
    {
      name: "addr1",
      category: "Address",
      description: "Primary address region information.",
    },
    {
      name: "addr2",
      category: "Address",
      description: "Secondary address region information.",
    },
    {
      name: "P_emaildomain",
      category: "Email",
      description: "Purchaser email domain.",
    },
    {
      name: "R_emaildomain",
      category: "Email",
      description: "Recipient email domain.",
    },
    {
      name: "has_R_emaildomain",
      category: "Email",
      description: "Indicates whether a recipient email is available.",
    },
  ];

  const categories = [
    { name: "All", icon: Database },
    { name: "Transaction", icon: Activity },
    { name: "Card", icon: CreditCard },
    { name: "Address", icon: MapPin },
    { name: "Email", icon: Mail },
  ];

  const filteredFeatures =
    activeCategory === "All"
      ? features
      : features.filter((feature) => feature.category === activeCategory);

  const categoryStyles = {
    Transaction:
      "border-blue-200 bg-blue-50 text-blue-700",
    Card:
      "border-violet-200 bg-violet-50 text-violet-700",
    Address:
      "border-amber-200 bg-amber-50 text-amber-700",
    Email:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] pt-20">
      {/* ================= HEADER ================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <div
            className={`transition-all duration-700 ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <BrainCircuit size={16} />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Machine Learning Intelligence
              </span>

              <div className="ml-1 flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                  Model Active
                </span>
              </div>
            </div>

            <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Model Insights
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
              Explore how the FraudLens AI model evaluates transaction data
              and converts machine learning predictions into actionable risk
              assessments.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">

        {/* ================= MODEL STATS ================= */}

        <section
          className={`grid grid-cols-2 gap-3 lg:grid-cols-4 transition-all delay-100 duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <BrainCircuit size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                CatBoost
              </p>
              <p className="text-[11px] text-slate-500">
                ML Algorithm
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <SlidersHorizontal size={18} />
            </div>

            <div>
              <p className="text-xl font-bold leading-none text-slate-900">
                14
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Input Features
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
              <Target size={18} />
            </div>

            <div>
              <p className="text-xl font-bold leading-none text-slate-900">
                30%
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Fraud Threshold
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-emerald-600">
                Operational
              </p>
              <p className="text-[11px] text-slate-500">
                Model Status
              </p>
            </div>
          </div>
        </section>

        {/* ================= MODEL OVERVIEW + DECISION ================= */}

        <section
          className={`mt-6 grid gap-5 lg:grid-cols-[1.25fr_.75fr] transition-all delay-200 duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* MODEL OVERVIEW */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles size={17} className="text-orange-500" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Model Overview
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-slate-900">
                  Fraud Detection Intelligence
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  FraudLens AI uses a trained CatBoost classification model to
                  evaluate transaction characteristics and estimate the
                  probability of fraudulent activity.
                </p>
              </div>

              <div className="hidden h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600 sm:flex">
                <BrainCircuit size={22} />
              </div>
            </div>

            {/* MODEL FLOW */}

            <div className="mt-7 grid gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <Database size={18} className="text-slate-600" />

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Transaction
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  Input data
                </p>
              </div>

              <div className="flex items-center justify-center sm:hidden">
                <ChevronRight size={18} className="text-slate-300" />
              </div>

              <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                <SlidersHorizontal
                  size={18}
                  className="text-orange-500"
                />

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Features
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  14 parameters
                </p>
              </div>

              <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
                <BrainCircuit
                  size={18}
                  className="text-violet-600"
                />

                <p className="mt-3 text-xs font-bold text-slate-800">
                  CatBoost
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  ML prediction
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <ShieldCheck
                  size={18}
                  className="text-emerald-600"
                />

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Risk Score
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                  Final assessment
                </p>
              </div>
            </div>
          </div>

          {/* THRESHOLD */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Target size={17} className="text-orange-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Decision Threshold
              </span>
            </div>

            <div className="mt-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold tracking-tight text-slate-900">
                    30%
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Fraud probability threshold
                  </p>
                </div>

                <CircleGauge size={30} className="text-orange-400" />
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[30%] rounded-full bg-orange-500" />
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />

                    <span className="text-slate-500">
                      Below 30%
                    </span>
                  </div>

                  <span className="font-semibold text-emerald-600">
                    Low Risk
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />

                    <span className="text-slate-500">
                      30% – 74%
                    </span>
                  </div>

                  <span className="font-semibold text-amber-600">
                    Medium Risk
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500" />

                    <span className="text-slate-500">
                      75% and above
                    </span>
                  </div>

                  <span className="font-semibold text-red-600">
                    High Risk
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}

        <section
          className={`mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all delay-300 duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* HEADER */}

          <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={17}
                  className="text-orange-500"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  Input Intelligence
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                Model Input Features
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Features used by the trained model for fraud prediction.
              </p>
            </div>

            {/* FILTER */}

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                const active = activeCategory === category.name;

                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                      active
                        ? "bg-slate-900 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800"
                    }`}
                  >
                    <Icon size={14} />

                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* FEATURE GRID */}

          <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFeatures.map((feature, index) => (
              <div
                key={feature.name}
                className={`group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-3 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 30}ms`,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-mono text-sm font-bold text-slate-800">
                      {feature.name}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {feature.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-md border px-2 py-1 text-[9px] font-bold ${
                      categoryStyles[feature.category]
                    }`}
                  >
                    {feature.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}

        <section
          className={`mt-6 grid gap-5 lg:grid-cols-2 transition-all delay-[400ms] duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* PROCESS */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Workflow size={17} className="text-violet-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Prediction Process
              </span>
            </div>

            <h2 className="mt-3 text-lg font-bold text-slate-900">
              How a transaction is evaluated
            </h2>

            <div className="mt-6 space-y-4">
              {[
                {
                  number: "01",
                  title: "Transaction Input",
                  description:
                    "Transaction details are collected from the user.",
                },
                {
                  number: "02",
                  title: "Feature Processing",
                  description:
                    "The required features are arranged in the format expected by the trained model.",
                },
                {
                  number: "03",
                  title: "ML Prediction",
                  description:
                    "The CatBoost classifier calculates the probability of fraudulent activity.",
                },
                {
                  number: "04",
                  title: "Risk Classification",
                  description:
                    "The probability is compared with the configured threshold to determine the risk level.",
                },
              ].map((step, index) => (
                <div
                  key={step.number}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-[10px] font-bold text-white">
                      {step.number}
                    </div>

                    {index !== 3 && (
                      <div className="mt-2 h-full w-px bg-slate-200" />
                    )}
                  </div>

                  <div className="pb-5">
                    <h3 className="text-sm font-bold text-slate-800">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MODEL CAPABILITY */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Zap size={17} className="text-orange-500" />

              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Model Capability
              </span>
            </div>

            <h2 className="mt-3 text-lg font-bold text-slate-900">
              What the model analyzes
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              The model evaluates multiple aspects of a transaction rather than
              relying on a single value.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
                <Activity size={18} className="text-blue-600" />

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Transaction
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Amount, timing and product information
                </p>
              </div>

              <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
                <CreditCard
                  size={18}
                  className="text-violet-600"
                />

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Card Signals
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Card identifiers and payment type
                </p>
              </div>

              <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                <MapPin size={18} className="text-amber-600" />

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Location
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Address-related transaction information
                </p>
              </div>

              <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
                <Mail size={18} className="text-emerald-600" />

                <p className="mt-3 text-xs font-bold text-slate-800">
                  Email Signals
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-500">
                  Purchaser and recipient domain patterns
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
                  <ShieldCheck size={15} />
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Decision Support
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-500">
                    FraudLens AI provides a risk assessment to support users in
                    reviewing transactions before proceeding with a transfer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOOTER STRIP ================= */}

        <div
          className={`mt-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all delay-500 duration-700 sm:flex-row sm:items-center sm:justify-between ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
              <GitBranch size={16} />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-700">
                Model Configuration
              </p>

              <p className="mt-0.5 text-[11px] text-slate-400">
                14 configured features · Fraud probability threshold: 0.30
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Model service operational
          </div>
        </div>
      </div>
    </main>
  );
};

export default ModelInsights;