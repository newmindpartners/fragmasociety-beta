import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, X, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import type { TradeDetails } from "@/pages/SecondaryMarket";

interface TradeSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tradeDetails: TradeDetails | null;
  onClose: () => void;
}

export const TradeSuccessModal = ({ open, onOpenChange, tradeDetails, onClose }: TradeSuccessModalProps) => {
  if (!tradeDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-card border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-muted/50 transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-8 text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Transaction Successful!
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your transaction {tradeDetails.payAmount} {tradeDetails.payCurrency} → {tradeDetails.receiveAmount.toFixed(2)} {tradeDetails.receiveCurrency}.
              <br />
              The transaction has been confirmed on the blockchain.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Button onClick={onClose} className="w-full py-5">
              Back to Home
            </Button>
            <Button
              variant="ghost"
              className="w-full text-primary hover:text-primary/80"
              asChild
            >
              <a href="#" className="flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                View in Explorer
              </a>
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
