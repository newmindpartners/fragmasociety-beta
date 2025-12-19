import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, CreditCard, TrendingUp, ArrowLeftRight, ChevronRight } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Browse",
    subtitle: "Explore curated deals",
    icon: Search,
    content: "Scroll curated deals across real estate, entertainment, private credit and more. Each deal comes with clear terms and risk factors.",
    bullets: ["Filter by asset class, yield, or duration", "View detailed risk & return profiles"],
    accent: "from-slate-600 to-slate-800",
  },
  {
    step: 2,
    title: "Invest",
    subtitle: "Choose your slice & pay securely",
    icon: CreditCard,
    content: "Choose your slice, pay via bank/card or wallet, and sign once. Your ownership is recorded as tokens linked to the real asset.",
    bullets: ["Flexible amounts from €50", "Secure payment & instant confirmation"],
    accent: "from-indigo-600 to-violet-700",
  },
  {
    step: 3,
    title: "Earn",
    subtitle: "Receive automated distributions",
    icon: TrendingUp,
    content: "When the asset pays out, your share is automatically distributed to your account or wallet and tracked in your dashboard.",
    bullets: ["Real-time yield tracking", "Reinvest or withdraw anytime"],
    accent: "from-violet-600 to-purple-700",
  },
  {
    step: 4,
    title: "Exit",
    subtitle: "Trade on secondary market",
    icon: ArrowLeftRight,
    content: "Sell your position anytime on our secondary marketplace. Find buyers, set your price, and exit on your own terms.",
    bullets: ["24/7 secondary market access", "Transparent pricing & instant settlement"],
    accent: "from-slate-700 to-indigo-800",
  }
];

