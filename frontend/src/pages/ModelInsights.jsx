import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  CreditCard,
  Database,
  FileSearch,
  GitBranch,
  Layers3,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Workflow,
  Zap,
  LockKeyhole,
} from "lucide-react";

const ModelInsights = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  const modelFeatures = [
    ["TransactionDT", "Transaction", "Captures the time relationship of the transaction."],
    ["TransactionAmt", "Transaction", "Represents the monetary value being evaluated."],
    ["ProductCD", "Transaction", "Identifies the product category associated with the payment."],
    ["card1 – card6", "Card", "Provides card-related identifiers and payment characteristics."],
    ["addr1 – addr2", "Address", "Adds address-region signals to the transaction profile."],
    ["P_emaildomain", "Email", "Represents the purchaser email domain."],
    ["R_emaildomain", "Email", "Represents the recipient email domain when available."],
    ["has_R_emaildomain", "Email", "Indicates whether recipient email information exists."],
  ];

  const ragSteps = [
    {
      number: "01",
      icon: MessageCircle,
      title: "Question",
      text: "The user asks a fraud or payment-safety question.",
    },
    {
      number: "02",
      icon: Sparkles,
      title: "Embedding",
      text: "The question is converted into a semantic vector representation.",
    },
    {
      number: "03",
      icon: Search,
      title: "Retrieval",
      text: "MongoDB Vector Search finds the most relevant knowledge chunks.",
    },
    {
      number: "04",
      icon: BrainCircuit,
      title: "Generation",
      text: "The retrieved context is supplied to the LLM to form the response.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f7f9fc] pt-20 text-slate-900">
      {/* INTRO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div
            className={`flex flex-col gap-5 transition-all duration-700 lg:flex-row lg:items-end lg:justify-between ${
              visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                FraudLens AI · Technology
              </div>

              <p className="text-2xl font-bold leading-tight tracking-tight text-slate-950 sm:text-3xl">
                Intelligent transaction analysis combined with
                knowledge-grounded fraud safety.
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                FraudLens separates prediction from guidance. The machine
                learning service evaluates transaction signals, while the RAG
                assistant retrieves relevant safety knowledge and explains it
                conversationally.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
              <CheckCircle2 size={17} className="text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-emerald-700">System operational</p>
                <p className="text-[10px] text-emerald-600/80">
                  ML prediction + RAG guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TWO SYSTEMS */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm">
            <div className="border-b border-orange-100 bg-orange-50/60 px-6 py-5 sm:px-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-orange-500 shadow-sm">
                    <BrainCircuit size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-500">
                      Machine Learning
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-slate-900">
                      CatBoost Risk Engine
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-orange-600">
                  14 FEATURES
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <p className="text-sm leading-6 text-slate-500">
                The trained CatBoost classifier receives transaction
                characteristics and estimates the probability of fraudulent
                activity. The resulting probability is used as decision
                support before a user proceeds with a transaction.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <SlidersHorizontal size={17} className="text-orange-500" />
                  <p className="mt-3 text-xs font-bold">Input signals</p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Transaction, card, address and email attributes.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Target size={17} className="text-orange-500" />
                  <p className="mt-3 text-xs font-bold">Risk threshold</p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Fraud probability threshold configured at 0.30.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <Database size={17} className="text-slate-500" />
                <div className="flex-1">
                  <p className="text-xs font-semibold">Transaction → Features → CatBoost → Risk</p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Prediction pipeline
                  </p>
                </div>
                <ArrowRight size={16} className="text-orange-500" />
              </div>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">
            <div className="border-b border-emerald-100 bg-emerald-50/60 px-6 py-5 sm:px-7">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-600">
                      Retrieval-Augmented Generation
                    </p>
                    <p className="mt-0.5 text-lg font-bold text-slate-900">
                      FraudLens Safety Assistant
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-bold text-emerald-700">
                  RAG
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <p className="text-sm leading-6 text-slate-500">
                The assistant does not perform transaction-risk prediction.
                It retrieves relevant information from the fraud-safety
                knowledge base and gives practical guidance about UPI,
                phishing, OTPs, payment scams, card security and suspicious
                requests.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <FileSearch size={17} className="text-emerald-600" />
                  <p className="mt-3 text-xs font-bold">Knowledge base</p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Curated fraud and financial-safety information.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <Search size={17} className="text-emerald-600" />
                  <p className="mt-3 text-xs font-bold">Semantic retrieval</p>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Finds relevant content by meaning, not only keywords.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                <Layers3 size={17} className="text-slate-500" />
                <div className="flex-1">
                  <p className="text-xs font-semibold">
                    Question → Embedding → Vector Search → LLM → Answer
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Retrieval-first response pipeline
                  </p>
                </div>
                <ArrowRight size={16} className="text-emerald-600" />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* RAG DEEP DIVE */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                  <Workflow size={17} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Inside the assistant
                </span>
              </div>

              <p className="text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                Retrieval keeps the response connected to relevant knowledge.
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Documents are prepared into searchable chunks. Each chunk is
                represented as an embedding and stored in MongoDB. When a user
                asks something, the same embedding process is used for the
                question and the closest knowledge is retrieved before the
                language model generates its response.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {["Embeddings", "MongoDB Vector Search", "Semantic Retrieval", "LLM"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold text-slate-600"
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {ragSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.number}
                    className="relative rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-orange-500 shadow-sm">
                        <Icon size={17} />
                      </div>
                      <span className="text-[9px] font-bold tracking-widest text-slate-300">
                        {step.number}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-bold">{step.title}</p>
                    <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                      {step.text}
                    </p>

                    {index % 2 === 0 && (
                      <ArrowRight
                        size={14}
                        className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-orange-400 sm:block"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MODEL INPUTS */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5 sm:px-7">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <SlidersHorizontal size={19} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Model input space
                </p>
                <p className="mt-0.5 text-lg font-bold">What the CatBoost model receives</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
            {modelFeatures.map(([name, category, description]) => (
              <div
                key={name}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-bold text-slate-800">
                    {name}
                  </span>
                  <span className="rounded-md bg-white px-2 py-1 text-[8px] font-bold uppercase text-slate-400">
                    {category}
                  </span>
                </div>
                <p className="mt-2 text-[10px] leading-4 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESPONSIBILITY */}
      <section className="mx-auto max-w-7xl px-5 pb-10 sm:px-8 lg:px-10 lg:pb-14">
        <div className="rounded-3xl bg-slate-950 p-7 sm:p-9">
          <div className="grid gap-7 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400">
                <ShieldCheck size={15} />
                Design principle
              </div>

              <p className="mt-3 text-2xl font-bold leading-tight text-white">
                Each AI component has a clear responsibility.
              </p>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Keeping prediction and conversational guidance separate makes
                the system easier to understand and keeps the assistant focused
                on practical safety information.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-orange-500/20 bg-orange-500/10 p-5">
                <BrainCircuit size={19} className="text-orange-400" />
                <p className="mt-4 text-sm font-bold text-white">
                  Transaction risk
                </p>
                <p className="mt-2 text-[11px] leading-5 text-slate-400">
                  CatBoost analyzes transaction features and produces a risk
                  probability for decision support.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                <MessageCircle size={19} className="text-emerald-400" />
                <p className="mt-4 text-sm font-bold text-white">
                  Fraud safety
                </p>
                <p className="mt-2 text-[11px] leading-5 text-slate-400">
                  RAG retrieves relevant knowledge and the assistant turns it
                  into practical safety guidance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-5 text-[10px] text-slate-500">
            <GitBranch size={14} />
            <span>FraudLens AI architecture</span>
            <span>·</span>
            <span>ML prediction</span>
            <span>+</span>
            <span>RAG retrieval</span>
            <span>+</span>
            <span>LLM generation</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ModelInsights;
