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
  useEffect(() => { const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % 6), 3000); return () => clearInterval(interval); }, []);

  return (
    <section className="py-32 bg-slate-50/50 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-slate-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">How To Trade</span>
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-light text-slate-900 leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your first trade, <span className="italic text-slate-500">step by step.</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              onClick={() => setActiveStep(i)} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
              className={`p-8 border cursor-pointer transition-all duration-300 ${activeStep === i ? 'bg-white border-slate-400/50' : 'bg-white/80 border-slate-200/80'}`}
              style={{ boxShadow: hoveredIndex === i ? '0 8px 24px -8px rgba(15, 23, 42, 0.12)' : '0 1px 3px rgba(0, 0, 0, 0.02)' }}>
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 border flex items-center justify-center ${activeStep === i ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
                  <step.icon className={`w-5 h-5 ${activeStep === i ? 'text-white' : 'text-slate-400'}`} strokeWidth={1.5} />
                </div>
                <span className={`text-5xl font-extralight italic ${activeStep === i ? 'text-slate-300' : 'text-slate-200'}`} style={{ fontFamily: "'Playfair Display', serif" }}>{step.step}</span>
              </div>
              <h3 className="text-lg font-medium text-slate-800 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
