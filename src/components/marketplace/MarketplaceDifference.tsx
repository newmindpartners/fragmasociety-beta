import { motion } from "framer-motion";
import { Check, X, ArrowRight, Zap, Shield, Users } from "lucide-react";

// Real asset images for visual richness
import malibuImage from "@/assets/malibu-sea-view.jpg";
import commercialImage from "@/assets/rwa-commercial.jpg";

export const MarketplaceDifference = () => {
  const comparisons = [
    { feature: "True order book trading", traditional: false, fragma: true },
    { feature: "Non-custodial wallets", traditional: false, fragma: true },
    { feature: "Set your own price", traditional: false, fragma: true },
    { feature: "On-chain settlement", traditional: false, fragma: true },
    { feature: "Options trading", traditional: false, fragma: true },
    { feature: "No platform price control", traditional: false, fragma: true },
    { feature: "Decentralized architecture", traditional: false, fragma: true },
  ];

  const differentiators = [
    { 
      icon: Zap, 
      title: "True P2P", 
      desc: "Direct trades, zero intermediaries" 
    },
    { 
      icon: Shield, 
      title: "Your Keys", 
      desc: "Complete asset ownership" 
    },
    { 
      icon: Users, 
      title: "Open Market", 
      desc: "Set your price, find buyers" 
    },
  ];

  return (
    <section className="relative py-32 bg-slate-900 overflow-hidden">
      {/* Background - Split asymmetric with asset imagery */}
      <div className="absolute inset-0">
        {/* Left side - dark with subtle gradient */}
        <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900" />
        
        {/* Right side - asset image with heavy overlay */}
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <img 
            src={malibuImage} 
            alt="" 
            className="w-full h-full object-cover opacity-20"
            style={{ filter: 'grayscale(50%)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-l from-slate-900/80 via-slate-900/95 to-slate-900" />
        </div>

        {/* Subtle glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-slate-700/20 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header - Editorial */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-white/50 px-3 py-1.5 border border-white/10 rounded-full">
              <motion.span 
                className="w-1.5 h-1.5 rounded-full bg-white/60"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              The Difference
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Not just another
            <br />
            <span className="text-white/40">trading platform.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/50 max-w-xl leading-relaxed"
          >
            Traditional platforms give you buttons. We give you a real marketplace — 
            100% decentralized, completely non-custodial.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left - Quote & Differentiators */}
          <div className="lg:col-span-5">
            {/* Premium Quote Block */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative mb-12"
            >
              {/* Quote mark */}
              <span 
                className="absolute -top-8 -left-4 text-8xl text-white/5 font-serif leading-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                "
              </span>
              
              <blockquote className="relative z-10 pl-6 border-l-2 border-white/20">
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed mb-6"
                   style={{ fontFamily: "'Playfair Display', serif" }}>
                  You're not trading on Fragma. You're trading with other investors, 
                  using Fragma as the secure settlement layer.
                </p>
                <footer className="flex items-center gap-3">
                  <ArrowRight className="w-4 h-4 text-white/40" />
                  <span className="text-sm tracking-[0.1em] uppercase text-white/50">
                    True peer-to-peer trading
                  </span>
                </footer>
              </blockquote>
            </motion.div>

            {/* Differentiator Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-4"
            >
              {differentiators.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4, backgroundColor: 'rgba(255,255,255,0.08)' }}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm text-center transition-all duration-300"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-white/5 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-white/60" />
                  </div>
                  <h4 className="text-sm font-medium text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-white/40">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Visual asset preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 relative rounded-2xl overflow-hidden"
            >
              <img 
                src={commercialImage} 
                alt="Real estate asset" 
                className="w-full h-48 object-cover"
                style={{ filter: 'grayscale(30%) brightness(0.8)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs tracking-[0.15em] uppercase text-white/40 mb-1">Live on Market</p>
                <p className="text-white font-medium">Beverly Commercial · €5.2M</p>
              </div>
            </motion.div>
          </div>

          {/* Right - Comparison Table */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="col-span-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">Feature</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">Traditional</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-emerald-400/70">Fragma</span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-1">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                    className="grid grid-cols-12 gap-4 py-4 border-b border-white/5 items-center group cursor-default transition-colors rounded-lg"
                  >
                    <div className="col-span-6">
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        {item.feature}
                      </span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {item.traditional ? (
                        <Check className="w-4 h-4 text-white/30" />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-400/70" />
                        </div>
                      )}
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {item.fragma ? (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-emerald-400" />
                        </motion.div>
                      ) : (
                        <X className="w-4 h-4 text-red-400/70" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="mt-8 flex items-center justify-between p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm text-white/70">
                    All <span className="text-emerald-400 font-medium">7 features</span> available on Fragma
                  </span>
                </div>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 text-emerald-400/50" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
