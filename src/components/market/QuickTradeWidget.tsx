import { useState } from "react";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";
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
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background - matching earnings card dark theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23]" />
      
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-violet-500/15 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-[40px] translate-y-1/2 -translate-x-1/4" />
      
      {/* Inner glow border */}
      <div className="absolute inset-0 rounded-2xl border border-white/[0.08]" />

      {/* Content */}
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600/80 to-purple-600/80 flex items-center justify-center ring-1 ring-white/10">
              <Zap className="w-3.5 h-3.5 text-white/90" />
            </div>
            <span className="text-sm font-semibold text-white">Quick Trade</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-bold text-white">${currentPrice}</span>
            <span className={cn(
              "text-[10px] font-semibold px-1.5 py-0.5 rounded-full",
              priceChange >= 0 ? "text-emerald-400 bg-emerald-500/20" : "text-red-400 bg-red-500/20"
            )}>
              {priceChange >= 0 ? "+" : ""}{priceChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Buy Row */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5 flex-1">
            {presetUsdAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedBuyAmount(selectedBuyAmount === amount ? null : amount)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-semibold transition-all border",
                  selectedBuyAmount === amount
                    ? "bg-emerald-500/30 text-emerald-300 border-emerald-500/50"
                    : "bg-white/[0.04] text-white/70 border-white/[0.08] hover:bg-white/[0.08] hover:border-emerald-500/30"
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
            className="h-8 px-4 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white border-0"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Buy
          </Button>
        </div>

        {/* Sell Row */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 flex-1">
            {presetTokenAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => setSelectedSellAmount(selectedSellAmount === amount ? null : amount)}
                className={cn(
                  "flex-1 py-2 rounded-lg text-xs font-semibold transition-all border",
                  selectedSellAmount === amount
                    ? "bg-red-500/30 text-red-300 border-red-500/50"
                    : "bg-white/[0.04] text-white/70 border-white/[0.08] hover:bg-white/[0.08] hover:border-red-500/30"
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
            className="h-8 px-4 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white border-0"
          >
            <TrendingDown className="w-3 h-3 mr-1" />
            Sell
          </Button>
        </div>

        {/* Preview */}
        {(selectedBuyAmount || selectedSellAmount) && (
          <p className="text-[10px] text-white/40 text-center mt-3">
            {selectedBuyAmount && `Buy ~${(selectedBuyAmount / currentPrice).toFixed(2)} ${tokenSymbol}`}
            {selectedSellAmount && `Sell for ~$${(selectedSellAmount * currentPrice).toFixed(0)}`}
          </p>
        )}
      </div>
    </div>
  );
};
