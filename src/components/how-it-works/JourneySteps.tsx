import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, CreditCard, TrendingUp, ArrowLeftRight, Check, ArrowRight, Wallet, FileCheck, Coins } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Browse curated deals",
    description: "Explore tokenized real estate, film rights, private credit and more."
  },
  {
    step: "02",
    icon: CreditCard,
    title: "Invest from €50",
    description: "Choose your amount, pay via bank or crypto, sign digitally."
  },
  {
    step: "03",
    icon: Coins,
    title: "Receive your tokens",
    description: "Tokens are delivered to your wallet, representing fractional ownership."
  },
  {
    step: "04",
    icon: TrendingUp,
    title: "Earn automated yields",
    description: "Smart contracts distribute payouts directly to your wallet on schedule."
  },
  {
    step: "05",
    icon: Wallet,
    title: "Hold in Smart Vault",
    description: "Secure your tokens in non-custodial smart vaults for added protection."
  },
  {
    step: "06",
    icon: ArrowLeftRight,
    title: "Trade 24/7",
    description: "List and trade your positions anytime on the secondary marketplace."
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
            ? 'bg-white/[0.08] backdrop-blur-xl border-turquoise/40 shadow-lg shadow-turquoise/10' 
            : 'bg-white/[0.03] backdrop-blur-sm border-white/10 hover:border-turquoise/30 hover:bg-white/[0.06]'
        }`}
      >
        {/* Active indicator glow */}
        {isActive && (
          <motion.div
            layoutId="activeGlow"
            className="absolute inset-0 bg-gradient-to-br from-turquoise/10 to-transparent pointer-events-none"
          />
        )}
        
        {/* Top row */}
        <div className="relative flex items-start justify-between mb-5">
          <motion.div
            animate={isActive ? { scale: 1.1 } : { scale: 1 }}
            className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isActive 
                ? 'bg-turquoise text-background shadow-lg shadow-turquoise/30' 
                : 'bg-white/10 text-white/70 group-hover:bg-turquoise/20 group-hover:text-turquoise'
            }`}
          >
            <Icon className="w-7 h-7" />
          </motion.div>
          
          <motion.span 
            animate={{ 
              color: isActive ? "hsl(var(--turquoise))" : "rgba(255,255,255,0.15)",
            }}
            className="text-5xl font-serif font-bold italic"
          >
            {step.step}
          </motion.span>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className={`text-xl font-semibold mb-3 transition-colors duration-500 ${
            isActive ? 'text-white' : 'text-white/80 group-hover:text-white'
          }`}>
            {step.title}
          </h3>
          <p className={`text-sm leading-relaxed transition-colors duration-500 ${
            isActive ? 'text-white/70' : 'text-white/50 group-hover:text-white/60'
          }`}>
            {step.description}
          </p>
        </div>

        {/* Active indicator line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-turquoise to-turquoise/60 origin-left rounded-b-2xl"
        />
      </motion.div>
    </motion.div>
  );
};

export const JourneySteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-background relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />
      
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-32 left-10 w-64 h-64 rounded-full bg-turquoise/5 blur-3xl"
        />
        <motion.div
          animate={{ y: [15, -15, 15], x: [5, -5, 5] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-32 right-10 w-80 h-80 rounded-full bg-white/5 blur-3xl"
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-turquoise/10 text-turquoise border border-turquoise/20">
              <FileCheck className="w-3.5 h-3.5" />
              Your Investment Journey
            </span>
            
            <h2 className="text-4xl lg:text-6xl font-serif font-light text-white mb-6 tracking-tight">
              From discovery
              <br />
              <span className="text-turquoise">to earnings.</span>
            </h2>
            
            <p className="text-xl text-white/60 leading-relaxed">
              Six simple steps to transform how you build wealth through fractional ownership.
            </p>
          </motion.div>
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  activeStep === i 
                    ? 'w-12 bg-turquoise' 
                    : 'w-3 bg-white/20 hover:bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-sm text-white/50">
            Step <span className="text-turquoise font-semibold">{activeStep + 1}</span> of 6
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

        {/* Bottom highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            className="inline-block max-w-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-10"
          >
            <h3 className="text-2xl lg:text-3xl font-serif font-light text-white mb-4">
              Built for <span className="text-turquoise">everyone</span>.
            </h3>
            <p className="text-white/60 mb-8 leading-relaxed">
              Whether you're new to investing or an experienced portfolio manager, 
              Fragma makes fractional ownership accessible, transparent, and rewarding.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3">
              {["Full ownership", "Automated payouts", "Transparent pricing", "Secondary liquidity"].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="px-4 py-2 text-sm rounded-full bg-white/5 text-white/70 border border-white/10 font-medium"
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
