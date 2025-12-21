import { motion } from "framer-motion";
import { Wallet, Search, Edit3, Lock, Zap, RefreshCcw, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Real asset images for visual context
const assetImages = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
];

const steps = [
  {
    icon: Wallet,
    step: "01",
    title: "Connect your wallet",
    description: "Your assets remain in your control. Quick signup, no KYC hassle."
  },
  {
    icon: Search,
    step: "02",
    title: "Browse real assets",
    description: "Real estate, private credit, entertainment — all tradeable on one platform."
  },
  {
    icon: Edit3,
    step: "03",
    title: "Place your order",
    description: "Set your price. No forced rates. Full control over your strategy."
  },
  {
    icon: Lock,
    step: "04",
    title: "Smart contract secures",
    description: "Your funds stay in your Smart Vault until matched. Secure and transparent."
  },
  {
    icon: Zap,
    step: "05",
    title: "Instant execution",
    description: "When prices match, settlement happens instantly on Cardano."
  },
  {
    icon: RefreshCcw,
    step: "06",
    title: "Full ownership",
    description: "Withdraw, trade again, or place options — always non-custodial."
  }
];

const StepCard = ({ 
  step, 
  index, 
  isActive, 
  onClick 
}: { 
  step: typeof steps[0]; 
  index: number; 
  isActive: boolean;
  onClick: () => void;
}) => {
  const Icon = step.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <motion.div
        whileHover={{ y: -8 }}
        animate={isActive ? { scale: 1.02 } : { scale: 1 }}
        className={`relative h-full rounded-2xl p-6 border transition-all duration-500 overflow-hidden ${
          isActive 
            ? 'bg-white shadow-light border-primary/30' 
            : 'bg-white/80 border-slate-200/60 hover:border-primary/20 hover:shadow-light'
        }`}
      >
        {/* Active indicator glow */}
        {isActive && (
          <motion.div
            layoutId="activeGlow"
            className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"
          />
        )}
        
        {/* Top row */}
        <div className="relative flex items-start justify-between mb-5">
          <motion.div
            animate={isActive ? { scale: 1.1 } : { scale: 1 }}
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isActive 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'bg-slate-100 text-slate-600 group-hover:bg-primary/10 group-hover:text-primary'
            }`}
          >
            <Icon className="w-7 h-7" />
          </motion.div>
          
          <motion.span 
            animate={{ 
              color: isActive ? "hsl(172 83% 50%)" : "hsl(220 15% 85%)",
            }}
            className="text-5xl font-serif font-bold italic"
          >
            {step.step}
          </motion.span>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
            isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
          }`}>
            {step.title}
          </h3>
          <p className={`text-sm leading-relaxed transition-colors duration-500 ${
            isActive ? 'text-slate-600' : 'text-slate-500 group-hover:text-slate-600'
          }`}>
            {step.description}
          </p>
        </div>

        {/* Active indicator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left rounded-b-2xl"
        />
      </motion.div>
    </motion.div>
  );
};

export const TradingSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 section-cream-mesh relative overflow-hidden">
      {/* Decorative asset images floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {assetImages.map((img, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 rounded-2xl overflow-hidden opacity-10"
            style={{
              top: `${15 + i * 20}%`,
              left: i % 2 === 0 ? `${5 + i * 3}%` : `${85 - i * 3}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, i % 2 === 0 ? 3 : -3, 0],
            }}
            transition={{ duration: 6 + i, repeat: Infinity }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              <Zap className="w-3.5 h-3.5" />
              How To Trade
            </span>
            
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 tracking-tight">
              Your first trade,
              <br />
              <span className="text-gradient">step by step.</span>
            </h2>
            
            <p className="text-xl text-slate-600 leading-relaxed">
              From wallet connection to settlement — here's exactly how trading works.
            </p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  activeStep === i 
                    ? 'w-12 bg-primary' 
                    : 'w-3 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-slate-500">
            Step <span className="text-primary font-semibold">{activeStep + 1}</span> of 6
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <StepCard 
              key={i} 
              step={step} 
              index={i} 
              isActive={activeStep === i}
              onClick={() => setActiveStep(i)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="inline-block max-w-2xl glass-light rounded-3xl p-10 shadow-light"
          >
            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-slate-900 mb-4">
              Built for <span className="text-gradient">everyone</span>. Secure for <span className="text-gradient">professionals</span>.
            </h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Whether you're new to RWA or an experienced trader, the marketplace gives you 
              full ownership, clear pricing, and smart-contract safety.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {["Full ownership", "Clear pricing", "Transparent execution", "Smart-contract safety"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="px-4 py-2 text-sm rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
