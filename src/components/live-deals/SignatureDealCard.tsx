import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, Clock, Target, Euro, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

interface SignatureDealCardProps {
  id: string;
  category: string;
  subcategory: string;
  leaderName: string;
  leaderRole: string;
  title: string;
  description: string;
  image: string;
  videoUrl?: string;
  minTicket: string;
  targetReturn: string;
  term: string;
  risk: "Low" | "Medium" | "High";
  onWatchTrailer: () => void;
  onSeeDeal: () => void;
}

export const SignatureDealCard = ({
  category,
  subcategory,
  leaderName,
  leaderRole,
  title,
  description,
  image,
  videoUrl,
  minTicket,
  targetReturn,
  term,
  risk,
  onWatchTrailer,
  onSeeDeal,
}: SignatureDealCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const riskColor = {
    Low: "text-green-400",
    Medium: "text-yellow-400",
    High: "text-red-400",
  };

  // Handle video play/pause on hover
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && videoUrl) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, videoUrl]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-card rounded-2xl overflow-hidden border border-foreground/5 hover:border-primary/30 transition-all duration-500"
      style={{
        boxShadow: isHovered ? "0 0 40px -10px hsl(var(--primary) / 0.3)" : "none",
      }}
    >
      {/* Video overlay on hover - covers entire card */}
      <AnimatePresence>
        {isHovered && videoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 bg-black"
          >
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Subtle gradient at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            {/* Playing indicator */}
            <motion.div 
              className="absolute bottom-4 left-4 flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-white rounded-full"
                    animate={{ height: [8, 16, 8] }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
              <span className="text-xs text-white/80">Preview</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image/Video Thumbnail - 1:1 aspect ratio */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={onWatchTrailer}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        
        {/* Category chips */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/90 text-primary-foreground rounded-full">
            Signature Deal
          </span>
          <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-foreground/10 backdrop-blur-md text-foreground rounded-full border border-foreground/10">
            {category} • {subcategory}
          </span>
        </div>

        {/* Play button overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm"
          >
            <Play className="w-6 h-6 text-primary-foreground ml-1" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Leader info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-foreground mb-1">{leaderName}</h3>
          <p className="text-sm text-foreground/70">{leaderRole}</p>
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <h4 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{title}</h4>
        <p className="text-sm text-muted-foreground mb-6 line-clamp-2">{description}</p>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-4 mb-6 py-4 border-y border-foreground/5">
          <div className="text-center">
            <Euro className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">From</p>
            <p className="text-sm font-semibold text-foreground">{minTicket}</p>
          </div>
          <div className="text-center">
            <Target className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Target</p>
            <p className="text-sm font-semibold text-foreground">{targetReturn}</p>
          </div>
          <div className="text-center">
            <Clock className="w-4 h-4 text-primary mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">Term</p>
            <p className="text-sm font-semibold text-foreground">{term}</p>
          </div>
          <div className="text-center">
            <AlertTriangle className={`w-4 h-4 mx-auto mb-1 ${riskColor[risk]}`} />
            <p className="text-xs text-muted-foreground">Risk</p>
            <p className={`text-sm font-semibold ${riskColor[risk]}`}>{risk}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 group/btn"
            onClick={onWatchTrailer}
          >
            <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            Watch trailer
          </Button>
          <Button 
            className="flex-1 group/btn"
            onClick={onSeeDeal}
          >
            See deal
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
