import { motion, AnimatePresence } from "framer-motion";
import { Wallet, FileCode, Ban, Shield, ArrowRight, Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const FlowStep = ({ 
  icon: Icon, 
  title, 
  subtitle,
  isActive,
  index
}: { 
  icon: any; 
  title: string; 
  subtitle: string;
  isActive: boolean;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="flex flex-col items-center text-center relative"
  >
    {/* Turquoise glow ring when active */}
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-primary/20 blur-2xl"
        />
      )}
    </AnimatePresence>
    
    <motion.div
      animate={isActive ? {
        scale: [1, 1.02, 1],
      } : { scale: 1 }}
      transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
      className={`
        relative w-20 h-20 rounded-2xl flex items-center justify-center mb-4
        backdrop-blur-xl border-2 transition-all duration-700
        ${isActive 
          ? 'bg-primary/10 border-primary/50 shadow-[0_0_40px_rgba(45,212,191,0.3)]' 
          : 'bg-white/5 border-white/10'
        }
      `}
    >
      {/* Inner glow */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent"
        />
      )}
      <Icon className={`w-9 h-9 relative z-10 transition-colors duration-500 ${isActive ? 'text-primary' : 'text-white/60'}`} />
    </motion.div>
    
    <h3 className={`font-semibold text-lg mb-1 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/70'}`}>
      {title}
    </h3>
    <p className={`text-sm transition-colors duration-500 ${isActive ? 'text-primary/80' : 'text-white/40'}`}>
      {subtitle}
    </p>
  </motion.div>
);

const AnimatedConnector = ({ isAnimating, delay }: { isAnimating: boolean; delay: number }) => (
  <div className="hidden lg:flex items-center justify-center w-24 relative">
    {/* Static line */}
    <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-white/10" />
    
    {/* Animated pulse traveling */}
    <AnimatePresence>
      {isAnimating && (
        <motion.div
          initial={{ left: 0, opacity: 0 }}
          animate={{ left: "100%", opacity: [0, 1, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute w-8 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        />
      )}
    </AnimatePresence>
    
    {/* Arrow */}
    <motion.div
      animate={isAnimating ? { x: [0, 4, 0], opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <ArrowRight className={`w-5 h-5 transition-colors duration-500 ${isAnimating ? 'text-primary' : 'text-white/30'}`} />
    </motion.div>
  </div>
);

const BenefitCard = ({ 
  icon: Icon, 
  title, 
  description, 
  index 
}: { 
  icon: any; 
  title: string; 
  description: string;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15 * index, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Turquoise border glow on hover */}
      <motion.div 
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/40 via-primary/20 to-transparent blur-sm" 
      />
      
      {/* Card */}
      <div className="relative h-full rounded-2xl p-7 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] group-hover:border-primary/30 transition-all duration-500 overflow-hidden">
        {/* Subtle gradient overlay on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"
        />
        
        {/* Icon with turquoise accent */}
        <div className="relative z-10">
          <motion.div 
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-5 group-hover:border-primary/30 group-hover:bg-primary/10 transition-all duration-500"
          >
            <Icon className="w-7 h-7 text-white/70 group-hover:text-primary transition-colors duration-500" />
          </motion.div>
          
          {/* Content */}
          <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-white transition-colors">
            {title}
          </h3>
          <p className="text-white/45 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
            {description}
          </p>
        </div>
        
        {/* Corner accent */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 right-4"
        >
          <Sparkles className="w-4 h-4 text-primary/60" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export const NonCustodialTrading = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const flowSteps = [
    { icon: Wallet, title: "Your Wallet", subtitle: "Full control, always" },
    { icon: FileCode, title: "Smart Contract", subtitle: "Trustless execution" },
    { icon: Shield, title: "On-Chain Settlement", subtitle: "Instant & verifiable" }
  ];

  const benefits = [
    {
      icon: Wallet,
      title: "In your wallet",
      description: "Assets remain in your personal wallet at all times"
    },
    {
      icon: FileCode,
      title: "Smart contracts only",
      description: "All trades executed by immutable code, not humans"
    },
    {
      icon: Ban,
      title: "No custody risk",
      description: "Eliminate the biggest risk in finance: centralized custody failure"
    }
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Ambient turquoise glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              <Shield className="w-3.5 h-3.5" />
              Non-Custodial
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6 tracking-tight">
              End-to-end{" "}
              <span className="text-gradient">non-custodial</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed">
              Fragma never touches your funds. We never hold your tokens. We never store your cash.
            </p>
          </motion.div>
        </div>

        {/* Flow Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto mb-16"
        >
          {/* Outer glow border */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/20 via-white/5 to-transparent opacity-60" />
          
          <div className="relative rounded-3xl p-10 lg:p-14 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]">
            {/* Flow Steps */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
              <FlowStep {...flowSteps[0]} isActive={activeStep === 0} index={0} />
              <AnimatedConnector isAnimating={activeStep === 0} delay={0} />
              <FlowStep {...flowSteps[1]} isActive={activeStep === 1} index={1} />
              <AnimatedConnector isAnimating={activeStep === 1} delay={0} />
              <FlowStep {...flowSteps[2]} isActive={activeStep === 2} index={2} />
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-10">
              {[0, 1, 2].map((i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    activeStep === i ? 'w-10 bg-primary' : 'w-2 bg-white/20 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Central Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-primary/5 border border-primary/20">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Check className="w-4 h-4 text-primary" />
                </motion.div>
                <p className="text-white/90 text-sm font-medium">
                  Everything happens directly in your wallet, on your terms
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => (
            <BenefitCard key={i} {...benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
