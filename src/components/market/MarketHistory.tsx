import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface Trade {
  date: string;
  price: number;
  volume: number;
  amount: number;
}

const mockTrades: Trade[] = [
  { date: "Feb 5, 2025 2:11 PM", price: 9.99, volume: 0.44, amount: 4.39 },
  { date: "Feb 5, 2025 2:11 PM", price: 9.99, volume: 0.44, amount: 4.39 },
  { date: "Feb 5, 2025 2:11 PM", price: 9.99, volume: 0.44, amount: 4.39 },
  { date: "Feb 5, 2025 2:11 PM", price: 9.99, volume: 0.44, amount: 4.39 },
  { date: "Feb 4, 2025 11:32 AM", price: 10.05, volume: 0.52, amount: 5.23 },
  { date: "Feb 4, 2025 9:15 AM", price: 9.87, volume: 0.38, amount: 3.75 },
];

export const MarketHistory = () => {
  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="grid grid-cols-4 gap-4 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <div>Date</div>
        <div className="flex items-center gap-1">
          Cours (€)
          <ChevronDown className="w-3 h-3" />
        </div>
        <div className="text-right">Valeur</div>
        <div className="flex items-center justify-end gap-1">
          Montant (€)
          <ChevronDown className="w-3 h-3" />
        </div>
      </div>

      {/* Trades List */}
      <div className="space-y-2">
        {mockTrades.map((trade, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-4 gap-4 px-4 py-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors items-center"
          >
            <div className="text-sm text-muted-foreground">{trade.date}</div>
            <div>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/30">
                {trade.price.toFixed(2)}
              </span>
            </div>
            <div className="text-right text-foreground">{trade.volume}</div>
            <div className="flex justify-end">
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-green-500/10 text-green-600 border border-green-500/30">
                {trade.amount.toFixed(2)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        Load more trades
      </button>
    </div>
  );
};
