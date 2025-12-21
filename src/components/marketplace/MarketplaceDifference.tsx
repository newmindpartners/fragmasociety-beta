import { motion } from "framer-motion";
import { Check, X, Zap, Shield, Users } from "lucide-react";

export const MarketplaceDifference = () => {
  const comparisons = [
    { feature: "True order book trading", traditional: false, fragma: true },
    { feature: "Non-custodial wallets", traditional: false, fragma: true },
    { feature: "Set your own price", traditional: false, fragma: true },
    { feature: "On-chain settlement", traditional: false, fragma: true },
    { feature: "Options trading", traditional: false, fragma: true },
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
    <section className="relative py-20 overflow-hidden">
      {/* Premium Light Background - matching Features.tsx */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-slate-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
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
        {/* Section Header - Matching Features style */}
        <div className="max-w-3xl mb-16">
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
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 leading-[1.05] mb-6"
          >
            Not just another
            <br />
            <span className="italic text-slate-500 font-serif">trading platform.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 leading-relaxed max-w-xl"
          >
            Traditional platforms give you buttons. We give you a real marketplace — 
            100% decentralized, completely non-custodial.
          </motion.p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left - Differentiators */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {differentiators.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="group flex items-center gap-4 p-4 rounded-sm bg-white/90 border border-slate-200/80 transition-all duration-300 hover:border-violet-300/50 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className="w-10 h-10 rounded-sm bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:border-violet-500/30 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-slate-600 group-hover:text-violet-300 transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Comparison Table */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative bg-white/90 rounded-sm border border-slate-200/80 p-6"
              style={{
                boxShadow: '0 4px 30px -10px rgba(0, 0, 0, 0.08)'
              }}
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 mb-4 pb-3 border-b border-slate-200">
                <div className="col-span-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Feature</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400/60">Traditional</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-violet-600 font-medium">Fragma</span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-0">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="grid grid-cols-12 gap-4 py-3 border-b border-slate-100 items-center group cursor-default transition-colors hover:bg-slate-50/50 rounded-sm"
                  >
                    <div className="col-span-6">
                      <span className="text-sm text-slate-500 group-hover:text-slate-900 transition-colors">
                        {item.feature}
                      </span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {item.traditional ? (
                        <Check className="w-4 h-4 text-slate-400" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                          <X className="w-3 h-3 text-red-400" />
                        </div>
                      )}
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {item.fragma ? (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-violet-600" />
                        </motion.div>
                      ) : (
                        <X className="w-3 h-3 text-red-400" />
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
                transition={{ delay: 0.7 }}
                className="mt-6 flex items-center gap-3 p-3 rounded-sm border border-violet-200 bg-violet-50/50"
              >
                <div className="w-7 h-7 rounded-sm bg-violet-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-violet-600" />
                </div>
                <span className="text-sm text-slate-600">
                  All <span className="text-violet-600 font-medium">6 features</span> available on Fragma
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
