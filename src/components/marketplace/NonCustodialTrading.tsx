import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Wallet, ArrowRight, ShieldCheck, Key, Lock, Sparkles, CheckCircle2, FileCode } from "lucide-react";
import malibuImage from "@/assets/property-malibu.jpg";
import palisadesImage from "@/assets/palisades-rebuild.jpg";

export const NonCustodialTrading = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { icon: Wallet, title: "Connect Wallet", subtitle: "Your keys, your control" },
    { icon: Key, title: "Sign Transaction", subtitle: "Authorize with your wallet" },
    { icon: FileCode, title: "Smart Contract", subtitle: "Trustless execution" },
    { icon: CheckCircle2, title: "Settlement", subtitle: "Instant and final" },
  ];

  const benefits = [
    {
      title: "You Hold Your Keys",
      description: "Assets never leave your wallet until the trade is complete. No intermediary custody.",
      icon: Key
    },
    {
      title: "No Counterparty Risk",
      description: "Smart contracts ensure atomic swaps. Either both parties get what they agreed, or nothing happens.",
      icon: ShieldCheck
    },
    {
      title: "Instant Settlement",
      description: "Trades settle in seconds, not days. No clearing houses, no delays.",
      icon: Sparkles
    },
    {
      title: "Full Transparency",
      description: "Every transaction is recorded on-chain. Complete audit trail, always.",
      icon: Lock
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-cream">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(90deg, hsl(var(--light-border)) 1px, transparent 1px), linear-gradient(hsl(var(--light-border)) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
      </div>
      
      {/* Floating asset images */}
      <motion.div
        animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-32 left-10 w-48 h-32 rounded-xl overflow-hidden opacity-10 rotate-[-8deg]"
      >
        <img src={malibuImage} alt="" className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        animate={{ y: [15, -15, 15], x: [5, -5, 5] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-32 right-10 w-56 h-36 rounded-xl overflow-hidden opacity-10 rotate-[8deg]"
      >
        <img src={palisadesImage} alt="" className="w-full h-full object-cover" />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            Non-Custodial
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-light-text mb-6">
            Your Assets.
            <span className="block text-primary">Your Control.</span>
          </h2>
          <p className="text-xl text-light-text-muted max-w-2xl mx-auto">
            Trade directly from your wallet. No deposits, no withdrawals, no trust required.
          </p>
        </motion.div>

        {/* Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="relative max-w-4xl mx-auto">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-light-border hidden md:block" />
            <motion.div 
              className="absolute top-1/2 left-0 h-px bg-primary hidden md:block"
              initial={{ width: 0 }}
              whileInView={{ width: `${((activeStep + 1) / 4) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div 
                    className={`relative z-10 p-6 rounded-2xl border transition-all duration-500 bg-white ${
                      i === activeStep 
                        ? 'border-primary shadow-elegant' 
                        : i < activeStep
                        ? 'border-primary/50'
                        : 'border-light-border'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ${
                      i === activeStep 
                        ? 'bg-primary text-primary-foreground' 
                        : i < activeStep
                        ? 'bg-primary/20 text-primary'
                        : 'bg-light-surface text-light-text-muted'
                    }`}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <h3 className={`font-bold mb-1 transition-colors ${
                      i <= activeStep ? 'text-light-text' : 'text-light-text-muted'
                    }`}>{step.title}</h3>
                    <p className="text-sm text-light-text-muted">{step.subtitle}</p>
                    
                    {/* Pulse effect on active */}
                    {i === activeStep && (
                      <motion.div
                        animate={{ scale: [1, 1.02, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl border-2 border-primary"
                      />
                    )}
                  </div>
                  
                  {/* Arrow */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-5 -translate-y-1/2 z-20">
                      <ArrowRight className={`w-5 h-5 transition-colors ${
                        i < activeStep ? 'text-primary' : 'text-light-border'
                      }`} />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-8 bg-white rounded-2xl border border-light-border hover:border-primary/50 hover:shadow-elegant transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-light-text mb-2">{benefit.title}</h3>
                    <p className="text-light-text-muted leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-light-border shadow-elegant">
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="text-light-text-muted">
              Powered by <span className="text-light-text font-medium">Cardano</span> blockchain and <span className="text-light-text font-medium">Genius Yield</span> smart contracts
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
