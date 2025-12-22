import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, TrendingUp, Shield, Zap, BarChart3, AlertTriangle, Landmark, Cpu, Bitcoin, Building2, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import strategy background images
import btcMiningBg from "@/assets/strategy-btc-mining.jpg";
import aiInfraBg from "@/assets/strategy-ai-infrastructure.jpg";
import smeCreditBg from "@/assets/strategy-sme-credit.jpg";
import ecosystemBg from "@/assets/strategy-ecosystem.jpg";
import strategyHeroBg from "@/assets/strategy-hero-bg.jpg";

// Strategy data for the animated showcase
const strategies = [
  {
    id: 1,
    title: "SME Credit",
    subtitle: "Private Lending",
    description: "Secured lending to established SMEs with stable cash flows",
    icon: Landmark,
    bgImage: smeCreditBg,
    category: "Income",
    accentColor: "emerald"
  },
  {
    id: 2,
    title: "BTC Mining",
    subtitle: "Digital Infrastructure",
    description: "Institutional-grade Bitcoin mining operations",
    icon: Bitcoin,
    bgImage: btcMiningBg,
    category: "Income",
    accentColor: "amber"
  },
  {
    id: 3,
    title: "AI/HPC Infra",
    subtitle: "Compute Power",
    description: "High-performance computing for AI workloads",
    icon: Cpu,
    bgImage: aiInfraBg,
    category: "Growth",
    accentColor: "violet"
  },
  {
    id: 4,
    title: "Ecosystem Equity",
    subtitle: "Strategic Positions",
    description: "Equity stakes in digital infrastructure companies",
    icon: Building2,
    bgImage: ecosystemBg,
    category: "Growth",
    accentColor: "cyan"
  }
];

const dynamicWords = ["Real-World Yield", "Digital Infrastructure", "Alternative Assets", "Tokenized Securities"];

