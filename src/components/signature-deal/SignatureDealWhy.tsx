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
    <section className="py-32 relative overflow-hidden section-light-mesh" ref={containerRef}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(hsl(var(--primary) / 0.08) 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2.5 mb-6 text-xs font-bold tracking-[0.25em] uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            The Fragma Advantage
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-light-primary mb-6">
            Why launch your signature deal
            <br />
            <span className="text-gradient">
              with Fragma?
            </span>
          </h2>
          <p className="text-lg text-light-muted max-w-2xl mx-auto">
            Everything you need to transform your vision into a world-class investment opportunity
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          
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
                  {/* Glass Card */}
                  <div className="relative h-full p-10 rounded-3xl overflow-hidden glass-light">
                    {/* Decorative gradient spots */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-primary/10 to-accent/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-accent/10 to-primary/5 rounded-full blur-3xl pointer-events-none" />
                    
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
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25">
                            <CurrentIcon className="w-7 h-7 text-white" />
                          </div>
                        </motion.div>
                        
                        {/* Number */}
                        <motion.span 
                          className="text-7xl font-bold text-primary/15"
                          style={{ fontFamily: "'Playfair Display', serif" }}
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
                        <h3 className="text-2xl md:text-3xl font-semibold text-light-primary mb-2">
                          {currentReason.title}
                        </h3>
                        <p className="text-sm font-semibold text-primary mb-5 uppercase tracking-wide">
                          {currentReason.subtitle}
                        </p>
                        <p className="text-light-muted text-base md:text-lg leading-relaxed">
                          {currentReason.description}
                        </p>
                      </motion.div>
                      
                      {/* Bottom accent line */}
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-full"
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
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={() => paginate(-1)}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {reasons.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      currentIndex === index 
                        ? "w-10 bg-gradient-to-r from-primary to-accent" 
                        : "w-2 bg-slate-300 hover:bg-primary/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => paginate(1)}
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 shadow-sm"
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
            className="space-y-4"
          >
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              const isActive = index === currentIndex;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? "bg-white border-primary/30 shadow-lg shadow-primary/10" 
                      : "bg-white/50 border-slate-200/60 hover:bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? "bg-gradient-to-br from-primary to-accent" 
                        : "bg-slate-100"
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors ${
                        isActive ? "text-white" : "text-slate-500"
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold transition-colors ${
                        isActive ? "text-light-primary" : "text-slate-600"
                      }`}>
                        {reason.title}
                      </h4>
                      <p className={`text-sm transition-colors ${
                        isActive ? "text-primary" : "text-slate-400"
                      }`}>
                        {reason.subtitle}
                      </p>
                    </div>
                    
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-slate-200 shadow-sm">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent animate-pulse" />
            <span className="text-light-muted">
              Trusted by <span className="text-light-primary font-semibold">15+ industry leaders</span> across Film, Music, Real Estate & more
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
