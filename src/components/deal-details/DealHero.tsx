import { motion } from "framer-motion";
import { Play, Euro, Target, Clock, AlertTriangle } from "lucide-react";
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

  const riskColor = {
    Low: "text-green-400 bg-green-400/10 border-green-400/20",
    Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    High: "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      {/* Full-screen Video Background */}
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
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
                {deal.category} • {deal.subcategory}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              {deal.title}
            </h1>

            {/* Leader */}
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={deal.leaderImage} 
                alt={deal.leaderName}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="font-semibold text-foreground">{deal.leaderName}</p>
                <p className="text-sm text-muted-foreground">{deal.leaderRole}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              {deal.description}
            </p>


            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-background hover:bg-white/90 group">
                Express Interest
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white hover:text-background"
                onClick={handlePlayClick}
              >
                <Play className="w-4 h-4 mr-2" fill="currentColor" />
                {isPlaying ? "Pause Video" : "Watch Trailer"}
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Key Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:justify-self-end"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md">
              <h3 className="text-lg font-semibold text-foreground mb-6">Key Terms</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Min Ticket */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <Euro className="w-5 h-5 text-white/70 mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Min. Investment</p>
                  <p className="text-xl font-bold text-foreground">{deal.minTicket}</p>
                </div>

                {/* Target Return */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <Target className="w-5 h-5 text-white/70 mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Target Return*</p>
                  <p className="text-xl font-bold text-foreground">{deal.targetReturn}</p>
                </div>

                {/* Term */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <Clock className="w-5 h-5 text-white/70 mb-2" />
                  <p className="text-xs text-muted-foreground mb-1">Term</p>
                  <p className="text-xl font-bold text-foreground">{deal.term}</p>
                </div>

                {/* Risk */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <AlertTriangle className={`w-5 h-5 mb-2 ${deal.risk === 'Low' ? 'text-green-400' : deal.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`} />
                  <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                  <p className={`text-xl font-bold ${deal.risk === 'Low' ? 'text-green-400' : deal.risk === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                    {deal.risk}
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
                *Target returns are not guaranteed. Capital at risk. This is not investment advice. 
                Please read all risk disclosures before investing.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};
