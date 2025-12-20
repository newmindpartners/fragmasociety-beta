import { motion, AnimatePresence, useInView } from "framer-motion";
import { DollarSign, FileText, Hammer, Megaphone, TrendingUp } from "lucide-react";
import type { DealData } from "@/types/deal";
import { useState, useRef, useEffect } from "react";

interface DealTimelineProps {
  deal: DealData;
}

type TimelineScenario = "optimistic" | "downside";

// Line-art style animated icons
const PhaseIllustration = ({ phaseIndex, isActive }: { phaseIndex: number; isActive: boolean }) => {
  const strokeColor = "#94a3b8";
  const accentColor = "#a855f7";
  
  const illustrations: Record<number, JSX.Element> = {
    // ACQUISITION - Key handover with house
    0: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* House outline */}
        <motion.path
          d="M25 55 L25 85 L55 85 L55 55"
          fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} 
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* Roof */}
        <motion.path
          d="M20 55 L40 35 L60 55"
          fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} 
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        {/* Door */}
        <motion.rect x="35" y="65" width="10" height="20" rx="1" fill="none" stroke={strokeColor} strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4 }}
        />
        {/* Large Key */}
        <motion.g
          initial={{ opacity: 0, x: 20, rotate: 15 }}
          animate={isActive ? { opacity: 1, x: 0, rotate: 0 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
        >
          {/* Key head (circle) */}
          <circle cx="85" cy="40" r="12" fill="none" stroke={accentColor} strokeWidth="2.5" />
          <circle cx="85" cy="40" r="6" fill="none" stroke={accentColor} strokeWidth="1.5" />
          {/* Key shaft */}
          <line x1="85" y1="52" x2="85" y2="85" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
          {/* Key teeth */}
          <path d="M85 70 L92 70 M85 78 L95 78 M85 85 L90 85" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
        </motion.g>
        {/* Hand receiving */}
        <motion.path
          d="M65 95 Q70 85 80 88 L95 88 Q100 88 100 93 L100 98"
          fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
        {/* Transfer arrow */}
        <motion.path
          d="M55 50 L70 50 M65 45 L70 50 L65 55"
          fill="none" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0, x: -10 }}
          animate={isActive ? { opacity: [0, 1, 1], x: [- 10, 0, 5, 0] } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        />
        {/* Sparkle */}
        <motion.circle cx="95" cy="30" r="2" fill={accentColor}
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: [0, 1, 0], scale: [0, 1.2, 0] } : { opacity: 0 }}
          transition={{ delay: 1.4, duration: 1, repeat: Infinity, repeatDelay: 1.5 }}
        />
      </svg>
    ),
    
    // DESIGN/PERMITS - Blueprint with ruler and checkmark
    1: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Blueprint paper */}
        <motion.rect x="25" y="25" width="70" height="70" rx="3" 
          fill="none" stroke={strokeColor} strokeWidth="2"
          initial={{ pathLength: 0 }} 
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* Inner grid lines */}
        <motion.g initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.3 }}>
          <line x1="25" y1="50" x2="95" y2="50" stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <line x1="25" y1="70" x2="95" y2="70" stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <line x1="50" y1="25" x2="50" y2="95" stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
          <line x1="70" y1="25" x2="70" y2="95" stroke={strokeColor} strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
        </motion.g>
        {/* House outline on blueprint */}
        <motion.path
          d="M45 65 L45 55 L60 45 L75 55 L75 65 L45 65"
          fill="none" stroke={accentColor} strokeWidth="2" strokeLinejoin="round"
          initial={{ pathLength: 0 }} 
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
        {/* Door */}
        <motion.rect x="56" y="57" width="8" height="8" fill="none" stroke={accentColor} strokeWidth="1.5"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        />
        {/* Ruler on side */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <rect x="100" y="30" width="8" height="60" rx="1" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line key={i} x1="100" y1={35 + i * 10} x2="104" y2={35 + i * 10} stroke={strokeColor} strokeWidth="1" />
          ))}
        </motion.g>
        {/* Checkmark stamp */}
        <motion.g
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={isActive ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0 }}
          transition={{ delay: 1, type: "spring", damping: 10 }}
        >
          <circle cx="82" cy="82" r="12" fill="none" stroke="#22c55e" strokeWidth="2" />
          <motion.path d="M76 82 L80 86 L88 78" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ delay: 1.2, duration: 0.3 }}
          />
        </motion.g>
      </svg>
    ),
    
    // CONSTRUCTION - Building with crane
    2: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Ground */}
        <motion.line x1="10" y1="100" x2="110" y2="100" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.4 }}
        />
        
        {/* Building under construction */}
        <motion.g>
          {/* Floor 1 */}
          <motion.rect x="55" y="75" width="40" height="25" fill="none" stroke={strokeColor} strokeWidth="2" rx="1"
            initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            style={{ originY: 1 }} transition={{ delay: 0.3, duration: 0.4 }}
          />
          {/* Floor 2 */}
          <motion.rect x="55" y="50" width="40" height="25" fill="none" stroke={strokeColor} strokeWidth="2" rx="1"
            initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            style={{ originY: 1 }} transition={{ delay: 0.5, duration: 0.4 }}
          />
          {/* Floor 3 */}
          <motion.rect x="55" y="25" width="40" height="25" fill="none" stroke={accentColor} strokeWidth="2" rx="1"
            initial={{ scaleY: 0 }} animate={isActive ? { scaleY: 1 } : { scaleY: 0 }}
            style={{ originY: 1 }} transition={{ delay: 0.7, duration: 0.4 }}
          />
          {/* Windows */}
          {[[60, 80], [80, 80], [60, 55], [80, 55], [60, 30], [80, 30]].map(([x, y], i) => (
            <motion.rect key={i} x={x} y={y} width="10" height="12" fill="none" stroke={i >= 4 ? accentColor : strokeColor} strokeWidth="1"
              initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          ))}
        </motion.g>
        
        {/* Crane tower */}
        <motion.line x1="25" y1="100" x2="25" y2="15" stroke={strokeColor} strokeWidth="2.5"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        {/* Crane arm */}
        <motion.line x1="25" y1="18" x2="70" y2="18" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
        {/* Crane counter weight */}
        <motion.rect x="12" y="15" width="13" height="8" rx="1" fill="none" stroke={accentColor} strokeWidth="2"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        />
        {/* Cable */}
        <motion.line x1="60" y1="18" x2="60" y2="35" stroke={strokeColor} strokeWidth="1.5" strokeDasharray="2,2"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.8, duration: 0.3 }}
        />
        {/* Lifting block */}
        <motion.rect x="52" y="35" width="16" height="10" rx="1" fill="none" stroke={accentColor} strokeWidth="2"
          initial={{ opacity: 0, y: -15 }}
          animate={isActive ? { opacity: 1, y: [0, 5, 0] } : { opacity: 0 }}
          transition={{ delay: 1, duration: 2, repeat: Infinity, repeatDelay: 1 }}
        />
        
        {/* Excavator/machine */}
        <motion.g
          initial={{ opacity: 0, x: -15 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {/* Body */}
          <rect x="100" y="90" width="15" height="10" rx="2" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          {/* Cabin */}
          <rect x="103" y="85" width="8" height="5" rx="1" fill="none" stroke={accentColor} strokeWidth="1.5" />
          {/* Wheels */}
          <circle cx="103" cy="100" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="112" cy="100" r="3" fill="none" stroke={strokeColor} strokeWidth="1.5" />
        </motion.g>
      </svg>
    ),
    
    // MARKETING - Prominent SOLD sign with spotlight
    3: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Spotlight beams */}
        <motion.g initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.8 }}>
          <motion.path d="M60 45 L40 20 L35 25 L55 48" fill={accentColor} opacity="0.15"
            animate={isActive ? { opacity: [0.1, 0.25, 0.1] } : { opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path d="M60 45 L80 20 L85 25 L65 48" fill={accentColor} opacity="0.15"
            animate={isActive ? { opacity: [0.1, 0.25, 0.1] } : { opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </motion.g>
        
        {/* Sign post */}
        <motion.line x1="60" y1="55" x2="60" y2="105" stroke={strokeColor} strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.4 }}
        />
        {/* Post base */}
        <motion.path d="M50 105 L70 105" stroke={strokeColor} strokeWidth="3" strokeLinecap="round"
          initial={{ pathLength: 0 }} animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
        
        {/* Main sign board */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={isActive ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring", damping: 12 }}
        >
          <rect x="25" y="30" width="70" height="35" rx="3" fill="none" stroke={accentColor} strokeWidth="2.5" />
          <rect x="28" y="33" width="64" height="29" rx="2" fill={accentColor} opacity="0.1" />
          <text x="60" y="52" textAnchor="middle" fill={accentColor} fontSize="14" fontWeight="bold" letterSpacing="2">FOR SALE</text>
        </motion.g>
        
        {/* SOLD overlay banner */}
        <motion.g
          initial={{ opacity: 0, scale: 0, rotate: -15 }}
          animate={isActive ? { opacity: 1, scale: 1, rotate: -8 } : { opacity: 0 }}
          transition={{ delay: 1, duration: 0.4, type: "spring", damping: 10 }}
        >
          <rect x="30" y="38" width="60" height="22" rx="2" fill="#22c55e" />
          <text x="60" y="54" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" letterSpacing="3">SOLD</text>
        </motion.g>
        
        {/* Celebration sparkles */}
        {[[25, 25], [95, 30], [20, 60], [100, 55], [45, 15], [75, 18]].map(([x, y], i) => (
          <motion.g key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isActive ? { opacity: [0, 1, 0], scale: [0, 1, 0] } : { opacity: 0 }}
            transition={{ delay: 1.3 + i * 0.15, duration: 1, repeat: Infinity, repeatDelay: 2 }}
          >
            <line x1={x - 4} y1={y} x2={x + 4} y2={y} stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
            <line x1={x} y1={y - 4} x2={x} y2={y + 4} stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
          </motion.g>
        ))}
        
        {/* Price tag */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <rect x="70" y="70" width="35" height="16" rx="2" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <text x="87" y="81" textAnchor="middle" fill={strokeColor} fontSize="8">$4.5M</text>
        </motion.g>
      </svg>
    ),
    
    // EXIT - Rising chart with key handover
    4: (
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Chart axes */}
        <motion.path
          d="M25 90 L25 30 M25 90 L95 90"
          fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round"
          initial={{ pathLength: 0 }} 
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* Rising chart line */}
        <motion.path
          d="M30 80 L45 70 L55 72 L70 50 L85 30"
          fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }} 
          animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
        {/* Chart fill */}
        <motion.path
          d="M30 80 L45 70 L55 72 L70 50 L85 30 L85 90 L30 90 Z"
          fill={accentColor} opacity="0.15"
          initial={{ opacity: 0 }} 
          animate={isActive ? { opacity: 0.15 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
        {/* Data points */}
        {[[30, 80], [45, 70], [55, 72], [70, 50], [85, 30]].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x} cy={y} r="3" fill={accentColor}
            initial={{ scale: 0 }}
            animate={isActive ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
          />
        ))}
        {/* Arrow at top */}
        <motion.path
          d="M85 30 L90 25 M85 30 L80 25"
          fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2 }}
        />
        {/* Profit badge */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ delay: 1.3, type: "spring", damping: 10 }}
        >
          <rect x="65" y="15" width="35" height="16" rx="3" fill="none" stroke="#22c55e" strokeWidth="1.5" />
          <text x="82" y="26" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold">+15%</text>
        </motion.g>
        {/* Key icon */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          <circle cx="105" cy="70" r="6" fill="none" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="105" y1="76" x2="105" y2="90" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="105" y1="82" x2="108" y2="82" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="105" y1="86" x2="110" y2="86" stroke={strokeColor} strokeWidth="1.5" />
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
    <section ref={sectionRef} className="relative py-16 lg:py-20 overflow-hidden">
      {/* Dark Navy Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1a] via-[#0d1424] to-[#111827]" />
      
      {/* Atmospheric Effects */}
      <div className="absolute inset-0">
        {/* Top violet glow */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[400px] bg-gradient-to-bl from-violet-900/20 via-violet-800/10 to-transparent rounded-full blur-3xl" />
        {/* Left navy accent */}
        <div className="absolute top-1/2 -left-20 w-[400px] h-[400px] bg-gradient-to-r from-slate-800/30 via-indigo-900/20 to-transparent rounded-full blur-3xl" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0f1a]/80 to-transparent" />
        {/* Subtle center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-900/5 rounded-full blur-[100px]" />
      </div>
      
      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header - Consistent with other sections */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-8 bg-violet-500/50" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-violet-300/80 font-medium">
              Project Milestones
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05]"
          >
            Development{" "}
            <span className="italic font-serif text-violet-300">Timeline</span>
          </motion.h2>
        </div>

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
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={() => setActiveScenario("optimistic")}
            className={`flex flex-col items-center px-8 py-3 border transition-all duration-300 ${
              activeScenario === "optimistic"
                ? 'border-violet-500 bg-violet-500/10 text-white'
                : 'border-slate-600 text-slate-400 hover:border-slate-500'
            }`}
          >
            <span className="text-sm font-medium">Optimistic</span>
            <span className={`text-xs mt-0.5 ${activeScenario === "optimistic" ? 'text-violet-400' : 'text-slate-500'}`}>
              24 months
            </span>
          </button>
          <button
            onClick={() => setActiveScenario("downside")}
            className={`flex flex-col items-center px-8 py-3 border transition-all duration-300 ${
              activeScenario === "downside"
                ? 'border-violet-500 bg-violet-500/10 text-white'
                : 'border-slate-600 text-slate-400 hover:border-slate-500'
            }`}
          >
            <span className="text-sm font-medium">Downside</span>
            <span className={`text-xs mt-0.5 ${activeScenario === "downside" ? 'text-violet-400' : 'text-slate-500'}`}>
              36 months
            </span>
          </button>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-slate-500 text-xs mt-8 max-w-xl mx-auto leading-relaxed"
        >
          <span className="text-slate-400">*</span> This timeline represents an estimated average development schedule for illustrative purposes only. 
          Actual timelines may vary based on market conditions, permitting processes, construction factors, and other variables beyond our control.
        </motion.p>
      </div>
    </section>
  );
};
