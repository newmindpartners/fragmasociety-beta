import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Briefcase, TrendingUp, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DealEarnings } from "@/components/deal-details/DealEarnings";
import { InfoTooltip } from "@/components/ui/info-tooltip";

interface PortfolioDeal {
  id: string;
  name: string;
  symbol: string;
  investedAmount: number;
  currentValue: number;
  totalEarnings: number;
  lastPayout: string;
  status: "Active" | "Pending" | "Completed";
}

const mockPortfolioDeals: PortfolioDeal[] = [
  {
    id: "santexpat-1",
    name: "Santexpat.fr",
    symbol: "SXPT",
    investedAmount: 1500,
    currentValue: 1680,
    totalEarnings: 180,
    lastPayout: "Dec 15, 2024",
    status: "Active"
  },
  {
    id: "naouri-malibu",
    name: "Naouri Malibu Villa",
    symbol: "NMV",
    investedAmount: 2000,
    currentValue: 2150,
    totalEarnings: 150,
    lastPayout: "Nov 30, 2024",
    status: "Active"
  },
  {
    id: "balsiger-horse",
    name: "Balsiger Horse Portfolio",
    symbol: "BHP",
    investedAmount: 750,
    currentValue: 810,
    totalEarnings: 60,
    lastPayout: "Oct 15, 2024",
    status: "Active"
  },
  {
    id: "independent-film",
    name: "Independent Film Fund",
    symbol: "IFF",
    investedAmount: 1200,
    currentValue: 1350,
    totalEarnings: 150,
    lastPayout: "Dec 1, 2024",
    status: "Active"
  },
  {
    id: "palisades-rebuild",
    name: "Palisades Rebuild Project",
    symbol: "PRP",
    investedAmount: 3000,
    currentValue: 3180,
    totalEarnings: 180,
    lastPayout: "Nov 15, 2024",
    status: "Pending"
  },
  {
    id: "music-rights",
    name: "Music Rights Portfolio",
    symbol: "MRP",
    investedAmount: 500,
    currentValue: 540,
    totalEarnings: 40,
    lastPayout: "Sep 30, 2024",
    status: "Completed"
  },
];

export const PortfolioEarningsSelector = () => {
  const [selectedDeal, setSelectedDeal] = useState<PortfolioDeal | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      // Hide hint when scrolled near bottom (within 50px)
      setShowScrollHint(scrollHeight - scrollTop - clientHeight > 50);
    };

    scrollEl.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [selectedDeal]);

  const getStatusBadge = (status: PortfolioDeal["status"]) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </Badge>
        );
      case "Pending":
        return (
          <Badge className="bg-amber-50 text-amber-700 border border-amber-200">
            Pending
          </Badge>
        );
      case "Completed":
        return (
          <Badge className="bg-slate-100 text-slate-600 border border-slate-200">
            Completed
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-serif font-semibold text-slate-900">
              {selectedDeal ? "Deal Earnings" : "My Portfolio"}
            </h2>
            {!selectedDeal && (
              <InfoTooltip 
                content="View all your active investments and click on any deal to see detailed earnings breakdown and payout history."
                side="right"
              />
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {selectedDeal 
              ? `Viewing earnings for ${selectedDeal.name}` 
              : "Select a deal to view detailed earnings"
            }
          </p>
        </div>
        
        {selectedDeal && (
          <button
            onClick={() => setSelectedDeal(null)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-medium transition-colors"
          >
            <X className="w-4 h-4" />
            Back to Portfolio
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!selectedDeal ? (
          /* Deal Selection Grid */
          <div className="relative">
            <motion.div
              ref={scrollRef}
              key="portfolio-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid gap-4 max-h-[400px] overflow-y-auto pr-2 pb-8 scroll-smooth"
            >
            {mockPortfolioDeals.map((deal, index) => (
              <motion.button
                key={deal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedDeal(deal)}
                className="w-full bg-white border border-slate-200 rounded-2xl p-5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100/50 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  {/* Deal Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {deal.symbol.slice(0, 2)}
                  </div>

                  {/* Deal Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900 truncate">{deal.name}</h3>
                      {getStatusBadge(deal.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        €{deal.investedAmount.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <TrendingUp className="w-3.5 h-3.5" />
                        +€{deal.totalEarnings.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Earnings Summary */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold text-slate-900">€{deal.currentValue.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">Current value</p>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </motion.button>
            ))}

            {mockPortfolioDeals.length === 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">No investments yet</h3>
                <p className="text-sm text-slate-500">
                  Start investing in deals to track your earnings here.
                </p>
              </div>
            )}
            </motion.div>
            {/* Gradient fade overlay */}
            <div className="absolute bottom-0 left-0 right-2 h-16 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none" />
            
            {/* Scroll indicator */}
            <AnimatePresence>
              {showScrollHint && mockPortfolioDeals.length > 3 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-xs text-slate-400 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"
                >
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                  <span>Scroll for more</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          /* Deal Earnings Detail */
          <motion.div
            key="deal-earnings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden"
          >
            <DealEarnings dealId={selectedDeal.id} dealTitle={selectedDeal.name} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
