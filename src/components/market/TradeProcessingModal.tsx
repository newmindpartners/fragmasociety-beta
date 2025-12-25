import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface TradeProcessingModalProps {
  open: boolean;
}

export const TradeProcessingModal = ({ open }: TradeProcessingModalProps) => {
  return (
    <Dialog open={open}>
      <DialogContent 
        className="sm:max-w-[400px] p-8 text-center bg-card border-border"
        hideClose
      >
        {/* Animated Loader */}
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          </motion.div>
        </div>

        <h2 className="text-xl font-semibold text-foreground mb-2">
          Transaction in progress...
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Your transaction is being processed.
          <br />
          This may take a few moments.
        </p>
        <p className="text-xs text-muted-foreground/80">
          Don't close the window
        </p>
      </DialogContent>
    </Dialog>
  );
};
