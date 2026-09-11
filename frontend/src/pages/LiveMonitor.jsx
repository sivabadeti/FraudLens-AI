import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Database,
  Eye,
  Inbox,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Wifi,
  X,
  CreditCard,
  ArrowUpRight,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const LiveMonitor = () => {
  const [visible, setVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setVisible(true);
    fetchTransactions();

    const interval = setInterval(() => {
      fetchTransactions(false);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // ================= FETCH =================

  const fetchTransactions = async (showLoader = true) => {
    try {
      if (showLoader) setLoading(true);

      setError("");

      const response = await fetch(`${API_URL}/api/transactions`);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch transactions");
      }

      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Fetch transactions error:", error);
      setError("Unable to load transaction history.");
    } finally {
      setLoading(false);
    }
  };

  // ================= REFRESH =================

  const handleRefresh = async () => {
    setRefreshing(true);

    await fetchTransactions(false);

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  // ================= STATS =================

  const stats = useMemo(() => {
    return {
      total: transactions.length,
      low: transactions.filter((item) => item.riskLevel === "LOW").length,
      medium: transactions.filter((item) => item.riskLevel === "MEDIUM")
        .length,
      high: transactions.filter((item) => item.riskLevel === "HIGH").length,
    };
  }, [transactions]);

  // ================= FILTER =================

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const searchTerm = search.toLowerCase();

      const transactionId = transaction._id?.toLowerCase() || "";
      const payment = transaction.card4?.toLowerCase() || "";
      const product = transaction.ProductCD?.toLowerCase() || "";

      const matchesSearch =
        transactionId.includes(searchTerm) ||
        payment.includes(searchTerm) ||
        product.includes(searchTerm);

      const matchesFilter =
        filter === "ALL" || transaction.riskLevel === filter;

      return matchesSearch && matchesFilter;
    });
  }, [transactions, search, filter]);

  // ================= RISK CONFIG =================

  const riskConfig = {
    LOW: {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      dot: "bg-emerald-500",
      progress: "bg-emerald-500",
      icon: ShieldCheck,
      recommendation:
        "Low risk detected. The transaction appears relatively safe based on the AI analysis.",
    },

    MEDIUM: {
      text: "text-amber-700",
      bg: "bg-amber-50",
      border: "border-amber-200",
      dot: "bg-amber-500",
      progress: "bg-amber-500",
      icon: AlertTriangle,
      recommendation:
        "Moderate risk detected. Review the transaction details carefully before proceeding.",
    },

    HIGH: {
      text: "text-red-700",
      bg: "bg-red-50",
      border: "border-red-200",
      dot: "bg-red-500",
      progress: "bg-red-500",
      icon: ShieldAlert,
      recommendation:
        "High fraud risk detected. Verify this transaction carefully before transferring money.",
    },
  };

  // ================= DATE =================

  const formatDate = (date) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getRelativeTime = (date) => {
    if (!date) return "";

    const now = new Date();
    const transactionDate = new Date(date);

    const difference = Math.floor((now - transactionDate) / 1000);

    if (difference < 60) return "Just now";
    if (difference < 3600)
      return `${Math.floor(difference / 60)}m ago`;
    if (difference < 86400)
      return `${Math.floor(difference / 3600)}h ago`;

    return `${Math.floor(difference / 86400)}d ago`;
  };

  // ================= COMPACT STAT CARD =================

  const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${color}`}
        >
          <Icon size={17} />
        </div>

        <div>
          <p className="text-xl font-bold leading-none text-slate-900">
            {value}
          </p>

          <p className="mt-1 text-[11px] font-medium text-slate-500">
            {label}
          </p>
        </div>
      </div>

      <ArrowUpRight
        size={15}
        className="text-slate-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f3f6fa] pt-20 text-slate-900">
      {/* ================= HERO / COMMAND CENTER ================= */}
      <section className="relative overflow-hidden bg-[#07111f] text-white">
        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
          <div
            className={`flex flex-col gap-7 transition-all duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-300">
                    <Activity size={12} className="text-orange-400" />
                    FraudLens Intelligence
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-emerald-300">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Live monitoring
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  Transaction Monitor
                </h1>

                <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                  Real-time visibility into transactions analyzed by the fraud
                  detection engine.
                </p>
              </div>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="group inline-flex w-fit items-center gap-2.5 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-xs font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-orange-500 disabled:cursor-not-allowed"
              >
                <RefreshCw
                  size={15}
                  className={`${
                    refreshing ? "animate-spin" : "group-hover:rotate-180"
                  } transition-transform duration-500`}
                />
                {refreshing ? "Refreshing..." : "Refresh data"}
              </button>
            </div>

            {/* LIVE OVERVIEW */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    Transactions
                  </span>
                  <Database size={15} className="text-slate-400" />
                </div>
                <p className="mt-2 text-2xl font-bold">{stats.total}</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Total analyzed
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.06] p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-300/70">
                    Lower exposure
                  </span>
                  <ShieldCheck size={15} className="text-emerald-400" />
                </div>
                <p className="mt-2 text-2xl font-bold text-emerald-300">
                  {stats.low}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  Low-risk transactions
                </p>
              </div>

              <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.06] p-4 backdrop-blur">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-300/70">
                    Attention
                  </span>
                  <ShieldAlert size={15} className="text-red-400" />
                </div>
                <p className="mt-2 text-2xl font-bold text-red-300">
                  {stats.high}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">
                  High-risk transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DASHBOARD ================= */}
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* RISK BREAKDOWN */}
          <aside
            className={`h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all delay-100 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-slate-400">
                  Risk distribution
                </p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  Current portfolio
                </p>
              </div>
              <ShieldCheck size={17} className="text-orange-500" />
            </div>

            <div className="mt-6 space-y-5">
              {[
                {
                  label: "Low",
                  value: stats.low,
                  color: "bg-emerald-500",
                  text: "text-emerald-600",
                },
                {
                  label: "Medium",
                  value: stats.medium,
                  color: "bg-amber-500",
                  text: "text-amber-600",
                },
                {
                  label: "High",
                  value: stats.high,
                  color: "bg-red-500",
                  text: "text-red-600",
                },
              ].map((item) => {
                const percentage =
                  stats.total > 0
                    ? Math.round((item.value / stats.total) * 100)
                    : 0;

                return (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-600">
                        {item.label} risk
                      </span>
                      <span className={`text-xs font-bold ${item.text}`}>
                        {item.value}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <p className="mt-1 text-right text-[9px] text-slate-400">
                      {percentage}% of activity
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-xl border border-orange-100 bg-orange-50/60 p-3">
              <div className="flex gap-2">
                <Activity size={14} className="mt-0.5 shrink-0 text-orange-500" />
                <p className="text-[10px] leading-5 text-orange-900/60">
                  Risk levels are generated from the FraudLens transaction
                  analysis workflow.
                </p>
              </div>
            </div>
          </aside>

          {/* TRANSACTION WORKSPACE */}
          <section
            className={`min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all delay-150 duration-700 ${
              visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
          >
            {/* TOOLBAR */}
            <div className="border-b border-slate-100 p-4 sm:p-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900">
                        Transaction activity
                      </h2>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                        {filteredTransactions.length}
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] text-slate-400">
                      Search, filter and inspect individual assessments.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[9px] font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Service connected
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <Search
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="Search transaction, payment or product..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-xs text-slate-700 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                    />
                  </div>

                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600 outline-none transition focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
                  >
                    <option value="ALL">All Risks</option>
                    <option value="LOW">Low Risk</option>
                    <option value="MEDIUM">Medium Risk</option>
                    <option value="HIGH">High Risk</option>
                  </select>
                </div>
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="p-5">
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="h-16 animate-pulse rounded-xl bg-slate-100"
                    />
                  ))}
                </div>
                <p className="mt-5 text-center text-xs text-slate-400">
                  Loading transaction activity...
                </p>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <ShieldAlert size={25} />
                </div>
                <h3 className="mt-4 text-sm font-bold text-slate-800">
                  Unable to load transactions
                </h3>
                <p className="mt-2 text-xs text-slate-500">{error}</p>
                <button
                  onClick={() => fetchTransactions()}
                  className="mt-5 rounded-xl bg-slate-950 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-500"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* TABLE */}
            {!loading && !error && transactions.length > 0 && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px]">
                    <thead>
                      <tr className="border-b border-slate-100 bg-[#fbfcfe]">
                        <th className="px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Transaction
                        </th>
                        <th className="px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Amount
                        </th>
                        <th className="px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Product
                        </th>
                        <th className="px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Risk score
                        </th>
                        <th className="px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Status
                        </th>
                        <th className="px-5 py-3.5 text-left text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                          Time
                        </th>
                        <th className="px-5 py-3.5" />
                      </tr>
                    </thead>

                    <tbody>
                      {filteredTransactions.map((transaction) => {
                        const config =
                          riskConfig[transaction.riskLevel] || riskConfig.LOW;

                        const Icon = config.icon;

                        const riskScore = Math.min(
                          Number(transaction.fraudProbability || 0),
                          100
                        );

                        return (
                          <tr
                            key={transaction._id}
                            className="group border-b border-slate-100 last:border-0 hover:bg-orange-50/30"
                          >
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition group-hover:border-orange-200 group-hover:text-orange-500">
                                  <CreditCard size={16} />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-slate-800">
                                    TXN-
                                    {transaction._id
                                      ?.slice(-6)
                                      .toUpperCase()}
                                  </p>
                                  <p className="mt-1 text-[10px] capitalize text-slate-400">
                                    {transaction.card4 || "Payment method N/A"}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <p className="text-xs font-bold text-slate-800">
                                ₹
                                {Number(
                                  transaction.TransactionAmt || 0
                                ).toLocaleString("en-IN")}
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-600">
                                {transaction.ProductCD || "N/A"}
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              <div className="w-28">
                                <div className="flex items-center justify-between">
                                  <span className={`text-[11px] font-bold ${config.text}`}>
                                    {riskScore.toFixed(1)}%
                                  </span>
                                  <Icon size={13} className={config.text} />
                                </div>
                                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                                  <div
                                    className={`h-full rounded-full ${config.progress}`}
                                    style={{ width: `${riskScore}%` }}
                                  />
                                </div>
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[9px] font-bold ${config.bg} ${config.border} ${config.text}`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
                                />
                                {transaction.riskLevel}
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                                <Clock3 size={12} />
                                {getRelativeTime(transaction.createdAt)}
                              </div>
                            </td>

                            <td className="px-5 py-4">
                              <button
                                onClick={() =>
                                  setSelectedTransaction(transaction)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                                title="View transaction details"
                              >
                                <Eye size={15} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredTransactions.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-300">
                      <Search size={24} />
                    </div>
                    <h3 className="mt-4 text-sm font-bold text-slate-700">
                      No matching transactions
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Try adjusting your search or filter.
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[10px] text-slate-400">
                    Showing {filteredTransactions.length} of{" "}
                    {transactions.length} transactions
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Live updates enabled
                  </div>
                </div>
              </>
            )}

            {/* EMPTY */}
            {!loading && !error && transactions.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-500">
                  <Inbox size={28} />
                </div>
                <h3 className="mt-5 text-base font-bold text-slate-800">
                  No transaction activity yet
                </h3>
                <p className="mt-2 max-w-sm text-xs leading-6 text-slate-500">
                  Analyze a transaction using FraudLens AI and its risk
                  assessment will automatically appear here.
                </p>
              </div>
            )}
          </section>
        </div>

        {/* ================= FOOTER STATUS ================= */}
        {!loading && !error && transactions.length > 0 && (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Monitoring
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-700">
                Automatic refresh active
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Risk engine
              </p>
              <p className="mt-1 text-xs font-semibold text-slate-700">
                AI-powered transaction analysis
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Data status
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                <Wifi size={13} />
                Connected
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ================= TRANSACTION DETAILS MODAL ================= */}
      {selectedTransaction &&
        (() => {
          const config =
            riskConfig[selectedTransaction.riskLevel] || riskConfig.LOW;

          const Icon = config.icon;

          return (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-md"
              onClick={() => setSelectedTransaction(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl"
              >
                <div className="bg-[#07111f] px-5 py-5 text-white sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500">
                        <CreditCard size={17} />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          Transaction detail
                        </p>
                        <h2 className="mt-1 text-base font-bold">
                          TXN-
                          {selectedTransaction._id?.slice(-6).toUpperCase()}
                        </h2>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedTransaction(null)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    >
                      <X size={17} />
                    </button>
                  </div>
                </div>

                <div className="max-h-[78vh] overflow-y-auto p-5 sm:p-6">
                  <div
                    className={`rounded-2xl border p-5 ${config.bg} ${config.border}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          AI fraud risk score
                        </p>
                        <p className={`mt-2 text-4xl font-bold ${config.text}`}>
                          {Number(
                            selectedTransaction.fraudProbability || 0
                          ).toFixed(2)}
                          %
                        </p>
                        <span
                          className={`mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-2.5 py-1 text-[9px] font-bold ${config.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
                          />
                          {selectedTransaction.riskLevel} RISK
                        </span>
                      </div>

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ${config.text}`}
                      >
                        <Icon size={27} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                        Amount
                      </p>
                      <p className="mt-1.5 text-sm font-bold text-slate-800">
                        ₹
                        {Number(
                          selectedTransaction.TransactionAmt || 0
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                        Payment
                      </p>
                      <p className="mt-1.5 text-sm font-bold capitalize text-slate-800">
                        {selectedTransaction.card4 || "Not provided"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                        Product type
                      </p>
                      <p className="mt-1.5 text-sm font-bold text-slate-800">
                        {selectedTransaction.ProductCD || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400">
                        Analyzed
                      </p>
                      <p className="mt-1.5 text-[11px] font-semibold leading-5 text-slate-700">
                        {formatDate(selectedTransaction.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                        <Activity size={14} />
                      </div>
                      <p className="text-xs font-bold text-slate-700">
                        AI Recommendation
                      </p>
                    </div>
                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {config.recommendation}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedTransaction(null)}
                    className="mt-5 w-full rounded-xl bg-slate-950 px-4 py-3 text-xs font-semibold text-white transition hover:bg-orange-500"
                  >
                    Close details
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </main>
  );
};

export default LiveMonitor;
