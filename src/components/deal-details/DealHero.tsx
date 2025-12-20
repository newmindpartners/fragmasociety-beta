import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowDown, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import type { DealData } from "@/types/deal";

// Category background images
import categoryRealEstate from "@/assets/category-realestate.jpg";
import categoryFilm from "@/assets/category-film.jpg";
import categoryLuxury from "@/assets/category-luxury.jpg";
import categoryCredit from "@/assets/category-credit.jpg";
import categorySports from "@/assets/category-sports.jpg";
import categoryEsg from "@/assets/category-esg.jpg";

const getCategoryBackground = (category: string): string => {
  const categoryMap: Record<string, string> = {
    "Real Estate": categoryRealEstate,
    Film: categoryFilm,
    Luxury: categoryLuxury,
    Credit: categoryCredit,
    Sports: categorySports,
    ESG: categoryEsg,
  };

  return categoryMap[category] || categoryRealEstate;
};


interface DealHeroProps {
  deal: DealData;
}

export const DealHero = ({ deal }: DealHeroProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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

  const categoryBg = deal.assetImages && deal.assetImages.length > 0 
    ? deal.assetImages[0] 
    : getCategoryBackground(deal.category);

  return (
    <section className="relative h-screen max-h-[900px] bg-slate-900 overflow-hidden">
      {/* Full Hero Industry Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${categoryBg})`,
            opacity: 0.4,
            filter: 'grayscale(30%) brightness(0.85)'
          }}
        />
        
      </div>
      
      {/* Dark navy gradient overlay - z-20 to be in front of portrait */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            rgba(15,23,42,1) 0%,
            rgba(15,23,42,0.95) 8%,
            rgba(15,23,42,0.85) 18%,
            rgba(15,23,42,0.7) 30%,
            rgba(15,23,42,0.5) 42%,
            rgba(15,23,42,0.3) 55%,
            rgba(15,23,42,0.15) 68%,
            rgba(15,23,42,0.05) 80%,
            transparent 92%
          )`
        }}
      />


      
      {/* Grid Layout - Content Left, Profile Right */}
      <div className="relative z-30 h-full container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 h-full items-end pt-16 pb-6">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <div className="max-w-xl rounded-md border border-border/30 bg-background/70 backdrop-blur-md p-6 md:p-8 shadow-lg">
              {/* Category Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <span className="px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] bg-white/95 text-slate-800 rounded-sm">
                  {deal.category}
                </span>
              </motion.div>

              {/* Leader Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6"
              >
                <p className="text-xs text-slate-400 uppercase tracking-[0.2em] mb-2 font-light">
                  {deal.leaderRole}
                </p>
                <h2
                  className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    textShadow:
                      "0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(139,92,246,0.1)",
                  }}
                >
                  {deal.leaderName}
                </h2>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-2xl font-medium text-white mb-4 leading-snug"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {deal.title}
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm text-slate-400 leading-relaxed mb-8 max-w-lg"
              >
                {deal.tagline}
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-4 gap-4 mb-8 py-5 border-y border-slate-700/50"
              >
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Entry</p>
                  <p className="text-sm font-medium text-white">{deal.minTicket}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Target*</p>
                  <p className="text-sm font-medium text-white">{deal.targetReturn}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-sm font-medium text-white">{deal.term}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Risk</p>
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-medium rounded-sm border ${
                      deal.risk === "Low"
                        ? "bg-emerald-900/50 text-emerald-400 border-emerald-700/50"
                        : deal.risk === "Medium"
                          ? "bg-amber-900/50 text-amber-400 border-amber-700/50"
                          : "bg-rose-900/50 text-rose-400 border-rose-700/50"
                    }`}
                  >
                    {deal.risk}
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
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
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white hover:text-slate-900 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
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
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-[10px] text-slate-500 mt-6"
              >
                *Target returns are projections only. Capital at risk.
              </motion.p>
            </div>
          </div>

          {/* Right - Profile Image/Video */}
          <div className="order-1 lg:order-2 relative flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] max-h-[65vh]"
            >
              {/* Profile image - grayscale/luminosity like SignatureDealsBanner */}
              <img
                src={deal.bannerImage || deal.leaderImage}
                alt={deal.leaderName}
                className="absolute inset-0 w-full h-full object-contain object-bottom"
                style={{ 
                  filter: 'grayscale(100%) contrast(1.15) brightness(1.1)',
                  mixBlendMode: 'luminosity'
                }}
              />
              
              {/* Bottom fade for smooth transition to name */}
              <div 
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.8) 30%, rgba(15,23,42,0) 100%)'
                }}
              />

              {deal.heroVideoUrl && (
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 z-20 bg-slate-900"
                    >
                      <video
                        ref={videoRef}
                        src={deal.heroVideoUrl}
                        muted={isMuted}
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient overlay on video */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent pointer-events-none" />
                      
                      {/* Sound toggle */}
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
                        className="absolute bottom-6 left-6 flex items-center gap-2"
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
                        <span className="text-xs text-white/80 uppercase tracking-wider">
                          {isMuted ? "Preview" : "Playing"}
                        </span>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
              
              {/* Play button when paused */}
              {deal.heroVideoUrl && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                  animate={{ opacity: isPlaying ? 0 : 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                  </div>
                </motion.div>
              )}

            </motion.div>
            
            {/* Name and position below portrait */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-4 relative z-30"
            >
              <h3 
                className="text-xl md:text-2xl font-light text-white tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {deal.leaderName}
              </h3>
              <p className="text-xs text-slate-400 uppercase tracking-[0.2em] mt-1">
                {deal.leaderRole}
              </p>
            </motion.div>
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