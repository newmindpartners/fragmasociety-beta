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

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="bg-white/90 border border-slate-200/80 rounded-sm overflow-hidden"
            style={{ boxShadow: '0 4px 30px -10px rgba(0, 0, 0, 0.08)' }}
          >
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="col-span-6">
                <span className="text-[10px] tracking-[0.3em] uppercase text-slate-400 font-medium">Feature</span>
              </div>
              <div className="col-span-3 text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-slate-300 font-medium">Traditional</span>
              </div>
              <div className="col-span-3 text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-slate-700 font-semibold">Fragma</span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-slate-100">
              {comparisons.map((item, index) => (
                <motion.div
                  key={item.feature}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50/50 transition-colors duration-300"
                >
                  <div className="col-span-6">
                    <span className="text-sm font-medium text-slate-700">
                      {item.feature}
                    </span>
                  </div>
                  <div className="col-span-3 flex justify-center">
                    <div className="w-7 h-7 rounded-sm flex items-center justify-center bg-rose-50">
                      <X className="w-3.5 h-3.5 text-rose-400" strokeWidth={2} />
                    </div>
                  </div>
                  <div className="col-span-3 flex justify-center">
                    <div className="w-7 h-7 rounded-sm flex items-center justify-center bg-emerald-50">
                      <Check className="w-3.5 h-3.5 text-emerald-500" strokeWidth={2} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary Footer */}
            <div className="p-5 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-900 flex items-center justify-center rounded-sm">
                  <Check className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div>
                  <span className="text-sm text-slate-600">
                    All <span className="text-slate-900 font-semibold">6 features</span> available on Fragma
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

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
