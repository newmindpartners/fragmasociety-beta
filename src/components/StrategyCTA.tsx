import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ArrowRight, 
  Shield, 
  Landmark, 
  TrendingUp, 
  RefreshCw,
  Lock,
  Play,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EarlyAccessModal } from "./early-access/EarlyAccessModal";

const features = [
  { icon: Shield, label: "Managed Portfolio" },
  { icon: Landmark, label: "Luxembourg Structure" },
  { icon: TrendingUp, label: "Target Distributions" },
  { icon: RefreshCw, label: "Secondary Market" },
];

export const StrategyCTA = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Deep Slate/Navy Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Atmospheric Effects */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-[400px] h-[300px] bg-violet-900/15 rounded-full blur-3xl" />
        <div className="absolute -top-10 -right-10 w-[350px] h-[250px] bg-slate-700/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 right-0 h-[200px] -translate-y-1/2 bg-gradient-to-r from-violet-900/10 via-violet-800/15 to-violet-900/10 blur-3xl" />
      </div>
      
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 py-16 lg:py-20">
        {/* Two Column Layout - Compact */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-gradient-to-r from-violet-500/50 to-transparent" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-slate-400 font-medium">
                Investment Vehicle
              </span>
            </div>
            
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1]">
              <span className="text-white">Fragma</span>{" "}
              <span className="bg-gradient-to-r from-violet-300 via-slate-300 to-violet-400 bg-clip-text text-transparent">
                One
              </span>
            </h2>
            
            {/* Subtitle */}
            <p className="text-base text-slate-400 mb-6 leading-relaxed max-w-md">
              One click, broad exposure to RWA best opportunities and signature deals.
            </p>

            {/* Inline Features */}
            <div className="flex flex-wrap gap-3 mb-6">
              {features.map((feature) => (
                <div
                  key={feature.label}
                  className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-700/50 bg-slate-800/30 text-xs text-slate-400"
                >
                  <feature.icon className="w-3.5 h-3.5 text-violet-400/70" strokeWidth={1.5} />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="group bg-white text-slate-900 hover:bg-slate-100 px-6 py-5 text-sm rounded-none transition-all duration-500"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="ml-2">Register your interest</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <EarlyAccessModal open={isModalOpen} onOpenChange={setIsModalOpen} />

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 mt-6 text-[10px] text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-violet-400/60" />
                <span>Luxembourg Securitisation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-violet-400/60" />
                <span>Professional Governance</span>
              </div>
            </div>
          </motion.div>
          
          {/* Right - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Video Container - Compact */}
            <div className="relative aspect-video overflow-hidden border border-slate-700/50 bg-slate-800/30">
              {!isVideoPlaying ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
                  
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-violet-900/20 rounded-full blur-2xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-slate-700/20 rounded-full blur-2xl" />
                  </div>
                  
                  {/* Play Button */}
                  <motion.button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/20 group-hover:border-violet-400/50 transition-all duration-500">
                      <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
                    </div>
                  </motion.button>
                  
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-slate-600/50" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-slate-600/50" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-slate-600/50" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-slate-600/50" />
                </>
              ) : (
                <div className="relative w-full h-full">
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                  <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    <p className="text-slate-500 text-xs">Video Player</p>
                  </div>
                </div>
              )}
            </div>
            
            <p className="text-center text-[10px] text-slate-500 mt-3">
              Capital at risk. For professional / qualified investors only.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    </section>
  );
};
