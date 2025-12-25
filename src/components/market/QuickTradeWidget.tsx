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
    <Card className="p-3 border-border/50 bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground">Quick Trade</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-foreground">${currentPrice}</span>
          <span className={cn(
            "text-[10px] font-semibold",
            priceChange >= 0 ? "text-green-600" : "text-red-500"
          )}>
            {priceChange >= 0 ? "+" : ""}{priceChangePercent.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Buy Row */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1 flex-1">
          {presetUsdAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedBuyAmount(selectedBuyAmount === amount ? null : amount)}
              className={cn(
                "flex-1 py-1.5 rounded-md text-xs font-semibold transition-all border",
                selectedBuyAmount === amount
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-muted/30 text-foreground border-border/50 hover:border-green-600/50"
              )}
            >
              ${amount}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          onClick={handleQuickBuy}
          disabled={!selectedBuyAmount || isProcessing}
          className="h-7 px-3 text-xs font-semibold bg-green-600 hover:bg-green-700 text-white"
        >
          <TrendingUp className="w-3 h-3 mr-1" />
          Buy
        </Button>
      </div>

      {/* Sell Row */}
      <div className="flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          {presetTokenAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => setSelectedSellAmount(selectedSellAmount === amount ? null : amount)}
              className={cn(
                "flex-1 py-1.5 rounded-md text-xs font-semibold transition-all border",
                selectedSellAmount === amount
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-muted/30 text-foreground border-border/50 hover:border-red-500/50"
              )}
            >
              {amount}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          onClick={handleQuickSell}
          disabled={!selectedSellAmount || isProcessing}
          className="h-7 px-3 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white"
        >
          <TrendingDown className="w-3 h-3 mr-1" />
          Sell
        </Button>
      </div>

      {/* Preview */}
      {(selectedBuyAmount || selectedSellAmount) && (
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          {selectedBuyAmount && `Buy ~${(selectedBuyAmount / currentPrice).toFixed(2)} ${tokenSymbol}`}
          {selectedSellAmount && `Sell for ~$${(selectedSellAmount * currentPrice).toFixed(0)}`}
        </p>
      )}
    </Card>
  );
};
