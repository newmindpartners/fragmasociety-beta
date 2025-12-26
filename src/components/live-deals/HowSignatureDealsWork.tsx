import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { BookOpen, Shield, TrendingUp, Repeat, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: BookOpen,
    title: "A Strong Story",
    description: "Every deal is built around a compelling narrative and proven industry leader.",
    number: "01"
  },
  {
    icon: Shield,
    title: "Clear Legal Structure",
    description: "Compliant asset structuring with transparent ownership and governance.",
    number: "02"
  },
  {
    icon: TrendingUp,
    title: "Transparent Yield",
    description: "Clear return objectives with automated distribution mechanisms.",
    number: "03"
  },
  {
    icon: Repeat,
    title: "Secondary Liquidity",
    description: "Optional marketplace access to trade your position before maturity.",
    number: "04"
  },
];

export const HowSignatureDealsWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Premium Light Background - matching Features section */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        {/* Subtle spotlight effects */}
        <div className="absolute top-0 left-1/4 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-radial from-slate-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[1000px] h-[250px] sm:h-[500px] bg-gradient-radial from-white via-transparent to-transparent rounded-full blur-2xl opacity-90" />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mb-12 sm:mb-16 lg:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase text-slate-400 font-medium">
              Extraordinary by Design
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.05] mb-6 sm:mb-8"
          >
            Crafted with icons,
            <br />
            <span className="italic text-slate-500 font-serif">built for discerning investors.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            We partner with visionary leaders to create extraordinary investment opportunities. 
            Every deal is structured for transparency, compliance, and long-term value:
          </motion.p>
        </div>

        {/* Pillars grid - single column on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20">
          {pillars.map((pillar, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onTouchStart={() => setHoveredIndex(index)}
                onTouchEnd={() => setTimeout(() => setHoveredIndex(null), 2000)}
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative p-6 sm:p-8 lg:p-10 h-full overflow-hidden rounded-sm"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(165deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.98) 40%, rgba(51,65,85,0.96) 100%)'
                      : 'rgba(255, 255, 255, 0.9)',
                    border: isHovered 
                      ? '1px solid rgba(139, 92, 246, 0.25)' 
                      : '1px solid rgba(226, 232, 240, 0.8)',
                    boxShadow: isHovered 
                      ? '0 30px 60px -15px rgba(15, 23, 42, 0.6), 0 0 50px -10px rgba(139, 92, 246, 0.15)'
                      : '0 4px 30px -10px rgba(0, 0, 0, 0.08)',
                    transition: 'background 0.7s cubic-bezier(0.4, 0, 0.2, 1), border 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  animate={{ 
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.015 : 1
                  }}
                  transition={{ 
                    duration: 0.7, 
                    ease: [0.32, 0.72, 0, 1],
                    y: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
                    scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                  }}
                >
                  {/* Subtle violet glow on hover */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-slate-800/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  />

                  {/* Large decorative number */}
                  <motion.span 
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 text-[60px] sm:text-[80px] lg:text-[100px] font-extralight leading-none ${
                      isHovered ? 'text-white/[0.04]' : 'text-slate-900/[0.04]'
                    }`}
                    style={{ 
                      fontFamily: 'serif',
                      transition: 'color 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    animate={{ 
                      x: isHovered ? 10 : 0,
                      y: isHovered ? -10 : 0
                    }}
                    transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {pillar.number}
                  </motion.span>

                  {/* Icon container */}
                  <motion.div 
                    className={`w-12 h-12 sm:w-14 sm:h-14 mb-6 sm:mb-8 flex items-center justify-center relative ${
                      isHovered 
                        ? 'border-slate-600/30 bg-slate-800/40' 
                        : 'border-slate-200 bg-slate-50'
                    }`}
                    style={{ 
                      borderWidth: '1px', 
                      borderStyle: 'solid',
                      transition: 'background 0.6s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    animate={{ 
                      rotate: isHovered ? 6 : 0,
                      scale: isHovered ? 1.08 : 1
                    }}
                    transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <pillar.icon 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        isHovered ? 'text-violet-300' : 'text-slate-600'
                      }`} 
                      style={{ transition: 'color 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                      strokeWidth={1.5}
                    />
                    
                    {/* Icon glow on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-slate-600/10 blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    />
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h3 
                    className={`text-base sm:text-lg lg:text-xl font-medium mb-2 sm:mb-3 ${
                      isHovered ? 'text-white/90' : 'text-slate-900'
                    }`}
                    style={{ transition: 'color 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {pillar.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <p 
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isHovered ? 'text-slate-400' : 'text-slate-500'
                    }`}
                    style={{ transition: 'color 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    {pillar.description}
                  </p>

                  {/* Bottom accent line - violet */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500/50 via-violet-400/40 to-slate-600/30"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-sm sm:text-base text-slate-500 mb-5 sm:mb-6">
            Have a vision? Let's create your Signature Deal together.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="group bg-slate-900 text-white hover:bg-slate-800 active:bg-slate-700 rounded-sm px-6 sm:px-8 h-12 sm:h-auto min-h-[48px] text-sm sm:text-base"
          >
            <Link to="/signature-deal">
              Launch your Signature Deal
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 sm:mt-16 lg:mt-20 flex justify-center"
        >
          <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
