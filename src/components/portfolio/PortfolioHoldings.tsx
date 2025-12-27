import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Film, Music, Landmark, TrendingUp, TrendingDown, ExternalLink, MoreHorizontal, Filter, Search, ChevronDown, Eye, Repeat, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    color: "hsl(280, 88%, 37%)",
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
    color: "hsl(222, 90%, 56%)",
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
    color: "hsl(222, 47%, 31%)",
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
    color: "hsl(280, 88%, 37%)",
  },
  {
    id: "private-credit-fund",
    name: "Private Credit Fund II",
    category: "Private Credit",
    icon: Landmark,
    invested: 18750,
    currentValue: 20000,
    returns: 1250,
    returnPercent: 6.7,
    status: "Active",
    nextPayout: "Feb 10, 2025",
    payoutAmount: 200,
    tokens: 188,
    color: "hsl(215, 16%, 57%)",
  },
];

const categories = ["All", "Real Estate", "Film & Media", "Music Rights", "Private Credit"];
const sortOptions = ["Newest", "Highest Value", "Best Returns", "Name A-Z"];

export const PortfolioHoldings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Highest Value");
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort holdings
  const filteredHoldings = holdings
    .filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || h.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "Highest Value":
          return b.currentValue - a.currentValue;
        case "Best Returns":
          return b.returnPercent - a.returnPercent;
        case "Name A-Z":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("Highest Value");
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "All" || sortBy !== "Highest Value";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-serif font-semibold text-foreground">Your Holdings</h3>
              <p className="text-xs text-muted-foreground">
                {filteredHoldings.length} of {holdings.length} investments
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className={`h-8 gap-1.5 text-xs rounded-full ${
                  showFilters 
                    ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800" 
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                }`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-3.5 h-3.5" />
                Filter
                {hasActiveFilters && (
                  <span className={`w-1.5 h-1.5 rounded-full ml-1 ${showFilters ? "bg-white" : "bg-slate-900"}`} />
                )}
              </Button>
              <Link to="/dashboard/deals">
                <Button variant="outline" size="sm" className="h-8 text-xs rounded-full bg-white text-slate-700 border-slate-300 hover:bg-slate-100">
                  View All Deals
                </Button>
              </Link>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pt-3 border-t border-border space-y-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search holdings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 text-sm rounded-lg"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* Category Filter */}
                    <div className="flex items-center gap-1 flex-wrap">
                      {categories.map((cat) => (
                        <Button
                          key={cat}
                          variant="outline"
                          size="sm"
                          className={`h-7 text-xs rounded-full px-3 ${
                            selectedCategory === cat 
                              ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800" 
                              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                          }`}
                          onClick={() => setSelectedCategory(cat)}
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>

                    <div className="w-px h-6 bg-border mx-1" />

                    {/* Sort Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-7 text-xs rounded-full gap-1 border-slate-300 text-slate-700 hover:bg-slate-100 bg-white">
                          Sort: {sortBy}
                          <ChevronDown className="w-3 h-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="bg-white border-slate-200 shadow-lg rounded-xl p-1">
                        {sortOptions.map((option) => (
                          <DropdownMenuItem 
                            key={option} 
                            onClick={() => setSortBy(option)}
                            className={sortBy === option 
                              ? "bg-slate-900 text-white rounded-lg focus:bg-slate-900 focus:text-white" 
                              : "text-slate-700 hover:bg-slate-100 rounded-lg focus:bg-slate-100"
                            }
                          >
                            {option}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {hasActiveFilters && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs rounded-full text-muted-foreground gap-1"
                        onClick={clearFilters}
                      >
                        <X className="w-3 h-3" />
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="text-left py-3 px-5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Asset</th>
              <th className="text-right py-3 px-5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">Invested</th>
              <th className="text-right py-3 px-5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Value</th>
              <th className="text-right py-3 px-5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Returns</th>
              <th className="text-right py-3 px-5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Next Payout</th>
              <th className="text-right py-3 px-5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHoldings.map((holding, index) => {
              const Icon = holding.icon;
              const isPositive = holding.returnPercent >= 0;
              
              return (
                <motion.tr
                  key={holding.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.03 }}
                  className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors group"
                >
                  {/* Asset */}
                  <td className="py-3 px-5">
                    <Link to={`/deal/${holding.id}`} className="flex items-center gap-3 group/link">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover/link:scale-105"
                        style={{ backgroundColor: `${holding.color}15` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: holding.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover/link:text-primary transition-colors">{holding.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span 
                            className="w-1.5 h-1.5 rounded-full" 
                            style={{ backgroundColor: holding.color }}
                          />
                          <span className="text-[10px] text-muted-foreground">{holding.category}</span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="text-[10px] text-muted-foreground">{holding.tokens} tokens</span>
                        </div>
                      </div>
                    </Link>
                  </td>

                  {/* Invested */}
                  <td className="py-3 px-5 text-right hidden sm:table-cell">
                    <p className="text-sm text-foreground">€{holding.invested.toLocaleString()}</p>
                  </td>

                  {/* Current Value */}
                  <td className="py-3 px-5 text-right">
                    <p className="text-sm font-semibold text-foreground">€{holding.currentValue.toLocaleString()}</p>
                  </td>

                  {/* Returns */}
                  <td className="py-3 px-5 text-right hidden md:table-cell">
                    <div className="flex items-center justify-end gap-2">
                      <span className={`text-sm font-medium ${isPositive ? 'text-primary' : 'text-destructive'}`}>
                        {isPositive ? '+' : ''}€{holding.returns.toLocaleString()}
                      </span>
                      <span className={`flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        isPositive ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                      }`}>
                        {isPositive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                        {holding.returnPercent.toFixed(1)}%
                      </span>
                    </div>
                  </td>

                  {/* Next Payout */}
                  <td className="py-3 px-5 text-right hidden lg:table-cell">
                    <p className="text-sm font-medium text-foreground">€{holding.payoutAmount}</p>
                    <p className="text-[10px] text-muted-foreground">{holding.nextPayout}</p>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link to={`/deal/${holding.id}`}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="rounded-full h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="rounded-full h-7 w-7 p-0"
                          >
                            <MoreHorizontal className="w-3.5 h-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem asChild>
                            <Link to={`/deal/${holding.id}`} className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/dashboard/market/${holding.id}`} className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Trade on Market
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Repeat className="w-4 h-4" />
                            Reinvest Dividends
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Statement
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>

        {filteredHoldings.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-sm text-muted-foreground">No holdings match your filters</p>
            <Button variant="ghost" size="sm" className="mt-2" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Summary Footer */}
      <div className="p-5 bg-muted/20 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-5">
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Invested</p>
              <p className="text-base font-serif font-bold text-foreground">
                €{filteredHoldings.reduce((sum, h) => sum + h.invested, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Current Value</p>
              <p className="text-base font-serif font-bold text-foreground">
                €{filteredHoldings.reduce((sum, h) => sum + h.currentValue, 0).toLocaleString()}
              </p>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div className="hidden sm:block">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Returns</p>
              <p className="text-base font-serif font-bold text-primary">
                +€{filteredHoldings.reduce((sum, h) => sum + h.returns, 0).toLocaleString()}
              </p>
            </div>
          </div>
          <Link to="/dashboard/earnings">
            <Button size="sm" className="h-8 text-xs rounded-full gap-1.5 bg-slate-900 text-white hover:bg-slate-800">
              View Earnings
              <ExternalLink className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
