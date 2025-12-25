import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ban, FileText, X, Pencil, Clock, TrendingUp, TrendingDown, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { toast } from "sonner";

interface Order {
  id: string;
  date: string;
  type: "buy" | "sell";
  amount: number;
  payCurrency: string;
  receiveCurrency: string;
  limitPrice: number;
  marketPrice: number;
  status: "pending" | "partially_filled" | "filled" | "cancelled";
  filledPercent: number;
  expiresAt: string;
}

// Mock orders for demo
const initialOrders: Order[] = [
  { 
    id: "ord_001", 
    date: "Dec 25, 2025 10:30 AM", 
    type: "buy", 
    amount: 500, 
    payCurrency: "USDC",
    receiveCurrency: "ADA",
    limitPrice: 1.6200,
    marketPrice: 1.6439,
    status: "pending",
    filledPercent: 0,
    expiresAt: "Dec 26, 2025 10:30 AM"
  },
  { 
    id: "ord_002", 
    date: "Dec 24, 2025 3:15 PM", 
    type: "sell", 
    amount: 1200, 
    payCurrency: "ADA",
    receiveCurrency: "USDC",
    limitPrice: 0.6200,
    marketPrice: 0.6084,
    status: "partially_filled",
    filledPercent: 35,
    expiresAt: "Dec 31, 2025 3:15 PM"
  },
  { 
    id: "ord_003", 
    date: "Dec 23, 2025 9:45 AM", 
    type: "buy", 
    amount: 250, 
    payCurrency: "EUR",
    receiveCurrency: "ADA",
    limitPrice: 1.7500,
    marketPrice: 1.79,
    status: "pending",
    filledPercent: 0,
    expiresAt: "Good Till Cancelled"
  },
];

