import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Zap, Shield, Clock, TrendingUp, ArrowLeftRight } from "lucide-react";
import { useState } from "react";

export const TwoWayOrders = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const benefits = [
    { icon: Zap, title: "Instant Execution", description: "Orders execute automatically when conditions are met" },
    { icon: Shield, title: "Price Protection", description: "Set your exact buy and sell prices upfront" },
    { icon: Clock, title: "24/7 Active", description: "Your orders work around the clock" },
    { icon: TrendingUp, title: "Maximize Returns", description: "Capture opportunities on both sides" },
  ];

  return (
    <section className="py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-slate-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
              Two-Way Orders
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
            Buy and Sell in
            <br />
            <span className="italic text-slate-500">One Order.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-xl mt-6 leading-relaxed"
          >
            Set your entry and exit prices simultaneously. Let the market work for you.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[550px]">
              {/* Buy Order Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute top-0 left-0 right-12 z-20"
              >
                <div className="bg-white border border-slate-200 p-6" style={{ boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.08)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-600">MLV</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Malibu Villa Token</p>
                        <p className="text-base font-medium text-slate-800">MLV-001</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-medium">
                      <ArrowDownRight className="w-4 h-4" />
                      Buy
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-5 bg-emerald-50/50 border border-emerald-100">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Buy Price</p>
                      <p className="text-2xl font-medium text-emerald-600">$95,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Quantity</p>
                      <p className="text-2xl font-medium text-slate-800">10</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sell Order Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute top-36 left-12 right-0 z-10"
              >
                <div className="bg-white border border-slate-200 p-6" style={{ boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.08)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-slate-100 border border-slate-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-slate-600">LAF</span>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">LA Investment Fund</p>
                        <p className="text-base font-medium text-slate-800">LAF-002</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium">
                      <ArrowUpRight className="w-4 h-4" />
                      Sell
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-5 bg-rose-50/50 border border-rose-100">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Sell Price</p>
                      <p className="text-2xl font-medium text-rose-600">$125,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Quantity</p>
                      <p className="text-2xl font-medium text-slate-800">10</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connection */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-[300px] left-1/2 -translate-x-1/2 z-30"
              >
                <div className="w-16 h-16 bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <ArrowLeftRight className="w-7 h-7 text-white" />
                </div>
              </motion.div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-0 left-6 right-6"
              >
                <div className="bg-slate-800 border border-slate-700 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Potential Profit</p>
                      <p className="text-3xl font-medium text-white">+$300,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">ROI</p>
                      <p className="text-3xl font-medium text-emerald-400">31.5%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group flex items-start gap-5 p-6 bg-white border border-slate-200/80 hover:border-slate-400/50 transition-all duration-300 cursor-pointer"
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
                    <benefit.icon className={`w-5 h-5 transition-colors duration-300 ${
                      hoveredIndex === i ? 'text-white' : 'text-slate-400'
                    }`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-slate-800 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-slate-500">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-slate-100 border-l-2 border-slate-400"
            >
              <p className="text-slate-600 leading-relaxed">
                <span className="font-medium text-slate-800">How it works:</span> Place a single order that automatically buys at your target price and sells when your profit goal is reached.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
