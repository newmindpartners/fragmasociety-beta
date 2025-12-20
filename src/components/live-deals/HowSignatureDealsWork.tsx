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
    <section ref={ref} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Premium Light Background - matching Features section */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        {/* Subtle spotlight effects */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-slate-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-radial from-white via-transparent to-transparent rounded-full blur-2xl opacity-90" />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              For Issuers & Investors
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.05] mb-8"
          >
            Designed with leaders,
            <br />
            <span className="italic text-slate-500 font-serif">built for investors.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            We work hand-in-hand with each industry leader to structure a compliant, attractive, 
            and long-term aligned investment product. Every Signature Deal combines:
          </motion.p>
        </div>

        {/* Pillars grid - matching Features section style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
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
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative p-8 lg:p-10 h-full overflow-hidden rounded-sm"
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
                    className={`absolute top-4 right-4 text-[80px] lg:text-[100px] font-extralight leading-none ${
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
                    className={`w-14 h-14 mb-8 flex items-center justify-center relative ${
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
                      className={`w-6 h-6 ${
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
                    className={`text-lg lg:text-xl font-medium mb-3 ${
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
                    className={`text-sm leading-relaxed ${
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
          <p className="text-slate-500 mb-6">
            Have a vision? Let's create your Signature Deal together.
          </p>
          <Button 
            asChild 
            size="lg" 
            className="group bg-slate-900 text-white hover:bg-slate-800 rounded-sm px-8"
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
          className="mt-20 flex justify-center"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
