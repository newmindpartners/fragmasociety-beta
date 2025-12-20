import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
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
  onSeeDeal: () => void;
}

export const SignatureDealCard = ({
  category,
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
  onSeeDeal,
}: SignatureDealCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const riskStyles = {
    Low: "bg-emerald-900/50 text-emerald-400 border-emerald-700/50",
    Medium: "bg-amber-900/50 text-amber-400 border-amber-700/50",
    High: "bg-rose-900/50 text-rose-400 border-rose-700/50",
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
    <motion.article
      className="group relative h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className="relative h-full rounded-sm overflow-hidden border border-slate-700/30 shadow-lg shadow-slate-900/20 transition-all duration-500"
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered 
            ? "0 25px 50px -12px rgba(15, 23, 42, 0.5), 0 0 30px -5px rgba(139, 92, 246, 0.15)"
            : "0 10px 15px -3px rgba(15, 23, 42, 0.3)"
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        
        {/* Editorial Image Section - Dark navy base */}
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900">
          {/* Dark navy solid background behind image */}
          <div className="absolute inset-0 bg-slate-900" />
          
          {/* Static image */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* Video overlay on hover */}
          <AnimatePresence>
            {isHovered && videoUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 z-20 bg-slate-900"
              >
                <video
                  ref={videoRef}
                  src={videoUrl}
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay on video */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent pointer-events-none" />
                
                {/* Sound toggle button */}
                <motion.button
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-slate-800/90 transition-colors"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </motion.button>
                
                {/* Playing indicator */}
                <motion.div 
                  className="absolute bottom-20 left-6 flex items-center gap-2"
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
                  <span className="text-xs text-white/80 uppercase tracking-wider">{isMuted ? "Preview" : "Playing"}</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Dark navy gradient overlay - only at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10 pointer-events-none" />
          
          {/* Play button indicator when not hovered */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            animate={{ opacity: isHovered ? 0 : 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {videoUrl && (
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
              </div>
            )}
          </motion.div>
          
          {/* Top badges */}
          <div className="absolute top-5 left-5 right-5 flex items-start justify-between z-30">
            <span className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] bg-white/95 text-slate-800 rounded-sm backdrop-blur-sm">
              {category}
            </span>
            {comingSoon && (
              <span className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] bg-slate-900/90 text-white rounded-sm backdrop-blur-sm">
                Coming Soon
              </span>
            )}
          </div>

          {/* Leader info - studio lighting on text */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-30">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] mb-2 font-light">
                {leaderRole}
              </p>
              {/* Name with studio spotlight glow effect */}
              <h3 
                className="text-2xl md:text-3xl font-light text-white leading-tight tracking-tight relative"
                style={{ 
                  fontFamily: "'Playfair Display', serif",
                  textShadow: "0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(139,92,246,0.1)"
                }}
              >
                {leaderName}
              </h3>
            </motion.div>
          </div>
        </div>

        {/* Content Section - Dark Navy */}
        <div className="p-6 lg:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
          {/* Title */}
          <h4 className="text-lg font-medium text-white mb-3 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h4>
          
          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
            {description}
          </p>

          {/* Stats - refined grid */}
          <div className="grid grid-cols-4 gap-3 mb-6 py-5 border-y border-slate-700/50">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Entry</p>
              <p className="text-sm font-medium text-white">{minTicket}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Target</p>
              <p className="text-sm font-medium text-white">{targetReturn}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Duration</p>
              <p className="text-sm font-medium text-white">{term}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Risk</p>
              <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-sm border ${riskStyles[risk]}`}>
                {risk}
              </span>
            </div>
          </div>

          {/* CTA Button - stops propagation to prevent video interference */}
          <Button 
            variant="outline"
            className="w-full group/btn border-white/30 text-white hover:bg-white hover:text-slate-900 rounded-sm h-12 text-sm font-medium tracking-wide transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onSeeDeal();
            }}
            onMouseEnter={(e) => e.stopPropagation()}
          >
            Explore Opportunity
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>

        {/* Hover accent line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-slate-400 to-violet-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      </motion.div>
    </motion.article>
  );
};
