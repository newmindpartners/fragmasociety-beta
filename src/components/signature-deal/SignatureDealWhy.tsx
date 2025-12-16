import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { 
  Palette, 
  Shield, 
  Crown, 
  Users, 
  Zap, 
  ArrowLeftRight, 
  Headphones,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const reasons = [
  {
    icon: Palette,
    title: "A deal crafted with you",
    subtitle: "Not copied from templates",
    description: "We co-create a bespoke investment product around your asset, brand, and story. Every detail is engineered for investor trust and long-term value.",
    graphic: "craft", // Pen/brush strokes
  },
  {
    icon: Shield,
    title: "Institutional-grade structuring",
    subtitle: "Luxembourg compliance",
    description: "Regulated Luxembourg or partner frameworks ensure compliance, transparency, and cross-border investment access.",
    graphic: "shield", // Shield layers
  },
  {
    icon: Crown,
    title: "Premium investor experience",
    subtitle: "Luxury-grade interface",
    description: "Your deal is showcased in a luxury-grade interface that elevates your brand and positions your project as a true investment product.",
    graphic: "crown", // Crown sparkles
  },
  {
    icon: Users,
    title: "Community activation",
    subtitle: "Fans become co-investors",
    description: "Transform your followers, fans, or customers into co-investors who care about your success.",
    graphic: "community", // Connected nodes
  },
  {
    icon: Zap,
    title: "Automated earnings",
    subtitle: "Smart contract distributions",
    description: "Yields, royalty flows, or revenues are distributed automatically through smart contracts.",
    graphic: "lightning", // Energy bolts
  },
  {
    icon: ArrowLeftRight,
    title: "Secondary-market liquidity",
    subtitle: "Trade on our marketplace",
    description: "Your investors can trade their ownership on our decentralized marketplace — increasing attractiveness and long-term engagement.",
    graphic: "exchange", // Flow arrows
  },
  {
    icon: Headphones,
    title: "Full-service support",
    subtitle: "End-to-end partnership",
    description: "Structuring, design, web experience, legal setup, tokenization, distribution, compliance, marketing… We handle everything.",
    graphic: "support", // Circular support
  }
];

// Custom graphics for each card
const CardGraphic = ({ type }: { type: string }) => {
  const baseClass = "absolute right-4 top-4 w-32 h-32 opacity-20";
  
  switch (type) {
    case "craft":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <motion.path
            d="M20 80 Q 40 20 60 50 T 90 30"
            stroke="url(#turquoise)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.circle
            cx="85" cy="25" r="8"
            fill="url(#turquoise)"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="turquoise" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CED1" />
              <stop offset="100%" stopColor="#20B2AA" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "shield":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <motion.path
            d="M50 10 L80 25 L80 55 Q80 80 50 95 Q20 80 20 55 L20 25 Z"
            stroke="url(#turquoise2)"
            strokeWidth="2"
            fill="none"
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M50 25 L65 35 L65 50 Q65 65 50 75 Q35 65 35 50 L35 35 Z"
            fill="url(#turquoise2)"
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <defs>
            <linearGradient id="turquoise2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CED1" />
              <stop offset="100%" stopColor="#008B8B" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "crown":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <motion.path
            d="M15 70 L25 35 L40 50 L50 20 L60 50 L75 35 L85 70 Z"
            stroke="url(#turquoise3)"
            strokeWidth="2"
            fill="url(#turquoise3)"
            fillOpacity="0.3"
            initial={{ y: 5 }}
            animate={{ y: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          {[25, 50, 75].map((x, i) => (
            <motion.circle
              key={i}
              cx={x} cy={15 + i * 5}
              r="3"
              fill="#00CED1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
          <defs>
            <linearGradient id="turquoise3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#40E0D0" />
              <stop offset="100%" stopColor="#00CED1" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "community":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          {[[50, 30], [25, 55], [75, 55], [35, 80], [65, 80]].map(([cx, cy], i) => (
            <motion.circle
              key={i}
              cx={cx} cy={cy}
              r="10"
              stroke="url(#turquoise4)"
              strokeWidth="2"
              fill="url(#turquoise4)"
              fillOpacity="0.2"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.1, 0.8] }}
              transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
          <motion.line x1="50" y1="40" x2="35" y2="55" stroke="#00CED1" strokeWidth="1" />
          <motion.line x1="50" y1="40" x2="65" y2="55" stroke="#00CED1" strokeWidth="1" />
          <motion.line x1="25" y1="65" x2="35" y2="70" stroke="#00CED1" strokeWidth="1" />
          <motion.line x1="75" y1="65" x2="65" y2="70" stroke="#00CED1" strokeWidth="1" />
          <defs>
            <linearGradient id="turquoise4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CED1" />
              <stop offset="100%" stopColor="#20B2AA" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "lightning":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <motion.path
            d="M55 10 L35 45 L50 45 L45 90 L70 50 L55 50 Z"
            fill="url(#turquoise5)"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          {[1, 2, 3].map((_, i) => (
            <motion.circle
              key={i}
              cx={30 + i * 20}
              cy={70 + i * 5}
              r="4"
              fill="#00CED1"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 1, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
          <defs>
            <linearGradient id="turquoise5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#40E0D0" />
              <stop offset="100%" stopColor="#00CED1" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "exchange":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <motion.path
            d="M20 35 L70 35"
            stroke="url(#turquoise6)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ x: -10 }}
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M60 25 L75 35 L60 45"
            stroke="url(#turquoise6)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <motion.path
            d="M80 65 L30 65"
            stroke="url(#turquoise6)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ x: 10 }}
            animate={{ x: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M40 55 L25 65 L40 75"
            stroke="url(#turquoise6)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <defs>
            <linearGradient id="turquoise6" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00CED1" />
              <stop offset="100%" stopColor="#20B2AA" />
            </linearGradient>
          </defs>
        </svg>
      );
    case "support":
      return (
        <svg className={baseClass} viewBox="0 0 100 100" fill="none">
          <motion.circle
            cx="50" cy="50" r="35"
            stroke="url(#turquoise7)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 5"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50px", originY: "50px" }}
          />
          <motion.circle
            cx="50" cy="50" r="20"
            fill="url(#turquoise7)"
            fillOpacity="0.3"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <circle cx="50" cy="50" r="8" fill="#00CED1" />
          <defs>
            <linearGradient id="turquoise7" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#40E0D0" />
              <stop offset="100%" stopColor="#008B8B" />
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return null;
  }
};

export const SignatureDealWhy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection: number) => {
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = reasons.length - 1;
      if (newIndex >= reasons.length) newIndex = 0;
      return newIndex;
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  const currentReason = reasons[currentIndex];
  const CurrentIcon = currentReason.icon;

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-white/[0.01]" />
      
      {/* Turquoise ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-teal-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-white/50 font-medium text-sm tracking-wider uppercase mb-4 block">
            The Fragma Advantage
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why launch your signature deal
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              with Fragma?
            </span>
          </h2>
        </motion.div>

        {/* Card Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Card */}
          <div className="relative h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="absolute inset-0"
              >
                {/* Glass Card */}
                <div className="relative h-full p-10 md:p-12 rounded-3xl overflow-hidden
                  bg-white/[0.03] backdrop-blur-3xl
                  border border-white/[0.08]
                  shadow-[0_8px_60px_-15px_rgba(0,206,209,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]
                ">
                  {/* Turquoise spotlight gradient */}
                  <div className="absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gradient-to-tr from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.02] via-transparent to-cyan-500/[0.02] pointer-events-none" />
                  
                  {/* Card Graphic */}
                  <CardGraphic type={currentReason.graphic} />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      {/* Icon */}
                      <motion.div 
                        className="relative"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 backdrop-blur-xl border border-cyan-500/20 flex items-center justify-center">
                          <CurrentIcon className="w-7 h-7 text-cyan-400" />
                        </div>
                        {/* Icon glow */}
                        <div className="absolute inset-0 bg-cyan-500/30 rounded-2xl blur-xl opacity-50" />
                      </motion.div>
                      
                      {/* Number */}
                      <motion.span 
                        className="text-7xl font-bold bg-gradient-to-b from-cyan-500/20 to-transparent bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        0{currentIndex + 1}
                      </motion.span>
                    </div>

                    {/* Text Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="flex-1"
                    >
                      <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2">
                        {currentReason.title}
                      </h3>
                      <p className="text-sm font-medium text-cyan-400/80 mb-5 uppercase tracking-wide">
                        {currentReason.subtitle}
                      </p>
                      <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-lg">
                        {currentReason.description}
                      </p>
                    </motion.div>
                    
                    {/* Bottom accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentIndex === index 
                      ? "w-10 bg-gradient-to-r from-cyan-400 to-teal-400" 
                      : "w-1.5 bg-white/20 hover:bg-cyan-400/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white/50 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
