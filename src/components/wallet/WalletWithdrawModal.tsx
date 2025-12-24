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
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-transparent shadow-none">
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background with soft gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/95 to-slate-100/90" />
          
          {/* Ambient light spots */}
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-200/30 rounded-full blur-[80px] -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-200/25 rounded-full blur-[70px] translate-y-1/2 translate-x-1/4" />
          <div className="absolute top-1/2 left-0 w-48 h-48 bg-indigo-200/20 rounded-full blur-[50px] -translate-x-1/2" />
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
          
          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-slate-200/80" />
          <div className="absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)]" />

          {/* Content */}
          <div className="relative z-10 p-8">
            {/* Header with icon and close button */}
            <div className="flex items-start justify-between mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-300/40 to-purple-300/40 rounded-full blur-md scale-150" />
                <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-violet-50 to-purple-50 flex items-center justify-center ring-1 ring-violet-200/60 shadow-sm">
                  <div className="w-10 h-10 rounded-full border-2 border-violet-500 flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-violet-600" />
                  </div>
                </div>
              </div>
              <button 
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-200/80 flex items-center justify-center transition-all duration-300 ring-1 ring-slate-200/60 hover:ring-slate-300/80 shadow-sm"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-slate-800 mb-2 tracking-tight">Withdraw</h2>
            <p className="text-slate-500 mb-8">
              You'll receive USD to your card
            </p>

            {/* Amount Input */}
            <div className="space-y-4">
              {/* You Withdraw */}
              <div className="relative group">
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/70 shadow-sm group-hover:shadow-md group-hover:border-slate-300/80 transition-all duration-300" />
                <div className="relative p-5">
                  <label className="text-sm text-slate-500 mb-3 block font-medium">You withdraw</label>
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-0 bg-transparent text-4xl font-bold text-slate-800 p-0 h-auto focus-visible:ring-0 w-40 placeholder:text-slate-300"
                      placeholder="0"
                    />
                    <div className="w-12 h-12 rounded-full border-2 border-violet-500 flex items-center justify-center bg-white shadow-sm">
                      <DollarSign className="w-5 h-5 text-violet-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Swap Icon */}
              <div className="flex justify-center -my-1 relative z-10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center shadow-sm ring-1 ring-violet-200/50">
                  <ArrowDownUp className="w-5 h-5 text-violet-600" />
                </div>
              </div>

              {/* You Receive */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50/80 to-purple-50/60 rounded-2xl border border-violet-200/70 shadow-sm" />
                <div className="relative p-5">
                  <label className="text-sm text-violet-600 mb-3 block font-medium">You receive</label>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-bold text-slate-800">${amount || "0"}</span>
                    <div className="px-4 py-2 rounded-full bg-white border border-violet-200 shadow-sm">
                      <span className="text-sm font-bold text-violet-700">USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <button className="w-full mt-5 relative group">
              <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200/70 shadow-sm group-hover:shadow-md group-hover:border-slate-300/80 transition-all duration-300" />
              <div className="relative p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 text-left font-medium">Select a payment method</p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex -space-x-1.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-600 ring-2 ring-white shadow-sm"></div>
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 ring-2 ring-white shadow-sm"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Mastercard</p>
                      <p className="text-xs text-slate-400">**** 1244</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
            </button>

            {/* Fee Notice */}
            <p className="text-xs text-slate-400 text-center mt-6 font-medium">
              Withdrawal fees may apply based on your payment method
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 h-14 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 text-slate-700 font-semibold hover:bg-slate-50 hover:border-slate-300/80 transition-all duration-300 shadow-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="flex-1 h-14 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-400 hover:to-purple-400 text-white font-semibold transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
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
