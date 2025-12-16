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
  },
  {
    icon: Shield,
    title: "Institutional-grade structuring",
    subtitle: "Luxembourg compliance",
    description: "Regulated Luxembourg or partner frameworks ensure compliance, transparency, and cross-border investment access.",
  },
  {
    icon: Crown,
    title: "Premium investor experience",
    subtitle: "Luxury-grade interface",
    description: "Your deal is showcased in a luxury-grade interface that elevates your brand and positions your project as a true investment product.",
  },
  {
    icon: Users,
    title: "Community activation",
    subtitle: "Fans become co-investors",
    description: "Transform your followers, fans, or customers into co-investors who care about your success.",
  },
  {
    icon: Zap,
    title: "Automated earnings",
    subtitle: "Smart contract distributions",
    description: "Yields, royalty flows, or revenues are distributed automatically through smart contracts.",
  },
  {
    icon: ArrowLeftRight,
    title: "Secondary-market liquidity",
    subtitle: "Trade on our marketplace",
    description: "Your investors can trade their ownership on our decentralized marketplace — increasing attractiveness and long-term engagement.",
  },
  {
    icon: Headphones,
    title: "Full-service support",
    subtitle: "End-to-end partnership",
    description: "Structuring, design, web experience, legal setup, tokenization, distribution, compliance, marketing… We handle everything.",
  }
];

export const SignatureDealWhy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
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
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, paginate]);

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const normalizedDiff = ((diff % reasons.length) + reasons.length) % reasons.length;
    const adjustedDiff = normalizedDiff > reasons.length / 2 ? normalizedDiff - reasons.length : normalizedDiff;
    
    return {
      zIndex: reasons.length - Math.abs(adjustedDiff),
      scale: 1 - Math.abs(adjustedDiff) * 0.08,
      x: adjustedDiff * 60,
      rotateY: adjustedDiff * -8,
      opacity: Math.abs(adjustedDiff) > 2 ? 0 : 1 - Math.abs(adjustedDiff) * 0.25,
    };
  };

  const CurrentIcon = reasons[currentIndex].icon;

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-white/[0.02]" />
      
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="text-white/60 font-medium text-sm tracking-wider uppercase mb-4 block">
            The Fragma Advantage
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Why launch your signature deal
            <br />
            <span className="bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              with Fragma?
            </span>
          </h2>
        </motion.div>

        {/* 3D Card Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
          style={{ perspective: "1500px" }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Card Stack Container */}
          <div className="relative h-[420px] flex items-center justify-center">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const style = getCardStyle(index);
              const isActive = index === currentIndex;
              
              return (
                <motion.div
                  key={reason.title}
                  className="absolute w-full max-w-xl cursor-pointer"
                  initial={false}
                  animate={{
                    x: style.x,
                    scale: style.scale,
                    rotateY: style.rotateY,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.8,
                  }}
                  onClick={() => {
                    if (index !== currentIndex) {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Glass Card */}
                  <div 
                    className={`
                      relative p-10 rounded-3xl
                      bg-white/[0.03] backdrop-blur-2xl
                      border border-white/[0.08]
                      shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
                      transition-all duration-500
                      ${isActive ? 'border-white/20 bg-white/[0.06]' : ''}
                    `}
                  >
                    {/* Subtle inner glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header row */}
                      <div className="flex items-start justify-between mb-8">
                        {/* Icon */}
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-white/[0.06] backdrop-blur border border-white/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-white/80" />
                          </div>
                        </div>
                        
                        {/* Number */}
                        <span className="text-6xl font-bold text-white/[0.06] tabular-nums">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-sm font-medium text-white/40 mb-5 uppercase tracking-wide">
                        {reason.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-white/50 text-base leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                    
                    {/* Bottom accent */}
                    <div className={`absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={() => paginate(-1)}
              className="w-12 h-12 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {reasons.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    currentIndex === index 
                      ? "w-8 bg-white/80" 
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="w-12 h-12 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
