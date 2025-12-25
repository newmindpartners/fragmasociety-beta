import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ExternalLink, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TradeDetails } from "@/pages/SecondaryMarket";
import { useEffect, useState } from "react";

interface TradeSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tradeDetails: TradeDetails | null;
  onClose: () => void;
}

// Confetti particle component
const ConfettiParticle = ({ delay, x, color }: { delay: number; x: number; color: string }) => (
  <motion.div
    initial={{ y: -20, x: x, opacity: 1, scale: 1, rotate: 0 }}
    animate={{ 
      y: 400, 
      x: x + (Math.random() - 0.5) * 100,
      opacity: [1, 1, 0],
      scale: [1, 1, 0.5],
      rotate: Math.random() * 720 - 360
    }}
    transition={{ 
      duration: 2.5 + Math.random(), 
      delay: delay,
      ease: "easeOut"
    }}
    className="absolute top-0 pointer-events-none"
    style={{ left: '50%' }}
  >
    <div 
      className="w-2.5 h-2.5 rounded-sm"
      style={{ backgroundColor: color }}
    />
  </motion.div>
);

// Animated checkmark SVG
const AnimatedCheckmark = () => (
  <motion.svg
    viewBox="0 0 100 100"
    className="w-16 h-16"
  >
    {/* Circle */}
    <motion.circle
      cx="50"
      cy="50"
      r="45"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      className="text-emerald-500"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
    {/* Checkmark */}
    <motion.path
      d="M30 50 L45 65 L70 35"
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-emerald-500"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
    />
  </motion.svg>
);

export const TradeSuccessModal = ({ open, onOpenChange, tradeDetails, onClose }: TradeSuccessModalProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Confetti colors
  const confettiColors = [
    '#10B981', // emerald
    '#6366F1', // indigo
    '#F59E0B', // amber
    '#EC4899', // pink
    '#8B5CF6', // violet
    '#06B6D4', // cyan
    '#EF4444', // red
    '#22C55E', // green
  ];

  // Generate confetti particles
  const confettiParticles = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 0.3,
    x: (Math.random() - 0.5) * 300,
    color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
  }));

  useEffect(() => {
    if (open) {
      // Trigger confetti after checkmark animation
      const timer = setTimeout(() => setShowConfetti(true), 600);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [open]);

  if (!tradeDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[440px] p-0 overflow-hidden bg-white border border-slate-200 shadow-2xl rounded-2xl">
        {/* Confetti Container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <AnimatePresence>
            {showConfetti && confettiParticles.map((particle) => (
              <ConfettiParticle
                key={particle.id}
                delay={particle.delay}
                x={particle.x}
                color={particle.color}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 z-10"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        <div className="p-8 pt-10 text-center relative z-10">
          {/* Success Icon with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200,
              damping: 15,
              duration: 0.6 
            }}
            className="flex justify-center mb-6"
          >
            <motion.div 
              className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center shadow-lg shadow-emerald-100"
              animate={{ 
                boxShadow: [
                  "0 10px 15px -3px rgba(16, 185, 129, 0.1)",
                  "0 20px 25px -5px rgba(16, 185, 129, 0.2)",
                  "0 10px 15px -3px rgba(16, 185, 129, 0.1)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AnimatedCheckmark />
            </motion.div>
          </motion.div>

          {/* Ripple Effect */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-1/2 top-[120px] -translate-x-1/2 w-24 h-24 rounded-full border-2 border-emerald-400 pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Transaction Successful!
            </h2>
            <p className="text-sm text-slate-500 mb-2">
              You swapped
            </p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-lg font-semibold text-slate-800">
                {tradeDetails.payAmount.toLocaleString()} {tradeDetails.payCurrency}
              </span>
              <motion.span 
                className="text-slate-400"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                →
              </motion.span>
              <motion.span 
                className="text-lg font-semibold text-emerald-600"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                {tradeDetails.receiveAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {tradeDetails.receiveCurrency}
              </motion.span>
            </div>
            
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Confirmed on blockchain
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="space-y-3"
          >
            <Button 
              onClick={onClose} 
              className="w-full h-12 text-base font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-xl"
            >
              Back to Trading
            </Button>
            <Button
              variant="ghost"
              className="w-full h-10 text-primary hover:text-primary/80 hover:bg-primary/5"
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