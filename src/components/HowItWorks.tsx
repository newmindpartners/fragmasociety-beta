import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search, CreditCard, TrendingUp, ArrowLeftRight, ChevronRight, Check } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Browse",
    subtitle: "Explore curated deals",
    icon: Search,
    content: "Scroll curated deals across real estate, entertainment, private credit and more.",
    features: ["Filter by asset class", "View risk profiles", "Compare yields"],
  },
  {
    step: 2,
    title: "Invest",
    subtitle: "Choose your slice",
    icon: CreditCard,
    content: "Select your investment amount, complete payment, and sign digitally.",
    features: ["From €50 minimum", "Bank or crypto", "Instant confirmation"],
  },
  {
    step: 3,
    title: "Earn",
    subtitle: "Automated distributions",
    icon: TrendingUp,
    content: "Receive automated payouts directly to your wallet when assets generate returns.",
    features: ["Real-time tracking", "Auto-reinvest option", "Full transparency"],
  },
  {
    step: 4,
    title: "Exit",
    subtitle: "Secondary market",
    icon: ArrowLeftRight,
    content: "List your position and trade anytime on our secondary marketplace.",
    features: ["24/7 trading", "Set your price", "Instant settlement"],
  }
];

// Elegant animated illustrations
const StepIllustration = ({ step, isActive }: { step: number; isActive: boolean }) => {
  const illustrations = {
    1: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Search/Browse illustration */}
        <defs>
          <linearGradient id="cardGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Card stack effect */}
        <motion.rect
          x="30" y="40" width="90" height="70" rx="8"
          fill="white" stroke="#e2e8f0" strokeWidth="1"
          initial={{ opacity: 0, x: -20, rotate: -5 }}
          animate={isActive ? { opacity: 0.6, x: 0, rotate: -5 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        <motion.rect
          x="40" y="35" width="90" height="70" rx="8"
          fill="white" stroke="#e2e8f0" strokeWidth="1"
          initial={{ opacity: 0, x: -10, rotate: -2 }}
          animate={isActive ? { opacity: 0.8, x: 0, rotate: -2 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        <motion.rect
          x="50" y="30" width="90" height="70" rx="8"
          fill="white" stroke="#cbd5e1" strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        />
        
        {/* Card content lines */}
        <motion.rect x="60" y="45" width="40" height="4" rx="2" fill="#94a3b8"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }} style={{ originX: 0 }}
        />
        <motion.rect x="60" y="55" width="60" height="3" rx="1.5" fill="#cbd5e1"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }} style={{ originX: 0 }}
        />
        <motion.rect x="60" y="65" width="50" height="3" rx="1.5" fill="#e2e8f0"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }} style={{ originX: 0 }}
        />
        
        {/* Magnifying glass */}
        <motion.g
          initial={{ scale: 0, x: 20 }}
          animate={isActive ? { scale: 1, x: 0 } : { scale: 0 }}
          transition={{ type: "spring", damping: 12, delay: 0.5 }}
        >
          <circle cx="155" cy="55" r="22" fill="url(#cardGrad1)" stroke="#6366f1" strokeWidth="2" />
          <circle cx="155" cy="55" r="14" fill="none" stroke="#6366f1" strokeWidth="2" />
          <line x1="165" y1="65" x2="178" y2="78" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        </motion.g>
      </svg>
    ),
    2: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Invest illustration */}
        <defs>
          <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        
        {/* Credit card */}
        <motion.rect
          x="30" y="50" width="100" height="60" rx="6"
          fill="white" stroke="#e2e8f0" strokeWidth="1.5"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.rect x="30" y="65" width="100" height="12" fill="#1e293b"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }} style={{ originX: 0 }}
        />
        <motion.rect x="40" y="90" width="30" height="8" rx="2" fill="#e2e8f0"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        />
        
        {/* Checkmark circle */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 10, delay: 0.6 }}
        >
          <circle cx="155" cy="80" r="28" fill="url(#checkGrad)" />
          <motion.path
            d="M142 80 L150 88 L168 70"
            fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
          />
        </motion.g>
        
        {/* Amount display */}
        <motion.text x="60" y="45" className="text-lg font-semibold" fill="#1e293b"
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        >
          €1,500
        </motion.text>
      </svg>
    ),
    3: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Earn/Chart illustration */}
        <defs>
          <linearGradient id="chartAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Chart background */}
        <motion.rect
          x="20" y="25" width="160" height="100" rx="8"
          fill="white" stroke="#e2e8f0" strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Grid lines */}
        {[0, 1, 2, 3].map((i) => (
          <motion.line
            key={i}
            x1="35" y1={45 + i * 20} x2="165" y2={45 + i * 20}
            stroke="#f1f5f9" strokeWidth="1"
            initial={{ scaleX: 0 }}
            animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
            style={{ originX: 0 }}
          />
        ))}
        
        {/* Chart area fill */}
        <motion.path
          d="M35 105 L35 90 Q50 85 65 75 T95 60 T125 50 T155 35 L165 35 L165 105 Z"
          fill="url(#chartAreaGrad)"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        
        {/* Chart line */}
        <motion.path
          d="M35 90 Q50 85 65 75 T95 60 T125 50 T155 35 L165 35"
          fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
        
        {/* End dot */}
        <motion.circle
          cx="165" cy="35" r="6"
          fill="#6366f1"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ type: "spring", delay: 1 }}
        />
        
        {/* Payout indicator */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 1.1 }}
        >
          <rect x="130" y="15" width="50" height="24" rx="4" fill="#1e293b" />
          <text x="155" y="31" textAnchor="middle" fill="white" className="text-xs font-medium">+€420</text>
        </motion.g>
      </svg>
    ),
    4: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Exit/Trade illustration - P2P RWA Trading */}
        
        {/* Left person avatar */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <circle cx="42" cy="15" r="12" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="42" cy="12" r="5" fill="#94a3b8" />
          <path d="M32 27 Q32 20 42 20 Q52 20 52 27" fill="#94a3b8" />
        </motion.g>
        
        {/* Left connecting line - animated pulse */}
        <motion.line
          x1="42" y1="28" x2="42" y2="42"
          stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isActive ? { opacity: 1, pathLength: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        />
        <motion.circle
          cx="42" cy="42" r="3" fill="#94a3b8"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: [0, 1.2, 1] } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
        
        {/* Left asset card - Real Estate */}
        <motion.g
          initial={{ opacity: 0, x: -15, rotate: -3 }}
          animate={isActive ? { opacity: 1, x: 0, rotate: -3 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05, rotate: 0, y: -2 }}
          style={{ cursor: 'pointer' }}
        >
          <rect x="15" y="48" width="55" height="60" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
          {/* Building icon */}
          <rect x="28" y="56" width="28" height="26" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <rect x="32" y="60" width="6" height="6" fill="#94a3b8" />
          <rect x="42" y="60" width="6" height="6" fill="#94a3b8" />
          <rect x="32" y="70" width="6" height="6" fill="#94a3b8" />
          <rect x="42" y="70" width="6" height="6" fill="#94a3b8" />
          <rect x="38" y="76" width="8" height="6" fill="#6366f1" />
          <text x="42" y="98" textAnchor="middle" fill="#64748b" className="text-[7px]">Real Estate</text>
        </motion.g>
        
        {/* Center exchange arrows with pulse */}
        <motion.g>
          <motion.path
            d="M78 68 L122 68"
            stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          />
          <motion.path
            d="M114 62 L122 68 L114 74"
            stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8 }}
          />
          
          <motion.path
            d="M122 88 L78 88"
            stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          />
          <motion.path
            d="M86 82 L78 88 L86 94"
            stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
            initial={{ opacity: 0 }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.9 }}
          />
        </motion.g>
        
        {/* Right person avatar */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <circle cx="157" cy="15" r="12" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
          <circle cx="157" cy="12" r="5" fill="#6366f1" />
          <path d="M147 27 Q147 20 157 20 Q167 20 167 27" fill="#6366f1" />
        </motion.g>
        
        {/* Right connecting line - animated pulse */}
        <motion.line
          x1="157" y1="28" x2="157" y2="42"
          stroke="#6366f1" strokeWidth="2" strokeDasharray="3 2"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isActive ? { opacity: 1, pathLength: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
        <motion.circle
          cx="157" cy="42" r="3" fill="#6366f1"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: [0, 1.2, 1] } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
        
        {/* Right asset card - Film */}
        <motion.g
          initial={{ opacity: 0, x: 15, rotate: 3 }}
          animate={isActive ? { opacity: 1, x: 0, rotate: 3 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05, rotate: 0, y: -2 }}
          style={{ cursor: 'pointer' }}
        >
          <rect x="130" y="48" width="55" height="60" rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
          {/* Film reel icon */}
          <circle cx="157" cy="70" r="14" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="157" cy="70" r="4" fill="#6366f1" />
          <circle cx="157" cy="59" r="2.5" fill="#94a3b8" />
          <circle cx="157" cy="81" r="2.5" fill="#94a3b8" />
          <circle cx="146" cy="70" r="2.5" fill="#94a3b8" />
          <circle cx="168" cy="70" r="2.5" fill="#94a3b8" />
          <text x="157" y="98" textAnchor="middle" fill="#64748b" className="text-[7px]">Film</text>
        </motion.g>
        
        {/* P2P badge */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ type: "spring", delay: 1 }}
        >
          <rect x="60" y="118" width="80" height="24" rx="12" fill="#1e293b" />
          <text x="100" y="134" textAnchor="middle" fill="white" className="text-[9px] font-medium">Peer-to-Peer 24/7</text>
        </motion.g>
      </svg>
    ),
  };
  
  return illustrations[step as keyof typeof illustrations] || null;
};

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Auto-play logic
  useEffect(() => {
    if (!isInView || isPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  const handleStepClick = (index: number) => {
    setIsPaused(true);
    setActiveStep(index);
    // Resume after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };

  const currentStep = steps[activeStep];

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Luxury Magazine Background */}
      <div className="absolute inset-0 bg-[#fafafa]" />
      
      {/* Elegant diagonal accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[120%] h-[200%] bg-gradient-to-br from-slate-100/80 via-slate-50/40 to-transparent rotate-12 origin-center" />
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
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 mb-10"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              The Process
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-slate-300">
              04 Steps
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-slate-900 leading-[0.95] tracking-tight"
            >
              From Discovery
              <span className="block font-serif italic text-slate-500 mt-2">to Earnings</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-500 text-lg lg:text-xl leading-relaxed max-w-md lg:ml-auto font-light"
            >
              A seamless journey designed for the modern investor. 
              Four steps to transform how you build wealth.
            </motion.p>
          </div>
        </div>

        {/* Step Navigation - Minimal Editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-start lg:justify-center mb-16 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-white border border-slate-200/80 rounded-full shadow-sm">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={`relative px-5 lg:px-8 py-3 rounded-full text-sm transition-all duration-500 ${
                  activeStep === index
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {activeStep === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-900 to-indigo-950 rounded-full"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2 font-medium">
                  <span className={`text-[10px] ${activeStep === index ? 'text-white/60' : 'text-slate-400'}`}>
                    0{index + 1}
                  </span>
                  <span className="hidden sm:inline">{step.title}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Showcase Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-200/60 border border-slate-100">
            {/* Elegant progress line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-100">
              <motion.div
                className="h-full bg-gradient-to-r from-slate-700 via-indigo-600 to-violet-600"
                initial={{ width: "0%" }}
                animate={{ width: `${((activeStep + 1) / 4) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="grid lg:grid-cols-2">
              {/* Content Side */}
              <div className="p-10 lg:p-16 xl:p-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Step Label */}
                    <div className="flex items-center gap-4 mb-10">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-violet-600 font-semibold">
                        Step {currentStep.step}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
                    </div>

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-8 shadow-xl shadow-slate-900/30"
                    >
                      <currentStep.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-3xl lg:text-4xl xl:text-5xl font-light text-slate-900 mb-3 tracking-tight"
                    >
                      {currentStep.title}
                    </motion.h3>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl text-slate-400 font-serif italic mb-8"
                    >
                      {currentStep.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="text-slate-600 text-lg leading-relaxed mb-10 font-light"
                    >
                      {currentStep.content}
                    </motion.p>

                    {/* Features */}
                    <motion.ul className="space-y-4">
                      {currentStep.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          className="flex items-center gap-4 text-slate-600"
                        >
                          <span className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-slate-600" />
                          </span>
                          <span className="font-light">{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Illustration Side */}
              <div className="relative bg-gradient-to-br from-slate-50 via-slate-100/50 to-white p-10 lg:p-16 flex items-center justify-center min-h-[420px] border-l border-slate-100/80">
                {/* Large decorative number */}
                <div className="absolute top-8 right-8 text-[160px] xl:text-[200px] font-extralight text-slate-100 leading-none font-serif select-none pointer-events-none">
                  0{activeStep + 1}
                </div>
                
                {/* Subtle corner accent */}
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-50/50 to-transparent" />
                
                <div className="w-full max-w-[300px] relative z-10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <StepIllustration step={activeStep + 1} isActive={true} />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Step dots for mobile */}
        <div className="flex justify-center gap-3 mt-10 lg:hidden">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                activeStep === index 
                  ? 'w-8 bg-gradient-to-r from-slate-800 to-indigo-900' 
                  : 'w-1.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-20"
        >
          <Button 
            size="lg" 
            className="group bg-slate-900 hover:bg-slate-800 text-white px-12 py-7 text-base rounded-full shadow-xl shadow-slate-900/25"
          >
            Begin Your Journey
            <ChevronRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </section>
  );
};
