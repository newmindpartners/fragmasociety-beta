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
  useEffect(() => { const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % 6), 3000); return () => clearInterval(interval); }, []);

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0"><div className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[140px]" /></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-xs font-semibold tracking-widest uppercase rounded-full bg-secondary/80 text-foreground border border-border/50">
            <Zap className="w-3.5 h-3.5 text-primary" /> How To Trade
          </span>
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6">Your first trade, <span className="text-gradient italic">step by step.</span></h2>
          <p className="text-xl text-muted-foreground">From wallet connection to settlement — here's exactly how it works.</p>
        </motion.div>

        <div className="flex justify-center gap-2 mb-12">
          {steps.map((_, i) => (<button key={i} onClick={() => setActiveStep(i)} className={`h-2 rounded-full transition-all ${activeStep === i ? 'w-10 bg-primary' : 'w-3 bg-muted-foreground/30'}`} />))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} onClick={() => setActiveStep(i)}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${activeStep === i ? 'bg-card/80 border-primary/50' : 'bg-card/40 border-border/40 hover:border-border'}`}>
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${activeStep === i ? 'bg-primary' : 'bg-primary/10'}`}>
                  <step.icon className={`w-6 h-6 ${activeStep === i ? 'text-primary-foreground' : 'text-primary'}`} />
                </div>
                <span className={`text-4xl font-serif font-bold italic ${activeStep === i ? 'text-primary' : 'text-border'}`}>{step.step}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
