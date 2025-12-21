import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Zap, Shield, Clock, TrendingUp, ArrowLeftRight } from "lucide-react";
import { useState, useRef } from "react";

const benefits = [
  { icon: Zap, title: "Instant Execution", description: "Orders execute automatically when conditions are met" },
  { icon: Shield, title: "Price Protection", description: "Set your exact buy and sell prices upfront" },
  { icon: Clock, title: "24/7 Active", description: "Your orders work around the clock" },
  { icon: TrendingUp, title: "Maximize Returns", description: "Capture opportunities on both sides" },
];

export const TwoWayOrders = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden">
      {/* Luxury Magazine Background - matching HowItWorks */}
      <div className="absolute inset-0 bg-[#fafafa]" />
      
      {/* Elegant diagonal accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[120%] h-[200%] bg-gradient-to-br from-slate-100/80 via-slate-50/40 to-transparent rotate-12 origin-center" />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(90deg, #0f172a 1px, transparent 1px), linear-gradient(180deg, #0f172a 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Magazine accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Editorial Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 mb-6"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              Two-Way Orders
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-slate-300">
              Smart Trading
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-slate-900 leading-[0.95] tracking-tight"
            >
              Buy and Sell
              <span className="block font-serif italic text-slate-500 mt-2">in One Order</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-500 text-lg lg:text-xl leading-relaxed max-w-md lg:ml-auto font-light"
            >
              Set your entry and exit prices simultaneously. 
              Let the market work for you.
            </motion.p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[550px]">
              {/* Buy Order Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="absolute top-0 left-0 right-12 z-20"
              >
                <div className="bg-white border border-slate-200 p-6 rounded-sm" style={{ boxShadow: '0 8px 30px -10px rgba(0, 0, 0, 0.12)' }}>
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
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-medium rounded-sm">
                      <ArrowDownRight className="w-4 h-4" />
                      Buy
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-5 bg-emerald-50/50 border border-emerald-100 rounded-sm">
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
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute top-36 left-12 right-0 z-10"
              >
                <div className="bg-white border border-slate-200 p-6 rounded-sm" style={{ boxShadow: '0 8px 30px -10px rgba(0, 0, 0, 0.12)' }}>
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
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium rounded-sm">
                      <ArrowUpRight className="w-4 h-4" />
                      Sell
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-5 bg-rose-50/50 border border-rose-100 rounded-sm">
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
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute top-[300px] left-1/2 -translate-x-1/2 z-30"
              >
                <div className="w-16 h-16 bg-slate-900 border border-slate-700 flex items-center justify-center rounded-sm">
                  <ArrowLeftRight className="w-7 h-7 text-white" />
                </div>
              </motion.div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="absolute bottom-0 left-6 right-6"
              >
                <div className="bg-slate-900 border border-slate-700 p-6 rounded-sm">
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
          <motion.div 
            initial={{ opacity: 0, x: 40 }} 
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {/* Step Navigation Pills */}
            <div className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200/80 rounded-full shadow-sm mb-8">
              {benefits.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`relative px-4 py-2 rounded-full text-sm transition-all duration-500 ${
                    activeStep === index
                      ? 'text-white'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {activeStep === index && (
                    <motion.div
                      layoutId="twoway-pill"
                      className="absolute inset-0 bg-slate-900 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 font-medium">{`0${index + 1}`}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, i) => {
                const isActive = activeStep === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    onClick={() => setActiveStep(i)}
                    className={`group flex items-start gap-5 p-6 bg-white border transition-all duration-300 cursor-pointer rounded-sm ${
                      isActive ? 'border-slate-400/50 shadow-lg' : 'border-slate-200/80 hover:border-slate-400/50'
                    }`}
                  >
                    <div className={`w-12 h-12 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive 
                        ? 'border-slate-700 bg-slate-800' 
                        : 'border-slate-200 bg-white'
                    }`}>
                      <benefit.icon className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-400'
                      }`} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-slate-800 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-slate-500">{benefit.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-8 p-6 bg-slate-100 border-l-2 border-slate-400 rounded-r-sm"
            >
              <p className="text-slate-600 leading-relaxed">
                <span className="font-medium text-slate-800">How it works:</span> Place a single order that automatically buys at your target price and sells when your profit goal is reached.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </section>
  );
};
