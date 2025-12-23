import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Calendar, Hash, Coins, Tag, Clock, X } from "lucide-react";

interface Order {
  id: string;
  assetName: string;
  assetType: string;
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              order.orderType === "buy" 
                ? "bg-emerald-500/10" 
                : "bg-rose-500/10"
            }`}>
              {order.orderType === "buy" ? (
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-rose-500" />
              )}
            </div>
            <div>
              <span className="block">{order.assetName}</span>
              <span className={`text-sm font-normal ${
                order.orderType === "buy" ? "text-emerald-600" : "text-rose-500"
              }`}>
                {order.orderType === "buy" ? "Buy Order" : "Sell Order"}
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Status</span>
            {getStatusBadge(order.status)}
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg bg-accent/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Hash className="w-3.5 h-3.5" />
                <span className="text-xs">Order ID</span>
              </div>
              <p className="font-mono text-sm font-medium text-foreground">#{order.id}</p>
            </div>

            <div className="p-3 rounded-lg bg-accent/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-xs">Asset Type</span>
              </div>
              <p className="text-sm font-medium text-foreground">{order.assetType}</p>
            </div>

            <div className="p-3 rounded-lg bg-accent/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Coins className="w-3.5 h-3.5" />
                <span className="text-xs">Tokens</span>
              </div>
              <p className="text-sm font-medium text-foreground">{order.tokens} tokens</p>
            </div>

            <div className="p-3 rounded-lg bg-accent/50">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-xs">Price/Token</span>
              </div>
              <p className="text-sm font-medium text-foreground">{order.pricePerToken}</p>
            </div>
          </div>

          {/* Total Value */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Value</span>
              <span className="text-lg font-bold text-foreground">{order.totalValue}</span>
            </div>
          </div>

          {/* Fill Progress (for active/partial orders) */}
          {(order.status === "active" || order.status === "partial") && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fill Progress</span>
                <span className="font-medium text-foreground">{filledPercentage}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full rounded-full bg-primary transition-all duration-300"
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

          {/* Dates */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>Created: {order.createdAt}</span>
            </div>
            {order.expiresAt && (
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
