import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Info, ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  name: string;
  category: string;
  shares: number;
  returnRate: string;
  status: "pending" | "active";
}

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    name: "Atombeam",
    category: "Fintech",
    shares: 294,
    returnRate: "15.6%",
    status: "active",
  },
];

export const OpenTransactions = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "positions">("orders");
  const orderCount = 30;
  const positionCount = 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl border border-slate-200/80 p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-semibold text-slate-900">Open Transactions</h3>
        <button className="p-0.5">
          <Info className="w-3.5 h-3.5 text-slate-300" />
        </button>
      </div>

      <p className="text-sm text-slate-400 mb-5 leading-relaxed">
        Crowdfunded orders stay open until a startup's offering closes or the startup completes a disbursement.
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-5 border-b border-slate-100 pb-4">
        {[
          { key: "orders", label: "Orders", count: orderCount },
          { key: "positions", label: "Positions", count: positionCount },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "orders" | "positions")}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-slate-900"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
              activeTab === tab.key
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-500"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {activeTab === "orders" && sampleTransactions.length > 0 ? (
            sampleTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
              >
                {/* Image placeholder */}
                <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 text-sm">{transaction.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">Annual Return from:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                      {transaction.returnRate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400">{transaction.category}</span>
                    <span className="text-xs text-slate-300">|</span>
                    <span className="text-xs text-slate-400">{transaction.shares} Shares</span>
                  </div>
                </div>

                {/* Action */}
                <Button 
                  className="rounded-full bg-teal-500 hover:bg-teal-600 text-white h-9 px-4 text-sm font-medium flex-shrink-0"
                >
                  Learn More
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium text-sm">No {activeTab} yet</p>
              <p className="text-xs text-slate-400 mt-1">Your transactions will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
