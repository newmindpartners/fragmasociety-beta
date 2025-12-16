import { motion, AnimatePresence } from "framer-motion";
import { Wallet, Search, Edit3, Lock, Zap, RefreshCcw, ChevronRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import tradingStepsBg from "@/assets/trading-steps-bg.jpg";

const steps = [
  {
    icon: Wallet,
    step: "01",
    title: "Login and create your wallet",
    description: "Your assets remain fully in your control. Quick signup, no KYC hassle."
  },
  {
    icon: Search,
    step: "02",
    title: "Choose the tokenised asset",
    description: "Real estate, private credit, entertainment, luxury goods — all tradeable on one platform."
  },
  {
    icon: Edit3,
    step: "03",
    title: "Place a buy or sell order",
    description: "Set your price. No forced market rates. Full control over your trading strategy."
  },
  {
    icon: Lock,
    step: "04",
    title: "Smart contract locks your order",
    description: "Your funds stay in your Smart Vault until matched. Secure and transparent."
  },
  {
    icon: Zap,
    step: "05",
    title: "Trade executes automatically",
    description: "When prices match, settlement happens instantly on Cardano. No delays."
  },
  {
    icon: RefreshCcw,
    step: "06",
    title: "You keep full control",
    description: "Withdraw, trade again, or place options — all non-custodial, always yours."
  }
];

// Floating particle component
const FloatingParticle = ({ delay, duration, size, left, top }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      y: [-20, -100],
      x: [0, Math.random() * 40 - 20]
    }}
    transition={{ 
      duration, 
      delay, 
      repeat: Infinity,
      ease: "easeOut"
    }}
    className="absolute rounded-full bg-primary/60 blur-sm"
    style={{ width: size, height: size, left: `${left}%`, top: `${top}%` }}
  />
);

// Animated connection line between cards
const ConnectionLine = ({ isActive }: { isActive: boolean }) => (
  <div className="hidden lg:flex items-center justify-center w-8 h-full relative">
    <div className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ top: "0%", opacity: 0 }}
          animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute w-1 h-8 bg-gradient-to-b from-primary via-primary to-transparent rounded-full blur-sm"
        />
      )}
    </AnimatePresence>
  </div>
);

// Premium step card with 3D hover effect
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
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      className="group relative cursor-pointer perspective-1000"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Outer glow */}
      <motion.div 
        animate={{ 
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.95
        }}
        transition={{ duration: 0.5 }}
        className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/40 via-primary/20 to-transparent blur-xl" 
      />
      
      {/* Card */}
      <motion.div
        whileHover={{ 
          y: -8, 
          rotateX: 2,
          rotateY: -2,
        }}
        transition={{ duration: 0.3 }}
        className={`
          relative h-full rounded-2xl p-6 backdrop-blur-xl overflow-hidden
          border transition-all duration-500
          ${isActive 
            ? 'bg-white/[0.08] border-primary/40 shadow-[0_0_60px_rgba(45,212,191,0.15)]' 
            : 'bg-white/[0.03] border-white/[0.08] hover:border-primary/30'
          }
        `}
      >
        {/* Animated background gradient */}
        <motion.div
          animate={{ 
            opacity: isActive ? 1 : 0,
            backgroundPosition: ["0% 0%", "100% 100%"]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
        />
        
        {/* Top row: Icon + Step number */}
        <div className="relative flex items-start justify-between mb-5">
          {/* Icon with glow */}
          <motion.div
            animate={isActive ? { 
              boxShadow: [
                "0 0 0 0 rgba(45,212,191,0.4)",
                "0 0 30px 5px rgba(45,212,191,0.2)",
                "0 0 0 0 rgba(45,212,191,0.4)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className={`
              w-14 h-14 rounded-xl flex items-center justify-center
              transition-all duration-500 border
              ${isActive 
                ? 'bg-primary/20 border-primary/40' 
                : 'bg-white/[0.05] border-white/[0.1] group-hover:bg-primary/10 group-hover:border-primary/30'
              }
            `}
          >
            <Icon className={`w-7 h-7 transition-colors duration-500 ${isActive ? 'text-primary' : 'text-white/70 group-hover:text-primary'}`} />
          </motion.div>
          
          {/* Step number */}
          <motion.span 
            animate={{ 
              color: isActive ? "rgba(45,212,191,0.6)" : "rgba(255,255,255,0.15)",
              scale: isActive ? 1.05 : 1
            }}
            transition={{ duration: 0.3 }}
            className="text-5xl font-serif font-bold italic"
          >
            {step.step}
          </motion.span>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/90 group-hover:text-white'}`}>
            {step.title}
          </h3>
          <p className={`text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-white/70' : 'text-white/45 group-hover:text-white/60'}`}>
            {step.description}
          </p>
        </div>

        {/* Active indicator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary to-transparent origin-left"
        />
        
        {/* Corner sparkle */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-4 right-4"
            >
              <Sparkles className="w-4 h-4 text-primary/60" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export const TradingSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  // Auto-cycle through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${tradingStepsBg})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-background/85" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            duration={4 + Math.random() * 3}
            size={3 + Math.random() * 4}
            left={Math.random() * 100}
            top={60 + Math.random() * 40}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-xs font-medium tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.div>
              How To Trade
            </motion.span>
            
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
              Step-by-step:{" "}
              <span className="text-gradient">your first trade</span>
            </h2>
            
            <p className="text-lg text-white/50 leading-relaxed max-w-2xl mx-auto">
              From wallet connection to settlement — here's exactly how trading works on Fragma Society.
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
                className={`
                  h-1.5 rounded-full transition-all duration-500 cursor-pointer
                  ${activeStep === i 
                    ? 'w-12 bg-primary shadow-[0_0_20px_rgba(45,212,191,0.5)]' 
                    : 'w-3 bg-white/20 hover:bg-white/30'
                  }
                `}
              />
            ))}
          </div>
          <p className="text-center text-sm text-white/40">
            Step <span className="text-primary font-medium">{activeStep + 1}</span> of 6
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
            whileHover={{ scale: 1.02 }}
            className="relative inline-block"
          >
            {/* Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 blur-xl opacity-60" />
            
            <div className="relative rounded-2xl p-8 lg:p-10 backdrop-blur-xl bg-white/[0.03] border border-primary/20 max-w-2xl">
              <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4">
                Built for beginners. Secure for professionals.
              </h3>
              <p className="text-white/50 mb-8 leading-relaxed">
                Whether you're new to RWA or an experienced trader, the marketplace gives you 
                full ownership, clear pricing, and smart-contract safety.
              </p>
              
              {/* Feature tags */}
              <div className="flex flex-wrap justify-center gap-3">
                {["Full ownership", "Clear pricing", "Transparent execution", "Real liquidity", "Smart-contract safety"].map((tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(45,212,191,0.5)" }}
                    className="px-4 py-2 text-sm rounded-full bg-white/[0.03] text-white/80 border border-white/10 hover:text-primary transition-colors cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
