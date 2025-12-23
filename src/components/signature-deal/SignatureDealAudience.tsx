import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Palette, 
  Trophy, 
  Gem, 
  Film, 
  Music, 
  Building2, 
  Briefcase, 
  Users, 
  Crown,
  Sparkles
} from "lucide-react";

import signatureDealBg from "@/assets/signature-deal-advantage-bg.jpg";

const audiences = [
  { icon: Palette, label: "Designers & Architects", delay: 0 },
  { icon: Trophy, label: "Athletes & Champions", delay: 0.05 },
  { icon: Gem, label: "Luxury Brands", delay: 0.1 },
  { icon: Film, label: "Film Studios & Producers", delay: 0.15 },
  { icon: Music, label: "Musicians & Entertainment IP Owners", delay: 0.2 },
  { icon: Building2, label: "Real Estate Developers", delay: 0.25 },
  { icon: Briefcase, label: "High-Value Asset Owners", delay: 0.3 },
  { icon: Users, label: "Entrepreneurs with a Loyal Audience", delay: 0.35 },
  { icon: Crown, label: "Cultural Icons & Lifestyle Brands", delay: 0.4 },
];

export const SignatureDealAudience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" ref={containerRef}>
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={signatureDealBg} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ 
            opacity: 0.4,
            filter: 'grayscale(30%) brightness(0.7)',
          }}
        />
        {/* Gradient overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 90% at 50% 100%, transparent 0%, rgba(15,23,42,0.4) 50%, rgba(15,23,42,0.8) 100%),
              radial-gradient(ellipse 100% 60% at 50% 50%, transparent 0%, rgba(15,23,42,0.5) 100%)
            `
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.7) 30%, rgba(15,23,42,0.5) 60%, rgba(15,23,42,0.8) 100%)'
          }}
        />
      </div>
      
      {/* Violet glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-violet-900/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-slate-700/30 rounded-full blur-[120px]" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.1) 0%, transparent 70%)'
        }}
      />
      
      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-sm bg-white/5 backdrop-blur-sm border border-white/10 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-violet-400" />
            </motion.div>
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/70 font-medium">Perfect For</span>
          </motion.div>
          
          {/* Main headline */}
          <div className="overflow-visible mb-6">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-[1.2] tracking-tight pb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Who Should Launch a
            </motion.h2>
          </div>
          <div className="overflow-visible pt-2 pb-6">
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.35] tracking-tight"
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <span 
                className="font-signature italic inline-block pb-4"
                style={{
                  background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 40%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Signature Deal?
              </span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Audience Grid - Floating cards */}
        <div className="max-w-5xl mx-auto mb-20">
          <motion.div 
            className="flex flex-wrap justify-center gap-3 lg:gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {audiences.map((audience, index) => {
              const Icon = audience.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div
                  key={audience.label}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + audience.delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative group"
                >
                  {/* Card */}
                  <motion.div
                    className={`relative flex items-center gap-3 px-5 py-3.5 rounded-sm cursor-pointer transition-all duration-500
                      ${isHovered 
                        ? 'bg-white/15 border-violet-400/40 shadow-[0_0_30px_-10px_rgba(139,92,246,0.4)]' 
                        : 'bg-white/5 border-white/10'
                      } border backdrop-blur-xl`}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -3,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Top highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    
                    {/* Icon */}
                    <motion.div 
                      className={`relative w-9 h-9 flex items-center justify-center transition-all duration-500
                        ${isHovered 
                          ? 'bg-violet-500/20' 
                          : 'bg-white/5'
                        }`}
                    >
                      <Icon className={`w-4 h-4 transition-colors duration-300 ${isHovered ? 'text-violet-300' : 'text-white/50'}`} strokeWidth={1.5} />
                    </motion.div>
                    
                    {/* Label */}
                    <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/70'}`}>
                      {audience.label}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative max-w-3xl">
            {/* Glass card */}
            <div className="relative px-10 py-8 lg:px-14 lg:py-10 rounded-sm 
              bg-white/5 backdrop-blur-xl 
              border border-white/10
              shadow-[0_20px_60px_-20px_rgba(0,0,0,0.4)]
              overflow-hidden"
            >
              {/* Inner gradients */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br from-violet-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl" />
              
              {/* Top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.p 
                  className="text-white/40 text-xl md:text-2xl mb-4 font-light"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                >
                  If you have a valuable asset or a strong brand —
                </motion.p>
                <motion.p 
                  className="text-2xl md:text-3xl lg:text-4xl font-light text-white leading-snug"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.1 }}
                >
                  your community{' '}
                  <span className="relative inline-block pb-1">
                    <span 
                      className="font-signature italic text-3xl md:text-4xl lg:text-5xl"
                      style={{
                        background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 40%, #8b5cf6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      wants to invest
                    </span>
                    {/* Underline animation */}
                    <motion.span 
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-violet-400 to-violet-300"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 1.3, duration: 0.6 }}
                      style={{ originX: 0 }}
                    />
                  </span>
                  {' '}in your success.
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
    </section>
  );
};
