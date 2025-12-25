import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Share2, 
  ExternalLink, 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  Building2,
  Globe,
  ChevronDown,
  Sparkles,
  Award,
  BadgeCheck
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import { cn } from "@/lib/utils";

interface AssetInfoHeaderProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const tabs = ["Trade", "Investors", "Updates", "Discussion"];

export const AssetInfoHeader = ({ activeTab = "Trade", onTabChange }: AssetInfoHeaderProps) => {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const assetData = {
    name: "Malibu Luxury Villa Fund",
    ticker: "MLV",
    tagline: "Fractional ownership in premium Los Angeles real estate with quarterly distributions",
    category: "Real Estate",
    subcategory: "Luxury Residential",
    availableShares: 32208.46,
    currency: "USDC",
    eligibilityStatus: "Eligible",
    valuation: 6000000,
    valuationChange: 12.4,
    incorporationDate: "Jan 2024",
    location: "Los Angeles, California",
    website: "fragmasociety.com",
    totalInvestors: 419,
    totalRaised: 931328,
    keyFeatures: ["Secondary Market", "Tokenized Shares", "Quarterly Dividends"],
    sectors: ["Real Estate", "Luxury Assets", "Income Generating"],
    companyNumber: "FS-2024-MLV",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-6"
    >
      {/* Main Asset Card */}
      <Card className="relative overflow-hidden border-border/50 bg-gradient-to-br from-card via-card to-card/80">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
        </div>

        <div className="relative p-6 lg:p-8">
          {/* Top Row: Logo, Name, Actions */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Left: Asset Identity */}
            <div className="flex items-start gap-5 flex-1">
              {/* Asset Logo */}
              <motion.div 
                className="relative flex-shrink-0"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg shadow-primary/5">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-inner">
                    <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Verified badge */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-card flex items-center justify-center"
                >
                  <BadgeCheck className="w-3.5 h-3.5 text-white" />
                </motion.div>
              </motion.div>

              {/* Asset Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-xl lg:text-2xl font-bold text-foreground tracking-tight">
                    {assetData.name}
                  </h1>
                  <span className="px-2.5 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-md border border-primary/20">
                    ${assetData.ticker}
                  </span>
                </div>
                <p className="text-sm lg:text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {assetData.tagline}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted/60 text-muted-foreground rounded-full border border-border/50 hover:bg-muted transition-colors cursor-default">
                    <Building2 className="w-3 h-3" />
                    {assetData.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted/60 text-muted-foreground rounded-full border border-border/50 hover:bg-muted transition-colors cursor-default">
                    <Sparkles className="w-3 h-3" />
                    {assetData.subcategory}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted/60 text-muted-foreground rounded-full border border-border/50 hover:bg-muted transition-colors cursor-default">
                    <MapPin className="w-3 h-3" />
                    {assetData.location.split(',')[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 lg:flex-shrink-0">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={isWatchlisted ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsWatchlisted(!isWatchlisted)}
                  className={cn(
                    "gap-2 transition-all duration-300",
                    isWatchlisted && "bg-primary/90 hover:bg-primary"
                  )}
                >
                  <Heart className={cn("w-4 h-4 transition-all", isWatchlisted && "fill-current")} />
                  {isWatchlisted ? "Watching" : "Watch"}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Expandable Details */}
          <AnimatePresence>
            {showMoreInfo && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-border/50">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {/* Column 1 */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</span>
                        <p className="mt-1 text-sm font-medium text-foreground flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          {assetData.location}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Inception Date</span>
                        <p className="mt-1 text-sm font-medium text-foreground flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {assetData.incorporationDate}
                        </p>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Website</span>
                        <a href={`https://${assetData.website}`} target="_blank" rel="noopener noreferrer" className="mt-1 text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-2 transition-colors">
                          <Globe className="w-4 h-4" />
                          {assetData.website}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Asset ID</span>
                        <p className="mt-1 text-sm font-medium text-foreground font-mono">
                          {assetData.companyNumber}
                        </p>
                      </div>
                    </div>

                    {/* Column 3 */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Raised</span>
                        <p className="mt-1 text-sm font-medium text-foreground">
                          ${assetData.totalRaised.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Key Features</span>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {assetData.keyFeatures.map((feature) => (
                            <span key={feature} className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded border border-primary/20">
                              <Award className="w-3 h-3" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show More Button */}
          <motion.button
            onClick={() => setShowMoreInfo(!showMoreInfo)}
            className="mt-6 w-full py-3 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground border-t border-border/50 transition-colors group"
            whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
          >
            <span>{showMoreInfo ? "Show less" : "Show more details"}</span>
            <motion.div
              animate={{ rotate: showMoreInfo ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </Card>

      {/* Navigation Tabs - Now positioned below header */}
      <div className="relative">
        <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-xl border border-border/50">
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => onTabChange?.(tab)}
              className={cn(
                "relative flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                activeTab === tab
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
              whileHover={{ scale: activeTab === tab ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-card rounded-lg shadow-sm border border-border/50"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Grid - Moved below tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {/* Available Shares */}
        <motion.div 
          className="group relative p-4 lg:p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
          whileHover={{ y: -2 }}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Available Shares</span>
              <InfoTooltip content="Total value of shares currently available for trading" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl lg:text-2xl font-bold text-foreground tabular-nums">
                ${assetData.availableShares.toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Valuation */}
        <motion.div 
          className="group relative p-4 lg:p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
          whileHover={{ y: -2 }}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Valuation</span>
              <InfoTooltip content="Current indicative valuation of the asset" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl lg:text-2xl font-bold text-foreground tabular-nums">
                ${(assetData.valuation / 1000000).toFixed(0)}M
              </span>
              <span className="text-sm font-semibold text-green-600 flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +{assetData.valuationChange}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Total Investors */}
        <motion.div 
          className="group relative p-4 lg:p-5 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300"
          whileHover={{ y: -2 }}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Investors</span>
              <InfoTooltip content="Total number of investors in this asset" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl lg:text-2xl font-bold text-foreground tabular-nums">
                {assetData.totalInvestors.toLocaleString()}
              </span>
              <Users className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </motion.div>

        {/* Eligibility Status */}
        <motion.div 
          className="group relative p-4 lg:p-5 rounded-xl bg-gradient-to-br from-green-500/5 to-green-500/0 border border-green-500/20 hover:border-green-500/40 transition-all duration-300"
          whileHover={{ y: -2 }}
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</span>
              <InfoTooltip content="Your eligibility to trade this asset" />
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-lg lg:text-xl font-bold text-green-600">
                {assetData.eligibilityStatus}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
