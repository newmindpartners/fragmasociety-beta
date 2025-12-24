import { useState } from "react";
import { X, ArrowDownUp, Loader2, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface WalletSwapModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Currency = "USD" | "USDC" | "ADA";

const RATES = {
  "USDC-USD": 1.0,
  "USD-USDC": 1.0,
  "ADA-USD": 0.35,
  "USD-ADA": 2.857,
  "USDC-ADA": 2.857,
  "ADA-USDC": 0.35,
};

const currencyIcons: Record<Currency, { bg: string; text: string; label: string }> = {
  USD: { bg: "bg-emerald-500", text: "text-white", label: "$" },
  USDC: { bg: "bg-blue-500", text: "text-white", label: "USDC" },
  ADA: { bg: "bg-slate-800", text: "text-white", label: "ADA" },
};

export const WalletSwapModal = ({ open, onOpenChange }: WalletSwapModalProps) => {
  const [fromCurrency, setFromCurrency] = useState<Currency>("USDC");
  const [toCurrency, setToCurrency] = useState<Currency>("USD");
  const [amount, setAmount] = useState("100");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  const rateKey = `${fromCurrency}-${toCurrency}` as keyof typeof RATES;
  const rate = RATES[rateKey] || 1;
  const convertedAmount = (parseFloat(amount || "0") * rate).toFixed(2);

  const handleSwapDirection = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleConfirm = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success(`Swapped ${amount} ${fromCurrency} to ${convertedAmount} ${toCurrency}`);
    onOpenChange(false);
    setAmount("100");
  };

  const handleClose = () => {
    onOpenChange(false);
    setAmount("100");
  };

  const currencies: Currency[] = ["USD", "USDC", "ADA"];

  const CurrencyButton = ({ 
    currency, 
    showDropdown, 
    setShowDropdown, 
    onSelect,
    excludeCurrency 
  }: { 
    currency: Currency; 
    showDropdown: boolean; 
    setShowDropdown: (show: boolean) => void;
    onSelect: (c: Currency) => void;
    excludeCurrency: Currency;
  }) => (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white border border-slate-200 hover:border-slate-300 transition-colors"
      >
        <div className={`w-6 h-6 rounded-full ${currencyIcons[currency].bg} flex items-center justify-center`}>
          <span className={`text-[10px] font-bold ${currencyIcons[currency].text}`}>
            {currencyIcons[currency].label.charAt(0)}
          </span>
        </div>
        <span className="text-sm font-semibold text-slate-800">{currency}</span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>
      
      {showDropdown && (
        <div className="absolute top-full mt-1 right-0 bg-white rounded-xl border border-slate-200 shadow-lg py-1 z-20 min-w-[100px]">
          {currencies.filter(c => c !== excludeCurrency).map((c) => (
            <button
              key={c}
              onClick={() => {
                onSelect(c);
                setShowDropdown(false);
              }}
              className="w-full px-3 py-2 flex items-center gap-2 hover:bg-slate-50 transition-colors"
            >
              <div className={`w-5 h-5 rounded-full ${currencyIcons[c].bg} flex items-center justify-center`}>
                <span className={`text-[8px] font-bold ${currencyIcons[c].text}`}>
                  {currencyIcons[c].label.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-700">{c}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent hideClose className="sm:max-w-[420px] p-0 overflow-hidden border-0 bg-transparent shadow-2xl">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/98 to-slate-100/95" />
          
          {/* Ambient light spots */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-violet-200/25 rounded-full blur-[60px]" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-200/20 rounded-full blur-[60px]" />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-slate-200/80" />

          {/* Content */}
          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="w-12 h-12 rounded-full bg-violet-50 flex items-center justify-center ring-1 ring-violet-200/60">
                <ArrowDownUp className="w-5 h-5 text-violet-600" />
              </div>
              <button 
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors ring-1 ring-slate-200/60"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-slate-800 mb-1">Swap Currency</h2>
            <p className="text-sm text-slate-500 mb-6">Convert between USD, USDC and ADA</p>

            {/* Amount Inputs */}
            <div className="space-y-3">
              {/* From */}
              <div className="bg-white/80 rounded-xl border border-slate-200/70 p-4">
                <label className="text-xs text-slate-500 mb-2 block font-medium">From</label>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-0 bg-transparent text-3xl font-bold text-slate-800 p-0 h-auto focus:outline-none w-32"
                    placeholder="0"
                  />
                  <CurrencyButton
                    currency={fromCurrency}
                    showDropdown={showFromDropdown}
                    setShowDropdown={setShowFromDropdown}
                    onSelect={setFromCurrency}
                    excludeCurrency={toCurrency}
                  />
                </div>
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center -my-1 relative z-10">
                <button 
                  onClick={handleSwapDirection}
                  className="w-9 h-9 rounded-full bg-violet-100 hover:bg-violet-200 flex items-center justify-center ring-1 ring-violet-200/50 transition-colors"
                >
                  <ArrowDownUp className="w-4 h-4 text-violet-600" />
                </button>
              </div>

              {/* To */}
              <div className="bg-violet-50/80 rounded-xl border border-violet-200/60 p-4">
                <label className="text-xs text-violet-600 mb-2 block font-medium">To</label>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-slate-800">{convertedAmount}</span>
                  <CurrencyButton
                    currency={toCurrency}
                    showDropdown={showToDropdown}
                    setShowDropdown={setShowToDropdown}
                    onSelect={setToCurrency}
                    excludeCurrency={fromCurrency}
                  />
                </div>
              </div>
            </div>

            {/* Rate Info */}
            <div className="mt-4 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Exchange Rate</span>
                <span className="font-medium text-slate-700">1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 h-12 rounded-full bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-1 h-12 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-medium transition-all shadow-lg shadow-violet-500/20 hover:shadow-violet-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Swapping...
                  </>
                ) : (
                  "Confirm Swap"
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
