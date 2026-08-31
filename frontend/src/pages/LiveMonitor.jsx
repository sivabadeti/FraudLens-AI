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
    <main className="min-h-screen bg-[#f8fafc] pt-20">
      {/* ================= TOP HEADER ================= */}

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10">
          <div
            className={`flex flex-col gap-6 transition-all duration-700 lg:flex-row lg:items-center lg:justify-between ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            {/* TITLE */}

            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Activity size={16} />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
                  Risk Intelligence
                </span>

                <div className="ml-2 flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>

                  <span className="text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                    Live
                  </span>
                </div>
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Transaction Monitor
              </h1>

              <p className="mt-2 text-sm text-slate-500 sm:text-base">
                Review AI-analyzed transactions and monitor fraud risk activity.
              </p>
            </div>

            {/* REFRESH */}

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="group flex w-fit items-center gap-2.5 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md disabled:cursor-not-allowed"
            >
              <RefreshCw
                size={16}
                className={`transition-transform duration-500 ${
                  refreshing ? "animate-spin" : "group-hover:rotate-180"
                }`}
              />

              {refreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        {/* ================= COMPACT STATS ================= */}

        <section
          className={`grid grid-cols-2 gap-3 lg:grid-cols-4 transition-all delay-100 duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-5 opacity-0"
          }`}
        >
          <StatCard
            label="Total Analyzed"
            value={stats.total}
            icon={Database}
            color="bg-slate-100 text-slate-700"
          />

          <StatCard
            label="Low Risk"
            value={stats.low}
            icon={ShieldCheck}
            color="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            label="Medium Risk"
            value={stats.medium}
            icon={CircleAlert}
            color="bg-amber-50 text-amber-600"
          />

          <StatCard
            label="High Risk"
            value={stats.high}
            icon={ShieldAlert}
            color="bg-red-50 text-red-600"
          />
        </section>

        {/* ================= MAIN ACTIVITY PANEL ================= */}

        <section
          className={`mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)] transition-all delay-200 duration-700 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          {/* PANEL HEADER */}

          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Recent Activity
                </h2>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">
                  {transactions.length}
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                Latest transactions processed by FraudLens AI
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              {/* SEARCH */}

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100 sm:w-48"
                />
              </div>

              {/* FILTER */}

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-600 outline-none transition-all focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
              >
                <option value="ALL">All Risks</option>
                <option value="LOW">Low Risk</option>
                <option value="MEDIUM">Medium Risk</option>
                <option value="HIGH">High Risk</option>
              </select>
            </div>
          </div>

          {/* ================= LOADING ================= */}

          {loading && (
            <div className="p-6">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div
                    key={item}
                    className="h-16 animate-pulse rounded-xl bg-slate-100"
                  />
                ))}
              </div>

              <p className="mt-5 text-center text-sm text-slate-400">
                Loading transaction activity...
              </p>
            </div>
          )}

          {/* ================= ERROR ================= */}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <ShieldAlert size={23} />
              </div>

              <h3 className="mt-4 font-bold text-slate-800">
                Unable to load transactions
              </h3>

              <p className="mt-2 text-sm text-slate-500">{error}</p>

              <button
                onClick={() => fetchTransactions()}
                className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* ================= TABLE ================= */}

          {!loading && !error && transactions.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px]">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/80 text-left">
                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Transaction
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Amount
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Product
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        AI Risk
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Status
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Time
                      </th>

                      <th className="px-6 py-3.5" />
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
                          className="group border-b border-slate-100 last:border-0 transition-all duration-200 hover:bg-slate-50/80"
                        >
                          {/* TRANSACTION */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-300 group-hover:border-orange-200 group-hover:text-orange-500">
                                <CreditCard size={16} />
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-slate-800">
                                  TXN-
                                  {transaction._id
                                    ?.slice(-6)
                                    .toUpperCase()}
                                </p>

                                <p className="mt-0.5 text-[11px] capitalize text-slate-400">
                                  {transaction.card4 || "Payment method N/A"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* AMOUNT */}

                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-slate-800">
                              ₹
                              {Number(
                                transaction.TransactionAmt || 0
                              ).toLocaleString("en-IN")}
                            </p>
                          </td>

                          {/* PRODUCT */}

                          <td className="px-6 py-4">
                            <span className="inline-flex rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600">
                              {transaction.ProductCD || "N/A"}
                            </span>
                          </td>

                          {/* RISK */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                                <div
                                  className={`h-full rounded-full transition-all duration-700 ${config.progress}`}
                                  style={{
                                    width: `${riskScore}%`,
                                  }}
                                />
                              </div>

                              <span
                                className={`text-xs font-bold ${config.text}`}
                              >
                                {riskScore.toFixed(1)}%
                              </span>
                            </div>
                          </td>

                          {/* STATUS */}

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold tracking-wide ${config.bg} ${config.border} ${config.text}`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
                              />

                              {transaction.riskLevel}
                            </span>
                          </td>

                          {/* TIME */}

                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500">
                              <Clock3 size={13} />

                              {getRelativeTime(transaction.createdAt)}
                            </div>
                          </td>

                          {/* VIEW */}

                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                setSelectedTransaction(transaction)
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-slate-400 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:text-slate-900 hover:shadow-sm"
                              title="View transaction details"
                            >
                              <Eye size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* NO FILTER RESULTS */}

              {filteredTransactions.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Search size={28} className="text-slate-300" />

                  <h3 className="mt-3 font-semibold text-slate-700">
                    No matching transactions
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    Try adjusting your search or filter.
                  </p>
                </div>
              )}

              {/* FOOTER */}

              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/40 px-6 py-3.5">
                <p className="text-xs text-slate-400">
                  Showing {filteredTransactions.length} of{" "}
                  {transactions.length} transactions
                </p>

                <div className="flex items-center gap-2 text-[11px] font-medium text-emerald-600">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>

                  Live updates
                </div>
              </div>
            </>
          )}

          {/* ================= EMPTY ================= */}

          {!loading && !error && transactions.length === 0 && (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-100 bg-orange-50 text-orange-500">
                <Inbox size={26} />
              </div>

              <h3 className="mt-4 text-base font-bold text-slate-800">
                No transaction activity yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                Analyze a transaction using FraudLens AI and its risk assessment
                will automatically appear here.
              </p>
            </div>
          )}
        </section>

        {/* ================= SMALL INFO STRIP ================= */}

        {!loading && !error && transactions.length > 0 && (
          <div
            className={`mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all delay-300 duration-700 sm:flex-row sm:items-center sm:justify-between ${
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                <Activity size={17} />
              </div>

              <div>
                <p className="text-xs font-bold text-slate-700">
                  AI-Powered Risk Assessment
                </p>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  Results are generated using the trained fraud detection model.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <Wifi size={14} className="text-emerald-500" />
              Monitoring service connected
            </div>
          </div>
        )}
      </div>

      {/* ================= DETAILS MODAL ================= */}

      {selectedTransaction &&
        (() => {
          const config =
            riskConfig[selectedTransaction.riskLevel] || riskConfig.LOW;

          const Icon = config.icon;

          return (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
              onClick={() => setSelectedTransaction(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl animate-[fadeIn_.25s_ease-out] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
              >
                {/* MODAL HEADER */}

                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                      Transaction Details
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-slate-900">
                      TXN-
                      {selectedTransaction._id?.slice(-6).toUpperCase()}
                    </h2>
                  </div>

                  <button
                    onClick={() => setSelectedTransaction(null)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="p-6">
                  {/* RISK SUMMARY */}

                  <div
                    className={`rounded-xl border p-5 ${config.bg} ${config.border}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                          AI Fraud Risk Score
                        </p>

                        <p className={`mt-2 text-4xl font-bold ${config.text}`}>
                          {Number(
                            selectedTransaction.fraudProbability || 0
                          ).toFixed(2)}
                          %
                        </p>

                        <div
                          className={`mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-bold ${config.text}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${config.dot}`}
                          />

                          {selectedTransaction.riskLevel} RISK
                        </div>
                      </div>

                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm ${config.text}`}
                      >
                        <Icon size={27} />
                      </div>
                    </div>
                  </div>

                  {/* DETAILS GRID */}

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Amount
                      </p>

                      <p className="mt-1.5 font-bold text-slate-800">
                        ₹
                        {Number(
                          selectedTransaction.TransactionAmt || 0
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Payment
                      </p>

                      <p className="mt-1.5 font-bold capitalize text-slate-800">
                        {selectedTransaction.card4 || "Not provided"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Product Type
                      </p>

                      <p className="mt-1.5 font-bold text-slate-800">
                        {selectedTransaction.ProductCD || "N/A"}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Analyzed
                      </p>

                      <p className="mt-1.5 text-xs font-semibold text-slate-700">
                        {formatDate(selectedTransaction.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* RECOMMENDATION */}

                  <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-50 text-orange-500">
                        <Activity size={14} />
                      </div>

                      <p className="text-xs font-bold text-slate-700">
                        AI Recommendation
                      </p>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      {config.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
    </main>
  );
};

export default LiveMonitor;