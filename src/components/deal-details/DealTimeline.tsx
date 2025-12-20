import { motion, AnimatePresence, useInView } from "framer-motion";
import { Calendar, CheckCircle, Clock, ArrowRight, Check, Target, Building2, Hammer, TrendingUp } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState, useRef, useEffect } from "react";

interface DealTimelineProps {
  deal: DealData;
}

// Phase illustrations for visual interest
const PhaseIllustration = ({ phaseIndex, isActive }: { phaseIndex: number; isActive: boolean }) => {
  const illustrations = {
    0: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Acquisition illustration */}
        <defs>
          <linearGradient id="acqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Building */}
        <motion.rect
          x="60" y="50" width="80" height="60" rx="4"
          fill="url(#acqGrad)" stroke="#8b5cf6" strokeWidth="2"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />
        <motion.rect x="75" y="60" width="15" height="15" fill="#8b5cf6" rx="2"
          initial={{ scale: 0 }} animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.3 }}
        />
        <motion.rect x="110" y="60" width="15" height="15" fill="#8b5cf6" rx="2"
          initial={{ scale: 0 }} animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.4 }}
        />
        <motion.rect x="75" y="85" width="15" height="15" fill="#8b5cf6" rx="2"
          initial={{ scale: 0 }} animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.5 }}
        />
        <motion.rect x="110" y="85" width="15" height="15" fill="#8b5cf6" rx="2"
          initial={{ scale: 0 }} animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 0.6 }}
        />
        
        {/* Key */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, type: "spring" }}
        >
          <circle cx="155" cy="45" r="20" fill="#1e293b" />
          <text x="155" y="50" textAnchor="middle" fill="white" fontSize="16">🔑</text>
        </motion.g>
      </svg>
    ),
    1: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Renovation illustration */}
        <motion.rect
          x="40" y="70" width="120" height="50" rx="4"
          fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1 }}
        />
        
        {/* Hammer */}
        <motion.g
          initial={{ rotate: 0, y: 0 }}
          animate={isActive ? { rotate: [0, -20, 0], y: [0, -5, 0] } : {}}
          transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
        >
          <rect x="90" y="30" width="8" height="35" fill="#64748b" rx="2" />
          <rect x="80" y="25" width="28" height="12" fill="#8b5cf6" rx="2" />
        </motion.g>
        
        {/* Progress bars */}
        <motion.rect x="55" y="85" width="90" height="6" rx="3" fill="#334155"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        />
        <motion.rect x="55" y="85" width="60" height="6" rx="3" fill="#8b5cf6"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }} style={{ originX: 0 }}
        />
        <motion.rect x="55" y="100" width="90" height="6" rx="3" fill="#334155"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        />
        <motion.rect x="55" y="100" width="45" height="6" rx="3" fill="#6366f1"
          initial={{ scaleX: 0 }} animate={isActive ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }} style={{ originX: 0 }}
        />
      </svg>
    ),
    2: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Marketing/Listing illustration */}
        <motion.rect
          x="50" y="40" width="100" height="80" rx="8"
          fill="#1e293b" stroke="#8b5cf6" strokeWidth="2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.3 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Image placeholder */}
        <motion.rect x="60" y="50" width="80" height="40" rx="4" fill="#334155"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        />
        
        {/* Price tag */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <rect x="60" y="100" width="50" height="12" rx="2" fill="#8b5cf6" />
          <text x="85" y="109" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">$4.5M</text>
        </motion.g>
        
        {/* Stars */}
        <motion.text x="130" y="108" fill="#fbbf24" fontSize="10"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        >★★★</motion.text>
      </svg>
    ),
    3: (
      <svg viewBox="0 0 200 160" className="w-full h-full">
        {/* Exit/Profit illustration */}
        <defs>
          <linearGradient id="profitGrad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        
        {/* Chart area */}
        <motion.path
          d="M30 120 L30 100 Q50 95 70 80 T110 60 T150 40 T170 30 L170 120 Z"
          fill="url(#profitGrad)"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        />
        
        {/* Chart line */}
        <motion.path
          d="M30 100 Q50 95 70 80 T110 60 T150 40 T170 30"
          fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        
        {/* End point */}
        <motion.circle cx="170" cy="30" r="8" fill="#8b5cf6"
          initial={{ scale: 0 }}
          animate={isActive ? { scale: 1 } : { scale: 0 }}
          transition={{ delay: 1, type: "spring" }}
        />
        
        {/* Profit badge */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        >
          <rect x="130" y="10" width="55" height="24" rx="4" fill="#1e293b" />
          <text x="157" y="26" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="bold">+15% IRR</text>
        </motion.g>
      </svg>
    ),
  };
  
  return illustrations[phaseIndex as keyof typeof illustrations] || illustrations[0];
};

const getPhaseIcon = (index: number) => {
  const icons = [Building2, Hammer, Target, TrendingUp];
  return icons[index] || Calendar;
};

