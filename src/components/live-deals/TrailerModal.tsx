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
            className="relative z-10 w-full max-w-6xl bg-card/95 backdrop-blur-md rounded-2xl overflow-hidden border border-border/30 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Full-width cinematic video/image */}
            <div className="relative w-full aspect-video">
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
            <div className="px-6 md:px-10 py-8 -mt-16 relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                {/* Left: Info */}
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-2">
                    {deal.leaderName}
                  </h2>
                  <h3 className="text-lg md:text-xl text-white/90 mb-4">{deal.title}</h3>
                  
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                    {deal.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Target</p>
                        <p className="font-semibold text-foreground blur-sm select-none">{deal.targetReturn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Term</p>
                        <p className="font-semibold text-foreground blur-sm select-none">{deal.term}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center">
                        <Euro className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">From</p>
                        <p className="font-semibold text-foreground blur-sm select-none">{deal.minTicket}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: CTA */}
                <div className="lg:w-auto w-full">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full lg:w-auto px-10 py-6 text-base group border-white text-white hover:bg-white hover:text-background rounded-xl"
                    onClick={() => {
                      onClose();
                      onSeeDeal();
                    }}
                  >
                    Unlock deal
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
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
