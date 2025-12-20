import { motion, AnimatePresence, useInView } from "framer-motion";
import { DollarSign, FileText, Hammer, Megaphone, TrendingUp } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState, useRef, useEffect } from "react";

interface DealTimelineProps {
  deal: DealData;
}

type TimelineScenario = "optimistic" | "downside";

// Premium Phase Illustrations
const PhaseIllustration = ({ phaseIndex, isActive }: { phaseIndex: number; isActive: boolean }) => {
  const illustrations: Record<number, JSX.Element> = {
    0: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <motion.g key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <ellipse cx="80" cy={115 - i * 10} rx="35" ry="8" fill="#92400e" opacity="0.6" />
            <ellipse cx="80" cy={110 - i * 10} rx="35" ry="8" fill="url(#coinGold)" />
          </motion.g>
        ))}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <circle cx="80" cy="50" r="22" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
          <text x="80" y="58" textAnchor="middle" fill="#fbbf24" fontSize="22" fontWeight="bold">$</text>
        </motion.g>
      </svg>
    ),
    1: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <motion.path d="M40 120 L80 140 L120 120 L80 100 Z" fill="none" stroke="url(#lineGlow)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.6 }}
        />
        <motion.path d="M40 120 L40 70 L80 50 L80 100 Z" fill="none" stroke="url(#lineGlow)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />
        <motion.path d="M120 120 L120 70 L80 50 L80 100 Z" fill="none" stroke="url(#lineGlow)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <circle cx="130" cy="35" r="18" fill="none" stroke="#22c55e" strokeWidth="2" />
          <text x="130" y="39" textAnchor="middle" fill="#22c55e" fontSize="8" fontWeight="bold">OK</text>
        </motion.g>
      </svg>
    ),
    2: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <motion.rect x="30" y="130" width="100" height="6" rx="2" fill="#334155"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0.5 }} transition={{ duration: 0.4 }}
        />
        <motion.rect x="40" y="40" width="8" height="90" fill="#64748b"
          initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
          style={{ originY: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
        />
        <motion.rect x="40" y="35" width="70" height="6" rx="2" fill="#f59e0b"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          style={{ originX: 0 }} transition={{ delay: 0.4, duration: 0.4 }}
        />
        <motion.rect x="80" y="70" width="45" height="25" rx="2" fill="#475569"
          initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />
        <motion.rect x="80" y="95" width="45" height="25" rx="2" fill="#334155"
          initial={{ opacity: 0, y: 10 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
        <motion.line x1="100" y1="41" x2="100" y2="60" stroke="#94a3b8" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
        <motion.rect x="90" y="60" width="20" height="10" rx="2" fill="#a855f7"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: [0, 1, 1], y: [0, 5, 0] } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
      </svg>
    ),
    3: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, type: "spring" }}
        >
          <rect x="50" y="30" width="60" height="100" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <rect x="55" y="40" width="50" height="70" rx="3" fill="#334155" />
          <rect x="60" y="45" width="40" height="28" rx="2" fill="#8b5cf6" opacity="0.7" />
          <rect x="60" y="78" width="30" height="3" rx="1" fill="#64748b" />
          <rect x="60" y="84" width="40" height="2" rx="1" fill="#475569" />
          <motion.rect x="60" y="95" width="40" height="12" rx="3" fill="#22c55e"
            animate={isActive ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </motion.g>
        <motion.g initial={{ opacity: 0, x: -15 }} animate={isActive ? { opacity: 1, x: 0, y: [0, -3, 0] } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 1.5, repeat: Infinity }}
        >
          <circle cx="35" cy="55" r="12" fill="#ec4899" />
          <text x="35" y="59" textAnchor="middle" fill="white" fontSize="12">♥</text>
        </motion.g>
        <motion.g initial={{ opacity: 0, x: 15 }} animate={isActive ? { opacity: 1, x: 0, y: [0, -4, 0] } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 1.5, repeat: Infinity }}
        >
          <circle cx="125" cy="70" r="10" fill="#3b82f6" />
          <text x="125" y="74" textAnchor="middle" fill="white" fontSize="9">💬</text>
        </motion.g>
      </svg>
    ),
    4: (
      <svg viewBox="0 0 160 160" className="w-full h-full">
        <defs>
          <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
        <motion.g initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <path d="M50 60 Q80 45 110 60 L115 120 Q80 135 45 120 Z" fill="url(#bagGrad)" />
          <path d="M58 62 Q80 52 102 62" fill="none" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
          <text x="80" y="100" textAnchor="middle" fill="white" fontSize="30" fontWeight="bold">$</text>
        </motion.g>
        {[{ x: 30, y: 45, d: 0.6 }, { x: 125, y: 40, d: 0.8 }, { x: 45, y: 30, d: 1 }].map((b, i) => (
          <motion.rect key={i} x={b.x} y={b.y} width="20" height="12" rx="2" fill="#fbbf24"
            initial={{ opacity: 0, y: 30 }}
            animate={isActive ? { opacity: [0, 1, 1, 0], y: [30, 0, -15, -30] } : { opacity: 0 }}
            transition={{ delay: b.d, duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
        ))}
        <motion.g initial={{ opacity: 0, scale: 0 }} animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 1, type: "spring" }}
        >
          <rect x="100" y="75" width="45" height="24" rx="4" fill="#1e293b" stroke="#22c55e" strokeWidth="2" />
          <text x="122" y="91" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">+15%</text>
        </motion.g>
      </svg>
    ),
  };
  return illustrations[phaseIndex] || illustrations[0];
};

