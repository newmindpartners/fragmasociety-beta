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
  comingSoon?: boolean;
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
  comingSoon = false,
  onWatchTrailer,
  onSeeDeal,
}: SignatureDealCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const riskColor = {
    Low: "text-emerald-400",
    Medium: "text-amber-400",
    High: "text-rose-400",
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
      className="group relative overflow-hidden rounded-sm"
      style={{
        background: isHovered 
          ? 'linear-gradient(165deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.98) 40%, rgba(51,65,85,0.96) 100%)'
          : 'rgba(15, 23, 42, 0.6)',
        border: isHovered 
          ? '1px solid rgba(139, 92, 246, 0.25)' 
          : '1px solid rgba(71, 85, 105, 0.3)',
        boxShadow: isHovered 
          ? '0 30px 60px -15px rgba(15, 23, 42, 0.6), 0 0 50px -10px rgba(139, 92, 246, 0.15)'
          : '0 4px 30px -10px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
      animate={{ 
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.015 : 1
      }}
      transition={{ 
        duration: 0.7, 
        ease: [0.32, 0.72, 0, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle violet glow on hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-slate-800/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Image/Video Thumbnail - 1:1 aspect ratio */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={onWatchTrailer}
      >
        {/* Static image background */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
        
        {/* Video overlay on hover - only covers image area */}
        <AnimatePresence>
          {isHovered && videoUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-20 bg-slate-900"
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
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-900/80 to-transparent pointer-events-none" />
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
        
        {/* Category chips */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {comingSoon && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-violet-500/90 backdrop-blur-md text-white rounded-sm">
              Coming Soon
            </span>
          )}
          <span className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-slate-800/80 backdrop-blur-md text-slate-300 rounded-sm border border-slate-700/50">
            {category} • {subcategory}
          </span>
        </div>

        {/* Play button overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0 : 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-12 h-12 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-600/30 flex items-center justify-center"
          >
            <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
          </motion.div>
        </motion.div>

        {/* Leader info */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <h3 className="text-base font-bold text-white mb-0.5">{leaderName}</h3>
          <p className="text-xs text-slate-400">{leaderRole}</p>
        </div>
      </div>

      {/* Card content */}
      <div className="p-5 relative z-10">
        <h4 className="text-sm font-semibold text-white mb-1.5 line-clamp-2">{title}</h4>
        <p className="text-xs text-slate-400 mb-4 line-clamp-2">{description}</p>

        {/* Stats row */}
        <div className="grid grid-cols-4 gap-2 mb-4 py-3 border-y border-slate-700/30">
          <div className="text-center">
            <Euro className="w-3 h-3 text-slate-500 mx-auto mb-0.5" />
            <p className="text-[10px] text-slate-500">From</p>
            <p className="text-xs font-semibold text-white">{minTicket}</p>
          </div>
          <div className="text-center">
            <Target className="w-3 h-3 text-slate-500 mx-auto mb-0.5" />
            <p className="text-[10px] text-slate-500">Target</p>
            <p className="text-xs font-semibold text-white">{targetReturn}</p>
          </div>
          <div className="text-center">
            <Clock className="w-3 h-3 text-slate-500 mx-auto mb-0.5" />
            <p className="text-[10px] text-slate-500">Term</p>
            <p className="text-xs font-semibold text-white">{term}</p>
          </div>
          <div className="text-center">
            <AlertTriangle className={`w-3 h-3 mx-auto mb-0.5 ${riskColor[risk]}`} />
            <p className="text-[10px] text-slate-500">Risk</p>
            <p className={`text-xs font-semibold ${riskColor[risk]}`}>{risk}</p>
          </div>
        </div>

        {/* See deal button */}
        <Button 
          size="sm"
          variant="outline"
          className="w-full text-xs group/btn border-slate-600 text-white hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300"
          onClick={onSeeDeal}
        >
          See deal
          <ArrowRight className="w-3 h-3 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>

      {/* Bottom accent line - violet */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500/50 via-violet-400/40 to-slate-600/30"
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      />
    </motion.div>
  );
};
