import { motion } from "framer-motion";
import { Check, X, Zap, Shield, Users } from "lucide-react";
import { useState } from "react";

const highlights = [
  { icon: Zap, title: "True P2P", desc: "Direct trades, zero intermediaries", number: "01" },
  { icon: Shield, title: "Your Keys", desc: "Complete asset ownership", number: "02" },
  { icon: Users, title: "Open Market", desc: "Set your price, find buyers", number: "03" },
];

const comparisons = [
  { feature: "True order book trading", traditional: false, fragma: true },
  { feature: "Non-custodial wallets", traditional: false, fragma: true },
  { feature: "Set your own price", traditional: false, fragma: true },
  { feature: "On-chain settlement", traditional: false, fragma: true },
  { feature: "Options trading", traditional: false, fragma: true },
  { feature: "Decentralized architecture", traditional: false, fragma: true },
];

export const MarketplaceDifference = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Premium Light Background - matching Features */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              The Difference
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.05] mb-8"
          >
            Not just another
            <br />
            <span className="italic text-slate-500 font-serif">trading platform.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            Traditional platforms give you buttons. We give you a real marketplace — 
            100% decentralized, completely non-custodial.
          </motion.p>
        </div>

        {/* Highlights Grid - Features style with hover-to-dark */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {highlights.map((item, index) => {
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
                  className="relative p-10 lg:p-12 h-full overflow-hidden rounded-sm"
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
                    className={`absolute top-6 right-6 text-[100px] lg:text-[120px] font-extralight leading-none ${
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
                    {item.number}
                  </motion.span>

                  {/* Icon container */}
                  <motion.div 
                    className={`w-16 h-16 mb-10 flex items-center justify-center relative ${
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
                    <item.icon 
                      className={`w-7 h-7 ${
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
                    className={`text-xl lg:text-2xl font-medium mb-4 ${
                      isHovered ? 'text-white/90' : 'text-slate-900'
                    }`}
                    style={{ transition: 'color 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {item.title}
                  </motion.h3>
                  
                  {/* Description */}
                  <p 
                    className={`text-base leading-relaxed ${
                      isHovered ? 'text-slate-400' : 'text-slate-500'
                    }`}
                    style={{ transition: 'color 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    {item.desc}
                  </p>

                  {/* Bottom accent line - violet */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500/50 via-violet-400/40 to-slate-600/30"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                  />

                  {/* Corner accent */}
                  <motion.div 
                    className="absolute top-0 left-0 w-12 h-12"
                    style={{
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 50%)'
                    }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0.3,
                      scale: isHovered ? 1.5 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Table - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              Feature Comparison
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
          </div>

          <div
            className="relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.95) 100%)',
              borderRadius: '2px',
              boxShadow: '0 0 0 1px rgba(226,232,240,0.9), 0 25px 80px -20px rgba(15,23,42,0.1), 0 8px 30px -10px rgba(0,0,0,0.05)'
            }}
          >
            {/* Decorative gradient accent top */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-8 md:px-12 py-8 border-b border-slate-100">
              <div className="col-span-6 md:col-span-5">
                <span className="text-[11px] tracking-[0.3em] uppercase text-primary/70 font-semibold">Feature</span>
              </div>
              <div className="col-span-3 md:col-span-4 text-center">
                <span className="text-[11px] tracking-[0.3em] uppercase text-slate-300 font-medium">Traditional</span>
              </div>
              <div className="col-span-3 text-center">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-slate-800 font-bold">Fragma</span>
                  <motion.div 
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-50">
              {comparisons.map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                  className="group relative grid grid-cols-12 gap-4 px-8 md:px-12 py-6 items-center hover:bg-slate-50/70 transition-all duration-500"
                >
                  {/* Hover accent */}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-gradient-to-b from-primary/60 to-primary/20 group-hover:h-full transition-all duration-500 rounded-r" />
                  
                  <div className="col-span-6 md:col-span-5">
                    <span className="text-[15px] md:text-base font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-300">
                      {item.feature}
                    </span>
                  </div>
                  <div className="col-span-3 md:col-span-4 flex justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100/80 border border-rose-100/80"
                      style={{ boxShadow: '0 2px 8px -2px rgba(244,63,94,0.15)' }}
                    >
                      <X className="w-4 h-4 text-rose-400" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                  <div className="col-span-3 flex justify-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100/80 border border-emerald-200/60"
                      style={{ boxShadow: '0 2px 8px -2px rgba(16,185,129,0.2)' }}
                    >
                      <Check className="w-4 h-4 text-emerald-500" strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary Footer - Premium */}
            <div className="relative px-8 md:px-12 py-7 bg-gradient-to-r from-slate-50/80 via-white to-slate-50/80 border-t border-slate-100">
              {/* Decorative line */}
              <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -3 }}
                    className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center rounded-lg"
                    style={{ boxShadow: '0 4px 15px -3px rgba(15,23,42,0.3)' }}
                  >
                    <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </motion.div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm text-slate-600">
                      All <span className="text-slate-900 font-bold">6 features</span> available on Fragma
                    </span>
                    <span className="text-[11px] text-slate-400">Complete marketplace capabilities</span>
                  </div>
                </div>
                
                {/* Decorative badge */}
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/10"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[11px] font-medium text-primary/80 tracking-wide uppercase">Full Access</span>
                </motion.div>
              </div>
            </div>

            {/* Decorative gradient accent bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-24 flex flex-col items-center gap-4"
        >
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-slate-300 font-light">Built different</span>
        </motion.div>
      </div>
    </section>
  );
};
