import { motion } from "framer-motion";
import { Check, X, Zap, Shield, Users } from "lucide-react";
import { useState } from "react";

export const MarketplaceDifference = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const comparisons = [
    { feature: "True order book trading", traditional: false, fragma: true },
    { feature: "Non-custodial wallets", traditional: false, fragma: true },
    { feature: "Set your own price", traditional: false, fragma: true },
    { feature: "On-chain settlement", traditional: false, fragma: true },
    { feature: "Options trading", traditional: false, fragma: true },
    { feature: "Decentralized architecture", traditional: false, fragma: true },
  ];

  const highlights = [
    { icon: Zap, title: "True P2P", desc: "Direct trades, zero intermediaries" },
    { icon: Shield, title: "Your Keys", desc: "Complete asset ownership" },
    { icon: Users, title: "Open Market", desc: "Set your price, find buyers" },
  ];

  return (
    <section className="py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-slate-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
              The Difference
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Not just another
            <br />
            <span className="italic text-slate-500">trading platform.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-xl mt-6 leading-relaxed"
          >
            Traditional platforms give you buttons. We give you a real marketplace — 
            100% decentralized, completely non-custodial.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Highlights */}
          <div className="lg:col-span-4 space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group flex items-center gap-4 p-5 bg-white border border-slate-200/80 hover:border-slate-400/50 transition-all duration-300 cursor-pointer"
                style={{
                  boxShadow: hoveredIndex === i 
                    ? '0 8px 24px -8px rgba(15, 23, 42, 0.12)'
                    : '0 1px 3px rgba(0, 0, 0, 0.02)',
                }}
              >
                <div className={`w-12 h-12 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  hoveredIndex === i 
                    ? 'border-slate-700 bg-slate-800' 
                    : 'border-slate-200 bg-white'
                }`}>
                  <item.icon className={`w-5 h-5 transition-colors duration-300 ${
                    hoveredIndex === i ? 'text-white' : 'text-slate-400'
                  }`} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200/80"
              style={{ boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.06)' }}
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-5 border-b border-slate-100">
                <div className="col-span-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Feature</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-300">Traditional</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-700 font-medium">Fragma</span>
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
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-12 gap-4 p-5 items-center hover:bg-slate-50/50 transition-colors"
                  >
                    <div className="col-span-6">
                      <span className="text-sm text-slate-600">{item.feature}</span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <div className="w-7 h-7 rounded-full bg-rose-50 flex items-center justify-center">
                        <X className="w-3.5 h-3.5 text-rose-400" />
                      </div>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="p-5 bg-slate-50 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white border border-slate-200 flex items-center justify-center">
                    <Check className="w-4 h-4 text-slate-700" />
                  </div>
                  <span className="text-sm text-slate-600">
                    All <span className="text-slate-900 font-medium">6 features</span> available on Fragma
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
