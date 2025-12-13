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
      setIsPlaying(false); // Reset playing state when modal opens
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative z-10 w-full max-w-5xl bg-card rounded-3xl overflow-hidden border border-foreground/10 shadow-2xl"
          >
            {/* Signature Deal badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-white/90 text-background rounded-full">
                Signature Deal
              </span>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-md flex items-center justify-center hover:bg-foreground/20 transition-colors"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Video/Image side */}
              <div className="relative aspect-video md:aspect-auto md:h-full min-h-[300px]">
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-white/30 group-hover:bg-white transition-colors"
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
                      </motion.div>
                    </motion.button>
                  </>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-card/50 via-transparent to-transparent md:bg-gradient-to-t md:from-card/30 md:via-transparent md:to-transparent pointer-events-none" />
              </div>

              {/* Content side */}
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {deal.leaderName}
                </h2>
                <h3 className="text-lg text-white mb-4">{deal.title}</h3>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {deal.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-xs text-muted-foreground">Target</p>
                      <p className="font-semibold text-foreground blur-sm select-none">{deal.targetReturn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-xs text-muted-foreground">Term</p>
                      <p className="font-semibold text-foreground blur-sm select-none">{deal.term}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Euro className="w-5 h-5 text-white" />
                    <div>
                      <p className="text-xs text-muted-foreground">From</p>
                      <p className="font-semibold text-foreground blur-sm select-none">{deal.minTicket}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="flex-1 group border-white text-white hover:bg-white hover:text-background"
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
