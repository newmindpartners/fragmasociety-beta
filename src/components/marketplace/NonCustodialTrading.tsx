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
    idle: { boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
    active: {
      boxShadow: [
        "0 0 0 0 rgba(255,255,255,0.3)",
        "0 0 0 12px rgba(255,255,255,0)",
      ],
      transition: { duration: 1.2, repeat: Infinity }
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Deep slate/navy background - matching SignatureDealsBanner */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Violet glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-violet-900/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-slate-700/20 rounded-full blur-3xl" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.08) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Non-Custodial</span>
            <div className="w-12 h-px" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            className="text-4xl md:text-5xl font-light leading-[1.1]" 
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Your Assets. <span className="italic" style={{ color: 'rgba(255,255,255,0.5)', WebkitTextFillColor: 'unset' }}>Your Control.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Trade directly from your wallet. No deposits, no trust required.</motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1 }}
              className={`p-6 border transition-all duration-300 ${i === activeStep ? 'bg-white/5 border-white/20' : 'bg-white/[0.02] border-white/10'}`}
            >
              <motion.div 
                className={`w-12 h-12 border flex items-center justify-center mb-4 rounded-sm ${i === activeStep ? 'border-white bg-white' : 'border-white/20 bg-white/5'}`}
                variants={pulseAnimation}
                animate={i === activeStep ? "active" : "idle"}
              >
                <motion.div
                  variants={iconAnimations}
                  animate={i === activeStep ? "active" : "idle"}
                >
                  <step.icon className={`w-5 h-5 ${i === activeStep ? 'text-slate-900' : 'text-white/60'}`} strokeWidth={1.5} />
                </motion.div>
              </motion.div>
              <h3 className="font-medium text-white mb-1">{step.title}</h3>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom border accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};
