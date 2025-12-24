import { useState } from "react";
import { X, ArrowDownUp, ChevronRight, DollarSign, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface WalletWithdrawModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WalletWithdrawModal = ({ open, onOpenChange }: WalletWithdrawModalProps) => {
  const [amount, setAmount] = useState("100");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success(`Withdrawal of $${amount} initiated`);
    onOpenChange(false);
    setAmount("100");
  };

  const handleClose = () => {
    onOpenChange(false);
    setAmount("100");
  };

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
                <div className="w-8 h-8 rounded-full border-2 border-violet-500 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-violet-600" />
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors ring-1 ring-slate-200/60"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-slate-800 mb-1">Withdraw</h2>
            <p className="text-sm text-slate-500 mb-6">You'll receive USD to your card</p>

            {/* Amount Inputs */}
            <div className="space-y-3">
              {/* You Withdraw */}
              <div className="bg-white/80 rounded-xl border border-slate-200/70 p-4">
                <label className="text-xs text-slate-500 mb-2 block font-medium">You withdraw</label>
                <div className="flex items-center justify-between">
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border-0 bg-transparent text-3xl font-bold text-slate-800 p-0 h-auto focus-visible:ring-0 w-32"
                    placeholder="0"
                  />
                  <div className="w-10 h-10 rounded-full border-2 border-violet-500 flex items-center justify-center bg-white">
                    <DollarSign className="w-4 h-4 text-violet-600" />
                  </div>
                </div>
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center -my-1 relative z-10">
                <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center ring-1 ring-violet-200/50">
                  <ArrowDownUp className="w-4 h-4 text-violet-600" />
                </div>
              </div>

              {/* You Receive */}
              <div className="bg-violet-50/80 rounded-xl border border-violet-200/60 p-4">
                <label className="text-xs text-violet-600 mb-2 block font-medium">You receive</label>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-slate-800">${amount || "0"}</span>
                  <div className="px-3 py-1.5 rounded-full bg-white border border-violet-200">
                    <span className="text-xs font-bold text-violet-700">USD</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <button className="w-full mt-4 bg-white/80 rounded-xl border border-slate-200/70 p-4 flex items-center justify-between hover:bg-white transition-colors group">
              <div>
                <p className="text-xs text-slate-500 text-left font-medium">Select a payment method</p>
                <div className="flex items-center gap-2.5 mt-2">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-600 ring-1 ring-white"></div>
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 ring-1 ring-white"></div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Mastercard</p>
                    <p className="text-[10px] text-slate-400">**** 1244</p>
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </button>

            {/* Fee Notice */}
            <p className="text-[11px] text-slate-400 text-center mt-4">
              Withdrawal fees may apply based on your payment method
            </p>

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
                    Processing...
                  </>
                ) : (
                  "Confirm Withdraw"
                )}
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
