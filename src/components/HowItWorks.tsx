import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, CreditCard, TrendingUp, ArrowLeftRight } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Browse",
    desc: "Explore curated deals",
    icon: Search,
    content: "Scroll curated deals across real estate, entertainment, private credit and more. Each deal comes with clear terms and risk factors.",
    bullets: ["Filter by asset class, yield, or duration", "View detailed risk & return profiles"]
  },
  {
    step: 2,
    title: "Invest",
    desc: "Choose your slice & pay securely",
    icon: CreditCard,
    content: "Choose your slice, pay via bank/card or wallet, and sign once. Your ownership is recorded as tokens linked to the real asset.",
    bullets: ["Flexible amounts from €50", "Secure payment & instant confirmation"]
  },
  {
    step: 3,
    title: "Earn",
    desc: "Receive automated distributions",
    icon: TrendingUp,
    content: "When the asset pays out, your share is automatically distributed to your account or wallet and tracked in your dashboard.",
    bullets: ["Real-time yield tracking", "Reinvest or withdraw anytime"]
  },
  {
    step: 4,
    title: "Exit",
    desc: "Trade on secondary market",
    icon: ArrowLeftRight,
    content: "Sell your position anytime on our secondary marketplace. Find buyers, set your price, and exit on your own terms.",
    bullets: ["24/7 secondary market access", "Transparent pricing & instant settlement"]
  }
];

const StepNode = ({ 
  step, 
  isActive, 
  isPast, 
  onClick 
}: { 
  step: typeof steps[0]; 
  isActive: boolean; 
  isPast: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-3 focus:outline-none"
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/30"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.5, opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.6 }}
        />
        
        {/* Rotating ring for active state */}
        {isActive && (
          <motion.div
            className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-white/60"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Main circle */}
        <motion.div 
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center z-10
            transition-all duration-500
            ${isActive 
              ? "bg-white text-background shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)]" 
              : isPast 
                ? "bg-white/20 text-white border-2 border-white/50"
                : "bg-card/60 backdrop-blur-sm border border-white/10 text-muted-foreground group-hover:border-white/40 group-hover:text-white"
            }
          `}
          animate={isActive ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          <step.icon size={24} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
      
      {/* Title with underline animation */}
      <div className="relative">
        <motion.h4 
          className={`font-semibold transition-colors duration-300 ${isActive ? "text-white" : "text-foreground"}`}
          animate={isActive ? { y: -2 } : { y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {step.title}
        </motion.h4>
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <p className="text-muted-foreground text-sm">{step.desc}</p>
    </button>
  );
};

const ContentPanel = ({ step }: { step: typeof steps[0] }) => {
  const Icon = step.icon;
  
  return (
    <motion.div
      key={step.step}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      className="mt-12 max-w-2xl mx-auto"
    >
      <div className="relative p-8 rounded-2xl bg-gradient-to-b from-card/60 to-card/30 backdrop-blur-xl border border-white/10">
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-50" />
        
        <div className="relative flex flex-col md:flex-row gap-6 items-start">
          {/* Icon/Mock area */}
          <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center">
            <Icon className="text-white" size={28} strokeWidth={1.5} />
          </div>
          
          {/* Content */}
          <div className="flex-1 text-left">
            <p className="text-foreground mb-4">{step.content}</p>
            <ul className="space-y-2">
              {step.bullets.map((bullet, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 flex-shrink-0" />
                  {bullet}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  // Auto-play logic - loops continuously
  useEffect(() => {
    if (!isInView || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  const handleStepClick = (index: number) => {
    setIsPaused(true);
    setActiveStep(index);
  };

  // Calculate progress line width (4 steps: 0%, 33%, 66%, 100%)
  const progressWidth = (activeStep / 3) * 100;

  return (
    <section ref={sectionRef} className="relative w-full py-20 lg:py-28">
      {/* Glassmorphism container */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-2xl border-y border-white/5" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge>How It Works</Badge>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Four steps to fractional <span className="text-gradient">ownership</span>
          </h2>
          <p className="text-muted-foreground mb-16 max-w-lg mx-auto">
            From discovery to earnings in minutes
          </p>
        </motion.div>
        
        {/* Desktop Progress Rail */}
        <div className="hidden md:block relative max-w-2xl mx-auto mb-4">
          {/* Background rail */}
          <div className="absolute top-8 left-[15%] right-[15%] h-0.5 bg-white/10" />
          
          {/* Animated progress fill */}
          <motion.div 
            className="absolute top-8 left-[15%] h-0.5 bg-gradient-to-r from-white via-white to-white/50"
            style={{ 
              width: "70%",
              transformOrigin: "left",
              boxShadow: "0 0 20px rgba(255,255,255,0.5)"
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progressWidth / 100 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          />
          
          {/* Glowing front */}
          <motion.div
            className="absolute top-[30px] h-2 w-2 rounded-full bg-white"
            style={{ 
              boxShadow: "0 0 15px 5px rgba(255,255,255,0.6)",
              left: "15%"
            }}
            animate={{ 
              left: `calc(15% + ${progressWidth * 0.7}%)`,
              opacity: progressWidth > 0 ? 1 : 0
            }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          />
          
          {/* Step nodes */}
          <div className="flex justify-between relative z-10">
            {steps.map((step, i) => (
              <StepNode
                key={step.step}
                step={step}
                isActive={activeStep === i}
                isPast={activeStep > i}
                onClick={() => handleStepClick(i)}
              />
            ))}
          </div>
        </div>
        
        {/* Mobile Vertical Rail */}
        <div className="md:hidden relative">
          {/* Vertical rail */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-white/10" />
          
          {/* Progress fill */}
          <motion.div 
            className="absolute left-8 top-8 w-0.5 bg-gradient-to-b from-white to-white/50"
            style={{ transformOrigin: "top" }}
            animate={{ height: `${progressWidth}%` }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          />
          
          {/* Steps */}
          <div className="flex flex-col gap-8 pl-20">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                {/* Circle on rail */}
                <motion.div 
                  className={`
                    absolute -left-[52px] top-0 w-10 h-10 rounded-full flex items-center justify-center z-10
                    transition-all duration-500
                    ${activeStep >= i 
                      ? "bg-white text-background shadow-[0_0_20px_-5px_rgba(255,255,255,0.6)]" 
                      : "bg-card/60 border border-white/10 text-muted-foreground"
                    }
                  `}
                  animate={activeStep === i ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <step.icon size={18} strokeWidth={1.5} />
                </motion.div>
                
                <button
                  onClick={() => handleStepClick(i)}
                  className="text-left w-full focus:outline-none"
                >
                  <h4 className={`font-semibold mb-1 ${activeStep === i ? "text-white" : "text-foreground"}`}>
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground text-sm mb-2">{step.desc}</p>
                  
                  {/* Expandable content */}
                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-2">
                          <p className="text-sm text-foreground/80 mb-2">{step.content}</p>
                          <ul className="space-y-1">
                            {step.bullets.map((bullet, j) => (
                              <li key={j} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="w-1 h-1 rounded-full bg-white mt-1.5 flex-shrink-0" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Desktop Content Panel */}
        <div className="hidden md:block">
          <AnimatePresence mode="wait">
            <ContentPanel step={steps[activeStep]} />
          </AnimatePresence>
        </div>
        
        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-white/5"
        >
          <p className="text-foreground font-medium mb-4">Ready to own your first slice?</p>
          <div className="flex justify-center">
            <Button variant="default" size="lg" className="group">
              Create account
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
