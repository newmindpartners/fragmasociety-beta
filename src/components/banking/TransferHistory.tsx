import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownLeft, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Transfer {
  id: string;
  type: "withdrawal" | "deposit";
  amount: string;
  date: string;
  status: "completed" | "processing" | "failed";
}

interface TransferGroup {
  label: string;
  transfers: Transfer[];
}

const mockTransfers: TransferGroup[] = [
  {
    label: "Today",
    transfers: [
      { id: "1", type: "withdrawal", amount: "$500.00", date: "March 18, 2025", status: "completed" },
      { id: "2", type: "deposit", amount: "$1000.00", date: "March 18, 2025", status: "processing" },
    ],
  },
  {
    label: "Yesterday",
    transfers: [
      { id: "3", type: "withdrawal", amount: "$500.00", date: "March 18, 2025", status: "completed" },
    ],
  },
];

export const TransferHistory = () => {
  const hasTransfers = mockTransfers.some(group => group.transfers.length > 0);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-primary mb-6">
        <Link to="/dashboard/banking" className="hover:underline">
          Banking
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-muted-foreground">Transfer History</span>
      </div>

      <h1 className="text-3xl font-serif font-semibold text-foreground mb-8">Transfer History</h1>

      {!hasTransfers ? (
        // Empty State
        <div className="bg-card border border-border rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground font-medium mb-1">No transfers yet!</p>
          <p className="text-sm text-muted-foreground">Deposits and withdrawals will appear here.</p>
        </div>
      ) : (
        // Transfer List
        <div className="space-y-6">
          {mockTransfers.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIndex * 0.1 }}
            >
              <h3 className="text-sm font-medium text-primary mb-3">{group.label}</h3>
              <div className="space-y-3">
                {group.transfers.map((transfer, index) => (
                  <motion.div
                    key={transfer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (groupIndex * 0.1) + (index * 0.05) }}
                    className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transfer.type === "withdrawal" 
                          ? "bg-orange-100 text-orange-600" 
                          : "bg-green-100 text-green-600"
                      }`}>
                        {transfer.type === "withdrawal" ? (
                          <ArrowUpRight className="w-5 h-5" />
                        ) : (
                          <ArrowDownLeft className="w-5 h-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {transfer.type === "withdrawal" ? "Funds Withdrawn" : "Deposit Received"}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{transfer.date}</span>
                          <span>•</span>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              transfer.status === "completed" 
                                ? "bg-green-100 text-green-700 border-0" 
                                : transfer.status === "processing"
                                ? "bg-yellow-100 text-yellow-700 border-0"
                                : "bg-red-100 text-red-700 border-0"
                            }`}
                          >
                            {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <span className="font-semibold text-foreground">{transfer.amount}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
