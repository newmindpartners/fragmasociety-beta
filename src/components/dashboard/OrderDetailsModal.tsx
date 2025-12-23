import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Calendar, Hash, Coins, Tag, Clock, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  assetName: string;
  assetType: string;
  assetId?: string;
  orderType: "buy" | "sell";
  tokens: number;
  pricePerToken: string;
  totalValue: string;
  status: "active" | "partial" | "completed" | "cancelled";
  createdAt: string;
  filledTokens?: number;
  expiresAt?: string;
}

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onCancel?: (orderId: string) => void;
  showCancelButton?: boolean;
}

export const OrderDetailsModal = ({
  order,
  isOpen,
  onClose,
  onCancel,
  showCancelButton = false,
}: OrderDetailsModalProps) => {
  if (!order) return null;

  const getStatusBadge = (status: Order["status"]) => {
    const styles = {
      active: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      partial: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      completed: "bg-primary/10 text-primary border-primary/20",
      cancelled: "bg-muted text-muted-foreground border-border",
    };

    const labels = {
      active: "Active",
      partial: "Partially Filled",
      completed: "Completed",
      cancelled: "Cancelled",
    };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filledPercentage = order.filledTokens 
    ? Math.round((order.filledTokens / order.tokens) * 100) 
    : order.status === "completed" ? 100 : 0;

  const isBuy = order.orderType === "buy";
  const colorClasses = isBuy 
    ? { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-600", bgLight: "bg-emerald-50", borderLight: "border-emerald-200" }
    : { bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-500", bgLight: "bg-rose-50", borderLight: "border-rose-200" };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="theme-dashboard sm:max-w-md bg-card border-2 border-primary/30 shadow-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses.bg} ${colorClasses.border} border`}>
              {isBuy ? (
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-rose-500" />
              )}
            </div>
            <div className="flex-1">
              <Link 
                to={order.assetId ? `/deals/${order.assetId}` : "/live-deals"}
                className="flex items-center gap-1 text-foreground hover:text-primary transition-colors group"
                onClick={onClose}
              >
                <span className="font-semibold">{order.assetName}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold mt-1 ${colorClasses.bg} ${colorClasses.text} border ${colorClasses.border}`}>
                {isBuy ? "Buy Order" : "Sell Order"}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Status */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/50">
            <span className="text-sm text-muted-foreground">Status</span>
            {getStatusBadge(order.status)}
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Hash className="w-3.5 h-3.5" />
                <span className="text-xs">Order ID</span>
              </div>
              <p className="font-mono text-sm font-semibold text-foreground">#{order.id}</p>
            </div>

            <div className="p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-xs">Asset Type</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{order.assetType}</p>
            </div>

            <div className="p-3 rounded-xl bg-secondary/50 border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Coins className="w-3.5 h-3.5" />
                <span className="text-xs">Tokens</span>
              </div>
              <p className="text-sm font-semibold text-foreground">{order.tokens} tokens</p>
            </div>

            <div className={`p-3 rounded-xl border ${colorClasses.bg} ${colorClasses.border}`}>
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-xs">Price/Token</span>
              </div>
              <p className={`text-sm font-bold ${colorClasses.text}`}>{order.pricePerToken}</p>
            </div>
          </div>

          {/* Total Value */}
          <div className={`p-4 rounded-xl border-2 ${colorClasses.bg} ${colorClasses.border}`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Total Value</span>
              <span className={`text-xl font-bold ${colorClasses.text}`}>{order.totalValue}</span>
            </div>
          </div>

          {/* Fill Progress (for active/partial orders) */}
          {(order.status === "active" || order.status === "partial") && (
            <div className="space-y-2 p-3 rounded-xl bg-secondary/30 border border-border/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fill Progress</span>
                <span className={`font-bold ${colorClasses.text}`}>{filledPercentage}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${isBuy ? "bg-emerald-500" : "bg-rose-500"}`}
                  style={{ width: `${filledPercentage}%` }}
                />
              </div>
              {order.filledTokens !== undefined && (
                <p className="text-xs text-muted-foreground">
                  {order.filledTokens} of {order.tokens} tokens filled
                </p>
              )}
            </div>
          )}

          {/* Completion info for history */}
          {order.status === "completed" && (
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  Order completed • {order.tokens} tokens filled
                </span>
              </div>
            </div>
          )}

          {/* Cancelled info for history */}
          {order.status === "cancelled" && (
            <div className="p-3 rounded-lg bg-muted border border-border">
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Order was cancelled
                </span>
              </div>
            </div>
          )}

          {/* Dates */}
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created: {order.createdAt}</span>
            </div>
            {order.expiresAt && (order.status === "active" || order.status === "partial") && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span>Expires: {order.expiresAt}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          {showCancelButton && (order.status === "active" || order.status === "partial") && onCancel && (
            <Button 
              variant="destructive"
              className="w-full mt-2"
              onClick={() => {
                onCancel(order.id);
                onClose();
              }}
            >
              <X className="w-4 h-4 mr-2" />
              Cancel Order
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
