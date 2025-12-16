import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Wallet, FileCode, Ban, Shield, ArrowRight, Check } from "lucide-react";
import { useEffect, useState } from "react";

const FlowStep = ({ 
  icon: Icon, 
  title, 
  subtitle,
  isActive,
  delay 
}: { 
  icon: any; 
  title: string; 
  subtitle: string;
  isActive: boolean;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    className="flex flex-col items-center text-center"
  >
    <motion.div
      animate={isActive ? {
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 0 0 0 rgba(255,255,255,0.1)",
          "0 0 60px 10px rgba(255,255,255,0.15)",
          "0 0 0 0 rgba(255,255,255,0.1)"
        ]
      } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className={`
        w-20 h-20 rounded-2xl flex items-center justify-center mb-4
        backdrop-blur-xl border transition-all duration-500
        ${isActive 
          ? 'bg-white/10 border-white/30' 
          : 'bg-white/5 border-white/10'
        }
      `}
    >
      <Icon className={`w-9 h-9 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/70'}`} />
    </motion.div>
    <h3 className={`font-medium text-lg mb-1 transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/80'}`}>
      {title}
    </h3>
    <p className="text-sm text-muted-foreground">{subtitle}</p>
  </motion.div>
);

const AnimatedArrow = ({ delay, isAnimating }: { delay: number; isAnimating: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.4 }}
    className="hidden lg:flex items-center justify-center px-4"
  >
    <motion.div
      animate={isAnimating ? { x: [0, 8, 0] } : {}}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      <ArrowRight className="w-5 h-5 text-white/40" />
    </motion.div>
  </motion.div>
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
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: 0.1 * index, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    whileHover={{ y: -4 }}
    className="group relative"
  >
    {/* Subtle glow on hover */}
    <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
    
    <div className="relative rounded-2xl p-6 backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500">
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:bg-white/[0.08] transition-colors duration-500">
        <Icon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors duration-500" />
      </div>
      
      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white transition-colors">
        {title}
      </h3>
      <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/60 transition-colors duration-500">
        {description}
      </p>
    </div>
  </motion.div>
);

export const NonCustodialTrading = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 2000);
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
      {/* Minimal ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-white/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase rounded-full bg-white/[0.05] text-white/70 border border-white/[0.08]">
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
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative max-w-3xl mx-auto mb-12"
        >
          <div className="rounded-3xl p-10 lg:p-14 backdrop-blur-xl bg-white/[0.02] border border-white/[0.06]">
            {/* Flow Steps */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0">
              <FlowStep {...flowSteps[0]} isActive={activeStep === 0} delay={0.1} />
              <AnimatedArrow delay={0.2} isAnimating={activeStep === 0} />
              <FlowStep {...flowSteps[1]} isActive={activeStep === 1} delay={0.2} />
              <AnimatedArrow delay={0.3} isAnimating={activeStep === 1} />
              <FlowStep {...flowSteps[2]} isActive={activeStep === 2} delay={0.3} />
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center gap-2 mt-10">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    activeStep === i ? 'w-8 bg-white/60' : 'w-2 bg-white/20'
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
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <Check className="w-4 h-4 text-emerald-400" />
                <p className="text-white/80 text-sm font-medium">
                  Everything happens directly in your wallet, on your terms
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Benefit Cards */}
        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => (
            <BenefitCard key={i} {...benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};