// Step graphic illustrations
const StepGraphic = ({ index, isActive }: { index: number; isActive: boolean }) => {
  const graphics = [
    // Browse - magnifying glass with grid
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <motion.rect 
        x="8" y="8" width="18" height="18" rx="2" 
        className={`transition-all duration-500 ${isActive ? 'fill-white/20 stroke-white' : 'fill-slate-100 stroke-slate-300'}`}
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      />
      <motion.rect 
        x="30" y="8" width="18" height="18" rx="2"
        className={`transition-all duration-500 ${isActive ? 'fill-white/10 stroke-white/70' : 'fill-slate-50 stroke-slate-200'}`}
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.rect 
        x="8" y="30" width="18" height="18" rx="2"
        className={`transition-all duration-500 ${isActive ? 'fill-white/10 stroke-white/70' : 'fill-slate-50 stroke-slate-200'}`}
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.circle 
        cx="44" cy="44" r="12"
        className={`transition-all duration-500 ${isActive ? 'fill-none stroke-white' : 'fill-none stroke-slate-400'}`}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.line 
        x1="52" y1="52" x2="60" y2="60"
        className={`transition-all duration-500 ${isActive ? 'stroke-white' : 'stroke-slate-400'}`}
        strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
    </svg>,
    // Invest - credit card with checkmark
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <motion.rect 
        x="6" y="14" width="42" height="28" rx="4"
        className={`transition-all duration-500 ${isActive ? 'fill-white/15 stroke-white' : 'fill-slate-100 stroke-slate-300'}`}
        strokeWidth="1.5"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      />
      <motion.line 
        x1="6" y1="24" x2="48" y2="24"
        className={`transition-all duration-500 ${isActive ? 'stroke-white/60' : 'stroke-slate-300'}`}
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.rect 
        x="12" y="32" width="14" height="4" rx="1"
        className={`transition-all duration-500 ${isActive ? 'fill-white/40' : 'fill-slate-300'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.circle 
        cx="50" cy="42" r="12"
        className={`transition-all duration-500 ${isActive ? 'fill-violet-500/40 stroke-white' : 'fill-indigo-100 stroke-indigo-400'}`}
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.3 }}
      />
      <motion.path 
        d="M44 42 L48 46 L56 38"
        className={`transition-all duration-500 ${isActive ? 'stroke-white' : 'stroke-indigo-500'}`}
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
    </svg>,
    // Earn - chart going up
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <motion.path 
        d="M8 52 L8 12 M8 52 L56 52"
        className={`transition-all duration-500 ${isActive ? 'stroke-white/50' : 'stroke-slate-300'}`}
        strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path 
        d="M12 44 L22 34 L32 38 L44 22 L56 14"
        className={`transition-all duration-500 ${isActive ? 'stroke-white' : 'stroke-violet-500'}`}
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
      <motion.circle 
        cx="56" cy="14" r="5"
        className={`transition-all duration-500 ${isActive ? 'fill-white stroke-white' : 'fill-violet-500 stroke-violet-500'}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.8 }}
      />
      {[12, 22, 32, 44].map((x, i) => (
        <motion.circle 
          key={x}
          cx={x} cy={[44, 34, 38, 22][i]} r="3"
          className={`transition-all duration-500 ${isActive ? 'fill-white/60' : 'fill-violet-400'}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        />
      ))}
    </svg>,
    // Exit - arrows exchanging
    <svg viewBox="0 0 64 64" className="w-full h-full">
      <motion.path 
        d="M12 24 L52 24"
        className={`transition-all duration-500 ${isActive ? 'stroke-white' : 'stroke-slate-400'}`}
        strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4 }}
      />
      <motion.path 
        d="M44 18 L52 24 L44 30"
        className={`transition-all duration-500 ${isActive ? 'stroke-white' : 'stroke-slate-400'}`}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      />
      <motion.path 
        d="M52 40 L12 40"
        className={`transition-all duration-500 ${isActive ? 'stroke-white/70' : 'stroke-indigo-400'}`}
        strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.path 
        d="M20 34 L12 40 L20 46"
        className={`transition-all duration-500 ${isActive ? 'stroke-white/70' : 'stroke-indigo-400'}`}
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ opacity: 0, x: 5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      />
      <motion.circle 
        cx="32" cy="32" r="8"
        className={`transition-all duration-500 ${isActive ? 'fill-white/10 stroke-white/50' : 'fill-slate-100 stroke-slate-300'}`}
        strokeWidth="1.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.4 }}
      />
    </svg>,
  ];
  return graphics[index % graphics.length];
};

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-play logic
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

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Premium Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        {/* Subtle spotlight effects */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-indigo-50/30 via-slate-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-radial from-violet-50/20 via-transparent to-transparent rounded-full blur-2xl" />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              How It Works
            </span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.05] mb-6"
          >
            Four steps to
            <br />
            <span className="italic text-slate-500 font-serif">fractional ownership</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-xl mx-auto"
          >
            From discovery to earnings in minutes
          </motion.p>
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="relative h-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-slate-600 via-indigo-600 to-violet-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeStep + 1) / 4) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Glowing dot at the end */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-violet-600 rounded-full shadow-lg shadow-violet-500/50"
              animate={{ left: `calc(${((activeStep + 1) / 4) * 100}% - 6px)` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className="group flex flex-col items-center gap-2"
              >
                <motion.div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    activeStep >= index 
                      ? 'bg-gradient-to-br from-slate-800 to-indigo-900 text-white shadow-lg shadow-slate-900/20' 
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-medium">{index + 1}</span>
                </motion.div>
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  activeStep === index ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Steps Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const isHovered = hoveredStep === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                onMouseEnter={() => { setHoveredStep(index); setIsPaused(true); }}
                onMouseLeave={() => { setHoveredStep(null); }}
                onClick={() => handleStepClick(index)}
                className="cursor-pointer"
              >
                <motion.div
                  className={`relative p-8 h-full overflow-hidden transition-all duration-500 ${
                    isActive || isHovered
                      ? 'bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950'
                      : 'bg-white border border-slate-200/60'
                  }`}
                  animate={{ 
                    y: isActive || isHovered ? -12 : 0,
                    scale: isActive || isHovered ? 1.02 : 1 
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    boxShadow: isActive || isHovered 
                      ? '0 30px 60px -15px rgba(15, 23, 42, 0.4), 0 0 40px -10px rgba(79, 70, 229, 0.15)'
                      : '0 4px 30px -10px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {/* Step number watermark */}
                  <motion.span 
                    className={`absolute top-4 right-4 text-[80px] font-extralight leading-none transition-all duration-500 font-serif ${
                      isActive || isHovered ? 'text-white/[0.04]' : 'text-slate-900/[0.03]'
                    }`}
                    animate={{ 
                      x: isActive || isHovered ? 10 : 0,
                      y: isActive || isHovered ? -10 : 0 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    0{step.step}
                  </motion.span>

                  {/* Graphic illustration */}
                  <motion.div 
                    className={`w-16 h-16 mb-8 transition-all duration-500`}
                    animate={{ 
                      scale: isActive || isHovered ? 1.1 : 1,
                      rotate: isActive || isHovered ? 3 : 0
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <StepGraphic index={index} isActive={isActive || isHovered} />
                  </motion.div>

                  {/* Icon */}
                  <motion.div 
                    className={`w-12 h-12 flex items-center justify-center mb-6 transition-all duration-500 ${
                      isActive || isHovered 
                        ? 'bg-white/10 border border-white/20' 
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                    animate={{ 
                      rotate: isActive || isHovered ? 6 : 0,
                      scale: isActive || isHovered ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <step.icon className={`w-5 h-5 transition-colors duration-500 ${
                      isActive || isHovered ? 'text-white' : 'text-slate-500'
                    }`} strokeWidth={1.5} />
                  </motion.div>
                  
                  {/* Title */}
                  <motion.h3 
                    className={`text-xl font-medium mb-2 transition-colors duration-500 ${
                      isActive || isHovered ? 'text-white' : 'text-slate-900'
                    }`}
                    animate={{ x: isActive || isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {step.title}
                  </motion.h3>
                  
                  {/* Subtitle */}
                  <p className={`text-sm mb-4 transition-colors duration-500 ${
                    isActive || isHovered ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {step.subtitle}
                  </p>

                  {/* Expanded content */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                          {step.content}
                        </p>
                        <ul className="space-y-2">
                          {step.bullets.map((bullet, i) => (
                            <motion.li 
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + i * 0.1 }}
                              className="text-xs text-slate-500 flex items-start gap-2"
                            >
                              <span className="w-1 h-1 rounded-full bg-violet-400 mt-1.5 flex-shrink-0" />
                              {bullet}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Bottom accent line */}
                  <motion.div 
                    className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r ${step.accent}`}
                    initial={{ width: 0 }}
                    animate={{ width: isActive || isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Corner accent */}
                  <motion.div 
                    className="absolute top-0 left-0 w-16 h-16"
                    style={{
                      background: isActive || isHovered
                        ? 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, transparent 50%)' 
                        : 'linear-gradient(135deg, rgba(148,163,184,0.08) 0%, transparent 50%)'
                    }}
                    animate={{ 
                      opacity: isActive || isHovered ? 1 : 0.5,
                      scale: isActive || isHovered ? 1.5 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-slate-50 to-white border border-slate-200/50 rounded-2xl shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-slate-900 font-medium">Ready to own your first slice?</span>
            </div>
            
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 hover:from-slate-800 hover:via-indigo-900 hover:to-slate-800 text-white border-0 shadow-lg shadow-slate-900/20 px-8"
            >
              Register for Early Access
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-slate-400 text-xs max-w-sm">
              Limited spots available. Secure your place in our exclusive early access program.
            </p>
          </div>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex justify-center"
        >
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
