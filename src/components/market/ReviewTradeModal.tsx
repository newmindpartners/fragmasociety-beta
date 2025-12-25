import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Coins } from "lucide-react";
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
      <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
        <span className="text-white font-bold text-sm">$</span>
      </div>
    ),
    ADA: (
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
        <Coins className="w-5 h-5 text-white" />
      </div>
    ),
    EUR: (
      <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
        <span className="text-white font-bold text-sm">€</span>
      </div>
    ),
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-card border-border">
        {/* Header */}
        <div className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
              <Coins className="w-6 h-6 text-primary" />
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <h2 className="text-xl font-semibold text-foreground mt-4">
            Review {tradeDetails.type === "buy" ? "Buy" : "Sell"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Double-check the details before confirming.
          </p>
        </div>

        {/* Trade Details */}
        <div className="p-6 space-y-5">
          {/* You Pay */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">You pay</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-foreground">
                  {tradeDetails.payAmount}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  ${(tradeDetails.payAmount * 0.0224).toFixed(2)}
                </p>
              </div>
              {currencyIcons[tradeDetails.payCurrency]}
            </div>
          </div>

          {/* You Receive */}
          <div>
            <p className="text-sm text-muted-foreground mb-2">You receive</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-foreground">
                  {tradeDetails.receiveAmount.toFixed(2)}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  ${(tradeDetails.receiveAmount * 0.0136).toFixed(2)}
                </p>
              </div>
              {currencyIcons[tradeDetails.receiveCurrency]}
            </div>
          </div>

          {/* Transaction Summary */}
          <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span className="text-foreground">
                {tradeDetails.rate}
                <span className="text-muted-foreground ml-1">($1.59)</span>
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fee (2%)</span>
              <span className="text-foreground">
                ≈{tradeDetails.fee.toFixed(2)} {tradeDetails.receiveCurrency}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Network cost</span>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                  <Coins className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="text-foreground">{tradeDetails.networkCost}</span>
              </div>
            </div>
            <div className="border-t border-border/50 pt-3">
              <div className="flex justify-between">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-semibold text-primary">
                  ≈ {tradeDetails.total.toFixed(2)} {tradeDetails.receiveCurrency}
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-center text-muted-foreground">
            Once confirmed, this swap is final and cannot be reversed.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 py-5"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 py-5"
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
