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
      className="bg-card rounded-xl border border-border p-6 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-sm font-semibold text-foreground">Open Transactions</h3>
        <button className="p-0.5">
          <Info className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </div>

      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        Crowdfunded orders stay open until a startup's offering closes or the startup completes a disbursement.
      </p>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-5 border-b border-border pb-4">
        {[
          { key: "orders", label: "Orders", count: orderCount },
          { key: "positions", label: "Positions", count: positionCount },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "orders" | "positions")}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
              activeTab === tab.key
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
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
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                {/* Image placeholder */}
                <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/10" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm">{transaction.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">Annual Return from:</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-accent text-primary text-xs font-semibold">
                      {transaction.returnRate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{transaction.category}</span>
                    <span className="text-xs text-muted-foreground">|</span>
                    <span className="text-xs text-muted-foreground">{transaction.shares} Shares</span>
                  </div>
                </div>

                {/* Action */}
                <Button 
                  className="rounded-full h-9 px-4 text-sm font-medium flex-shrink-0 bg-primary hover:bg-primary/90 text-white"
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
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <p className="text-foreground font-medium text-sm">No {activeTab} yet</p>
              <p className="text-xs text-muted-foreground mt-1">Your transactions will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
