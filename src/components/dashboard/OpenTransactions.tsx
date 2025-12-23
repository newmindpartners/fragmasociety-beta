import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Info, ArrowRight, Building2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  name: string;
  type: string;
  category: string;
  shares: number;
  returnRate: string;
  image?: string;
  status: "pending" | "active" | "completed";
}

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    name: "Malibu Luxury Villa",
    type: "Real Estate",
    category: "Property Development",
    shares: 250,
    returnRate: "18.5%",
    status: "active",
  },
  {
    id: "2",
    name: "European Film Fund",
    type: "Entertainment",
    category: "Film Production",
    shares: 150,
    returnRate: "22.0%",
    status: "pending",
  },
];

export const OpenTransactions = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "positions">("orders");
  const orderCount = 2;
  const positionCount = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl border border-slate-200/60 p-6 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-semibold text-slate-900">Open Transactions</h3>
          <button className="p-1">
            <Info className="w-3.5 h-3.5 text-slate-300" />
          </button>
        </div>
      </div>

      <p className="text-sm text-slate-400 mb-5 leading-relaxed">
        Crowdfunded orders stay open until a startup's offering closes or the startup completes a disbursement.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {[
          { key: "orders", label: "Orders", count: orderCount },
          { key: "positions", label: "Positions", count: positionCount },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "orders" | "positions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
            }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
              activeTab === tab.key
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-500"
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
                className="group flex items-center gap-4 p-4 rounded-xl bg-slate-50/50 border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all duration-200"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center border border-slate-200/80 shadow-sm">
                  <Building2 className="w-5 h-5 text-slate-500" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 text-sm truncate">{transaction.name}</h4>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-[11px] text-slate-400">Annual Return:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-800 text-white text-[11px] font-semibold">
                      {transaction.returnRate}
                    </span>
                    <span className="text-[11px] text-slate-300">•</span>
                    <span className="text-[11px] text-slate-400">{transaction.category}</span>
                    <span className="text-[11px] text-slate-300">•</span>
                    <span className="text-[11px] text-slate-400">{transaction.shares} Shares</span>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      transaction.status === "active" ? "bg-emerald-500" : 
                      transaction.status === "pending" ? "bg-amber-500" : "bg-slate-400"
                    }`} />
                    <span className="text-[11px] text-slate-400 capitalize">{transaction.status}</span>
                  </div>
                  <Button 
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 h-8 px-3 text-xs"
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 ml-1.5" />
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-slate-300" />
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
