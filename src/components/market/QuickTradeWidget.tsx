import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TradeDetails } from "@/pages/SecondaryMarket";

interface QuickTradeWidgetProps {
  onSubmitTrade: (details: TradeDetails) => void;
}

const presetUsdAmounts = [100, 250, 500, 1000];
const presetTokenAmounts = [1, 2, 5, 10];

export const QuickTradeWidget = ({ onSubmitTrade }: QuickTradeWidgetProps) => {
  const [selectedBuyAmount, setSelectedBuyAmount] = useState<number | null>(null);
  const [selectedSellAmount, setSelectedSellAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock market data
  const currentPrice = 75.05;
  const priceChange = 2.34;
  const priceChangePercent = 3.21;
  const tokenSymbol = "MLV";

  const handleQuickBuy = () => {
    if (!selectedBuyAmount) return;
    
    setIsProcessing(true);
    
    const tokensReceived = selectedBuyAmount / currentPrice;
    
    const details: TradeDetails = {
      type: "buy",
      payAmount: selectedBuyAmount,
      payCurrency: "USDC",
      receiveAmount: tokensReceived,
      receiveCurrency: "USDC",
      rate: `$${currentPrice.toFixed(2)} per ${tokenSymbol}`,
      fee: selectedBuyAmount * 0.02,
      networkCost: 2.50,
      total: tokensReceived,
    };
    
    setTimeout(() => {
      setIsProcessing(false);
      onSubmitTrade(details);
    }, 300);
  };

  const handleQuickSell = () => {
    if (!selectedSellAmount) return;
    
    setIsProcessing(true);
    
    const usdReceived = selectedSellAmount * currentPrice;
    
    const details: TradeDetails = {
      type: "sell",
      payAmount: selectedSellAmount,
      payCurrency: "USDC",
      receiveAmount: usdReceived,
      receiveCurrency: "USDC",
      rate: `$${currentPrice.toFixed(2)} per ${tokenSymbol}`,
      fee: usdReceived * 0.02,
      networkCost: 2.50,
      total: usdReceived,
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

        {/* Buy Section */}
        <div className="space-y-3 pb-4 border-b border-border/30">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-foreground">Buy with USD</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {presetUsdAmounts.map((amount, index) => (
              <motion.button
                key={amount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedBuyAmount(selectedBuyAmount === amount ? null : amount)}
                className={cn(
                  "relative py-2.5 px-2 rounded-xl text-center font-semibold text-sm transition-all duration-200 border",
                  selectedBuyAmount === amount
                    ? "bg-green-600 text-white border-green-600 shadow-lg shadow-green-600/20"
                    : "bg-muted/30 text-foreground border-border/50 hover:bg-muted/50 hover:border-green-600/30"
                )}
              >
                ${amount}
              </motion.button>
            ))}
          </div>
          {selectedBuyAmount && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>You'll receive ~{(selectedBuyAmount / currentPrice).toFixed(4)} {tokenSymbol}</span>
            </div>
          )}
          <Button
            onClick={handleQuickBuy}
            disabled={!selectedBuyAmount || isProcessing}
            className="w-full py-4 font-semibold text-sm bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : `Market Buy${selectedBuyAmount ? ` $${selectedBuyAmount}` : ''}`}
          </Button>
        </div>

        {/* Sell Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-foreground">Sell {tokenSymbol} Tokens</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {presetTokenAmounts.map((amount, index) => (
              <motion.button
                key={amount}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedSellAmount(selectedSellAmount === amount ? null : amount)}
                className={cn(
                  "relative py-2.5 px-2 rounded-xl text-center font-semibold text-sm transition-all duration-200 border",
                  selectedSellAmount === amount
                    ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-500/20"
                    : "bg-muted/30 text-foreground border-border/50 hover:bg-muted/50 hover:border-red-500/30"
                )}
              >
                {amount} {tokenSymbol}
              </motion.button>
            ))}
          </div>
          {selectedSellAmount && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>You'll receive ~${(selectedSellAmount * currentPrice).toFixed(2)} USDC</span>
            </div>
          )}
          <Button
            onClick={handleQuickSell}
            disabled={!selectedSellAmount || isProcessing}
            className="w-full py-4 font-semibold text-sm bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            {isProcessing ? "Processing..." : `Market Sell${selectedSellAmount ? ` ${selectedSellAmount} ${tokenSymbol}` : ''}`}
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