// Strategy Card Component
const StrategyCard = ({ 
  strategy, 
  isActive, 
  onClick,
  index 
}: { 
  strategy: typeof strategies[0]; 
  isActive: boolean; 
  onClick: () => void;
  index: number;
}) => {
  const Icon = strategy.icon;
  const [isHovered, setIsHovered] = useState(false);
  
  const categoryColors = {
    Income: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Growth: "bg-violet-500/20 text-violet-400 border-violet-500/30"
  };
  
  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-xl transition-all duration-500 ${
          isActive ? 'z-10' : 'z-0'
        }`}
        animate={{
          scale: isActive ? 1.02 : isHovered ? 1.01 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ 
            backgroundImage: `url(${strategy.bgImage})`,
            filter: isActive ? 'blur(6px)' : 'blur(10px)',
            transform: isActive ? 'scale(1.1)' : 'scale(1.05)',
          }}
        />
        
        {/* Dark overlay */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isActive ? 'bg-black/50' : 'bg-black/65'
        }`} />
        
        {/* Border */}
        <div className={`absolute inset-0 rounded-xl border transition-all duration-300 ${
          isActive ? 'border-white/20' : 'border-white/10'
        }`} />
        
        {/* Content */}
        <div className={`relative z-10 p-4 transition-all duration-500 ${isActive ? 'py-5' : ''}`}>
          <div className="flex items-start gap-3">
            {/* Icon */}
            <motion.div 
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                isActive ? 'bg-white/15' : 'bg-white/10'
              }`}
              animate={{ scale: isActive ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            >
              <Icon className="w-5 h-5 text-white" />
            </motion.div>
            
            {/* Text content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <motion.h3 
                  className="font-medium text-white text-sm"
                  animate={{ opacity: isActive ? 1 : 0.8 }}
                >
                  {strategy.title}
                </motion.h3>
                <motion.span 
                  className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[strategy.category as keyof typeof categoryColors]}`}
                  animate={{ opacity: isActive ? 1 : 0.7 }}
                >
                  {strategy.category}
                </motion.span>
              </div>
              <p className="text-xs text-white/50">{strategy.subtitle}</p>
              
              {/* Expanded content when active */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-white/60 mt-3 leading-relaxed">
                      {strategy.description}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Strategies Showcase
const StrategiesShowcase = () => {
  const [activeStrategy, setActiveStrategy] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStrategy((prev) => (prev + 1) % strategies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative">
      {/* Cards */}
      <div className="space-y-2.5">
        {strategies.map((strategy, index) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            isActive={activeStrategy === index}
            onClick={() => setActiveStrategy(index)}
            index={index}
          />
        ))}
      </div>
      
      {/* Progress indicators */}
      <div className="flex justify-center gap-2.5 pt-5">
        {strategies.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveStrategy(index)}
            className="relative h-1 rounded-full overflow-hidden bg-white/10"
            style={{ width: activeStrategy === index ? 28 : 8 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ width: activeStrategy === index ? 28 : 8 }}
            transition={{ duration: 0.3 }}
          >
            {activeStrategy === index && (
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
              />
            )}
            {activeStrategy !== index && (
              <div className="absolute inset-0 bg-white/30 rounded-full" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

interface StrategyHeroProps {
  isAuthenticated?: boolean;
}

export const StrategyHero = ({ isAuthenticated = false }: StrategyHeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Deep slate/navy base */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={strategyHeroBg} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ 
            opacity: 0.3,
            filter: 'grayscale(30%) brightness(0.85)',
          }}
        />
        {/* Gradient overlays */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 90% at 50% 100%, transparent 0%, rgba(15,23,42,0.3) 50%, rgba(15,23,42,0.7) 100%),
              radial-gradient(ellipse 100% 60% at 50% 50%, transparent 0%, rgba(15,23,42,0.4) 100%)
            `
          }}
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(15,23,42,1) 0%, rgba(15,23,42,0.6) 40%, transparent 80%)'
          }}
        />
      </div>

      {/* Violet glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-violet-900/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-slate-700/20 rounded-full blur-3xl" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.08) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm text-white/80 border border-white/20 rounded-sm">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                </motion.div>
                Exclusive Investment Vehicle
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-xs tracking-[0.25em] uppercase text-white/40 font-light mb-6"
            >
              Luxembourg Structure · Tokenized · Professional Grade
            </motion.p>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-3"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Fragma One
            </motion.h1>
            
            {/* Animated word */}
            <div className="h-[50px] md:h-[60px] lg:h-[70px] overflow-hidden relative mb-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ y: 70, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -70, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-3xl md:text-4xl lg:text-5xl font-light text-white/50 italic leading-[0.95] tracking-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {dynamicWords[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Progress dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-8"
            >
              {dynamicWords.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-0.5 rounded-full transition-all duration-500 ${
                    i === currentIndex 
                      ? "w-8 bg-white" 
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  style={{
                    boxShadow: i === currentIndex ? '0 0 10px rgba(255,255,255,0.4)' : 'none'
                  }}
                />
              ))}
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base text-white/50 max-w-xl mb-8 leading-relaxed"
            >
              One fund. Broad exposure to real-world yield & digital infrastructure. 
              Powered by the Fragma ecosystem.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 mb-10"
            >
              {[
                { icon: TrendingUp, label: "Income-Focused" },
                { icon: Shield, label: "Luxembourg Structure" },
                { icon: Zap, label: "Digital Infrastructure" },
                { icon: BarChart3, label: "Secondary Liquidity" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/70"
                >
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4"
            >
              {isAuthenticated ? (
                <>
                  <Button 
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
                  >
                    Request PPM
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-sm px-8 h-12 text-sm font-medium tracking-wide bg-transparent"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Book Call
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    asChild
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-8 h-12 text-sm font-medium tracking-wide"
                  >
                    <Link to="/auth">
                      Register to View Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-sm px-8 h-12 text-sm font-medium tracking-wide bg-transparent"
                  >
                    <Play className="w-4 h-4 mr-2" fill="currentColor" />
                    Watch Overview
                  </Button>
                </>
              )}
            </motion.div>

            {/* Trust indicator */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mt-8 text-xs text-white/30"
            >
              Professional investors only · Capital at risk · Not suitable for everyone
            </motion.p>
          </div>

          {/* Right Content - Strategy Cards */}
          <div className="hidden lg:block relative">
            {/* Floating decorative elements */}
            <motion.div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-violet-500/10 to-transparent blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3] 
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent blur-2xl"
              animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.4, 0.2] 
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <motion.div 
                  className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
                <span className="text-[10px] font-medium text-white/50 uppercase tracking-wider">Investment Strategies</span>
                <motion.div 
                  className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                />
              </div>
            </motion.div>
            
            {/* Strategy Cards */}
            <StrategiesShowcase />
            
            {/* Bottom stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-6 grid grid-cols-3 gap-3"
            >
              {[
                { label: "Income Sleeve", value: "60%" },
                { label: "Equity Sleeve", value: "40%" },
                { label: "Strategies", value: "4" }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <motion.p 
                    className="text-2xl font-bold text-white"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + i * 0.1, type: "spring" }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-[10px] text-white/50 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Risk Warning Banner - only show when authenticated */}
      {isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-6"
        >
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-200 font-medium mb-1">Important Risk Information</p>
              <p className="text-amber-200/70 text-xs">
                Target returns only. No guarantee. Capital at risk. Unlisted, illiquid securities – you may not be able to sell quickly or at all.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};
