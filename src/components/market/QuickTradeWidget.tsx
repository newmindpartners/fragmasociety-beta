import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TradeDetails } from "@/pages/SecondaryMarket";

interface QuickTradeWidgetProps {
  onSubmitTrade: (details: TradeDetails) => void;
}

const presetAmounts = [100, 250, 500, 1000];

export const QuickTradeWidget = ({ onSubmitTrade }: QuickTradeWidgetProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock market data
  const currentPrice = 75.05;
  const priceChange = 2.34;
  const priceChangePercent = 3.21;
  const tokenSymbol = "MLV";

  const handleQuickTrade = (type: "buy" | "sell") => {
    if (!selectedAmount) return;
    
    setIsProcessing(true);
    
    const tokensReceived = selectedAmount / currentPrice;
    
    const details: TradeDetails = {
      type,
      payAmount: selectedAmount,
      payCurrency: "USDC",
      receiveAmount: tokensReceived,
      receiveCurrency: "USDC",
      rate: `$${currentPrice.toFixed(2)} per ${tokenSymbol}`,
      fee: selectedAmount * 0.02,
      networkCost: 2.50,
      total: tokensReceived,
    };
    
    setTimeout(() => {
      setIsProcessing(false);
      onSubmitTrade(details);
    }, 300);
  };

  return (
    <Card className="p-5 border-border/50 bg-gradient-to-br from-card via-card to-primary/5 overflow-hidden relative">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground">Quick Trade</h3>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase bg-primary/10 text-primary rounded-full">
              Instant
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-foreground">${currentPrice}</span>
            <div className={cn(
              "flex items-center gap-0.5 text-xs font-semibold",
              priceChange >= 0 ? "text-green-600" : "text-red-500"
            )}>
              {priceChange >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {priceChange >= 0 ? "+" : ""}{priceChangePercent.toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Preset Amount Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {presetAmounts.map((amount, index) => (
            <motion.button
              key={amount}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedAmount(selectedAmount === amount ? null : amount)}
              className={cn(
                "relative py-3 px-2 rounded-xl text-center font-semibold transition-all duration-200 border",
                selectedAmount === amount
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-muted/30 text-foreground border-border/50 hover:bg-muted/50 hover:border-primary/30"
              )}
            >
              {selectedAmount === amount && (
                <motion.div
                  layoutId="selectedAmount"
                  className="absolute inset-0 bg-primary rounded-xl"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">${amount}</span>
            </motion.button>
          ))}
        </div>

        {/* Token Preview */}
        {selectedAmount && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 p-3 rounded-lg bg-muted/30 border border-border/50"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">You'll receive approximately</span>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-foreground">
                  {(selectedAmount / currentPrice).toFixed(4)} {tokenSymbol}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleQuickTrade("buy")}
            disabled={!selectedAmount || isProcessing}
            className={cn(
              "py-5 font-semibold text-sm transition-all",
              "bg-green-600 hover:bg-green-700 text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : "Market Buy"}
          </Button>
          <Button
            onClick={() => handleQuickTrade("sell")}
            disabled={!selectedAmount || isProcessing}
            className={cn(
              "py-5 font-semibold text-sm transition-all",
              "bg-red-500 hover:bg-red-600 text-white",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : "Market Sell"}
          </Button>
        </div>

        {/* Fee Notice */}
        <p className="text-[11px] text-muted-foreground text-center mt-3">
          Market orders execute instantly at best available price • 2% fee included
        </p>
      </div>
    </Card>
  );
};