export const DealTimeline = ({ deal }: DealTimelineProps) => {
  const [activePhase, setActivePhase] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  if (!deal.timeline) return null;

  const phases = deal.timeline.phases;

  // Auto-play logic
  useEffect(() => {
    if (!isInView || isPaused) return;
    
    const interval = setInterval(() => {
      setActivePhase((prev) => (prev + 1) % phases.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView, isPaused, phases.length]);

  const handlePhaseClick = (index: number) => {
    setIsPaused(true);
    setActivePhase(index);
    setTimeout(() => setIsPaused(false), 10000);
  };

  const currentPhase = phases[activePhase];
  const PhaseIcon = getPhaseIcon(activePhase);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden bg-slate-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/50 rounded-full blur-3xl" />
      </div>
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(180deg, #fff 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Editorial Header */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 mb-6"
          >
            <span className="text-[11px] tracking-[0.4em] uppercase text-slate-500 font-medium">
              Investment Timeline
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-slate-600">
              {phases.length.toString().padStart(2, '0')} Phases
            </span>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-5xl lg:text-6xl font-extralight text-white leading-[0.95] tracking-tight"
            >
              Development
              <span className="block font-serif italic text-slate-400 mt-2">Timeline</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-400 text-lg lg:text-xl leading-relaxed max-w-md lg:ml-auto font-light"
            >
              Expected project milestones over {deal.timeline.totalDuration}
            </motion.p>
          </div>
        </div>

        {/* Phase Navigation - Minimal Editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-start lg:justify-center mb-12 overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0"
        >
          <div className="inline-flex items-center gap-1 p-1 bg-slate-800/50 border border-slate-700/50 rounded-full backdrop-blur-sm">
            {phases.map((phase, index) => (
              <button
                key={index}
                onClick={() => handlePhaseClick(index)}
                className={`relative px-5 lg:px-8 py-3 rounded-full text-sm transition-all duration-500 ${
                  activePhase === index
                    ? 'text-white'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {activePhase === index && (
                  <motion.div
                    layoutId="activeTimelineTab"
                    className="absolute inset-0 bg-gradient-to-r from-violet-600 to-violet-700 rounded-full"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2 font-medium">
                  <span className={`text-[10px] ${activePhase === index ? 'text-white/60' : 'text-slate-600'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="hidden sm:inline">{phase.title.split(' ')[0]}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Showcase Card - 2 Panel Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto"
        >
          <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-slate-700/50">
            {/* Progress line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-700">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-violet-600 to-violet-500"
                initial={{ width: "0%" }}
                animate={{ width: `${((activePhase + 1) / phases.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            <div className="grid lg:grid-cols-2">
              {/* Content Side - Left */}
              <div className="p-8 lg:p-12 xl:p-14">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Phase Label */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-violet-400 font-semibold">
                        Phase {activePhase + 1}
                      </span>
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-600 to-transparent" />
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded ${
                        currentPhase.status === 'completed' 
                          ? 'bg-emerald-900/50 text-emerald-400' 
                          : currentPhase.status === 'current'
                            ? 'bg-violet-900/50 text-violet-400'
                            : 'bg-slate-700/50 text-slate-400'
                      }`}>
                        {currentPhase.status === 'completed' ? 'Complete' : currentPhase.status === 'current' ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>

                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-14 h-14 rounded-xl bg-violet-600 flex items-center justify-center mb-5 shadow-xl shadow-violet-900/30"
                    >
                      <PhaseIcon className="w-7 h-7 text-white" strokeWidth={1.5} />
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="text-2xl lg:text-3xl xl:text-4xl font-light text-white mb-2 tracking-tight"
                    >
                      {currentPhase.title}
                    </motion.h3>

                    {/* Date */}
                    <motion.p
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-lg text-violet-300 font-serif italic mb-5"
                    >
                      {currentPhase.date}
                    </motion.p>

                    {/* Description */}
                    {currentPhase.description && (
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-slate-400 text-base leading-relaxed mb-6 font-light"
                      >
                        {currentPhase.description}
                      </motion.p>
                    )}

                    {/* Status indicator */}
                    <motion.div 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentPhase.status === 'completed' ? (
                        <>
                          <span className="w-6 h-6 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
                            <Check className="w-3 h-3 text-emerald-400" />
                          </span>
                          <span className="text-sm text-emerald-400">Phase completed</span>
                        </>
                      ) : currentPhase.status === 'current' ? (
                        <>
                          <span className="w-6 h-6 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                            <Clock className="w-3 h-3 text-violet-400" />
                          </span>
                          <span className="text-sm text-violet-400">Currently in progress</span>
                        </>
                      ) : (
                        <>
                          <span className="w-6 h-6 rounded-full bg-slate-600/20 border border-slate-500/30 flex items-center justify-center">
                            <Calendar className="w-3 h-3 text-slate-400" />
                          </span>
                          <span className="text-sm text-slate-400">Scheduled</span>
                        </>
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Illustration Side - Right */}
              <div className="relative bg-gradient-to-br from-slate-800 via-slate-850 to-slate-900 p-8 lg:p-12 flex items-center justify-center min-h-[320px] border-l border-slate-700/50">
                {/* Large decorative number */}
                <div className="absolute top-6 right-6 text-[100px] xl:text-[120px] font-extralight text-slate-800 leading-none font-serif select-none pointer-events-none">
                  {String(activePhase + 1).padStart(2, '0')}
                </div>
                
                {/* Illustration */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhase}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full max-w-[280px] aspect-square"
                  >
                    <PhaseIllustration phaseIndex={activePhase} isActive={isInView} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Duration Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex justify-center mt-12"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 border border-slate-700 bg-slate-800/50 backdrop-blur-sm rounded-full">
            <Clock className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-slate-500 uppercase tracking-[0.2em]">Total Duration</span>
            <span className="text-sm font-medium text-white">{deal.timeline.totalDuration}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
