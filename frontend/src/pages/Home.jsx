import { useEffect, useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  TrendingUp,
  Zap,
  Database,
  Bell,
  Activity,
  FileSearch,
  MessageCircle,
  Search,
  Sparkles,
  Layers3,
} from "lucide-react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const features = [
    {
      icon: ShieldCheck,
      title: "Pre-Transaction Risk Check",
      description:
        "Evaluate potential fraud indicators before proceeding with a transaction.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: BrainCircuit,
      title: "ML-Powered Analysis",
      description:
        "Machine learning evaluates transaction patterns to estimate potential risk.",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: TrendingUp,
      title: "Risk Intelligence",
      description:
        "Receive a clear fraud probability and risk level for every assessment.",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: FileSearch,
      title: "Clear Recommendations",
      description:
        "Get actionable guidance to proceed, verify, or review before transacting.",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  const ragFeatures = [
    {
      icon: FileSearch,
      title: "Knowledge-Grounded Answers",
      description:
        "Retrieves relevant fraud-safety knowledge before generating an answer, helping the assistant stay grounded in trusted information.",
    },
    {
      icon: Search,
      title: "Semantic Search",
      description:
        "Understands the meaning behind your question instead of relying only on exact keyword matches.",
    },
    {
      icon: MessageCircle,
      title: "FraudLens Assistant",
      description:
        "Provides practical guidance about UPI, phishing, OTPs, payment scams, card security, and what to do after suspected fraud.",
    },
    {
      icon: Layers3,
      title: "RAG Pipeline",
      description:
        "Combines document retrieval, embeddings, MongoDB Vector Search, and an LLM to produce contextual responses.",
    },
  ];

  const stats = [
    {
      icon: ShieldCheck,
      value: "AI",
      label: "Risk Assessment",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: Zap,
      value: "< 1s",
      label: "Analysis Time",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      icon: Activity,
      value: "24/7",
      label: "Risk Monitoring",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      icon: FileSearch,
      value: "ML",
      label: "Fraud Intelligence",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  const steps = [
    {
      number: "1",
      icon: Database,
      title: "Enter Details",
      description:
        "Provide the transaction information you want to evaluate",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      number: "2",
      icon: BrainCircuit,
      title: "AI Analysis",
      description:
        "Machine learning analyzes transaction patterns and signals",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      number: "3",
      icon: ShieldCheck,
      title: "Risk Assessment",
      description:
        "Receive a fraud probability and transaction risk level",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      number: "4",
      icon: Bell,
      title: "Make an Informed Decision",
      description:
        "Proceed, verify, or review based on the AI risk assessment",
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
  ];

  return (
    <>
      <main className="p-1">
        {/* HERO */}
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden">
          {/* Background decorations */}
          <div className="absolute left-[-80px] top-40 h-72 w-72 rounded-full bg-orange-100/40 blur-3xl" />
          <div className="absolute right-[-80px] top-40 h-72 w-72 rounded-full bg-green-100/40 blur-3xl" />

          {/* Dot patterns */}
          <div className="absolute left-0 top-32 hidden opacity-30 lg:block">
            <div
              className="h-64 w-32"
              style={{
                backgroundImage:
                  "radial-gradient(#f97316 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>

          <div className="absolute right-0 top-72 hidden opacity-30 lg:block">
            <div
              className="h-64 w-32"
              style={{
                backgroundImage:
                  "radial-gradient(#15803d 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
          </div>

          <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 pb-20 pt-24 text-center sm:px-8 lg:px-10">
            
            {/* Trust Indicators */}
            <div
              className={`mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 transition-all duration-700 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                <span className="text-sm font-medium text-slate-600">
                  Pre-Transaction Risk Analysis
                </span>
              </div>

              <span className="hidden h-4 w-px bg-slate-300 sm:block" />

              <div className="flex items-center gap-2">
                <span className="font-semibold text-orange-600">AI</span>
                <span className="text-sm font-medium text-slate-600">
                  Powered Assessment
                </span>
              </div>

              <span className="hidden h-4 w-px bg-slate-300 sm:block" />

              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-green-700" />
                <span className="text-sm font-medium text-slate-600">
                  Risk-Based Insights
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1
              className={`max-w-5xl text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 transition-all delay-100 duration-700 sm:text-6xl lg:text-7xl ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              Know the risk
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                before you transact.
              </span>
            </h1>

            {/* Description */}
            <p
              className={`mt-7 max-w-2xl text-base leading-8 text-slate-600 transition-all delay-200 duration-700 sm:text-lg ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              FraudLensAI uses machine learning to evaluate transaction patterns
              and identify potential fraud risks before you decide to proceed.
            </p>

            {/* Buttons */}
            <div
              className={`mt-8 flex flex-col items-center gap-4 transition-all delay-300 duration-700 sm:flex-row ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              <Link
                to="/analyze"
                className="group flex items-center justify-center gap-3 rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Check Transaction Risk

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/monitor"
                className="group flex items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all duration-300 hover:-translate-y-1 hover:border-slate-900 hover:bg-slate-50"
              >
                View Risk Monitor

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Trust */}
            <div
              className={`mt-8 flex items-center gap-2 text-sm text-slate-500 transition-all delay-500 duration-700 ${
                visible ? "opacity-100" : "opacity-0"
              }`}
            >
              <ShieldCheck size={17} className="text-green-600" />

              <span>
                AI-assisted insights to support safer transaction decisions
              </span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5 sm:px-8 lg:px-10">
          <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className={`group relative flex flex-col items-center px-6 py-9 text-center transition-all duration-300 hover:bg-slate-50 ${
                    index !== stats.length - 1
                      ? "lg:border-r lg:border-slate-200"
                      : ""
                  }`}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${stat.bg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={22} className={stat.color} />
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* RAG / AI ASSISTANT */}
       <section className="relative overflow-hidden border-y border-slate-100 bg-white px-5 pt-10 pb-24 sm:px-8 lg:px-10">
          <div className="mb-14 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
              Smarter Transaction Decisions
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Assess the risk{" "}
              <span className="text-green-700">before you proceed.</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/60"
                >
                  <div
                    className={`mb-7 flex h-14 w-14 items-center justify-center rounded-full ${feature.bg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon size={25} className={feature.color} />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* RAG / AI ASSISTANT */}
        {/* RAG / AI ASSISTANT */}
      <section className="relative overflow-hidden border-y border-slate-100 bg-white px-5 pt-2 pb-24 sm:px-8 lg:px-10">
          <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-orange-100/50 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-green-100/40 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
                Retrieval-Augmented Generation
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                More than a chatbot.
                <br />
                <span className="text-green-700">Knowledge-grounded fraud guidance.</span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                FraudLens Assistant uses RAG to retrieve relevant financial
                safety knowledge and provide clear, contextual guidance.
                It complements the transaction risk model rather than
                replacing it.
              </p>
            </div>

            {/* Architecture flow */}
            <div className="mt-14 rounded-3xl border border-slate-200 bg-slate-50/70 p-6 shadow-sm sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                  <Sparkles size={22} />
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    How the FraudLens RAG Assistant works
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    A retrieval-first pipeline for contextual safety guidance
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-5">
                {[
                  {
                    number: "01",
                    title: "User Question",
                    description: "Your fraud-safety question",
                  },
                  {
                    number: "02",
                    title: "Embedding",
                    description: "Question converted to a vector",
                  },
                  {
                    number: "03",
                    title: "Vector Search",
                    description: "Relevant knowledge retrieved",
                  },
                  {
                    number: "04",
                    title: "LLM",
                    description: "Context turned into an answer",
                  },
                  {
                    number: "05",
                    title: "Guidance",
                    description: "Clear, practical response",
                  },
                ].map((item, index, items) => (
                  <div key={item.number} className="relative">
                    <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md">
                      <span className="text-[10px] font-bold tracking-widest text-orange-500">
                        {item.number}
                      </span>

                      <h4 className="mt-3 text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    {index !== items.length - 1 && (
                      <ArrowRight
                        size={15}
                        className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-green-600 md:block"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RAG CTA */}
            <div className="relative mt-8 overflow-hidden rounded-3xl bg-slate-950 px-7 py-9 shadow-xl sm:px-10 lg:px-12">
              <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute -bottom-20 right-32 h-52 w-52 rounded-full bg-green-500/10 blur-3xl" />

              <div className="relative flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <div className="mb-4 h-1 w-10 rounded-full bg-orange-500" />

                  <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                    Have a fraud-safety question?
                    <span className="block text-green-400">
                      Ask FraudLens Assistant.
                    </span>
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
                    Get practical guidance on UPI, phishing, OTPs, payment
                    scams, card security, and suspicious requests using
                    FraudLens's knowledge-grounded AI assistant.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .querySelector(
                        '[aria-label="Open FraudLens Assistant"]'
                      )
                      ?.click()
                  }
                  className="group flex shrink-0 items-center gap-3 rounded-lg bg-orange-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
                >
                  Ask the Assistant

                  <MessageCircle
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>

            {/* RAG capabilities */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {ragFeatures.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                  >
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700 transition-transform duration-300 group-hover:scale-110">
                      <Icon size={21} />
                    </div>

                    <h3 className="text-base font-bold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-6 text-slate-500">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* ML vs RAG distinction */}
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                    <BrainCircuit size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500">
                      ML Model
                    </p>
                    <h3 className="text-base font-bold text-slate-900">
                      Transaction Risk Prediction
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Analyzes transaction patterns and estimates the potential
                  fraud risk before you proceed.
                </p>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50/60 p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-green-700 shadow-sm">
                    <MessageCircle size={20} />
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-green-700">
                      RAG Assistant
                    </p>
                    <h3 className="text-base font-bold text-slate-900">
                      Fraud-Safety Guidance
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  Retrieves relevant safety knowledge and explains what you
                  can do about scams, suspicious requests, and payment
                  security.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y border-slate-100 bg-slate-50/60 px-5 pb-20 pt-10 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-orange-500">
                How it Works
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Check. Assess. Decide.
              </h2>
            </div>

            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.number} className="relative text-center">
                    {index !== steps.length - 1 && (
                      <div className="absolute left-[78%] top-7 hidden items-center text-green-600 lg:flex">
                        <span className="h-px w-12 bg-green-300" />
                        <ArrowRight size={16} />
                      </div>
                    )}

                    <div
                      className={`relative mx-auto flex h-16 w-16 items-center justify-center rounded-full ${step.bg} shadow-sm`}
                    >
                      <Icon size={27} className={step.color} />

                      <span
                        className={`absolute -bottom-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold shadow ${step.color}`}
                      >
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-7 text-base font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mx-auto mt-3 max-w-[220px] text-sm leading-6 text-slate-500">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        {/* FEATURES */}
        <section className="mx-auto max-w-7xl px-5 pt-28 pb-2 sm:px-8 lg:px-10">
          <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-8 py-14 sm:px-14 lg:px-16">
            {/* Decorations */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
            <div className="absolute -bottom-24 right-32 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <div className="mb-6 h-1 w-10 rounded-full bg-orange-500" />

                <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Make informed decisions{" "}
                  <span className="text-green-400">before you transact.</span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                  Evaluate transaction risk with machine learning and get
                  actionable insights before deciding whether to proceed.
                </p>
              </div>

              <Link
                to="/analyze"
                className="group flex w-fit items-center gap-3 rounded-lg bg-orange-500 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-600"
              >
                Check Transaction Risk

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;