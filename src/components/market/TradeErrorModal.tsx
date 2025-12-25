import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, X, MailQuestion } from "lucide-react";
import { motion } from "framer-motion";

interface TradeErrorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRetry: () => void;
}

export const TradeErrorModal = ({ open, onOpenChange, onRetry }: TradeErrorModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden bg-card border-border">
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-muted/50 transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="p-8 text-center">
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Verification Failed
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Something didn't match or the image was unclear.
              <br />
              Please double-check your documents and try again.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4"
          >
            <Button onClick={onRetry} className="w-full py-5">
              Try Again
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Need help? Our Support Team is here
              <br />
              to assist you —{" "}
              <a href="/faq" className="text-foreground underline underline-offset-2 hover:text-primary transition-colors">
                Contact us
              </a>
            </p>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