const optimisticTimeline = [
  { year: "2026", month: "January", title: "Acquisition" },
  { year: "2026", month: "August", title: "Permit Accepted" },
  { year: "2026", month: "September", title: "Construction Starts" },
  { year: "2027", month: "October", title: "Sale Listing" },
  { year: "2028", month: "January", title: "Exit", duration: "24 months" },
];

const downsideTimeline = [
  { year: "2026", month: "January", title: "Acquisition" },
  { year: "2027", month: "March", title: "Permit Accepted" },
  { year: "2027", month: "April", title: "Construction Starts" },
  { year: "2028", month: "May", title: "Sale Listing" },
  { year: "2028", month: "September", title: "Exit", duration: "32 months" },
];

export const DealTimeline = ({ deal }: DealTimelineProps) => {
  const [activeScenario, setActiveScenario] = useState<TimelineScenario>("optimistic");
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  if (!deal.timeline) return null;

  const currentTimeline = activeScenario === "optimistic" ? optimisticTimeline : downsideTimeline;

  // Auto-progress
  useEffect(() => {
    if (!isInView || isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % currentTimeline.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isInView, isPaused, currentTimeline.length]);

  useEffect(() => {
    setActiveStep(0);
  }, [activeScenario]);

  const handleStepClick = (index: number) => {
    setIsPaused(true);
    setActiveStep(index);
    setTimeout(() => setIsPaused(false), 6000);
  };

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden bg-slate-900">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-900/10 rounded-full blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-light text-white text-center mb-10 tracking-tight"
        >
          Development Timeline
        </motion.h2>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Left - Vertical Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="relative"
          >
            {/* Vertical progress line */}
            <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-700">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-violet-500"
                animate={{ height: `${((activeStep + 1) / currentTimeline.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            
            <div className="space-y-1">
              {currentTimeline.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = index < activeStep;
                
                return (
                  <motion.div
                    key={`${activeScenario}-${index}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className="relative pl-8 py-3 cursor-pointer group"
                    onClick={() => handleStepClick(index)}
                  >
                    {/* Dot */}
                    <motion.div 
                      className={`absolute left-0 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                        isActive 
                          ? 'bg-violet-500 border-violet-400 scale-125' 
                          : isPast
                            ? 'bg-violet-600/50 border-violet-500/50'
                            : 'bg-slate-800 border-slate-600 group-hover:border-violet-500/50'
                      }`}
                      style={{ boxShadow: isActive ? '0 0 12px rgba(139, 92, 246, 0.5)' : 'none' }}
                    />

                    <div className="flex items-baseline gap-3">
                      <span className={`text-xl font-extralight transition-colors duration-300 ${
                        isActive ? 'text-white' : isPast ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {step.year}
                      </span>
                      <span className={`text-xs italic transition-colors duration-300 ${
                        isActive ? 'text-violet-400' : 'text-slate-500'
                      }`}>
                        {step.month}
                      </span>
                    </div>
                    <h4 className={`text-lg font-light transition-colors duration-300 ${
                      isActive ? 'text-white' : isPast ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {step.title}
                      {step.duration && <span className="ml-2 text-sm text-slate-500">{step.duration}</span>}
                    </h4>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right - Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="bg-slate-800/50 rounded-2xl border border-slate-700/50 p-6 flex items-center justify-center min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeScenario}-${activeStep}`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="w-40 h-40 md:w-48 md:h-48"
                >
                  <PhaseIllustration phaseIndex={activeStep} isActive={true} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Phase label */}
            <div className="text-center mt-4">
              <span className="text-xs tracking-widest uppercase text-violet-400">
                Phase {activeStep + 1} of {currentTimeline.length}
              </span>
              <h4 className="text-xl text-white font-light mt-1">
                {currentTimeline[activeStep]?.title}
              </h4>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {currentTimeline.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeStep ? 'bg-violet-500 w-5' : index < activeStep ? 'bg-violet-500/50 w-1.5' : 'bg-slate-600 w-1.5'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scenario Toggle */}
        <div className="flex justify-center gap-3 mt-10">
          {["optimistic", "downside"].map((scenario) => (
            <button
              key={scenario}
              onClick={() => setActiveScenario(scenario as TimelineScenario)}
              className={`px-6 py-2.5 text-sm font-medium border transition-all duration-300 ${
                activeScenario === scenario
                  ? 'border-violet-500 bg-violet-500/10 text-white'
                  : 'border-slate-600 text-slate-400 hover:border-slate-500'
              }`}
            >
              {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
