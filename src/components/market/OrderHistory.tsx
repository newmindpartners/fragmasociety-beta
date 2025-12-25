import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Calendar, Filter, TrendingUp, TrendingDown, CheckCircle2, XCircle, Clock, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface HistoricalOrder {
  id: string;
  date: string;
  type: "buy" | "sell";
  orderType: "market" | "limit";
  amount: number;
  payCurrency: string;
  receiveCurrency: string;
  executedPrice: number;
  total: number;
  status: "filled" | "cancelled" | "expired";
  filledAt?: string;
}

const mockHistory: HistoricalOrder[] = [
  { 
    id: "hist_001", 
    date: "Dec 24, 2025 2:45 PM", 
    type: "buy", 
    orderType: "market",
    amount: 1000, 
    payCurrency: "USDC",
    receiveCurrency: "ADA",
    executedPrice: 1.6439,
    total: 1643.90,
    status: "filled",
    filledAt: "Dec 24, 2025 2:45 PM"
  },
  { 
    id: "hist_002", 
    date: "Dec 23, 2025 11:30 AM", 
    type: "sell", 
    orderType: "limit",
    amount: 2500, 
    payCurrency: "ADA",
    receiveCurrency: "USDC",
    executedPrice: 0.6150,
    total: 1537.50,
    status: "filled",
    filledAt: "Dec 23, 2025 3:22 PM"
  },
  { 
    id: "hist_003", 
    date: "Dec 22, 2025 9:15 AM", 
    type: "buy", 
    orderType: "limit",
    amount: 500, 
    payCurrency: "EUR",
    receiveCurrency: "ADA",
    executedPrice: 1.75,
    total: 875.00,
    status: "cancelled",
  },
  { 
    id: "hist_004", 
    date: "Dec 21, 2025 4:00 PM", 
    type: "sell", 
    orderType: "limit",
    amount: 1800, 
    payCurrency: "ADA",
    receiveCurrency: "EUR",
    executedPrice: 0.58,
    total: 1044.00,
    status: "expired",
  },
  { 
    id: "hist_005", 
    date: "Dec 20, 2025 10:20 AM", 
    type: "buy", 
    orderType: "market",
    amount: 750, 
    payCurrency: "USDC",
    receiveCurrency: "ADA",
    executedPrice: 1.6380,
    total: 1228.50,
    status: "filled",
    filledAt: "Dec 20, 2025 10:20 AM"
  },
  { 
    id: "hist_006", 
    date: "Dec 19, 2025 3:45 PM", 
    type: "buy", 
    orderType: "limit",
    amount: 300, 
    payCurrency: "EUR",
    receiveCurrency: "ADA",
    executedPrice: 1.72,
    total: 516.00,
    status: "cancelled",
  },
];

type StatusFilter = "all" | "filled" | "cancelled" | "expired";
type TypeFilter = "all" | "buy" | "sell";
type OrderTypeFilter = "all" | "market" | "limit";

export const OrderHistory = () => {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<OrderTypeFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredOrders = mockHistory.filter(order => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (typeFilter !== "all" && order.type !== typeFilter) return false;
    if (orderTypeFilter !== "all" && order.orderType !== orderTypeFilter) return false;
    if (searchQuery && !order.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "filled":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "expired":
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "filled":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      case "expired":
        return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      default:
        return "";
    }
  };

  const totalVolume = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const filledCount = filteredOrders.filter(o => o.status === "filled").length;

  return (
    <div className="space-y-4">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 p-4 bg-muted/20 rounded-lg">
        <div>
          <p className="text-xs text-muted-foreground">Total Orders</p>
          <p className="text-lg font-semibold text-foreground">{filteredOrders.length}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Filled Orders</p>
          <p className="text-lg font-semibold text-green-600">{filledCount}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Total Volume</p>
          <p className="text-lg font-semibold text-foreground">${totalVolume.toLocaleString()}</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by Order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted/30 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm"
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className={showFilters ? "bg-primary/10 border-primary/30" : ""}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {(statusFilter !== "all" || typeFilter !== "all" || orderTypeFilter !== "all") && (
            <span className="ml-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
              {[statusFilter !== "all", typeFilter !== "all", orderTypeFilter !== "all"].filter(Boolean).length}
            </span>
          )}
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-muted/20 rounded-lg border border-border/50"
        >
          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Status</label>
            <div className="flex flex-wrap gap-1.5">
              {(["all", "filled", "cancelled", "expired"] as StatusFilter[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    statusFilter === status
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Direction</label>
            <div className="flex flex-wrap gap-1.5">
              {(["all", "buy", "sell"] as TypeFilter[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    typeFilter === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Order Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Order Type</label>
            <div className="flex flex-wrap gap-1.5">
              {(["all", "market", "limit"] as OrderTypeFilter[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setOrderTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    orderTypeFilter === type
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(statusFilter !== "all" || typeFilter !== "all" || orderTypeFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground sm:col-span-3"
              onClick={() => {
                setStatusFilter("all");
                setTypeFilter("all");
                setOrderTypeFilter("all");
              }}
            >
              Clear all filters
            </Button>
          )}
        </motion.div>
      )}

      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-6 gap-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="col-span-2">Order</div>
        <div>Type</div>
        <div className="text-right">Price</div>
        <div className="text-right">Total</div>
        <div className="text-right">Status</div>
      </div>

      {/* Orders List */}
      <div className="space-y-2">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No orders match your filters</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2"
              onClick={() => {
                setStatusFilter("all");
                setTypeFilter("all");
                setOrderTypeFilter("all");
                setSearchQuery("");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="grid grid-cols-1 sm:grid-cols-6 gap-2 sm:gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors border border-transparent hover:border-border/50"
            >
              {/* Order Info */}
              <div className="col-span-2 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  order.type === "buy" 
                    ? "bg-green-500/10 border border-green-500/20" 
                    : "bg-red-500/10 border border-red-500/20"
                }`}>
                  {order.type === "buy" ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground truncate">
                      {order.amount.toLocaleString()} {order.payCurrency}
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-muted-foreground">{order.receiveCurrency}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{order.date}</p>
                </div>
              </div>

              {/* Order Type */}
              <div className="flex items-center sm:justify-start">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  order.orderType === "market" 
                    ? "bg-blue-500/10 text-blue-600 border border-blue-500/20" 
                    : "bg-primary/10 text-primary border border-primary/20"
                }`}>
                  {order.orderType.charAt(0).toUpperCase() + order.orderType.slice(1)}
                </span>
              </div>

              {/* Price */}
              <div className="text-sm sm:text-right">
                <span className="sm:hidden text-xs text-muted-foreground mr-2">Price:</span>
                <span className="font-medium text-foreground">{order.executedPrice.toFixed(4)}</span>
              </div>

              {/* Total */}
              <div className="text-sm sm:text-right">
                <span className="sm:hidden text-xs text-muted-foreground mr-2">Total:</span>
                <span className="font-semibold text-foreground">${order.total.toLocaleString()}</span>
              </div>

              {/* Status */}
              <div className="flex items-center sm:justify-end gap-2">
                <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredOrders.length > 0 && (
        <button className="w-full py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
          Load more orders
        </button>
      )}
    </div>
  );
};
