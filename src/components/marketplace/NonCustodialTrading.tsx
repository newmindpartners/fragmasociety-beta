import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Wallet, Key, FileCode, CheckCircle2, ShieldCheck } from "lucide-react";

export const NonCustodialTrading = () => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => { const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % 4), 3000); return () => clearInterval(interval); }, []);

  const steps = [
    { icon: Wallet, title: "Connect Wallet", subtitle: "Your keys, your control" },
    { icon: Key, title: "Sign Transaction", subtitle: "Authorize with your wallet" },
    { icon: FileCode, title: "Smart Contract", subtitle: "Trustless execution" },
    { icon: CheckCircle2, title: "Settlement", subtitle: "Instant and final" },
  ];

  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-slate-600" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-500 font-medium">Non-Custodial</span>
            <div className="w-12 h-px bg-slate-600" />
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-light text-white leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Assets. <span className="italic text-slate-400">Your Control.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-slate-400 mt-6">Trade directly from your wallet. No deposits, no trust required.</motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`p-6 border transition-all ${i === activeStep ? 'bg-slate-800 border-slate-600' : 'bg-slate-800/30 border-slate-700/50'}`}>
              <div className={`w-12 h-12 border flex items-center justify-center mb-4 ${i === activeStep ? 'border-white bg-white' : 'border-slate-600 bg-slate-800'}`}>
                <step.icon className={`w-5 h-5 ${i === activeStep ? 'text-slate-900' : 'text-slate-400'}`} strokeWidth={1.5} />
              </div>
              <h3 className="font-medium text-white mb-1">{step.title}</h3>
              <p className="text-xs text-slate-400">{step.subtitle}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-slate-800 border border-slate-700">
            <ShieldCheck className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-400">Powered by <span className="text-white font-medium">Cardano</span> and <span className="text-white font-medium">Genius Yield</span></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
