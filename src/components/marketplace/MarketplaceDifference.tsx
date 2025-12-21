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

  const highlights = [
    { icon: Zap, title: "True P2P", desc: "Direct trades, zero intermediaries", number: "01" },
    { icon: Shield, title: "Your Keys", desc: "Complete asset ownership", number: "02" },
    { icon: Users, title: "Open Market", desc: "Set your price, find buyers", number: "03" },
  ];

  return (
    <section className="relative py-20 lg:py-24 overflow-hidden">
      {/* Premium Light Background */}
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
        {/* Header Section */}
        <div className="max-w-4xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
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
            className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 leading-[1.1] mb-5"
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
            className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl"
          >
            Traditional platforms give you buttons. We give you a real marketplace — 
            100% decentralized, completely non-custodial.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Highlights Cards */}
          <div className="lg:col-span-4 space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="group"
              >
                <div
                  className="relative p-6 overflow-hidden rounded-sm bg-white/90 border border-slate-200/80 hover:border-slate-300 hover:shadow-lg transition-all duration-300"
                >
                  {/* Large decorative number */}
                  <span 
                    className="absolute top-2 right-3 text-[60px] font-extralight leading-none text-slate-900/[0.04]"
                    style={{ fontFamily: 'serif' }}
                  >
                    {item.number}
                  </span>

                  {/* Icon container */}
                  <div className="w-11 h-11 mb-4 flex items-center justify-center border border-slate-200 bg-slate-50 group-hover:bg-slate-100 transition-colors duration-300">
                    <item.icon 
                      className="w-5 h-5 text-slate-600" 
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  {/* Title */}
                  <h4 className="text-base font-medium mb-1 text-slate-900">
                    {item.title}
                  </h4>
                  
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-white/90 border border-slate-200/80 rounded-sm overflow-hidden"
              style={{ boxShadow: '0 4px 30px -10px rgba(0, 0, 0, 0.08)' }}
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-5 border-b border-slate-100 bg-slate-50/50">
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
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
