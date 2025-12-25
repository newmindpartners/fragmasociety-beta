import { motion } from "framer-motion";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface Order {
  price: number;
  volume: number;
  total: number;
  type: "buy" | "sell";
}

// Separate buy and sell orders with realistic price levels
const buyOrders: Order[] = [
  { price: 74.85, volume: 125, total: 9356.25, type: "buy" },
  { price: 74.50, volume: 89, total: 6630.50, type: "buy" },
  { price: 74.25, volume: 215, total: 15963.75, type: "buy" },
  { price: 74.00, volume: 156, total: 11544.00, type: "buy" },
  { price: 73.75, volume: 312, total: 23010.00, type: "buy" },
  { price: 73.50, volume: 98, total: 7203.00, type: "buy" },
];

const sellOrders: Order[] = [
  { price: 75.25, volume: 78, total: 5869.50, type: "sell" },
  { price: 75.50, volume: 145, total: 10947.50, type: "sell" },
  { price: 75.75, volume: 234, total: 17725.50, type: "sell" },
  { price: 76.00, volume: 167, total: 12692.00, type: "sell" },
  { price: 76.25, volume: 289, total: 22036.25, type: "sell" },
  { price: 76.50, volume: 112, total: 8568.00, type: "sell" },
];

// Calculate cumulative volumes
const calculateCumulativeVolumes = (orders: Order[]) => {
  let cumulative = 0;
  return orders.map(order => {
    cumulative += order.volume;
    return { ...order, cumulative };
  });
};

const buyOrdersWithCumulative = calculateCumulativeVolumes(buyOrders);
const sellOrdersWithCumulative = calculateCumulativeVolumes(sellOrders);

// Get max cumulative for percentage calculation
const maxBuyCumulative = buyOrdersWithCumulative[buyOrdersWithCumulative.length - 1]?.cumulative || 1;
const maxSellCumulative = sellOrdersWithCumulative[sellOrdersWithCumulative.length - 1]?.cumulative || 1;
const maxCumulative = Math.max(maxBuyCumulative, maxSellCumulative);

export const OrderBook = () => {
  return (
    <div className="space-y-6">
      {/* Spread Indicator */}
      <div className="flex items-center justify-center gap-4 py-3 px-4 rounded-lg bg-muted/30 border border-border/50">
        <div className="text-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Best Bid</span>
          <p className="text-lg font-bold text-green-600">€74.85</p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Spread</span>
          <p className="text-lg font-semibold text-foreground">€0.40 <span className="text-xs text-muted-foreground">(0.53%)</span></p>
        </div>
        <div className="h-8 w-px bg-border" />
        <div className="text-center">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Best Ask</span>
          <p className="text-lg font-bold text-red-500">€75.25</p>
        </div>
      </div>

      {/* Order Book Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Buy Orders (Bids) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-border/50">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <h3 className="text-sm font-semibold text-foreground">Buy Orders (Bids)</h3>
            <InfoTooltip content="Orders to buy at or below these prices" />
          </div>
          
          {/* Header */}
          <div className="grid grid-cols-4 gap-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <div>Price (€)</div>
            <div className="text-right">Volume</div>
            <div className="text-right">Total (€)</div>
            <div className="text-right">Depth</div>
          </div>
          
          {/* Buy Order Rows */}
          <div className="space-y-1">
            {buyOrdersWithCumulative.map((order, index) => {
              const depthPercentage = (order.cumulative / maxCumulative) * 100;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Depth Bar Background */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${depthPercentage}%` }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-y-0 right-0 bg-green-500/10 rounded-r-md"
                  />
                  
                  <div className="relative grid grid-cols-4 gap-2 px-3 py-2.5 rounded-md hover:bg-green-500/5 transition-colors items-center">
                    <div className="font-semibold text-green-600 tabular-nums">
                      {order.price.toFixed(2)}
                    </div>
                    <div className="text-right text-foreground tabular-nums">
                      {order.volume.toLocaleString()}
                    </div>
                    <div className="text-right text-muted-foreground tabular-nums text-sm">
                      {order.total.toLocaleString()}
                    </div>
                    <div className="flex justify-end items-center gap-1.5">
                      <div className="w-12 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${depthPercentage}%` }}
                          transition={{ delay: index * 0.05 + 0.2, duration: 0.5, ease: "easeOut" }}
                          className="h-full bg-green-500 rounded-full"
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-8 text-right">
                        {depthPercentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Buy Total */}
          <div className="pt-2 border-t border-border/50 px-3 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Total Buy Volume</span>
            <span className="font-semibold text-green-600">{maxBuyCumulative.toLocaleString()} tokens</span>
          </div>
        </div>

        {/* Sell Orders (Asks) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-border/50">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <h3 className="text-sm font-semibold text-foreground">Sell Orders (Asks)</h3>
            <InfoTooltip content="Orders to sell at or above these prices" />
          </div>
          
          {/* Header */}
          <div className="grid grid-cols-4 gap-2 px-3 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
            <div>Price (€)</div>
            <div className="text-right">Volume</div>
            <div className="text-right">Total (€)</div>
            <div className="text-right">Depth</div>
          </div>
          
          {/* Sell Order Rows */}
          <div className="space-y-1">
            {sellOrdersWithCumulative.map((order, index) => {
              const depthPercentage = (order.cumulative / maxCumulative) * 100;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Depth Bar Background */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${depthPercentage}%` }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-red-500/10 rounded-l-md"
                  />
                  
                  <div className="relative grid grid-cols-4 gap-2 px-3 py-2.5 rounded-md hover:bg-red-500/5 transition-colors items-center">
                    <div className="font-semibold text-red-500 tabular-nums">
                      {order.price.toFixed(2)}
                    </div>
                    <div className="text-right text-foreground tabular-nums">
                      {order.volume.toLocaleString()}
                    </div>
                    <div className="text-right text-muted-foreground tabular-nums text-sm">
                      {order.total.toLocaleString()}
                    </div>
                    <div className="flex justify-end items-center gap-1.5">
                      <div className="w-12 h-1.5 rounded-full bg-muted/50 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${depthPercentage}%` }}
                          transition={{ delay: index * 0.05 + 0.2, duration: 0.5, ease: "easeOut" }}
                          className="h-full bg-red-500 rounded-full"
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-8 text-right">
                        {depthPercentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Sell Total */}
          <div className="pt-2 border-t border-border/50 px-3 flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Total Sell Volume</span>
            <span className="font-semibold text-red-500">{maxSellCumulative.toLocaleString()} tokens</span>
          </div>
        </div>
      </div>

      {/* Load More */}
      <button className="w-full py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors border-t border-border/50">
        Load more price levels
      </button>
    </div>
  );
};
