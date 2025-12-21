import { motion, useInView } from "framer-motion";
import { Wallet, Search, Edit3, Lock, Zap, RefreshCcw, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const steps = [
  { icon: Wallet, step: "01", title: "Connect your wallet", description: "Your assets remain in your control." },
  { icon: Search, step: "02", title: "Browse real assets", description: "Real estate, credit, entertainment — all tradeable." },
  { icon: Edit3, step: "03", title: "Place your order", description: "Set your price. Full control over your strategy." },
  { icon: Lock, step: "04", title: "Smart contract secures", description: "Funds stay in your vault until matched." },
  { icon: Zap, step: "05", title: "Instant execution", description: "Settlement happens instantly on Cardano." },
  { icon: RefreshCcw, step: "06", title: "Full ownership", description: "Withdraw, trade again — always non-custodial." }
];

export const TradingSteps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-play logic
  useEffect(() => {
    if (!isInView || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  const handleStepClick = (index: number) => {
    setIsPaused(true);
    setActiveStep(index);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const currentStep = steps[activeStep];

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden">
      {/* Luxury Magazine Background - matching HowItWorks */}
      <div className="absolute inset-0 bg-[#fafafa]" />
      
      {/* Elegant diagonal accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[120%] h-[200%] bg-gradient-to-bl from-slate-100/80 via-slate-50/40 to-transparent -rotate-12 origin-center" />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(90deg, #0f172a 1px, transparent 1px), linear-gradient(180deg, #0f172a 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Magazine accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Editorial Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 mb-6"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              How To Trade
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-slate-300">
              06 Steps
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-slate-900 leading-[0.95] tracking-tight"
            >
              Your First Trade
              <span className="block font-serif italic text-slate-500 mt-2">Step by Step</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-500 text-lg lg:text-xl leading-relaxed max-w-md lg:ml-auto font-light"
            >
              A seamless journey from connection to ownership. 
              Six steps to start trading real-world assets.
            </motion.p>
          </div>
        </div>

        {/* Step Navigation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-start lg:justify-center mb-10 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200/80 rounded-full shadow-sm">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`relative px-4 lg:px-6 py-2.5 rounded-full text-sm transition-all duration-500 ${
                  activeStep === index
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeStep === index && (
                  <motion.div
                    layoutId="tradingsteps-pill"
                    className="absolute inset-0 bg-slate-900 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 font-medium">{step.step}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left - Active Step Detail */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white border border-slate-200 p-8 lg:p-10 rounded-sm"
              style={{ boxShadow: '0 8px 30px -10px rgba(0, 0, 0, 0.12)' }}
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 bg-slate-900 flex items-center justify-center">
                  <currentStep.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>
                <span className="text-6xl font-extralight text-slate-200 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentStep.step}
                </span>
              </div>
              
              <h3 className="text-2xl font-medium text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentStep.title}
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed">
                {currentStep.description}
              </p>

              {/* Progress bar */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">Progress</span>
                  <span className="text-xs text-slate-600 font-medium">{activeStep + 1} of {steps.length}</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-slate-900 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Step Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-4">
              {steps.map((step, i) => {
                const isActive = activeStep === i;
                const isPast = i < activeStep;
                
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    onClick={() => handleStepClick(i)}
                    className={`p-6 border cursor-pointer transition-all duration-300 rounded-sm ${
                      isActive 
                        ? 'bg-white border-slate-400/50 shadow-lg' 
                        : 'bg-white/80 border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 border flex items-center justify-center transition-all ${
                        isActive 
                          ? 'border-slate-700 bg-slate-800' 
                          : isPast 
                            ? 'border-emerald-300 bg-emerald-50' 
                            : 'border-slate-200 bg-white'
                      }`}>
                        {isPast ? (
                          <Check className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
                        ) : (
                          <step.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} strokeWidth={1.5} />
                        )}
                      </div>
                      <span className={`text-3xl font-extralight italic ${
                        isActive ? 'text-slate-300' : 'text-slate-200'
                      }`} style={{ fontFamily: "'Playfair Display', serif" }}>{step.step}</span>
                    </div>
                    <h3 className={`text-base font-medium mb-1 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </section>
  );
};
