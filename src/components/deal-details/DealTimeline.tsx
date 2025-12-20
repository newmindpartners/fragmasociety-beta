import { motion, AnimatePresence, useInView } from "framer-motion";
import { DollarSign, FileText, Hammer, Megaphone, TrendingUp } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState, useRef } from "react";

interface DealTimelineProps {
  deal: DealData;
}

type TimelineScenario = "optimistic" | "downside";

// Phase-matched animated illustrations
const PhaseIllustration = ({ phaseIndex, isActive }: { phaseIndex: number; isActive: boolean }) => {
  const illustrations: Record<number, JSX.Element> = {
    // Fund - Money/coins
    0: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Dollar coins stack */}
        <motion.ellipse cx="60" cy="90" rx="35" ry="10" fill="#334155"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        />
        <motion.ellipse cx="60" cy="80" rx="35" ry="10" fill="#475569"
          initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.1 }}
        />
        <motion.ellipse cx="60" cy="70" rx="35" ry="10" fill="#64748b"
          initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        />
        <motion.ellipse cx="60" cy="60" rx="35" ry="10" fill="#8b5cf6"
          initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        />
        
        {/* Dollar sign */}
        <motion.text x="60" y="45" textAnchor="middle" fill="#8b5cf6" fontSize="28" fontWeight="bold"
          initial={{ opacity: 0, scale: 0 }} animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >$</motion.text>
        
        {/* Floating coins */}
        <motion.circle cx="25" cy="40" r="10" fill="#8b5cf6"
          initial={{ opacity: 0, y: 20 }} 
          animate={isActive ? { opacity: [0, 1, 1], y: [20, 0, -5, 0] } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />
        <motion.text x="25" y="44" textAnchor="middle" fill="white" fontSize="10">$</motion.text>
        
        <motion.circle cx="95" cy="35" r="8" fill="#6366f1"
          initial={{ opacity: 0, y: 20 }} 
          animate={isActive ? { opacity: [0, 1, 1], y: [20, 0, -8, 0] } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />
      </svg>
    ),
    
    // Design Permits - 3D Blueprint/Layout
    1: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* 3D isometric grid */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Base grid lines */}
          <motion.path d="M20 80 L60 100 L100 80" stroke="#475569" strokeWidth="1" fill="none"
            initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8 }}
          />
          <motion.path d="M20 60 L60 80 L100 60" stroke="#475569" strokeWidth="1" fill="none"
            initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          />
        </motion.g>
        
        {/* 3D Building outline */}
        <motion.path
          d="M40 75 L40 45 L60 35 L80 45 L80 75 L60 85 Z"
          fill="none" stroke="#8b5cf6" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.path
          d="M60 35 L60 65"
          fill="none" stroke="#8b5cf6" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        <motion.path
          d="M40 45 L60 55 L80 45"
          fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="3,3"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        
        {/* Measurement arrows */}
        <motion.g initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 1.2 }}>
          <line x1="25" y1="75" x2="25" y2="45" stroke="#64748b" strokeWidth="1" markerEnd="url(#arrow)" />
          <text x="15" y="60" fill="#64748b" fontSize="8">H</text>
        </motion.g>
        
        {/* Stamp */}
        <motion.g
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={isActive ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0 }}
          transition={{ delay: 1.4, type: "spring", damping: 10 }}
        >
          <circle cx="90" cy="30" r="15" fill="none" stroke="#22c55e" strokeWidth="2" />
          <text x="90" y="34" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">OK</text>
        </motion.g>
      </svg>
    ),
    
    // Construction - Building/Crane
    2: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Crane base */}
        <motion.rect x="20" y="85" width="80" height="8" rx="2" fill="#475569"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0 }}
        />
        
        {/* Crane tower */}
        <motion.rect x="35" y="30" width="8" height="55" fill="#64748b"
          initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
          style={{ originY: 1 }} transition={{ delay: 0.2 }}
        />
        
        {/* Crane arm */}
        <motion.rect x="35" y="28" width="55" height="6" fill="#8b5cf6"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0 }} transition={{ delay: 0.4 }}
        />
        
        {/* Cable */}
        <motion.line x1="80" y1="34" x2="80" y2="60" stroke="#94a3b8" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.6 }}
        />
        
        {/* Building block being lifted */}
        <motion.rect x="70" y="60" width="20" height="15" rx="2" fill="#8b5cf6"
          initial={{ y: 20, opacity: 0 }}
          animate={isActive ? { y: [20, 0, 5, 0], opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
        />
        
        {/* Building in progress */}
        <motion.rect x="60" y="70" width="30" height="15" rx="2" fill="#475569"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1 }}
        />
        <motion.rect x="60" y="55" width="30" height="15" rx="2" fill="#334155"
          initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        />
      </svg>
    ),
    
    // Marketing - Megaphone/Ads
    3: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Megaphone body */}
        <motion.path
          d="M30 55 L50 45 L50 75 L30 65 Z"
          fill="#8b5cf6"
          initial={{ opacity: 0, x: -20 }} animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.rect x="22" y="52" width="10" height="16" rx="3" fill="#6366f1"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        />
        <motion.path
          d="M50 45 Q75 35 95 40 L95 80 Q75 85 50 75 Z"
          fill="#8b5cf6"
          initial={{ opacity: 0, scaleX: 0 }} animate={isActive ? { opacity: 1, scaleX: 1 } : { opacity: 0 }}
          style={{ originX: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
        />
        
        {/* Sound waves */}
        <motion.path d="M100 60 Q110 50 100 40" stroke="#8b5cf6" strokeWidth="2" fill="none"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isActive ? { opacity: [0, 1, 0], pathLength: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1, repeat: Infinity }}
        />
        <motion.path d="M105 65 Q118 50 105 35" stroke="#6366f1" strokeWidth="2" fill="none"
          initial={{ opacity: 0, pathLength: 0 }}
          animate={isActive ? { opacity: [0, 1, 0], pathLength: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 1, repeat: Infinity }}
        />
        
        {/* Floating icons - likes, shares */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: [0, -5, 0] } : { opacity: 0 }}
          transition={{ delay: 1, duration: 2, repeat: Infinity }}
        >
          <circle cx="85" cy="25" r="8" fill="#ec4899" />
          <text x="85" y="28" textAnchor="middle" fill="white" fontSize="8">♥</text>
        </motion.g>
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: [0, -8, 0] } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 2, repeat: Infinity }}
        >
          <circle cx="70" cy="20" r="6" fill="#3b82f6" />
          <text x="70" y="23" textAnchor="middle" fill="white" fontSize="6">↗</text>
        </motion.g>
      </svg>
    ),
    
    // Exit - Cash profit/money bag
    4: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Money bag */}
        <motion.path
          d="M40 45 Q60 35 80 45 L85 90 Q60 100 35 90 Z"
          fill="#8b5cf6"
          initial={{ opacity: 0, scale: 0.8 }} animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.path
          d="M45 48 Q60 40 75 48"
          fill="none" stroke="#6366f1" strokeWidth="4"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
        
        {/* Dollar sign on bag */}
        <motion.text x="60" y="75" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >$</motion.text>
        
        {/* Profit arrow */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        >
          <path d="M90 70 L90 30 L100 40 M90 30 L80 40" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
        </motion.g>
        
        {/* Floating dollar bills */}
        <motion.rect x="15" y="30" width="15" height="8" rx="1" fill="#22c55e"
          initial={{ opacity: 0, y: 20, rotate: -10 }}
          animate={isActive ? { opacity: [0, 1, 1, 0], y: [20, 0, -10, -20], rotate: [-10, 0, 5, 10] } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        <motion.rect x="100" y="50" width="12" height="6" rx="1" fill="#22c55e"
          initial={{ opacity: 0, y: 20, rotate: 10 }}
          animate={isActive ? { opacity: [0, 1, 1, 0], y: [20, 0, -10, -20], rotate: [10, 0, -5, -10] } : { opacity: 0 }}
          transition={{ delay: 1.1, duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        
        {/* Profit percentage */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 1.3, type: "spring" }}
        >
          <rect x="20" y="15" width="40" height="18" rx="4" fill="#1e293b" />
          <text x="40" y="28" textAnchor="middle" fill="#22c55e" fontSize="10" fontWeight="bold">+15%</text>
        </motion.g>
      </svg>
    ),
  };
  
  return illustrations[phaseIndex] || illustrations[0];
};

