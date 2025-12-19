import { motion } from "framer-motion";
import { useState } from "react";
import { 
  ArrowRight, 
  Shield, 
  Landmark, 
  TrendingUp, 
  RefreshCw,
  Lock,
  Phone,
  Play,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const features = [
  { 
    icon: Shield, 
    label: "Managed Portfolio",
    description: "Institutional oversight"
  },
  { 
    icon: Landmark, 
    label: "Luxembourg Structure",
    description: "EU-regulated securitisation"
  },
  { 
    icon: TrendingUp, 
    label: "Target Distributions",
    description: "Income-focused returns"
  },
  { 
    icon: RefreshCw, 
    label: "Secondary Market",
    description: "Enhanced liquidity"
  },
];

export const StrategyCTA = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Deep Slate/Navy Background - matching signature deals & footer */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Atmospheric Effects */}
      <div className="absolute inset-0">
        {/* Violet glow top-left */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[400px] bg-violet-900/15 rounded-full blur-3xl" />
        {/* Slate accent top-right */}
        <div className="absolute -top-20 -right-20 w-[500px] h-[350px] bg-slate-700/20 rounded-full blur-3xl" />
        {/* Central violet band */}
        <div className="absolute top-1/2 left-0 right-0 h-[400px] -translate-y-1/2 bg-gradient-to-r from-violet-900/10 via-violet-800/15 to-violet-900/10 blur-3xl" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-slate-950/80 to-transparent" />
      </div>
      
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-16 relative z-10 py-24 lg:py-32">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8 bg-gradient-to-r from-violet-500/50 to-transparent" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-slate-400 font-medium">
                Exclusive Investment Vehicle
              </span>
            </motion.div>
            
            {/* Main heading */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1]"
            >
              <span className="text-white">Fragma</span>{" "}
              <span 
                className="bg-gradient-to-r from-violet-300 via-slate-300 to-violet-400 bg-clip-text text-transparent"
              >
                One
              </span>
            </motion.h2>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-lg"
            >
              One fund. Broad exposure to real-world yield & digital infrastructure. 
              Powered by the Fragma ecosystem.
            </motion.p>

            {/* Feature Grid */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-10"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="group"
                >
                  <div 
                    className="p-5 h-full border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm transition-all duration-500 hover:border-violet-500/30 hover:bg-slate-800/50"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 flex items-center justify-center border border-slate-600/40 bg-slate-800/60 group-hover:border-violet-500/40 transition-colors duration-500">
                        <feature.icon className="w-4 h-4 text-slate-400 group-hover:text-violet-300 transition-colors duration-500" strokeWidth={1.5} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90 mb-1">
                          {feature.label}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                asChild 
                size="lg" 
                className="group bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-base rounded-none transition-all duration-500"
              >
                <Link to="/auth" className="flex items-center gap-3">
                  <Lock className="w-4 h-4" />
                  <span>Register to view details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="group px-8 py-6 text-base rounded-none border-slate-600 text-slate-300 hover:bg-slate-800 hover:border-violet-500/50 hover:text-white transition-all duration-500"
              >
                <Phone className="w-4 h-4 mr-3" />
                <span>Book a Call</span>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-6 mt-10 text-xs text-slate-500"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400/60" />
                <span>Luxembourg Securitisation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400/60" />
                <span>Professional Governance</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-violet-400/60" />
                <span>Tokenized Notes</span>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right - Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Video Container */}
            <div className="relative aspect-video overflow-hidden border border-slate-700/50 bg-slate-800/30">
              {/* Video Thumbnail / Player */}
              {!isVideoPlaying ? (
                <>
                  {/* Placeholder gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
                  
                  {/* Decorative elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-violet-900/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-slate-700/20 rounded-full blur-3xl" />
                  </div>
                  
                  {/* Play Button */}
                  <motion.button
                    onClick={() => setIsVideoPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      {/* Outer ring */}
                      <motion.div 
                        className="absolute inset-0 border-2 border-white/20 rounded-full"
                        style={{ width: 120, height: 120, margin: -20 }}
                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {/* Play button */}
                      <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/20 group-hover:border-violet-400/50 transition-all duration-500">
                        <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                    
                    {/* Watch video label */}
                    <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] uppercase text-slate-400 group-hover:text-white transition-colors duration-300">
                      Watch Video
                    </span>
                  </motion.button>
                  
                  {/* Corner accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-slate-600/50" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-slate-600/50" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-slate-600/50" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-slate-600/50" />
                </>
              ) : (
                <div className="relative w-full h-full">
                  {/* Close button */}
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                  
                  {/* Video iframe placeholder - replace with actual video */}
                  <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                    <p className="text-slate-500 text-sm">Video Player</p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Video caption */}
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center text-xs text-slate-500 mt-4"
            >
              Capital at risk. For professional / qualified investors only.
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom Border Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    </section>
  );
};
