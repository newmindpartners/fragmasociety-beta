import { motion, AnimatePresence } from "framer-motion";
import { X, Target, Clock, Euro, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  deal: {
    leaderName: string;
    title: string;
    description: string;
    videoUrl?: string;
    image: string;
    minTicket: string;
    targetReturn: string;
    term: string;
  } | null;
  onSeeDeal: () => void;
}

export const TrailerModal = ({ isOpen, onClose, deal, onSeeDeal }: TrailerModalProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsPlaying(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!deal) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal content - cinematic layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative z-10 w-full max-w-5xl bg-card/95 backdrop-blur-md rounded-2xl overflow-hidden border border-border/30 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Full-width cinematic video/image - reduced height */}
            <div className="relative w-full aspect-[21/9]">
              {/* Signature Deal badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider bg-white text-background rounded-full">
                  Signature Deal
                </span>
              </div>

              {deal.videoUrl && isPlaying ? (
                <video
                  src={deal.videoUrl}
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${deal.image})` }}
                  />
                  {/* Play button overlay */}
                  <motion.button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <motion.div
                      className="w-24 h-24 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-white/20 group-hover:bg-white transition-colors"
                      animate={{ 
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Play className="w-10 h-10 text-background ml-1" fill="currentColor" />
                    </motion.div>
                  </motion.button>
                </>
              )}
              
              {/* Bottom gradient fade */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card to-transparent pointer-events-none" />
            </div>

            {/* Content below video */}
            <div className="px-6 md:px-8 py-5 -mt-10 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left: Info */}
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-1">
                    {deal.leaderName}
                  </h2>
                  <h3 className="text-base md:text-lg text-white/90 mb-3">{deal.title}</h3>
                  
                  {/* Stats row inline */}
                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-white/70" />
                      <span className="text-xs text-muted-foreground">Target</span>
                      <span className="font-semibold text-foreground text-sm blur-sm select-none">{deal.targetReturn}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/70" />
                      <span className="text-xs text-muted-foreground">Term</span>
                      <span className="font-semibold text-foreground text-sm blur-sm select-none">{deal.term}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Euro className="w-4 h-4 text-white/70" />
                      <span className="text-xs text-muted-foreground">From</span>
                      <span className="font-semibold text-foreground text-sm blur-sm select-none">{deal.minTicket}</span>
                    </div>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="lg:w-auto w-full lg:flex-shrink-0">
                  <Button 
                    size="default" 
                    variant="outline"
                    className="w-full lg:w-auto px-8 py-5 text-sm group border-white text-white hover:bg-white hover:text-background rounded-lg"
                    onClick={() => {
                      onClose();
                      onSeeDeal();
                    }}
                  >
                    Unlock deal
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
