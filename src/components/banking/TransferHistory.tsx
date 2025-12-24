import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownLeft, CreditCard, Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTransfers, Transfer } from "@/hooks/useTransfers";
import { format, isToday, isYesterday, parseISO } from "date-fns";

interface TransferGroup {
  label: string;
  transfers: Transfer[];
}

const groupTransfersByDate = (transfers: Transfer[]): TransferGroup[] => {
  const groups: { [key: string]: Transfer[] } = {};

  transfers.forEach((transfer) => {
    const date = parseISO(transfer.created_at);
    let label: string;

    if (isToday(date)) {
      label = "Today";
    } else if (isYesterday(date)) {
      label = "Yesterday";
    } else {
      label = format(date, "MMMM d, yyyy");
    }

    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(transfer);
  });

  // Convert to array and sort by date (Today first)
  const sortOrder = ["Today", "Yesterday"];
  return Object.entries(groups)
    .sort(([a], [b]) => {
      const aIndex = sortOrder.indexOf(a);
      const bIndex = sortOrder.indexOf(b);
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return new Date(b).getTime() - new Date(a).getTime();
    })
    .map(([label, transfers]) => ({ label, transfers }));
};

const formatAmount = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(amount);
};

const getStatusStyles = (status: Transfer["status"]) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-700 border-0";
    case "processing":
      return "bg-yellow-100 text-yellow-700 border-0";
    case "pending":
      return "bg-blue-100 text-blue-700 border-0";
    case "failed":
      return "bg-red-100 text-red-700 border-0";
    default:
      return "bg-gray-100 text-gray-700 border-0";
  }
};

export const TransferHistory = () => {
  const { transfers, loading, error, refetch } = useTransfers();

  const groupedTransfers = useMemo(() => groupTransfersByDate(transfers), [transfers]);
  const hasTransfers = transfers.length > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 mb-4">Failed to load transfers: {error}</p>
        <Button onClick={refetch} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

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

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-serif font-semibold text-foreground">Transfer History</h1>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Live updates
          </div>
          <Button onClick={refetch} variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

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
          {groupedTransfers.map((group, groupIndex) => (
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
                    transition={{ delay: groupIndex * 0.1 + index * 0.05 }}
                    className="bg-card border border-border rounded-xl p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transfer.type === "withdrawal"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
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
                          <span>{format(parseISO(transfer.created_at), "MMM d, yyyy h:mm a")}</span>
                          <span>•</span>
                          <Badge variant="secondary" className={`text-xs ${getStatusStyles(transfer.status)}`}>
                            {transfer.status === "processing" && (
                              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            )}
                            {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                          </Badge>
                          {transfer.reference && (
                            <>
                              <span>•</span>
                              <span className="text-xs font-mono">{transfer.reference}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`font-semibold ${
                        transfer.type === "deposit" ? "text-green-600" : "text-foreground"
                      }`}
                    >
                      {transfer.type === "deposit" ? "+" : "-"}
                      {formatAmount(transfer.amount, transfer.currency)}
                    </span>
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