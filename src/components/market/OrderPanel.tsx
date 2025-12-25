import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ArrowUpDown, Coins } from "lucide-react";
import { InfoTooltip } from "@/components/ui/info-tooltip";
import type { TradeDetails, TradeType, Currency } from "@/pages/SecondaryMarket";

interface OrderPanelProps {
  onSubmitTrade: (details: TradeDetails) => void;
}

const currencies: Currency[] = ["USDC", "ADA", "EUR"];

const currencyConfig: Record<Currency, { icon: React.ReactNode; color: string }> = {
  USDC: { 
    icon: <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">$</div>,
    color: "bg-blue-600"
  },
  ADA: { 
    icon: <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
      <Coins className="w-3.5 h-3.5 text-white" />
    </div>,
    color: "bg-blue-500"
  },
  EUR: { 
    icon: <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center text-white text-[10px] font-bold">€</div>,
    color: "bg-blue-700"
  },
};

// Mock exchange rates
const rates: Record<string, number> = {
  "USDC-ADA": 1.6439,
  "USDC-EUR": 0.92,
  "ADA-USDC": 0.6084,
  "ADA-EUR": 0.56,
  "EUR-USDC": 1.09,
  "EUR-ADA": 1.79,
};

export const OrderPanel = ({ onSubmitTrade }: OrderPanelProps) => {
  const [tradeType, setTradeType] = useState<TradeType>("buy");
  const [payAmount, setPayAmount] = useState<string>("100");
  const [payCurrency, setPayCurrency] = useState<Currency>("USDC");
  const [receiveCurrency, setReceiveCurrency] = useState<Currency>("ADA");
  const [showPayDropdown, setShowPayDropdown] = useState(false);
  const [showReceiveDropdown, setShowReceiveDropdown] = useState(false);

  const availableBalance = 3000.00;
  const feePercent = 2;
  const networkCost = 5.67;

  const rateKey = `${payCurrency}-${receiveCurrency}`;
  const rate = rates[rateKey] || 1;
  const payValue = parseFloat(payAmount) || 0;
  const receiveAmount = payValue * rate;
  const feeAmount = receiveAmount * (feePercent / 100);
  const total = receiveAmount - feeAmount - networkCost;

  const handleSwapCurrencies = () => {
    const tempCurrency = payCurrency;
    setPayCurrency(receiveCurrency);
    setReceiveCurrency(tempCurrency);
  };

  const handleMaxClick = () => {
    setPayAmount(availableBalance.toString());
  };

  const handleHalfClick = () => {
    setPayAmount((availableBalance / 2).toString());
  };

  const handleSubmit = () => {
    const details: TradeDetails = {
      type: tradeType,
      payAmount: payValue,
      payCurrency,
      receiveAmount,
      receiveCurrency,
      rate: `1 ${payCurrency} ≈ ${rate.toFixed(2)} ${receiveCurrency}`,
      fee: feeAmount,
      networkCost,
      total,
    };
    onSubmitTrade(details);
  };

  const CurrencyDropdown = ({
    selected,
    onSelect,
    isOpen,
    setIsOpen,
    exclude,
  }: {
    selected: Currency;
    onSelect: (currency: Currency) => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    exclude: Currency;
  }) => (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
      >
        {currencyConfig[selected].icon}
        <span className="font-medium text-foreground">{selected}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden min-w-[120px]"
          >
            {currencies.filter(c => c !== exclude).map((currency) => (
              <button
                key={currency}
                onClick={() => {
                  onSelect(currency);
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-muted/50 transition-colors"
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

  return (
    <Card className="overflow-hidden bg-gradient-to-b from-card to-muted/20 border-border/50 sticky top-24">
      {/* Buy/Sell Toggle */}
      <div className="flex p-1.5 bg-muted/30">
        <button
          onClick={() => setTradeType("buy")}
          className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
            tradeType === "buy"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => setTradeType("sell")}
          className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all ${
            tradeType === "sell"
              ? "bg-primary text-primary-foreground shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Sell
        </button>
      </div>

      <div className="p-5 space-y-5">
        {/* Best Market Order Info */}
        <div className="text-center">
          <p className="font-semibold text-foreground">Best market order</p>
          <p className="text-xs text-muted-foreground mt-1">
            The market will place the order at the best available rate.
            <br />
            (This price includes a {feePercent}% fee applied to the transaction)
          </p>
        </div>

        {/* You Pay Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">You pay</span>
            <InfoTooltip content="Enter the amount you want to spend" />
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
              <CurrencyDropdown
                selected={payCurrency}
                onSelect={setPayCurrency}
                isOpen={showPayDropdown}
                setIsOpen={setShowPayDropdown}
                exclude={receiveCurrency}
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-muted-foreground">
                Available: ${availableBalance.toLocaleString()}
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

        {/* Swap Button */}
        <div className="flex justify-center -my-2">
          <button
            onClick={handleSwapCurrencies}
            className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center hover:bg-primary/20 transition-all hover:scale-105"
          >
            <ArrowUpDown className="w-4 h-4 text-primary" />
          </button>
        </div>

        {/* You Receive Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">You receive</span>
            <InfoTooltip content="Estimated amount you will receive after fees" />
          </div>
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-foreground">
                {receiveAmount.toFixed(2)}
              </span>
              <CurrencyDropdown
                selected={receiveCurrency}
                onSelect={setReceiveCurrency}
                isOpen={showReceiveDropdown}
                setIsOpen={setShowReceiveDropdown}
                exclude={payCurrency}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Min. received: {(total * 0.99).toLocaleString(undefined, { minimumFractionDigits: 5 })}
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="space-y-3 p-4 rounded-xl bg-muted/20 border border-border/30">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Rate</span>
            <span className="text-foreground">
              1 {payCurrency} ≈ {rate.toFixed(2)} {receiveCurrency}
              <span className="text-muted-foreground ml-1">(${(payValue * 0.0224).toFixed(2)})</span>
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Fee ({feePercent}%)</span>
            <span className="text-foreground">≈{feeAmount.toFixed(2)} {receiveCurrency}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Network cost</span>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                <Coins className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-foreground">{networkCost}</span>
            </div>
          </div>
          <div className="border-t border-border/50 pt-3">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Total</span>
              <span className="font-semibold text-primary">
                ≈ {total.toFixed(2)} {receiveCurrency}
              </span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground">
          Once confirmed, this swap is final and cannot be reversed.
        </p>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full py-6 text-base font-semibold"
          disabled={!payValue || payValue <= 0}
        >
          {tradeType === "buy" ? "Buy Now" : "Sell Now"}
        </Button>
      </div>
    </Card>
  );
};
