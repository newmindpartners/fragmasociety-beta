import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  Bell, 
  BellOff, 
  Trash2, 
  ExternalLink,
  Search,
  Filter,
  SlidersHorizontal,
  Eye,
  Plus,
  Star,
  Building2,
  Film,
  Music,
  Landmark,
  Home,
  BarChart3,
  Clock,
  ArrowUpRight,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Mock watchlist data
const watchlistDeals = [
  {
    id: "naouri-malibu-villa",
    name: "Malibu Sea View Villa",
    category: "Real Estate",
    subcategory: "Luxury Property",
    image: "/lovable-uploads/malibu-sea-view.jpg",
    targetReturn: "18-22%",
    minTicket: "€25,000",
    term: "24-36 months",
    risk: "Medium",
    status: "Live",
    priceChange: 2.4,
    alerts: true,
    addedDate: "2024-12-20",
    leader: "Philippe Naouri",
    raised: 45,
  },
  {
    id: "palisades-rebuild",
    name: "Palisades Rebuild Fund",
    category: "Real Estate",
    subcategory: "Development",
    image: "/lovable-uploads/palisades-rebuild.jpg",
    targetReturn: "15-18%",
    minTicket: "€50,000",
    term: "36-48 months",
    risk: "Medium-High",
    status: "Coming Soon",
    priceChange: 0,
    alerts: true,
    addedDate: "2024-12-18",
    leader: "Bryan Balsinger",
    raised: 0,
  },
  {
    id: "film-production",
    name: "Film Production Rights",
    category: "Film & Media",
    subcategory: "Entertainment",
    image: "/lovable-uploads/film-production.jpg",
    targetReturn: "20-30%",
    minTicket: "€10,000",
    term: "18-24 months",
    risk: "High",
    status: "Live",
    priceChange: -1.2,
    alerts: false,
    addedDate: "2024-12-15",
    leader: "Tim Levy",
    raised: 72,
  },
  {
    id: "music-royalties",
    name: "Music Royalties Portfolio",
    category: "Music",
    subcategory: "Royalties",
    image: "/lovable-uploads/music-royalties.jpg",
    targetReturn: "12-15%",
    minTicket: "€5,000",
    term: "12-18 months",
    risk: "Low-Medium",
    status: "Live",
    priceChange: 1.8,
    alerts: true,
    addedDate: "2024-12-10",
    leader: "Andre Messika",
    raised: 89,
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Real Estate":
      return Home;
    case "Film & Media":
      return Film;
    case "Music":
      return Music;
    case "Credit":
      return Landmark;
    default:
      return Building2;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Live":
      return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
    case "Coming Soon":
      return "bg-amber-500/10 text-amber-600 border-amber-500/20";
    case "Closed":
      return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    default:
      return "bg-slate-500/10 text-slate-600 border-slate-500/20";
  }
};

