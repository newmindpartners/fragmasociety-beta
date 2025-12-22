import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Wallet, Key, FileCode, CheckCircle2, ArrowRight, Lock, Shield } from "lucide-react";

export const NonCustodialTrading = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => { 
    const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % 4), 3000); 
    return () => clearInterval(interval); 
  }, []);

  const steps = [
    { icon: Wallet, title: "Connect Wallet", subtitle: "Your keys, your control", number: "01" },
    { icon: Key, title: "Sign Transaction", subtitle: "Authorize with your wallet", number: "02" },
    { icon: FileCode, title: "Smart Contract", subtitle: "Trustless execution", number: "03" },
    { icon: CheckCircle2, title: "Settlement", subtitle: "Instant and final", number: "04" },
  ];

  const benefits = [
    { icon: Lock, text: "No deposits required" },
    { icon: Shield, text: "100% self-custody" },
    { icon: Key, text: "You hold your keys" },
  ];

  return (
    <section className="py-28 lg:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Subtle glow accents */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 60%)',
          filter: 'blur(100px)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="mb-8"
            >
              <span className="px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] bg-slate-800/80 text-slate-300 border border-slate-700/50 rounded-sm">
                Non-Custodial Trading
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-tight mb-6" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Your Assets.
              <br />
              <span className="text-primary italic">Your Control.</span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }} 
              className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg"
            >
              Trade directly from your wallet. No deposits, no intermediaries, no trust required. 
              Your private keys never leave your control.
            </motion.p>

            {/* Benefits pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {benefits.map((benefit, i) => (
                <div 
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-sm"
                >
                  <benefit.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  <span className="text-sm text-slate-300">{benefit.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.4 }}
            >
              <button className="group inline-flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors duration-200">
                <span>Learn how it works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          </div>

          {/* Right: Steps visualization */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {steps.map((step, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: 0.1 * i }}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`relative p-6 rounded-sm border transition-all duration-300 cursor-pointer group ${
                    i === activeStep 
                      ? 'bg-slate-800/60 border-primary/40' 
                      : 'bg-slate-900/50 border-slate-700/30 hover:bg-slate-800/40 hover:border-slate-600/50'
                  }`}
                >
                  {/* Step number */}
                  <span 
                    className="absolute top-4 right-4 text-xs font-medium text-slate-600"
                  >
                    {step.number}
                  </span>

                  {/* Active indicator */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-l-sm"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: i === activeStep ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 transition-all duration-300 ${
                    i === activeStep 
                      ? 'bg-primary text-white' 
                      : 'bg-slate-800 border border-slate-700/50 text-slate-400 group-hover:text-slate-300'
                  }`}>
                    <step.icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className={`font-medium mb-1 transition-colors duration-300 ${
                    i === activeStep ? 'text-white' : 'text-slate-300'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500">{step.subtitle}</p>

                  {/* Connection line for active step */}
                  {i === activeStep && i < steps.length - 1 && (
                    <motion.div
                      className="absolute -bottom-4 left-1/2 w-px h-4 bg-primary/40"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress indicator */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {steps.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeStep 
                      ? 'w-8 bg-primary' 
                      : 'w-2 bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
};
