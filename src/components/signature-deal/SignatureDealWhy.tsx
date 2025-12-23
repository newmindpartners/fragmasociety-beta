import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { 
  Palette, 
  Shield, 
  Crown, 
  Users, 
  Zap, 
  ArrowLeftRight, 
  Headphones,
  ChevronLeft,
  ChevronRight,
  CheckCircle2
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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
    <section className="relative py-32 lg:py-40 overflow-hidden" ref={containerRef}>
      {/* Premium Light Background - matching MarketplaceDifference */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-slate-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-radial from-white via-transparent to-transparent rounded-full blur-2xl opacity-90" />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              The Fragma Advantage
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.05] mb-8"
          >
            Why launch your <span className="font-signature italic">signature deal</span>
            <br />
            <span className="italic text-slate-500 font-serif">with Fragma?</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            Everything you need to transform your vision into a world-class investment opportunity.
          </motion.p>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left - Card Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Main Card */}
            <div className="relative h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  className="absolute inset-0"
                >
                  {/* Card */}
                  <div 
                    className="relative h-full p-10 lg:p-12 overflow-hidden rounded-sm"
                    style={{ 
                      background: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid rgba(226, 232, 240, 0.8)',
                      boxShadow: '0 8px 40px -12px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {/* Large decorative number */}
                    <motion.span 
                      className="absolute top-6 right-6 text-[100px] lg:text-[120px] font-extralight leading-none text-slate-900/[0.04]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      0{currentIndex + 1}
                    </motion.span>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col">
                      {/* Icon */}
                      <motion.div 
                        className="w-16 h-16 mb-10 flex items-center justify-center border border-slate-200 bg-slate-50"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        <CurrentIcon className="w-7 h-7 text-slate-600" strokeWidth={1.5} />
                      </motion.div>

                      {/* Text Content */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="flex-1"
                      >
                        <h3 className="text-xl lg:text-2xl font-medium text-slate-900 mb-2">
                          {currentReason.title}
                        </h3>
                        <p className="text-[11px] font-medium text-primary uppercase tracking-[0.2em] mb-5">
                          {currentReason.subtitle}
                        </p>
                        <p className="text-slate-500 text-base leading-relaxed">
                          {currentReason.description}
                        </p>
                      </motion.div>
                      
                      {/* Bottom accent line */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary/60 to-slate-300/40"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
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
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-all duration-300"
                style={{ boxShadow: '0 2px 8px -2px rgba(0,0,0,0.08)' }}
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
                        ? "w-10 bg-slate-800" 
                        : "w-1.5 bg-slate-300 hover:bg-slate-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-all duration-300"
                style={{ boxShadow: '0 2px 8px -2px rgba(0,0,0,0.08)' }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Right - All Benefits List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-3"
          >
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const isActive = index === currentIndex;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="w-full text-left group cursor-pointer"
                >
                  <motion.div
                    className="relative p-5 overflow-hidden rounded-sm"
                    style={{
                      background: isActive || isHovered 
                        ? 'linear-gradient(165deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.98) 40%, rgba(51,65,85,0.96) 100%)'
                        : 'rgba(255, 255, 255, 0.9)',
                      border: isActive || isHovered 
                        ? '1px solid rgba(139, 92, 246, 0.25)' 
                        : '1px solid rgba(226, 232, 240, 0.8)',
                      boxShadow: isActive || isHovered 
                        ? '0 20px 40px -15px rgba(15, 23, 42, 0.5), 0 0 30px -10px rgba(139, 92, 246, 0.1)'
                        : '0 2px 10px -5px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    animate={{ 
                      y: isActive || isHovered ? -4 : 0,
                      scale: isActive || isHovered ? 1.01 : 1
                    }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {/* Corner accent */}
                    <motion.div 
                      className="absolute top-0 left-0 w-12 h-12"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 50%)'
                      }}
                      animate={{ 
                        opacity: isActive || isHovered ? 1 : 0.3,
                        scale: isActive || isHovered ? 1.5 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="flex items-center gap-4 relative z-10">
                      <motion.div 
                        className={`w-12 h-12 flex items-center justify-center transition-all duration-500 ${
                          isActive || isHovered 
                            ? 'border-slate-600/30 bg-slate-800/40' 
                            : 'border-slate-200 bg-slate-50'
                        }`}
                        style={{ borderWidth: '1px', borderStyle: 'solid' }}
                        animate={{ 
                          rotate: isActive || isHovered ? 6 : 0,
                          scale: isActive || isHovered ? 1.05 : 1
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon 
                          className={`w-5 h-5 transition-colors duration-500 ${
                            isActive || isHovered ? 'text-violet-300' : 'text-slate-500'
                          }`} 
                          strokeWidth={1.5} 
                        />
                      </motion.div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium transition-colors duration-500 ${
                          isActive || isHovered ? 'text-white/90' : 'text-slate-700'
                        }`}>
                          {reason.title}
                        </h4>
                        <p className={`text-sm transition-colors duration-500 ${
                          isActive || isHovered ? 'text-slate-400' : 'text-slate-400'
                        }`}>
                          {reason.subtitle}
                        </p>
                      </div>
                      
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-violet-400" />
                        </motion.div>
                      )}
                    </div>

                    {/* Bottom accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500/50 via-violet-400/40 to-slate-600/30"
                      initial={{ width: 0 }}
                      animate={{ width: isActive || isHovered ? '100%' : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-24 flex flex-col items-center gap-4"
        >
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          <span className="text-[10px] tracking-[0.4em] uppercase text-slate-300 font-light">Trusted by industry leaders</span>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </section>
  );
};
