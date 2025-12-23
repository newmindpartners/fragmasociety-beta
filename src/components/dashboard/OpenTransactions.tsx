import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Info, ArrowRight, Building2, TrendingUp, Clock } from "lucide-react";
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
      className="bg-white rounded-2xl border border-slate-200/60 p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-900 font-sans">Open Transactions</h3>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1"
          >
            <Info className="w-4 h-4 text-slate-400" />
          </motion.button>
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-6">
        Crowdfunded orders stay open until a startup's offering closes or the startup completes a disbursement.
      </p>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: "orders", label: "Orders", count: orderCount },
          { key: "positions", label: "Positions", count: positionCount },
        ].map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "orders" | "positions")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeTab === tab.key
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab.key
                ? "bg-white/20 text-white"
                : "bg-slate-200 text-slate-600"
            }`}>
              {tab.count}
            </span>
          </motion.button>
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
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center border border-slate-200/50">
                  <Building2 className="w-6 h-6 text-slate-600" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-900 truncate">{transaction.name}</h4>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-slate-500">Annual Return from:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                      {transaction.returnRate}
                    </span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs text-slate-500">{transaction.category}</span>
                    <span className="text-xs text-slate-400">|</span>
                    <span className="text-xs text-slate-500">{transaction.shares} Shares</span>
                  </div>
                </div>

                {/* Status & Action */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      transaction.status === "active" ? "bg-emerald-500" : 
                      transaction.status === "pending" ? "bg-amber-500" : "bg-slate-400"
                    }`} />
                    <span className="text-xs text-slate-500 capitalize">{transaction.status}</span>
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 group-hover:border-primary group-hover:text-primary transition-all duration-300"
                  >
                    Learn More
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
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
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-600 font-medium">No {activeTab} yet</p>
              <p className="text-sm text-slate-400 mt-1">Your transactions will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
