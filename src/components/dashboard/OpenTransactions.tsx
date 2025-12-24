import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Info, ArrowRight, Clock, X, Plus, ExternalLink, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

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

const activeOrders: Order[] = [
  {
    id: "1",
    assetName: "Malibu Estate Fund",
    assetType: "Real Estate",
    orderType: "buy",
    tokens: 50,
    pricePerToken: "€120",
    totalValue: "€6,000",
    status: "active",
    createdAt: "2024-01-15",
    filledTokens: 0,
    expiresAt: "2024-02-15",
  },
  {
    id: "2",
    assetName: "Film Rights Portfolio",
    assetType: "Entertainment",
    orderType: "sell",
    tokens: 25,
    pricePerToken: "€85",
    totalValue: "€2,125",
    status: "partial",
    createdAt: "2024-01-12",
    filledTokens: 10,
    expiresAt: "2024-02-12",
  },
];

const orderHistory: Order[] = [
  {
    id: "3",
    assetName: "Corporate Bond SPV",
    assetType: "Credit",
    orderType: "buy",
    tokens: 100,
    pricePerToken: "€100",
    totalValue: "€10,000",
    status: "completed",
    createdAt: "2024-01-10",
    filledTokens: 100,
  },
  {
    id: "4",
    assetName: "Music Royalties Fund",
    assetType: "Music",
    orderType: "sell",
    tokens: 30,
    pricePerToken: "€75",
    totalValue: "€2,250",
    status: "cancelled",
    createdAt: "2024-01-08",
    filledTokens: 0,
  },
];

export const OpenTransactions = () => {
  const [activeTab, setActiveTab] = useState<"orders" | "history">("orders");
  const navigate = useNavigate();

  const handleOrderClick = (order: Order) => {
    navigate(`/order/${order.id}`);
  };

  const handleCancelOrder = (orderId: string) => {
    console.log("Cancel order:", orderId);
    // TODO: Implement cancel order functionality
  };

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
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const orders = activeTab === "orders" ? activeOrders : orderHistory;

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-xl border border-border p-6 shadow-sm h-full flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground">Order Book</h3>
            <button className="p-0.5">
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <Button
            size="sm"
            className="rounded-full h-7 px-3 text-xs font-medium bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="w-3 h-3 mr-1" />
            New Order
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Manage your RWA token orders. Buy or sell tokens on the secondary market.
        </p>

        {/* Tabs */}
        <div className="flex items-center gap-4 mb-5 border-b border-border pb-4">
          {[
            { key: "orders", label: "Active Orders", count: activeOrders.length },
            { key: "history", label: "History", count: orderHistory.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "orders" | "history")}
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

        {/* Orders List */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleOrderClick(order)}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all duration-200 cursor-pointer"
                >
                  {/* Order Type Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
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

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link 
                        to="/live-deals"
                        onClick={(e) => e.stopPropagation()}
                        className="font-semibold text-foreground text-sm hover:text-primary transition-colors flex items-center gap-1 group/link"
                      >
                        {order.assetName}
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover/link:text-primary transition-colors" />
                      </Link>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                        order.orderType === "buy" 
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" 
                          : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                      }`}>
                        {order.orderType === "buy" ? "Buy" : "Sell"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.tokens} tokens @
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold border ${
                        order.orderType === "buy"
                          ? "bg-emerald-500/5 text-emerald-700 border-emerald-500/20"
                          : "bg-rose-500/5 text-rose-600 border-rose-500/20"
                      }`}>
                        {order.pricePerToken}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-bold border ${
                        order.orderType === "buy"
                          ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/30"
                          : "bg-rose-500/10 text-rose-600 border-rose-500/30"
                      }`}>
                        {order.totalValue}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-muted-foreground">{order.assetType}</span>
                      <span className="text-[10px] text-muted-foreground">•</span>
                      <span className="text-[10px] text-muted-foreground">{order.createdAt}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  {activeTab === "orders" && (order.status === "active" || order.status === "partial") && (
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCancelOrder(order.id);
                      }}
                      className="rounded-full h-8 px-3 text-xs font-medium text-rose-500 hover:text-rose-600 hover:bg-rose-500/10"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                  )}
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
                <p className="text-foreground font-medium text-sm">
                  No {activeTab === "orders" ? "active orders" : "order history"} yet
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeTab === "orders" 
                    ? "Create your first order to start trading" 
                    : "Your completed orders will appear here"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Secondary Market CTA */}
        <div className="mt-5 pt-4 border-t border-border">
          <Link to="/marketplace">
            <Button 
              variant="outline" 
              className="w-full rounded-lg h-10 text-sm font-medium border-primary/30 text-primary hover:bg-primary/5 group"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Explore Secondary Market
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </motion.div>
  );
};
