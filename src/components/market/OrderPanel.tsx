import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight, Clock, Zap, AlertCircle, TrendingUp, TrendingDown, Building2, Settings2 } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import type { TradeDetails, TradeType } from "@/pages/SecondaryMarket";

interface OrderPanelProps {
  onSubmitTrade: (details: TradeDetails) => void;
}

type OrderMode = "market" | "limit";
type PaymentCurrency = "USDC" | "USD";

const paymentCurrencies: PaymentCurrency[] = ["USDC", "USD"];

const currencyConfig: Record<PaymentCurrency, { icon: React.ReactNode; color: string }> = {
  USDC: { 
    icon: <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">$</div>,
    color: "bg-blue-600"
  },
  USD: { 
    icon: <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">$</div>,
    color: "bg-green-600"
  },
};

// MLV token price in USD
const MLV_MARKET_PRICE = 75.05;

// Expiration options for limit orders
const expirationOptions = [
  { label: "1 Hour", value: "1h" },
  { label: "24 Hours", value: "24h" },
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "Good Till Cancelled", value: "gtc" },
];

export const OrderPanel = ({ onSubmitTrade }: OrderPanelProps) => {
  const [tradeType, setTradeType] = useState<TradeType>("buy");
  const [orderMode, setOrderMode] = useState<OrderMode>("market");
  const [payAmount, setPayAmount] = useState<string>("100");
  const [limitPrice, setLimitPrice] = useState<string>("");
  const [expiration, setExpiration] = useState("24h");
  const [showExpirationDropdown, setShowExpirationDropdown] = useState(false);
  const [payCurrency, setPayCurrency] = useState<PaymentCurrency>("USDC");
  const [showPayDropdown, setShowPayDropdown] = useState(false);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

  // Below market price percentage options
  const belowMarketOptions = [5, 10, 25];

  const handleBelowMarketClick = (percent: number) => {
    const belowPrice = MLV_MARKET_PRICE * (1 - percent / 100);
    setLimitPrice(belowPrice.toFixed(2));
  };

  const availableBalance = 3000.00;
  const availableMLV = 12.5; // Mock MLV holdings
  const feePercent = orderMode === "market" ? 2 : 1.5;
  const networkCost = 2.50;

  // Use custom limit price or market rate
  const effectivePrice = orderMode === "limit" && limitPrice 
    ? parseFloat(limitPrice) || MLV_MARKET_PRICE 
    : MLV_MARKET_PRICE;
  
  const payValue = parseFloat(payAmount) || 0;
  
  // For buy: pay USD/USDC, receive MLV tokens
  // For sell: pay MLV tokens, receive USD/USDC
  const tokensAmount = tradeType === "buy" 
    ? payValue / effectivePrice 
    : payValue;
  const cashAmount = tradeType === "buy"
    ? payValue
    : payValue * effectivePrice;
  
  const feeAmount = cashAmount * (feePercent / 100);
  const total = tradeType === "buy"
    ? tokensAmount - (feeAmount / effectivePrice)
    : cashAmount - feeAmount - networkCost;

  // Calculate price difference from market
  const priceDiffPercent = orderMode === "limit" && limitPrice 
    ? ((effectivePrice - MLV_MARKET_PRICE) / MLV_MARKET_PRICE) * 100 
    : 0;

  const handleMaxClick = () => {
    if (tradeType === "buy") {
      setPayAmount(availableBalance.toString());
    } else {
      setPayAmount(availableMLV.toString());
    }
  };

  const handleHalfClick = () => {
    if (tradeType === "buy") {
      setPayAmount((availableBalance / 2).toString());
    } else {
      setPayAmount((availableMLV / 2).toString());
    }
  };

  const handleSetMarketPrice = () => {
    setLimitPrice(MLV_MARKET_PRICE.toFixed(2));
  };

  const handleSubmit = () => {
    const details: TradeDetails = {
      type: tradeType,
      payAmount: payValue,
      payCurrency: tradeType === "buy" ? payCurrency : "USDC",
      receiveAmount: tradeType === "buy" ? total : total,
      receiveCurrency: tradeType === "buy" ? "USDC" : payCurrency,
      rate: `$${effectivePrice.toFixed(2)} per MLV`,
      fee: feeAmount,
      networkCost,
      total,
    };
    onSubmitTrade(details);
  };

  const PaymentCurrencyDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setShowPayDropdown(!showPayDropdown)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
      >
        {currencyConfig[payCurrency].icon}
        <span className="font-medium text-foreground">{payCurrency}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showPayDropdown ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {showPayDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden min-w-[120px]"
          >
            {paymentCurrencies.map((currency) => (
              <button
                key={currency}
                onClick={() => {
                  setPayCurrency(currency);
                  setShowPayDropdown(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 hover:bg-muted/50 transition-colors ${
                  payCurrency === currency ? 'bg-primary/10' : ''
                }`}
              >
                {currencyConfig[currency].icon}
                <span className="font-medium text-foreground">{currency}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const MLVBadge = () => (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
        <Building2 className="w-3.5 h-3.5 text-primary-foreground" />
      </div>
      <span className="font-semibold text-primary">MLV</span>
    </div>
  );

  return (
    <Card className="overflow-hidden bg-gradient-to-b from-card to-muted/20 border-border/50 sticky top-24">
      {/* Buy/Sell Toggle */}
      <div className="flex p-1.5 bg-muted/30">
        <button
          onClick={() => setTradeType("buy")}
          className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
            tradeType === "buy"
              ? "bg-green-600 text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Buy MLV
        </button>
        <button
          onClick={() => setTradeType("sell")}
          className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
            tradeType === "sell"
              ? "bg-red-500 text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sell MLV
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Order Type Toggle */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-muted/30">
          <button
            onClick={() => setOrderMode("market")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
              orderMode === "market"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Market
          </button>
          <button
            onClick={() => setOrderMode("limit")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
              orderMode === "limit"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Limit
          </button>
        </div>

        {/* Order Type Info */}
        <div className="text-center">
          <p className="font-semibold text-foreground">
            {orderMode === "market" ? "Best market order" : "Limit order"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {orderMode === "market" ? (
              <>
                Execute at best available price.
                <br />
                ({feePercent}% fee included)
              </>
            ) : (
              <>
                Set your price and wait for execution.
                <br />
                (Lower {feePercent}% fee for limit orders)
              </>
            )}
          </p>
        </div>

        {/* Limit Price Input (only for limit orders) */}
        <AnimatePresence>
          {orderMode === "limit" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Limit price per MLV</span>
                <InfoTooltip content="Set your desired price per MLV token" />
              </div>
              <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl text-muted-foreground">$</span>
                    <input
                      type="text"
                      value={limitPrice}
                      onChange={(e) => setLimitPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                      className="text-2xl font-bold text-foreground bg-transparent outline-none w-full"
                      placeholder={MLV_MARKET_PRICE.toFixed(2)}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">per MLV</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Market: ${MLV_MARKET_PRICE.toFixed(2)}
                    </span>
                    {priceDiffPercent !== 0 && (
                      <span className={`text-xs font-medium flex items-center gap-0.5 ${
                        priceDiffPercent > 0 ? 'text-green-600' : 'text-red-500'
                      }`}>
                        {priceDiffPercent > 0 ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {priceDiffPercent > 0 ? '+' : ''}{priceDiffPercent.toFixed(2)}%
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleSetMarketPrice}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    Use Market
                  </button>
                </div>
              </div>

              {/* Below Market Price Quick Buttons */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">Below market price:</span>
                <div className="flex items-center gap-2">
                  {belowMarketOptions.map((percent) => (
                    <button
                      key={percent}
                      onClick={() => handleBelowMarketClick(percent)}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all"
                    >
                      {percent}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Advanced Settings Toggle */}
              <button
                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                className="flex items-center gap-1.5 mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                <span>Advanced settings</span>
                <ChevronRight 
                  className={`w-4 h-4 transition-transform duration-200 ${showAdvancedSettings ? 'rotate-90' : ''}`} 
                />
              </button>

              {/* Advanced Settings Panel */}
              <AnimatePresence>
                {showAdvancedSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-4 rounded-xl bg-muted/30 border border-border/50 space-y-4">
                      {/* Expiration Selector */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Order expires</span>
                        <DropdownMenu open={showExpirationDropdown} onOpenChange={setShowExpirationDropdown}>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-colors text-sm"
                            >
                              <Clock className="w-3.5 h-3.5 text-slate-500" />
                              <span className="font-medium">
                                {expirationOptions.find((o) => o.value === expiration)?.label}
                              </span>
                              <ChevronDown
                                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${showExpirationDropdown ? "rotate-180" : ""}`}
                              />
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent 
                            align="end" 
                            className="min-w-[180px] z-[1000] bg-white border border-slate-200 shadow-xl"
                          >
                            {expirationOptions.map((option) => (
                              <DropdownMenuItem
                                key={option.value}
                                onSelect={() => {
                                  setExpiration(option.value);
                                  setShowExpirationDropdown(false);
                                }}
                                className={`cursor-pointer hover:!bg-slate-100 focus:!bg-slate-100 ${
                                  expiration === option.value
                                    ? "!bg-violet-100 !text-violet-700 font-medium"
                                    : "!text-slate-900"
                                }`}
                              >
                                {option.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Additional settings can go here */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Post-only order</span>
                        <button className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white text-slate-500">
                          Off
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Price Alert */}
              {limitPrice && priceDiffPercent < -5 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-3"
                >
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-600">
                    Your limit price is {Math.abs(priceDiffPercent).toFixed(1)}% below market. This order may not fill quickly.
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* You Pay Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {tradeType === "buy" ? "You pay" : "You sell"}
            </span>
            <InfoTooltip content={tradeType === "buy" ? "Enter amount to spend" : "Enter MLV tokens to sell"} />
          </div>
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <input
                type="text"
                value={payAmount}
                onChange={(e) => setPayAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                className="text-3xl font-bold text-foreground bg-transparent outline-none w-full"
                placeholder="0"
              />
              {tradeType === "buy" ? (
                <PaymentCurrencyDropdown />
              ) : (
                <MLVBadge />
              )}
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">
                Available: {tradeType === "buy" 
                  ? `$${availableBalance.toLocaleString()} ${payCurrency}` 
                  : `${availableMLV} MLV`
                }
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleMaxClick}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  MAX
                </button>
                <button
                  onClick={handleHalfClick}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  50%
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* You Receive Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {tradeType === "buy" ? "You receive" : "You get"}
            </span>
            <InfoTooltip content="Estimated amount after fees" />
          </div>
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-foreground">
                {tradeType === "buy" 
                  ? total.toFixed(4)
                  : `$${total.toFixed(2)}`
                }
              </span>
              {tradeType === "buy" ? (
                <MLVBadge />
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
                  {currencyConfig[payCurrency].icon}
                  <span className="font-medium text-foreground">{payCurrency}</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              @ ${effectivePrice.toFixed(2)} per MLV
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border/30">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {orderMode === "limit" ? "Limit price" : "Market price"}
            </span>
            <span className="text-foreground font-medium">
              ${effectivePrice.toFixed(2)} / MLV
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee ({feePercent}%)</span>
            <span className="text-foreground">${feeAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Network cost</span>
            <span className="text-foreground">${networkCost.toFixed(2)}</span>
          </div>
          {orderMode === "limit" && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Expires</span>
              <span className="text-foreground">
                {expirationOptions.find(o => o.value === expiration)?.label}
              </span>
            </div>
          )}
          <div className="border-t border-border/50 pt-3">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-semibold text-primary">
                {tradeType === "buy" 
                  ? `${total.toFixed(4)} MLV`
                  : `$${total.toFixed(2)} ${payCurrency}`
                }
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground">
          {orderMode === "market" 
            ? "Once confirmed, this trade is final and cannot be reversed."
            : "Limit orders can be cancelled before they are filled."
          }
        </p>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className={`w-full py-6 text-base font-semibold ${
            tradeType === "buy" 
              ? "bg-green-600 hover:bg-green-700" 
              : "bg-red-500 hover:bg-red-600"
          }`}
          disabled={!payValue || payValue <= 0 || (orderMode === "limit" && !limitPrice)}
        >
          {orderMode === "market" 
            ? (tradeType === "buy" ? "Buy MLV Now" : "Sell MLV Now")
            : (tradeType === "buy" ? "Place Buy Order" : "Place Sell Order")
          }
        </Button>
      </div>
    </Card>
  );
};
