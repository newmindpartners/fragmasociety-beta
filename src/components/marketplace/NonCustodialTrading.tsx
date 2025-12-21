import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Wallet, Key, FileCode, CheckCircle2, ShieldCheck } from "lucide-react";

export const NonCustodialTrading = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % 4), 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Wallet, title: "Connect Wallet", subtitle: "Your keys, your control" },
    { icon: Key, title: "Sign Transaction", subtitle: "Authorize with your wallet" },
    { icon: FileCode, title: "Smart Contract", subtitle: "Trustless execution" },
    { icon: CheckCircle2, title: "Settlement", subtitle: "Instant and final" },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 bg-primary/5 rounded-full blur-[120px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-xs font-semibold tracking-widest uppercase rounded-full bg-secondary/80 text-foreground border border-border/50">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Non-Custodial
          </span>
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-[1.1]">
            Your Assets. <span className="text-gradient italic">Your Control.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Trade directly from your wallet. No deposits, no trust required.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl border transition-all ${i === activeStep ? 'bg-card/80 border-primary/50' : 'bg-card/40 border-border/40'}`}>
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${i === activeStep ? 'bg-primary' : 'bg-primary/10'}`}>
                <step.icon className={`w-6 h-6 ${i === activeStep ? 'text-primary-foreground' : 'text-primary'}`} />
              </div>
              <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.subtitle}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-card/60 rounded-full border border-border/50">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="text-muted-foreground">Powered by <span className="text-foreground font-medium">Cardano</span> and <span className="text-foreground font-medium">Genius Yield</span></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
