import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Info, ArrowRight, Clock, X, Plus, ExternalLink, TrendingUp, TrendingDown, ChevronRight, MoreHorizontal, Calendar, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  };

  const getStatusConfig = (status: Order["status"]) => {
    const config = {
      active: {
        label: "Active",
        dotColor: "bg-emerald-500",
        textColor: "text-emerald-600",
      },
      partial: {
        label: "Partial",
        dotColor: "bg-amber-500",
        textColor: "text-amber-600",
      },
      completed: {
        label: "Filled",
        dotColor: "bg-slate-400",
        textColor: "text-slate-500",
      },
      cancelled: {
        label: "Cancelled",
        dotColor: "bg-slate-300",
        textColor: "text-slate-400",
      },
    };
    return config[status];
  };

  const formatExpiryDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: "Expired", urgent: true };
    if (diffDays === 0) return { text: "Expires today", urgent: true };
    if (diffDays === 1) return { text: "Expires tomorrow", urgent: true };
    if (diffDays <= 7) return { text: `Expires in ${diffDays} days`, urgent: true };
    return { text: `Expires ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`, urgent: false };
  };

  const getFillPercentage = (order: Order) => {
    if (order.filledTokens === undefined) return 0;
    return Math.round((order.filledTokens / order.tokens) * 100);
  };

  const orders = activeTab === "orders" ? activeOrders : orderHistory;

  return (
    <TooltipProvider delayDuration={200}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-card rounded-2xl border border-border/60 shadow-sm h-full flex flex-col overflow-hidden"
      >
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-semibold text-foreground tracking-tight">Order Book</h3>
          </div>
          <Button
            variant="default"
            size="sm"
            className="rounded-lg h-8 px-3.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            New Order
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 pl-[42px]">
          Manage your active orders on the secondary market
        </p>
      </div>

      {/* Tabs - Minimal pill style */}
      <div className="px-6 pb-4">
        <div className="inline-flex items-center p-1 bg-muted/50 rounded-lg">
          {[
            { key: "orders", label: "Active", count: activeOrders.length },
            { key: "history", label: "History", count: orderHistory.length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "orders" | "history")}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
              <span className={`min-w-[18px] h-[18px] flex items-center justify-center rounded text-[10px] font-semibold ${
                activeTab === tab.key
                  ? "bg-slate-900 text-white"
                  : "bg-muted text-muted-foreground"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        <AnimatePresence mode="wait">
          {orders.length > 0 ? (
            <div className="space-y-2">
              {orders.map((order, index) => {
                const statusConfig = getStatusConfig(order.status);
                const isBuy = order.orderType === "buy";
                
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    onClick={() => handleOrderClick(order)}
                    className="group relative bg-white rounded-xl border border-border/40 hover:border-border hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
                  >
                    {/* Subtle left accent */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                      isBuy ? "bg-emerald-500" : "bg-rose-500"
                    }`} />
                    
                    <div className="p-4 pl-5">
                      {/* Top Row - Asset name, status, actions */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <Link 
                              to="/live-deals"
                              onClick={(e) => e.stopPropagation()}
                              className="font-semibold text-foreground text-sm hover:text-primary transition-colors truncate"
                            >
                              {order.assetName}
                            </Link>
                            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 flex-shrink-0" />
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-muted-foreground">{order.assetType}</span>
                            <span className="text-muted-foreground/30">·</span>
                            <span className="text-[11px] text-muted-foreground">{order.createdAt}</span>
                            
                            {/* Tooltip Indicators */}
                            {order.expiresAt && (
                              <>
                                <span className="text-muted-foreground/30">·</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button 
                                      onClick={(e) => e.stopPropagation()}
                                      className={`flex items-center gap-1 text-[11px] ${
                                        formatExpiryDate(order.expiresAt)?.urgent 
                                          ? "text-amber-600" 
                                          : "text-muted-foreground"
                                      } hover:text-foreground transition-colors`}
                                    >
                                      <Calendar className="w-3 h-3" />
                                      {formatExpiryDate(order.expiresAt)?.text}
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" className="text-xs">
                                    <div className="space-y-1">
                                      <p className="font-medium">Order Expiry</p>
                                      <p className="text-muted-foreground">
                                        {new Date(order.expiresAt).toLocaleDateString('en-US', { 
                                          weekday: 'long',
                                          year: 'numeric', 
                                          month: 'long', 
                                          day: 'numeric' 
                                        })}
                                      </p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </>
                            )}
                            
                            {order.filledTokens !== undefined && order.filledTokens > 0 && (
                              <>
                                <span className="text-muted-foreground/30">·</span>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <button 
                                      onClick={(e) => e.stopPropagation()}
                                      className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                      <PieChart className="w-3 h-3" />
                                      {getFillPercentage(order)}% filled
                                    </button>
                                  </TooltipTrigger>
                                  <TooltipContent side="bottom" className="text-xs">
                                    <div className="space-y-1.5">
                                      <p className="font-medium">Fill Progress</p>
                                      <div className="flex items-center justify-between gap-4 text-muted-foreground">
                                        <span>Filled</span>
                                        <span className="font-medium text-foreground">{order.filledTokens} tokens</span>
                                      </div>
                                      <div className="flex items-center justify-between gap-4 text-muted-foreground">
                                        <span>Remaining</span>
                                        <span className="font-medium text-foreground">{order.tokens - order.filledTokens} tokens</span>
                                      </div>
                                      <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-1">
                                        <div 
                                          className="h-full bg-amber-500 rounded-full"
                                          style={{ width: `${getFillPercentage(order)}%` }}
                                        />
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </>
                            )}
                          </div>
                        </div>
                        
                        {/* Status + Actions */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
                            <span className={`text-[11px] font-medium ${statusConfig.textColor}`}>
                              {statusConfig.label}
                            </span>
                          </div>
                          
                          {activeTab === "orders" && (order.status === "active" || order.status === "partial") && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button 
                                  onClick={(e) => e.stopPropagation()}
                                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-32">
                                <DropdownMenuItem 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCancelOrder(order.id);
                                  }}
                                  className="text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                                >
                                  <X className="w-3.5 h-3.5 mr-2" />
                                  Cancel
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                      
                      {/* Bottom Row - Order details in a clean grid */}
                      <div className="flex items-center gap-3">
                        {/* Order Type Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${
                          isBuy 
                            ? "bg-emerald-50 text-emerald-700" 
                            : "bg-rose-50 text-rose-600"
                        }`}>
                          {isBuy ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )}
                          {isBuy ? "Buy" : "Sell"}
                        </div>
                        
                        {/* Divider */}
                        <div className="h-4 w-px bg-border/60" />
                        
                        {/* Token Info */}
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">Qty</span>
                            <span className="font-semibold text-foreground">{order.tokens}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-muted-foreground">@</span>
                            <span className="font-semibold text-foreground">{order.pricePerToken}</span>
                          </div>
                        </div>
                        
                        {/* Spacer */}
                        <div className="flex-1" />
                        
                        {/* Total Value - Prominent */}
                        <div className={`px-3 py-1.5 rounded-lg text-sm font-bold ${
                          isBuy 
                            ? "bg-emerald-50 text-emerald-700" 
                            : "bg-rose-50 text-rose-600"
                        }`}>
                          {order.totalValue}
                        </div>
                      </div>
                      
                      {/* Progress bar for partial fills */}
                      {order.status === "partial" && order.filledTokens !== undefined && (
                        <div className="mt-3 pt-3 border-t border-border/40">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] text-muted-foreground">Fill progress</span>
                            <span className="text-[11px] font-medium text-foreground">
                              {order.filledTokens}/{order.tokens} tokens
                            </span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(order.filledTokens / order.tokens) * 100}%` }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                              className="h-full bg-amber-500 rounded-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-foreground font-medium text-sm">
                No {activeTab === "orders" ? "active orders" : "order history"} yet
              </p>
              <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
                {activeTab === "orders" 
                  ? "Create your first order to start trading" 
                  : "Your completed orders will appear here"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer CTA */}
      <div className="p-4 border-t border-border/40 bg-muted/20">
        <Link to="/marketplace">
          <Button 
            variant="ghost" 
            className="w-full h-9 text-xs font-medium text-muted-foreground hover:text-foreground group"
          >
            <ExternalLink className="w-3.5 h-3.5 mr-2" />
            Explore Secondary Market
            <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </div>
    </motion.div>
    </TooltipProvider>
  );
};
