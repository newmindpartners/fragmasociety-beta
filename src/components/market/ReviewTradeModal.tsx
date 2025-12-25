import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Coins, DollarSign, CircleDollarSign } from "lucide-react";
import type { TradeDetails } from "@/pages/SecondaryMarket";

interface ReviewTradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tradeDetails: TradeDetails | null;
  onConfirm: () => void;
}

export const ReviewTradeModal = ({ open, onOpenChange, tradeDetails, onConfirm }: ReviewTradeModalProps) => {
  if (!tradeDetails) return null;

  const currencyIcons: Record<string, React.ReactNode> = {
    USDC: (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
        <DollarSign className="w-6 h-6 text-white" />
      </div>
    ),
    ADA: (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
        <CircleDollarSign className="w-6 h-6 text-white" />
      </div>
    ),
    EUR: (
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
        <span className="text-white font-bold text-lg">€</span>
      </div>
    ),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="sm:max-w-[460px] p-0 overflow-hidden bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 rounded-2xl">
        {/* Header */}
        <div className="p-6 pb-2">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mt-4">
            Review {tradeDetails.type === "buy" ? "Buy" : "Sell"}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Double-check the details before confirming.
          </p>
        </div>

        {/* Trade Details */}
        <div className="px-6 pb-6 space-y-4">
          {/* You Pay */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <p className="text-sm font-medium text-slate-500 mb-2">You pay</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                  {tradeDetails.payAmount.toLocaleString()}
                </span>
                <p className="text-sm text-slate-400 mt-0.5">
                  ≈ ${(tradeDetails.payAmount * 0.0224).toFixed(2)} USD
                </p>
              </div>
              {currencyIcons[tradeDetails.payCurrency]}
            </div>
          </div>

          {/* You Receive */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <p className="text-sm font-medium text-slate-500 mb-2">You receive</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">
                  {tradeDetails.receiveAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <p className="text-sm text-slate-400 mt-0.5">
                  ≈ ${(tradeDetails.receiveAmount * 0.0136).toFixed(2)} USD
                </p>
              </div>
              {currencyIcons[tradeDetails.receiveCurrency]}
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="p-4 rounded-xl bg-slate-800 text-white space-y-2.5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Rate</span>
              <span className="text-white font-medium">
                {tradeDetails.rate}
                <span className="text-slate-400 ml-1">($1.59)</span>
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Fee (2%)</span>
              <span className="text-white font-medium">
                ≈ {tradeDetails.fee.toFixed(2)} {tradeDetails.receiveCurrency}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Network cost</span>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-primary/80 flex items-center justify-center">
                  <Coins className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-white font-medium">{tradeDetails.networkCost}</span>
              </div>
            </div>
            <div className="border-t border-slate-600 pt-2.5 mt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-white">Total</span>
                <span className="text-base font-bold text-primary">
                  ≈ {tradeDetails.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tradeDetails.receiveCurrency}
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-center text-slate-400 pt-1">
            Once confirmed, this swap is final and cannot be reversed.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            <Button
              variant="outline"
              className="flex-1 h-11 text-sm font-medium border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-xl"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 h-11 text-sm font-medium bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md shadow-primary/20"
              onClick={onConfirm}
            >
              Confirm swap
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
