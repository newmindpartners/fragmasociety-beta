import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Search, CreditCard, TrendingUp, ArrowLeftRight, Check, ChevronRight } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Browse",
    subtitle: "Discover Opportunities",
    icon: Search,
    description: "Explore a curated selection of tokenized real estate, entertainment royalties, and private credit deals.",
    features: [
      "Filter by asset class and risk profile",
      "View detailed due diligence reports",
      "Compare projected yields"
    ]
  },
  {
    step: 2,
    title: "Invest",
    subtitle: "Secure Your Position",
    icon: CreditCard,
    description: "Choose your investment amount, complete payment seamlessly, and sign digitally in minutes.",
    features: [
      "Start from just €50",
      "Pay via bank transfer or crypto",
      "Instant confirmation and receipt"
    ]
  },
  {
    step: 3,
    title: "Earn",
    subtitle: "Receive Distributions",
    icon: TrendingUp,
    description: "Sit back as automated smart contracts deliver yields directly to your wallet on schedule.",
    features: [
      "Real-time earnings dashboard",
      "Automated payout triggers",
      "Full on-chain transparency"
    ]
  },
  {
    step: 4,
    title: "Exit",
    subtitle: "Trade Anytime",
    icon: ArrowLeftRight,
    description: "List your position on our secondary marketplace and trade with other investors 24/7.",
    features: [
      "Non-custodial order book",
      "Set your own prices",
      "Instant on-chain settlement"
    ]
  }
];

export const JourneySteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

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
    setTimeout(() => setIsPaused(false), 10000);
  };

  const currentStep = steps[activeStep];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Light Background with Subtle Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/80 to-white" />
      
      {/* Elegant geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-violet-100/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-slate-100/60 via-transparent to-transparent" />
      </div>
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, #0f172a 1px, transparent 1px), linear-gradient(180deg, #0f172a 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-gradient-to-r from-violet-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              Your Investment Journey
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight text-slate-900 leading-[1.05] mb-6"
          >
            Four Simple Steps
            <span className="block font-serif italic text-slate-500 mt-2">to Transform Your Portfolio</span>
          </motion.h2>
        </div>

        {/* Steps Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Step Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const Icon = step.icon;
              
              return (
                <motion.div
                  key={step.step}
                  onClick={() => handleStepClick(index)}
                  className={`relative p-6 lg:p-8 rounded-xl cursor-pointer transition-all duration-500 ${
                    isActive 
                      ? 'bg-slate-900 shadow-2xl shadow-slate-900/20' 
                      : 'bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-lg'
                  }`}
                  animate={{ scale: isActive ? 1 : 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Progress bar for active step */}
                  {isActive && !isPaused && (
                    <motion.div
                      className="absolute top-0 left-0 h-1 bg-gradient-to-r from-violet-500 to-violet-400 rounded-t-xl"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  )}
                  
                  <div className="flex items-start gap-5">
                    {/* Step Number & Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isActive 
                        ? 'bg-violet-500/20' 
                        : 'bg-slate-100'
                    }`}>
                      <Icon className={`w-6 h-6 transition-colors duration-300 ${
                        isActive ? 'text-violet-400' : 'text-slate-500'
                      }`} strokeWidth={1.5} />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs font-medium tracking-wider uppercase transition-colors duration-300 ${
                          isActive ? 'text-violet-400' : 'text-slate-400'
                        }`}>
                          Step {step.step}
                        </span>
                      </div>
                      <h3 className={`text-xl lg:text-2xl font-medium mb-1 transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-slate-900'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm transition-colors duration-300 ${
                        isActive ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {step.subtitle}
                      </p>
                    </div>
                    
                    {/* Arrow indicator */}
                    <ChevronRight className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                      isActive ? 'text-violet-400 translate-x-1' : 'text-slate-300'
                    }`} />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right: Active Step Details */}
          <div className="lg:sticky lg:top-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border border-slate-200/80 p-8 lg:p-10 shadow-xl shadow-slate-200/50"
              >
                {/* Large Step Number */}
                <div className="mb-8">
                  <span className="text-[120px] lg:text-[160px] font-extralight text-slate-100 leading-none block -mb-8">
                    0{currentStep.step}
                  </span>
                </div>
                
                {/* Title */}
                <h4 className="text-3xl lg:text-4xl font-light text-slate-900 mb-4">
                  {currentStep.title}
                </h4>
                
                {/* Description */}
                <p className="text-lg text-slate-500 leading-relaxed mb-8">
                  {currentStep.description}
                </p>
                
                {/* Features */}
                <div className="space-y-4">
                  {currentStep.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-violet-600" />
                      </div>
                      <span className="text-slate-600">{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Visual Element */}
                <div className="mt-10 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                      <currentStep.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Ready to {currentStep.title.toLowerCase()}?</p>
                      <p className="text-xs text-slate-500">Start your journey today</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};