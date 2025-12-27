import { motion, useInView, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  Send, 
  Lightbulb, 
  Layout, 
  Rocket, 
  BarChart3,
  Check,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Send,
    title: "Submit your project",
    description: "Tell us what you want to tokenize: a property, brand asset, digital IP, credit deal, film right, luxury item, or business.",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "We design your investment product",
    description: "Our team structures the financial model, risk profile, legal wrapper, token economics, and compliance framework.",
    details: [
      "Product strategy",
      "Investment thesis",
      "Deal economics",
      "Regulatory structuring",
      "Storytelling & brand positioning"
    ],
  },
  {
    number: "03",
    icon: Layout,
    title: "We build your digital investment experience",
    description: "Custom-branded pages, investor dashboards, storytelling modules, performance analytics, claim systems.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Raise capital from your fans or global investors",
    description: "We onboard your community — plus our own investor base — into a clean, regulated investment flow starting from €50+.",
  },
  {
    number: "05",
    icon: BarChart3,
    title: "Launch & distribute",
    description: "Go live with full infrastructure support.",
    details: [
      "Automated payouts",
      "Real-time dashboards",
      "On-chain audit trails",
      "Global access",
      "Secondary market listing"
    ],
  }
];

export const SignatureDealProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  // Swipe gesture state
  const dragX = useMotionValue(0);
  const dragProgress = useTransform(dragX, [-100, 0, 100], [-1, 0, 1]);

  // Auto-play logic
  useEffect(() => {
    if (!isInView || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  const handleStepClick = (index: number) => {
    setIsPaused(true);
    setActiveStep(index);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const goToNext = () => {
    setIsPaused(true);
    setActiveStep((prev) => (prev + 1) % steps.length);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const goToPrev = () => {
    setIsPaused(true);
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -threshold || velocity < -500) {
      goToNext();
    } else if (offset > threshold || velocity > 500) {
      goToPrev();
    }
    
    animate(dragX, 0, { type: "spring", stiffness: 400, damping: 30 });
  };

  const currentStep = steps[activeStep];
  const CurrentIcon = currentStep.icon;

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Luxury Magazine Background */}
      <div className="absolute inset-0 bg-[#fafafa]" />
      
      {/* Elegant diagonal accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-[120%] h-[200%] bg-gradient-to-bl from-slate-100/80 via-slate-50/40 to-transparent -rotate-12 origin-center" />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, #0f172a 1px, transparent 1px), linear-gradient(180deg, #0f172a 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Magazine accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Editorial Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 mb-6"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              Simple + Powerful
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-slate-300">
              05 Steps
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-slate-900 leading-[0.95] tracking-tight"
            >
              How it works
              <span className="block font-serif italic text-slate-500 mt-2">Step by Step</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-500 text-lg lg:text-xl leading-relaxed max-w-md lg:ml-auto font-light"
            >
              You focus on your project. We handle the infrastructure.
            </motion.p>
          </div>
        </div>

        {/* Step Navigation Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-start lg:justify-center mb-12 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          <div className="inline-flex items-center gap-1 p-1.5 bg-white border border-slate-200/80 rounded-full shadow-sm">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`relative px-5 lg:px-7 py-3 rounded-full text-sm transition-all duration-500 ${
                  activeStep === index
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeStep === index && (
                  <motion.div
                    layoutId="signatureprocess-pill"
                    className="absolute inset-0 bg-slate-900 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 font-medium">{step.number}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Content - Swipeable on Mobile */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left - Active Step Detail (Swipeable on Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:col-span-5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                style={{ x: dragX }}
                className="bg-white border border-slate-200 p-8 lg:p-10 rounded-sm cursor-grab active:cursor-grabbing touch-pan-y"
                whileTap={{ cursor: "grabbing" }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-slate-900 flex items-center justify-center">
                    <CurrentIcon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="text-7xl font-extralight text-slate-200 italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {currentStep.number}
                  </span>
                </div>
                
                <h3 className="text-2xl font-medium text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {currentStep.title}
                </h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-6">
                  {currentStep.description}
                </p>

                {/* Details if available */}
                {currentStep.details && currentStep.details.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="grid grid-cols-1 gap-2">
                      {currentStep.details.map((detail, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                          className="flex items-center gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                            <Check className="w-3 h-3 text-slate-600" />
                          </div>
                          <span className="text-sm text-slate-600">{detail}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

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
            </AnimatePresence>

            {/* Mobile Navigation Arrows */}
            <div className="flex items-center justify-center gap-4 mt-6 lg:hidden">
              <button
                onClick={goToPrev}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              
              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleStepClick(i)}
                    className="relative"
                  >
                    <div className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeStep ? 'w-6 bg-slate-900' : 'w-2 bg-slate-300'
                    }`} />
                  </button>
                ))}
              </div>
              
              <button
                onClick={goToNext}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </motion.div>

          {/* Right - Step Cards Grid */}
          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-4">
              {steps.map((step, i) => {
                const StepIcon = step.icon;
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
                        : 'bg-white/80 border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'border-slate-700 bg-slate-800' 
                          : isPast 
                            ? 'border-emerald-300 bg-emerald-50' 
                            : 'border-slate-200 bg-white'
                      }`}>
                        {isPast ? (
                          <Check className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
                        ) : (
                          <StepIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} strokeWidth={1.5} />
                        )}
                      </div>
                      <span className={`text-4xl font-extralight italic transition-colors duration-300 ${
                        isActive ? 'text-slate-300' : 'text-slate-200'
                      }`} style={{ fontFamily: "'Playfair Display', serif" }}>{step.number}</span>
                    </div>
                    <h3 className={`text-base font-medium mb-2 transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{step.description}</p>
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
