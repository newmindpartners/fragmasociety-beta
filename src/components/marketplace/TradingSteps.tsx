import { motion } from "framer-motion";
import { Wallet, Search, Edit3, Lock, Zap, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  { icon: Wallet, step: "01", title: "Connect your wallet", description: "Your assets remain in your control." },
  { icon: Search, step: "02", title: "Browse real assets", description: "Real estate, credit, entertainment — all tradeable." },
  { icon: Edit3, step: "03", title: "Place your order", description: "Set your price. Full control over your strategy." },
  { icon: Lock, step: "04", title: "Smart contract secures", description: "Funds stay in your vault until matched." },
  { icon: Zap, step: "05", title: "Instant execution", description: "Settlement happens instantly on Cardano." },
  { icon: RefreshCcw, step: "06", title: "Full ownership", description: "Withdraw, trade again — always non-custodial." }
];

export const TradingSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  useEffect(() => { 
    const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % 6), 3000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <section className="py-32 bg-[#0f172a] relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-slate-600" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-500 font-medium">How To Trade</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight" 
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Your first trade, <span className="italic text-violet-300">step by step.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveStep(i)} 
              onMouseEnter={() => setHoveredIndex(i)} 
              onMouseLeave={() => setHoveredIndex(null)}
              className={`p-8 border cursor-pointer transition-all duration-300 ${
                activeStep === i 
                  ? 'bg-[#1e293b] border-slate-600' 
                  : 'bg-[#1e293b]/50 border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`w-14 h-14 border flex items-center justify-center transition-all duration-300 ${
                  activeStep === i 
                    ? 'border-white bg-white' 
                    : hoveredIndex === i 
                      ? 'border-slate-500 bg-slate-700' 
                      : 'border-slate-600 bg-slate-800'
                }`}>
                  <step.icon className={`w-6 h-6 transition-colors duration-300 ${
                    activeStep === i ? 'text-[#1e293b]' : 'text-slate-400'
                  }`} strokeWidth={1.5} />
                </div>
                <span 
                  className={`text-6xl font-extralight transition-colors duration-300 ${
                    activeStep === i ? 'text-slate-500' : 'text-slate-700'
                  }`}
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {step.step}
                </span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">{step.title}</h3>
              <p className="text-sm text-slate-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mt-12"
        >
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeStep 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
