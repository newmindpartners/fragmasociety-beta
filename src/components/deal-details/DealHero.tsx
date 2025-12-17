import { motion } from "framer-motion";
import { Play, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import type { DealData } from "@/types/deal";

interface DealHeroProps {
  deal: DealData;
}

export const DealHero = ({ deal }: DealHeroProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative min-h-screen">
      {/* Full-bleed Video/Image Background */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={deal.heroVideoUrl}
          poster={deal.leaderImage}
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Elegant gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
      </div>

      {/* Content - Bottom aligned like luxury brands */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end">
        <div className="container mx-auto px-6 lg:px-12 pb-24 pt-32">
          <div className="max-w-4xl">
            {/* Category - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="text-xs tracking-[0.4em] uppercase text-white/60">
                {deal.category} — {deal.subcategory}
              </span>
            </motion.div>

            {/* Title - Large Editorial */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[0.95] tracking-tight mb-8"
            >
              {deal.title}
            </motion.h1>

            {/* Leader - Elegant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-5 mb-10"
            >
              <img 
                src={deal.leaderImage} 
                alt={deal.leaderName}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-white/20"
              />
              <div>
                <p className="text-white font-medium">{deal.leaderName}</p>
                <p className="text-sm text-white/60">{deal.leaderRole}</p>
              </div>
            </motion.div>

            {/* Key Stats - Minimal horizontal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap items-center gap-8 md:gap-12 mb-12 pb-12 border-b border-white/10"
            >
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">From</p>
                <p className="text-2xl md:text-3xl font-light text-white">{deal.minTicket}</p>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">Target*</p>
                <p className="text-2xl md:text-3xl font-light text-white">{deal.targetReturn}</p>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">Duration</p>
                <p className="text-2xl md:text-3xl font-light text-white">{deal.term}</p>
              </div>
              <div className="w-px h-12 bg-white/10 hidden md:block" />
              <div>
                <p className="text-xs tracking-[0.2em] uppercase text-white/40 mb-1">Risk</p>
                <p className={`text-2xl md:text-3xl font-light ${
                  deal.risk === 'Low' ? 'text-emerald-400' : 
                  deal.risk === 'Medium' ? 'text-amber-400' : 'text-rose-400'
                }`}>{deal.risk}</p>
              </div>
            </motion.div>

            {/* CTA Buttons - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Button 
                size="lg" 
                className="bg-white text-neutral-900 hover:bg-white/90 rounded-full px-8 h-14 text-base font-medium"
              >
                Express Interest
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
              <Button 
                size="lg" 
                variant="ghost"
                className="text-white hover:bg-white/10 rounded-full px-8 h-14 text-base font-medium border border-white/20"
                onClick={handlePlayClick}
              >
                <Play className="w-4 h-4 mr-2" fill="currentColor" />
                {isPlaying ? "Pause" : "Watch Film"}
              </Button>
            </motion.div>

            {/* Disclaimer */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-[10px] text-white/40 mt-8 max-w-lg"
            >
              *Target returns are projections only. Capital at risk. This is not investment advice.
            </motion.p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </div>
    </section>
  );
};