import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface TradeErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry: () => void;
}

export const TradeErrorModal = ({ open, onOpenChange, onRetry }: TradeErrorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className="sm:max-w-[420px] p-0 overflow-hidden bg-white border border-slate-200 shadow-2xl rounded-2xl">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 z-10"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>

        <div className="p-8 pt-10 text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <motion.div 
              className="w-20 h-20 rounded-full bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center shadow-lg shadow-red-100"
              animate={{ 
                boxShadow: [
                  "0 10px 15px -3px rgba(239, 68, 68, 0.1)",
                  "0 15px 20px -5px rgba(239, 68, 68, 0.15)",
                  "0 10px 15px -3px rgba(239, 68, 68, 0.1)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-slate-900 mb-3">
              Transaction Failed
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Something went wrong with your transaction.
              <br />
              Please check your balance and try again.
            </p>
          </motion.div>

          {/* Error Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100"
          >
            <p className="text-xs text-red-600 font-medium">
              Error: Insufficient liquidity or network timeout
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Button 
              onClick={onRetry} 
              className="w-full h-12 text-base font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
            >
              Try Again
            </Button>
            
            <p className="text-sm text-slate-500 pt-2">
              Need help?{" "}
              <a href="/faq" className="text-primary font-medium hover:underline">
                Contact Support
              </a>
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