export const WatchlistContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [deals, setDeals] = useState(watchlistDeals);
  const [hoveredDeal, setHoveredDeal] = useState<string | null>(null);

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || deal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAlert = (dealId: string) => {
    setDeals(prev => prev.map(deal => 
      deal.id === dealId ? { ...deal, alerts: !deal.alerts } : deal
    ));
  };

  const removeDeal = (dealId: string) => {
    setDeals(prev => prev.filter(deal => deal.id !== dealId));
  };

  const categories = [...new Set(watchlistDeals.map(d => d.category))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-serif text-foreground">Watchlist</h1>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Track your favorite deals and get notified on updates
          </p>
        </div>
        
        <Link to="/live-deals">
          <Button variant="navy" className="gap-2">
            <Plus className="w-4 h-4" />
            Browse Deals
          </Button>
        </Link>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Watching", value: deals.length, icon: Eye, color: "text-slate-700" },
          { label: "Live Deals", value: deals.filter(d => d.status === "Live").length, icon: BarChart3, color: "text-emerald-600" },
          { label: "Alerts Active", value: deals.filter(d => d.alerts).length, icon: Bell, color: "text-amber-600" },
          { label: "Coming Soon", value: deals.filter(d => d.status === "Coming Soon").length, icon: Clock, color: "text-blue-600" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border/60 rounded-xl p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg bg-slate-100", stat.color)}>
                <stat.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search watchlist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card border-border/60"
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="navy-outline" className="gap-2 min-w-[140px]">
              <Filter className="w-4 h-4" />
              {selectedCategory || "All Categories"}
              <ChevronDown className="w-4 h-4 ml-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
              All Categories
            </DropdownMenuItem>
            {categories.map(cat => (
              <DropdownMenuItem key={cat} onClick={() => setSelectedCategory(cat)}>
                {cat}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Watchlist Grid */}
      {filteredDeals.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-card border border-border/60 rounded-2xl p-12 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No deals in your watchlist</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
            Start building your watchlist by browsing our curated selection of investment opportunities.
          </p>
          <Link to="/live-deals">
            <Button variant="navy" className="gap-2">
              <Plus className="w-4 h-4" />
              Explore Deals
            </Button>
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AnimatePresence>
            {filteredDeals.map((deal, index) => {
              const CategoryIcon = getCategoryIcon(deal.category);
              const isHovered = hoveredDeal === deal.id;
              
              return (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  onMouseEnter={() => setHoveredDeal(deal.id)}
                  onMouseLeave={() => setHoveredDeal(null)}
                  className={cn(
                    "group bg-card border border-border/60 rounded-2xl overflow-hidden transition-all duration-300",
                    isHovered && "shadow-xl border-slate-300"
                  )}
                >
                  <div className="flex">
                    {/* Image Section */}
                    <div className="relative w-32 sm:w-40 flex-shrink-0 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CategoryIcon className="w-12 h-12 text-white/20" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className={cn("text-xs font-medium border", getStatusColor(deal.status))}>
                          {deal.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex-1 p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                              {deal.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-foreground group-hover:text-slate-900 transition-colors">
                            {deal.name}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Led by {deal.leader}
                          </p>
                        </div>

                        {/* Price Change */}
                        {deal.priceChange !== 0 && (
                          <div className={cn(
                            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                            deal.priceChange > 0 
                              ? "bg-emerald-500/10 text-emerald-600" 
                              : "bg-red-500/10 text-red-600"
                          )}>
                            {deal.priceChange > 0 ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {Math.abs(deal.priceChange)}%
                          </div>
                        )}
                      </div>

                      {/* Deal Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Target Return</p>
                          <p className="text-sm font-semibold text-emerald-600">{deal.targetReturn}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Min. Ticket</p>
                          <p className="text-sm font-semibold text-foreground">{deal.minTicket}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Term</p>
                          <p className="text-sm font-semibold text-foreground">{deal.term}</p>
                        </div>
                      </div>

                      {/* Progress Bar for Live Deals */}
                      {deal.status === "Live" && deal.raised > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">Funding Progress</span>
                            <span className="font-medium text-foreground">{deal.raised}%</span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${deal.raised}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              className="h-full bg-gradient-to-r from-slate-700 to-slate-900 rounded-full"
                            />
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link to={`/deal/${deal.id}`} className="flex-1">
                          <Button variant="navy" size="sm" className="w-full gap-2">
                            View Deal
                            <ArrowUpRight className="w-3 h-3" />
                          </Button>
                        </Link>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAlert(deal.id)}
                          className={cn(
                            "px-3",
                            deal.alerts ? "text-amber-600 hover:text-amber-700" : "text-muted-foreground"
                          )}
                        >
                          {deal.alerts ? (
                            <Bell className="w-4 h-4" />
                          ) : (
                            <BellOff className="w-4 h-4" />
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDeal(deal.id)}
                          className="px-3 text-muted-foreground hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State Suggestion */}
      {filteredDeals.length > 0 && filteredDeals.length < 4 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200/60 rounded-2xl p-6 text-center"
        >
          <Star className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="font-medium text-foreground mb-1">Discover More Opportunities</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
            Add more deals to your watchlist to compare and track multiple investment opportunities.
          </p>
          <Link to="/live-deals">
            <Button variant="navy-outline" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Browse All Deals
            </Button>
          </Link>
        </motion.div>
      )}
    </div>
  );
};