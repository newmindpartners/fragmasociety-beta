import { motion } from "framer-motion";
import { Building2, Film, Music, TrendingUp, TrendingDown, ExternalLink, MoreHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const holdings = [
  {
    id: "palisades-rebuild",
    name: "Palisades Rebuild Fund",
    category: "Real Estate",
    icon: Building2,
    invested: 50000,
    currentValue: 57500,
    returns: 7500,
    returnPercent: 15.0,
    status: "Active",
    nextPayout: "Jan 15, 2025",
    payoutAmount: 625,
    tokens: 500,
    image: null,
  },
  {
    id: "film-production-fund",
    name: "Independent Film Fund III",
    category: "Film & Media",
    icon: Film,
    invested: 35000,
    currentValue: 38500,
    returns: 3500,
    returnPercent: 10.0,
    status: "Active",
    nextPayout: "Feb 1, 2025",
    payoutAmount: 350,
    tokens: 350,
    image: null,
  },
  {
    id: "music-rights-portfolio",
    name: "Music Royalty Portfolio",
    category: "Music Rights",
    icon: Music,
    invested: 25000,
    currentValue: 28750,
    returns: 3750,
    returnPercent: 15.0,
    status: "Active",
    nextPayout: "Jan 20, 2025",
    payoutAmount: 312,
    tokens: 250,
    image: null,
  },
  {
    id: "malibu-villa",
    name: "Malibu Sea View Villa",
    category: "Real Estate",
    icon: Building2,
    invested: 15000,
    currentValue: 19000,
    returns: 4000,
    returnPercent: 26.7,
    status: "Active",
    nextPayout: "Jan 25, 2025",
    payoutAmount: 475,
    tokens: 150,
    image: null,
  },
];

export const PortfolioHoldings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-serif font-semibold text-foreground">Your Holdings</h3>
            <p className="text-sm text-muted-foreground">
              {holdings.length} active investments across {new Set(holdings.map(h => h.category)).size} categories
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full h-9 gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="rounded-full h-9">
              View All
            </Button>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Asset</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Invested</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Current Value</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Returns</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Next Payout</th>
              <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding, index) => {
              const Icon = holding.icon;
              const isPositive = holding.returnPercent >= 0;
              
              return (
                <motion.tr
                  key={holding.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors group"
                >
                  {/* Asset */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">{holding.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-muted-foreground">{holding.category}</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">{holding.tokens} tokens</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Invested */}
                  <td className="py-4 px-6 text-right hidden sm:table-cell">
                    <p className="font-medium text-foreground">€{holding.invested.toLocaleString()}</p>
                  </td>

                  {/* Current Value */}
                  <td className="py-4 px-6 text-right">
                    <p className="font-semibold text-foreground">€{holding.currentValue.toLocaleString()}</p>
                  </td>

                  {/* Returns */}
                  <td className="py-4 px-6 text-right hidden md:table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <span className={`font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}€{holding.returns.toLocaleString()}
                      </span>
                      <span className={`flex items-center gap-0.5 text-xs font-medium px-2 py-0.5 rounded-full ${
                        isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? '+' : ''}{holding.returnPercent.toFixed(1)}%
                      </span>
                    </div>
                  </td>

                  {/* Next Payout */}
                  <td className="py-4 px-6 text-right hidden lg:table-cell">
                    <p className="font-medium text-foreground">€{holding.payoutAmount}</p>
                    <p className="text-xs text-muted-foreground">{holding.nextPayout}</p>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/deal/${holding.id}`}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-full h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="p-6 bg-muted/20 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-muted-foreground">Total Invested</p>
              <p className="text-lg font-serif font-bold text-foreground">
                €{holdings.reduce((sum, h) => sum + h.invested, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="text-xs text-muted-foreground">Total Value</p>
              <p className="text-lg font-serif font-bold text-foreground">
                €{holdings.reduce((sum, h) => sum + h.currentValue, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground">Total Returns</p>
              <p className="text-lg font-serif font-bold text-emerald-600">
                +€{holdings.reduce((sum, h) => sum + h.returns, 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Next Total Payout</p>
            <p className="text-lg font-serif font-bold text-primary">
              €{holdings.reduce((sum, h) => sum + h.payoutAmount, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