export const MyOrders = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showModifyDialog, setShowModifyDialog] = useState(false);
  const [modifiedPrice, setModifiedPrice] = useState("");
  const [modifiedAmount, setModifiedAmount] = useState("");

  const handleCancelOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowCancelDialog(true);
  };

  const handleModifyOrder = (order: Order) => {
    setSelectedOrder(order);
    setModifiedPrice(order.limitPrice.toString());
    setModifiedAmount(order.amount.toString());
    setShowModifyDialog(true);
  };

  const confirmCancel = () => {
    if (selectedOrder) {
      setOrders(orders.filter(o => o.id !== selectedOrder.id));
      toast.success("Order cancelled", {
        description: `Your ${selectedOrder.type} order has been cancelled successfully.`
      });
    }
    setShowCancelDialog(false);
    setSelectedOrder(null);
  };

  const confirmModify = () => {
    if (selectedOrder) {
      const newPrice = parseFloat(modifiedPrice) || selectedOrder.limitPrice;
      const newAmount = parseFloat(modifiedAmount) || selectedOrder.amount;
      
      setOrders(orders.map(o => 
        o.id === selectedOrder.id 
          ? { ...o, limitPrice: newPrice, amount: newAmount }
          : o
      ));
      toast.success("Order modified", {
        description: `Your ${selectedOrder.type} order has been updated.`
      });
    }
    setShowModifyDialog(false);
    setSelectedOrder(null);
  };

  const pendingOrders = orders.filter(o => o.status === "pending" || o.status === "partially_filled");

  if (pendingOrders.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        {/* Empty State Icon */}
        <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-muted/80 flex items-center justify-center">
            <Ban className="w-8 h-8 text-muted-foreground/60" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">No Active Orders</h3>
        <p className="text-sm text-muted-foreground max-w-[280px] leading-relaxed">
          You don't have any pending limit orders. Place a limit order to see it here.
        </p>

        <Button variant="outline" className="mt-6">
          <FileText className="w-4 h-4 mr-2" />
          Place Your First Order
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/20 rounded-lg">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {pendingOrders.length} Active Order{pendingOrders.length !== 1 ? 's' : ''}
          </span>
          <InfoTooltip content="Manage your pending limit orders. You can modify prices or cancel orders before they are filled." />
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs text-muted-foreground hover:text-destructive"
          onClick={() => {
            setOrders([]);
            toast.success("All orders cancelled");
          }}
        >
          Cancel All
        </Button>
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {pendingOrders.map((order, index) => {
          const priceDiff = ((order.limitPrice - order.marketPrice) / order.marketPrice) * 100;
          const isAboveMarket = priceDiff > 0;
          
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:border-border transition-colors"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    order.type === "buy" 
                      ? "bg-green-500/10 border border-green-500/30" 
                      : "bg-red-500/10 border border-red-500/30"
                  }`}>
                    {order.type === "buy" ? (
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        order.type === "buy" 
                          ? "bg-green-500/10 text-green-600" 
                          : "bg-red-500/10 text-red-500"
                      }`}>
                        {order.type.toUpperCase()}
                      </span>
                      <span className="font-semibold text-foreground">
                        {order.amount.toLocaleString()} {order.payCurrency}
                      </span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-muted-foreground">{order.receiveCurrency}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="flex items-center gap-2">
                  {order.status === "partially_filled" && (
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20">
                      {order.filledPercent}% Filled
                    </span>
                  )}
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    Limit
                  </span>
                </div>
              </div>

              {/* Order Details */}
              <div className="grid grid-cols-3 gap-4 py-3 border-t border-b border-border/30">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Limit Price</p>
                  <p className="font-semibold text-foreground">{order.limitPrice.toFixed(4)}</p>
                  <div className={`flex items-center gap-1 mt-0.5 text-xs ${
                    isAboveMarket ? 'text-green-600' : 'text-red-500'
                  }`}>
                    {isAboveMarket ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isAboveMarket ? '+' : ''}{priceDiff.toFixed(2)}% vs market
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Market Price</p>
                  <p className="font-medium text-muted-foreground">{order.marketPrice.toFixed(4)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Expires</p>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <p className="text-sm text-foreground">{order.expiresAt}</p>
                  </div>
                </div>
              </div>

              {/* Progress Bar for Partially Filled */}
              {order.status === "partially_filled" && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Fill Progress</span>
                    <span>{order.filledPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${order.filledPercent}%` }}
                      className="h-full bg-primary rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleModifyOrder(order)}
                >
                  <Pencil className="w-3.5 h-3.5 mr-1.5" />
                  Modify
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                  onClick={() => handleCancelOrder(order)}
                >
                  <X className="w-3.5 h-3.5 mr-1.5" />
                  Cancel
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <DialogTitle className="text-xl mb-2">Cancel Order?</DialogTitle>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to cancel this {selectedOrder?.type} order for {selectedOrder?.amount.toLocaleString()} {selectedOrder?.payCurrency}? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowCancelDialog(false)}
              >
                Keep Order
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={confirmCancel}
              >
                Cancel Order
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modify Order Dialog */}
      <Dialog open={showModifyDialog} onOpenChange={setShowModifyDialog}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Modify Order</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Order Summary */}
            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                selectedOrder?.type === "buy" 
                  ? "bg-green-500/10" 
                  : "bg-red-500/10"
              }`}>
                {selectedOrder?.type === "buy" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {selectedOrder?.type.toUpperCase()} {selectedOrder?.payCurrency} → {selectedOrder?.receiveCurrency}
                </p>
                <p className="text-xs text-muted-foreground">Order ID: {selectedOrder?.id}</p>
              </div>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Amount ({selectedOrder?.payCurrency})</label>
              <input
                type="text"
                value={modifiedAmount}
                onChange={(e) => setModifiedAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {/* Limit Price Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Limit Price</label>
                <span className="text-xs text-muted-foreground">
                  Market: {selectedOrder?.marketPrice.toFixed(4)}
                </span>
              </div>
              <input
                type="text"
                value={modifiedPrice}
                onChange={(e) => setModifiedPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                className="w-full px-4 py-3 rounded-lg bg-muted/30 border border-border text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              {modifiedPrice && (
                <p className="text-xs text-muted-foreground">
                  {((parseFloat(modifiedPrice) - (selectedOrder?.marketPrice || 0)) / (selectedOrder?.marketPrice || 1) * 100).toFixed(2)}% from market price
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowModifyDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={confirmModify}
              >
                <Check className="w-4 h-4 mr-1.5" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
