import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface Order {
  volume: number;
  sum: number;
  total: number;
  type: "buy" | "sell";
}

const mockOrders: Order[] = [
  { volume: 45.00, sum: 176.4, total: 3.92, type: "buy" },
  { volume: 200.00, sum: 1800, total: 9.00, type: "sell" },
  { volume: 45.00, sum: 176.4, total: 3.92, type: "buy" },
  { volume: 200.00, sum: 1800, total: 9.00, type: "sell" },
  { volume: 78.50, sum: 312.6, total: 4.25, type: "buy" },
  { volume: 150.00, sum: 1200, total: 8.00, type: "sell" },
];

export const OrderBook = () => {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div className="flex items-center gap-1">
          Volume(SXPT)
          <InfoTooltip content="Total volume of tokens at this price level" />
        </div>
        <div className="text-right">Sum (€)</div>
        <div className="flex items-center justify-end gap-1">
          Total (€)
          <ChevronDown className="w-3 h-3" />
        </div>
        <div className="flex items-center justify-end gap-1">
          Type
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-2">
        {mockOrders.map((order, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-4 gap-4 px-4 py-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors items-center"
          >
            <div className="font-medium text-foreground">
              {order.volume.toFixed(2)}
            </div>
            <div className="text-right text-foreground">
              {order.sum.toLocaleString()}
            </div>
            <div className="flex justify-end">
              <span className={`px-2.5 py-1 rounded-md text-xs font-semibold border ${
                order.type === "buy" 
                  ? "bg-primary/10 text-primary border-primary/30" 
                  : "bg-red-500/10 text-red-500 border-red-500/30"
              }`}>
                {order.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-end">
              <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                order.type === "buy" 
                  ? "bg-green-500/10 text-green-600 border border-green-500/30" 
                  : "bg-red-500/10 text-red-500 border border-red-500/30"
              }`}>
                {order.type === "buy" ? "Buy" : "Sell"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        Load more orders
      </button>
    </div>
  );
};
