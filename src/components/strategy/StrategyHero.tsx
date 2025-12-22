import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, Sparkles, Play, Bitcoin, Building2, Film, TrendingUp, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import strategyHeroBg from "@/assets/strategy-hero-bg.jpg";
import philippeNaouri from "@/assets/philippe-naouri.png";
import timLevy from "@/assets/tim-levy.png";

const strategies = [
  {
    id: 1,
    title: "BTC Mining",
    allocation: "30%",
    icon: Bitcoin,
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    image: null
  },
  {
    id: 2,
    title: "Prime Real Estate",
    allocation: "35%",
    icon: Building2,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    leader: "Philippe Naouri",
    image: philippeNaouri
  },
  {
    id: 3,
    title: "Film & Loans",
    allocation: "35%",
    icon: Film,
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    leader: "Tim Levy",
    image: timLevy
  }
];

const FloatingCard = ({ strategy, index, activeIndex }: { strategy: typeof strategies[0]; index: number; activeIndex: number }) => {
  const isActive = index === activeIndex;
  const Icon = strategy.icon;
  
  // Calculate position based on index relative to active
  const getPosition = () => {
    const diff = index - activeIndex;
    if (diff === 0) return { y: 0, x: 0, scale: 1, opacity: 1, zIndex: 30, rotate: 0 };
    if (diff === 1 || diff === -2) return { y: 80, x: 40, scale: 0.9, opacity: 0.7, zIndex: 20, rotate: 3 };
    return { y: 160, x: 80, scale: 0.8, opacity: 0.4, zIndex: 10, rotate: 6 };
  };
  
  const pos = getPosition();
  
  return (
    <motion.div
      className="absolute top-0 left-0 w-full"
      animate={{
        y: pos.y,
        x: pos.x,
        scale: pos.scale,
        opacity: pos.opacity,
        rotateZ: pos.rotate,
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.6 
      }}
      style={{ zIndex: pos.zIndex }}
    >
      <div className={`relative overflow-hidden rounded-3xl backdrop-blur-xl border ${strategy.borderColor} ${strategy.bgColor}`}>
        {/* Glass morphism effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-transparent" />
        
        {/* Content */}
        <div className="relative p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${strategy.color} flex items-center justify-center shadow-lg`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <div className="text-right">
              <span className={`text-3xl font-light bg-gradient-to-r ${strategy.color} bg-clip-text text-transparent`} style={{ fontFamily: "'Playfair Display', serif" }}>
                {strategy.allocation}
              </span>
              <p className="text-white/30 text-[10px] uppercase tracking-wider">allocation</p>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            {strategy.title}
          </h3>
          
          {strategy.leader && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                <img src={strategy.image} alt={strategy.leader} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm text-white/80">{strategy.leader}</p>
                <p className="text-[10px] text-white/40 uppercase tracking-wider">Deal Lead</p>
              </div>
            </div>
          )}
          
          {!strategy.leader && (
            <p className="text-white/40 text-sm mt-2">Digital Infrastructure</p>
          )}
        </div>
        
        {/* Animated border glow */}
        <motion.div 
          className={`absolute inset-0 rounded-3xl opacity-0`}
          animate={isActive ? { opacity: [0, 0.5, 0] } : { opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            boxShadow: `inset 0 0 30px ${strategy.color.includes('amber') ? 'rgba(245,158,11,0.3)' : strategy.color.includes('violet') ? 'rgba(139,92,246,0.3)' : 'rgba(6,182,212,0.3)'}`
          }}
        />
      </div>
    </motion.div>
  );
};

// Animated stats orbs
const StatsOrb = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    className="flex flex-col items-center"
  >
    <motion.div 
      className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm"
      whileHover={{ scale: 1.1, borderColor: "rgba(255,255,255,0.3)" }}
    >
      <span className="text-lg font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</span>
    </motion.div>
    <span className="text-[9px] text-white/30 uppercase tracking-wider mt-2">{label}</span>
  </motion.div>
);

interface StrategyHeroProps {
  isAuthenticated?: boolean;
}

export const StrategyHero = ({ isAuthenticated = false }: StrategyHeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % strategies.length);
    }, 3500);
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
            opacity: 0.2,
            filter: 'grayscale(40%) brightness(0.8)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/50" />
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-900/10 rounded-full blur-[120px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-b from-violet-900/10 to-transparent" />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center pt-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm text-white/80 border border-white/20 rounded-full">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                </motion.div>
                Exclusive Investment Vehicle
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-white">Fragma</span>
              <br />
              <span 
                className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent"
                style={{ backgroundSize: '200% auto' }}
              >
                One
              </span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl text-white/40 mb-8 leading-relaxed max-w-md"
            >
              One allocation. Three signature strategies. 
              Complete exposure to Fragma's best opportunities.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                { icon: TrendingUp, label: "12-18% Target IRR" },
                { icon: Shield, label: "Luxembourg Structure" },
                { icon: Zap, label: "One-Click Access" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
                >
                  <item.icon className="w-3.5 h-3.5" />
                  {item.label}
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              {isAuthenticated ? (
                <>
                  <Button 
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8 h-14 text-sm font-medium"
                  >
                    Request PPM
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-14 text-sm font-medium bg-transparent"
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
                    className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8 h-14 text-sm font-medium group"
                  >
                    <Link to="/auth">
                      Register to View Details
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-14 text-sm font-medium bg-transparent"
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
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs text-white/30"
            >
              For qualified investors only. Capital at risk.
            </motion.p>
          </div>
          
          {/* Right - Animated Cards Stack */}
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Floating cards */}
            <div className="relative h-[420px] w-full max-w-md ml-auto">
              {strategies.map((strategy, index) => (
                <FloatingCard 
                  key={strategy.id}
                  strategy={strategy}
                  index={index}
                  activeIndex={activeIndex}
                />
              ))}
            </div>
            
            {/* Progress indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {strategies.map((strategy, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="relative h-1 rounded-full overflow-hidden bg-white/10"
                  style={{ width: activeIndex === index ? 40 : 16 }}
                  animate={{ width: activeIndex === index ? 40 : 16 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeIndex === index && (
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${strategy.color} rounded-full`}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3.5, ease: "linear" }}
                    />
                  )}
                  {activeIndex !== index && (
                    <div className="absolute inset-0 bg-white/30 rounded-full" />
                  )}
                </motion.button>
              ))}
            </div>
            
            {/* Stats orbs */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6">
              <StatsOrb value="3" label="Strategies" delay={1} />
              <StatsOrb value="€50" label="Min Ticket" delay={1.2} />
              <StatsOrb value="Q4" label="Distributions" delay={1.4} />
            </div>
            
            {/* Decorative elements */}
            <motion.div 
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full border border-white/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute -bottom-5 -left-5 w-20 h-20 rounded-full border border-white/5"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
