import { motion } from "framer-motion";
import { Gem, Lock, TrendingUp } from "lucide-react";
import { useState } from "react";

const features = [
  { 
    title: "Backed by audited assets", 
    desc: "Curated deals in real estate and luxury, vetted with institutional diligence.", 
    icon: Gem,
    number: "01"
  },
  { 
    title: "Infrastructure you can trust", 
    desc: "Bank-level security with institutional custody and audited payouts.", 
    icon: Lock,
    number: "02"
  },
  { 
    title: "Liquidity optionality", 
    desc: "Invest for yield, then trade your slices on our secondary marketplace.", 
    icon: TrendingUp,
    number: "03"
  }
];

export const Features = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="relative py-32 lg:py-40 overflow-hidden">
      {/* Premium Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        {/* Subtle spotlight effects */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-violet-50/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              Why Fragma Society
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.05] mb-8"
          >
            Fractional ownership
            <br />
            <span className="italic text-slate-500 font-serif">without the complexity.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            Tokenization is rewriting how the world owns real estate, art, and private markets. 
            We wrap this power into a simple investing experience.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative p-10 lg:p-12 h-full overflow-hidden"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(145deg, rgba(30,41,59,0.98) 0%, rgba(51,65,85,0.96) 50%, rgba(67,56,89,0.94) 100%)'
                      : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isHovered 
                      ? '1px solid rgba(139, 92, 246, 0.2)' 
                      : '1px solid rgba(148, 163, 184, 0.15)',
                    boxShadow: isHovered 
                      ? '0 30px 60px -15px rgba(30, 41, 59, 0.35), 0 0 40px -10px rgba(139, 92, 246, 0.15)'
                      : '0 4px 30px -10px rgba(0, 0, 0, 0.06)',
                  }}
                  animate={{ 
                    y: isHovered ? -12 : 0,
                    scale: isHovered ? 1.02 : 1
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Large decorative number */}
                  <motion.span 
                    className={`absolute top-6 right-6 text-[100px] lg:text-[120px] font-extralight leading-none transition-all duration-500 ${
                      isHovered ? 'text-white/[0.04]' : 'text-slate-900/[0.03]'
                    }`}
                    style={{ fontFamily: 'serif' }}
                    animate={{ 
                      x: isHovered ? 10 : 0,
                      y: isHovered ? -10 : 0 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.number}
                  </motion.span>

                  {/* Icon container */}
                  <motion.div 
                    className={`w-16 h-16 mb-10 flex items-center justify-center relative transition-all duration-500 ${
                      isHovered 
                        ? 'border border-violet-400/30 bg-white/5' 
                        : 'border border-slate-200 bg-white/60'
                    }`}
                    animate={{ 
                      rotate: isHovered ? 6 : 0,
                      scale: isHovered ? 1.1 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <feature.icon 
                      className={`w-7 h-7 transition-all duration-500 ${
                        isHovered ? 'text-violet-300' : 'text-slate-600'
                      }`} 
                      strokeWidth={1.5}
                    />
                    
                    {/* Icon glow on hover */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-slate-500/10 blur-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h3 
                    className={`text-xl lg:text-2xl font-medium mb-4 transition-colors duration-500 ${
                      isHovered ? 'text-white' : 'text-slate-900'
                    }`}
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <p className={`text-base leading-relaxed transition-colors duration-500 ${
                    isHovered ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {feature.desc}
                  </p>

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500 via-slate-400 to-slate-600"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Corner accent */}
                  <motion.div 
                    className="absolute top-0 left-0 w-12 h-12"
                    style={{
                      background: isHovered 
                        ? 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, transparent 50%)' 
                        : 'linear-gradient(135deg, rgba(148,163,184,0.1) 0%, transparent 50%)'
                    }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0.5,
                      scale: isHovered ? 1.5 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Hover indicator dot */}
                  <motion.div 
                    className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-gradient-to-r from-violet-400 to-slate-300"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isHovered ? 1 : 0,
                      opacity: isHovered ? 1 : 0 
                    }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
