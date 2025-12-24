import { useState } from "react";
import { motion } from "framer-motion";
import { X, ArrowDownUp, ChevronRight, DollarSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface WalletCreditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ADA_RATE = 1.6439; // Example conversion rate

export const WalletCreditModal = ({ open, onOpenChange }: WalletCreditModalProps) => {
  const [amount, setAmount] = useState("100");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const adaAmount = (parseFloat(amount || "0") * ADA_RATE).toFixed(2);

  const handleConfirm = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success(`Successfully credited $${amount}`);
    onOpenChange(false);
    setAmount("100");
  };

  const handleClose = () => {
    onOpenChange(false);
    setAmount("100");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-card border-border p-0 overflow-hidden">
        <div className="p-6">
          {/* Header Icon */}
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-foreground mb-2">Credit</h2>
          <p className="text-muted-foreground mb-8">
            You'll receive ADA to your linked wallet
          </p>

          {/* Amount Inputs */}
          <div className="space-y-4">
            {/* You Pay */}
            <div className="border border-border rounded-2xl p-4">
              <label className="text-sm text-muted-foreground mb-2 block">You pay</label>
              <div className="flex items-center justify-between">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border-0 bg-transparent text-4xl font-bold text-foreground p-0 h-auto focus-visible:ring-0 w-40"
                  placeholder="0"
                />
                <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>

            {/* Swap Icon */}
            <div className="flex justify-center -my-2 relative z-10">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <ArrowDownUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            {/* You Receive */}
            <div className="border border-border rounded-2xl p-4">
              <label className="text-sm text-muted-foreground mb-2 block">You receive</label>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-muted-foreground">{adaAmount}</span>
                <div className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center">
                  <span className="text-background text-xs font-bold">ADA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <button className="w-full border border-border rounded-2xl p-4 mt-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
            <div>
              <p className="text-sm text-muted-foreground text-left">Select a payment method</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-red-500"></div>
                  <div className="w-6 h-6 rounded-full bg-orange-400"></div>
                </div>
                <div>
                  <p className="font-medium text-foreground">Mastercard</p>
                  <p className="text-xs text-muted-foreground">**** 1244</p>
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Fee Notice */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            1,80% and 18 cents fees are applied to credit card transactions
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 rounded-full h-12 border-border"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 rounded-full h-12 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Credit"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