const getPhaseIcon = (index: number) => {
  const icons = [DollarSign, FileText, Hammer, Megaphone, TrendingUp];
  return icons[index] || DollarSign;
};

// Timeline data for different scenarios
const optimisticTimeline = [
  { year: "2026", month: "January", title: "Acquisition", description: "Secure the property with investor capital" },
  { year: "2026", month: "August", title: "Permit Accepted", description: "Design approval and permits obtained" },
  { year: "2026", month: "September", title: "Construction Starts", description: "Begin development phase" },
  { year: "2027", month: "October", title: "Sale Listing", description: "Property marketed to buyers" },
  { year: "2028", month: "January", title: "Exit", description: "Final sale and profit distribution", duration: "24 months" },
];

const downsideTimeline = [
  { year: "2026", month: "January", title: "Acquisition", description: "Secure the property with investor capital" },
  { year: "2027", month: "March", title: "Permit Accepted", description: "Extended permit approval process" },
  { year: "2027", month: "April", title: "Construction Starts", description: "Begin development phase" },
  { year: "2028", month: "May", title: "Sale Listing", description: "Property marketed to buyers" },
  { year: "2028", month: "September", title: "Exit", description: "Final sale and profit distribution", duration: "32 months" },
];

export const DealTimeline = ({ deal }: DealTimelineProps) => {
  const [activeScenario, setActiveScenario] = useState<TimelineScenario>("optimistic");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (!deal.timeline) return null;

  const currentTimeline = activeScenario === "optimistic" ? optimisticTimeline : downsideTimeline;
  const activeStep = hoveredStep ?? 0;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/50 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-white text-center mb-16 tracking-tight"
        >
          Development Timeline
        </motion.h2>

        {/* Main Content - Two Panel Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Panel - Timeline Steps */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-slate-700 via-slate-600 to-slate-700" />
            
            {/* Steps */}
            <div className="space-y-0">
              <AnimatePresence mode="wait">
                {currentTimeline.map((step, index) => {
                  const Icon = getPhaseIcon(index);
                  const isActive = hoveredStep === index;
                  
                  return (
                    <motion.div
                      key={`${activeScenario}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative pl-10 pb-8 cursor-pointer group"
                      onMouseEnter={() => setHoveredStep(index)}
                      onMouseLeave={() => setHoveredStep(null)}
                    >
                      {/* Dot */}
                      <motion.div 
                        className={`absolute left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isActive 
                            ? 'bg-violet-600 border-violet-600 scale-125' 
                            : 'bg-slate-800 border-slate-600 group-hover:border-violet-500'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </motion.div>

                      {/* Content */}
                      <div className="flex items-baseline gap-4">
                        <span className={`text-2xl font-light transition-colors duration-300 ${
                          isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'
                        }`}>
                          {step.year}
                        </span>
                        <div>
                          <span className={`text-sm italic transition-colors duration-300 ${
                            isActive ? 'text-violet-400' : 'text-slate-500'
                          }`}>
                            {step.month}
                          </span>
                          <h4 className={`text-xl md:text-2xl font-light transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                          }`}>
                            {step.title}
                            {step.duration && (
                              <span className="ml-3 text-base text-slate-500 font-normal">
                                {step.duration}
                              </span>
                            )}
                          </h4>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Panel - Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col"
          >
            {/* Animation Display */}
            <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700/50 p-8 flex items-center justify-center min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="w-48 h-48 md:w-56 md:h-56"
                >
                  <PhaseIllustration phaseIndex={activeStep} isActive={true} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step Info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-center"
              >
                <h4 className="text-xl text-white font-light mb-2">
                  {currentTimeline[activeStep]?.title}
                </h4>
                <p className="text-slate-400 text-sm">
                  {currentTimeline[activeStep]?.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scenario Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center gap-4 mt-16"
        >
          <button
            onClick={() => setActiveScenario("optimistic")}
            className={`px-8 py-3 text-sm font-medium border-2 transition-all duration-300 ${
              activeScenario === "optimistic"
                ? 'border-violet-500 bg-violet-500/10 text-white'
                : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            Optimistic
          </button>
          <button
            onClick={() => setActiveScenario("downside")}
            className={`px-8 py-3 text-sm font-medium border-2 transition-all duration-300 ${
              activeScenario === "downside"
                ? 'border-violet-500 bg-violet-500/10 text-white'
                : 'border-slate-600 text-slate-400 hover:border-slate-500 hover:text-slate-300'
            }`}
          >
            Downside
          </button>
        </motion.div>
      </div>
    </section>
  );
};
