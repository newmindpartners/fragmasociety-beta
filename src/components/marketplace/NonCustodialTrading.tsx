import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Wallet, Key, FileCode, CheckCircle2 } from "lucide-react";

export const NonCustodialTrading = () => {
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => { const interval = setInterval(() => setActiveStep((prev) => (prev + 1) % 4), 3000); return () => clearInterval(interval); }, []);

  const steps = [
    { icon: Wallet, title: "Connect Wallet", subtitle: "Your keys, your control" },
    { icon: Key, title: "Sign Transaction", subtitle: "Authorize with your wallet" },
    { icon: FileCode, title: "Smart Contract", subtitle: "Trustless execution" },
    { icon: CheckCircle2, title: "Settlement", subtitle: "Instant and final" },
  ];

  const iconAnimations = {
    idle: { scale: 1, rotate: 0 },
    active: { 
      scale: [1, 1.15, 1],
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.6, repeat: Infinity, repeatDelay: 1.5 }
    }
  };

  const pulseAnimation = {
    idle: { boxShadow: "0 0 0 0 rgba(30,41,59,0)" },
    active: {
      boxShadow: [
        "0 0 0 0 rgba(30,41,59,0.2)",
        "0 0 0 12px rgba(30,41,59,0)",
      ],
      transition: { duration: 1.2, repeat: Infinity }
    }
  };

  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden section-light">
      {/* Light background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-white to-stone-100" />
      
      {/* Subtle accent glows for light mode */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-stone-200/40 rounded-full blur-3xl" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(30,41,59,0.03) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-slate-300" />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'hsl(var(--light-text-muted))' }}>Non-Custodial</span>
            <div className="w-12 h-px bg-slate-300" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-3xl sm:text-4xl md:text-5xl font-light leading-[1.1]" 
            style={{ 
              fontFamily: "'Playfair Display', serif",
              color: 'hsl(var(--light-text))',
            }}
          >
            Your Assets. <span className="italic" style={{ color: 'hsl(var(--light-text-muted))' }}>Your Control.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.2 }} 
            className="text-lg mt-6" 
            style={{ color: 'hsl(var(--light-text-muted))' }}
          >
            Trade directly from your wallet. No deposits, no trust required.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className={`p-6 border rounded-lg transition-all duration-300 ${
                i === activeStep 
                  ? 'bg-white border-slate-200 shadow-lg' 
                  : 'bg-white/80 border-slate-200/60 hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <motion.div 
                className={`w-12 h-12 border flex items-center justify-center mb-4 rounded-sm ${
                  i === activeStep 
                    ? 'border-slate-800 bg-slate-900' 
                    : 'border-slate-300 bg-slate-100'
                }`}
                variants={pulseAnimation}
                animate={i === activeStep ? "active" : "idle"}
              >
                <motion.div
                  variants={iconAnimations}
                  animate={i === activeStep ? "active" : "idle"}
                >
                  <step.icon 
                    className={`w-5 h-5 ${i === activeStep ? 'text-white' : 'text-slate-600'}`} 
                    strokeWidth={1.5} 
                  />
                </motion.div>
              </motion.div>
              <h3 className="font-medium mb-1" style={{ color: 'hsl(var(--light-text))' }}>{step.title}</h3>
              <p className="text-xs" style={{ color: 'hsl(var(--light-text-muted))' }}>{step.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom border accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(148,163,184,0.4) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};
