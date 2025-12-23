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
    subtitle: "hearstcorporation.io",
    allocation: "30%",
    icon: Bitcoin,
    color: "from-amber-500 to-orange-600",
    image: null,
    leader: null,
    description: "Institutional Mining Operations"
  },
  {
    id: 2,
    title: "Prime Real Estate",
    subtitle: "Malibu & Beverly Hills",
    allocation: "35%",
    icon: Building2,
    color: "from-violet-500 to-purple-600",
    leader: "Philippe Naouri",
    image: philippeNaouri,
    description: "Prime Location Real Estate"
  },
  {
    id: 3,
    title: "Blockbuster Film",
    subtitle: "Film Financing",
    allocation: "35%",
    icon: Film,
    color: "from-cyan-500 to-blue-600",
    leader: "Tim Levy",
    image: timLevy,
    description: "Blockbuster Film Financing"
  }
];

interface StrategyHeroProps {
  isAuthenticated?: boolean;
}

export const StrategyHero = ({ isAuthenticated = false }: StrategyHeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % strategies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeStrategy = strategies[activeIndex];
  const Icon = activeStrategy.icon;

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      <div className="absolute inset-0">
        <img 
          src={strategyHeroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
          style={{ filter: 'grayscale(40%) brightness(0.8)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[400px] bg-violet-900/15 rounded-full blur-[180px]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center pt-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm text-white/80 border border-white/20 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                Exclusive Investment Vehicle
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-white">Fragma</span>
              <br />
              <span className="bg-gradient-to-r from-white via-violet-200 to-white bg-clip-text text-transparent">
                One
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/40 mb-8 leading-relaxed max-w-md"
            >
              One allocation. Three signature strategies. 
              Complete exposure to Fragma's best opportunities.
            </motion.p>

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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              {isAuthenticated ? (
                <>
                  <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8 h-14 text-sm font-medium">
                    Request PPM
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-14 text-sm font-medium bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Book Call
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8 h-14 text-sm font-medium">
                    <Link to="/auth">
                      Register Your Interest
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-14 text-sm font-medium bg-transparent">
                    <Play className="w-4 h-4 mr-2" fill="currentColor" />
                    Watch Overview
                  </Button>
                </>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs text-white/30"
            >
              For qualified investors only. Capital at risk.
            </motion.p>
          </div>
          
          {/* Right - Single Animated Card */}
          <motion.div 
            className="relative hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-[380px]">
              {/* Shadow card behind for depth */}
              <div className="absolute top-4 left-4 right-0 bottom-0 rounded-3xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm" />
              
              {/* Main Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.12]"
                >
                  {/* Card glow effect */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${activeStrategy.color} opacity-20 blur-3xl`} />
                  
                  <div className="relative p-8">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-8">
                      <motion.div 
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeStrategy.color} flex items-center justify-center shadow-lg`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <motion.div 
                        className="text-right"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className={`inline-block px-4 py-2 rounded-xl bg-gradient-to-r ${activeStrategy.color} shadow-lg`}>
                          <span 
                            className="text-4xl font-semibold text-white drop-shadow-md"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {activeStrategy.allocation}
                          </span>
                        </div>
                        <p className="text-white/40 text-[10px] uppercase tracking-[0.15em] mt-2">Allocation</p>
                      </motion.div>
                    </div>
                    
                    {/* Title */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">{activeStrategy.subtitle}</p>
                      <h3 
                        className="text-3xl font-light text-white mb-6"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {activeStrategy.title}
                      </h3>
                    </motion.div>
                    
                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-white/10 via-white/20 to-white/10 mb-6" />
                    
                    {/* Leader info */}
                    {activeStrategy.leader && activeStrategy.image ? (
                      <motion.div 
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 shadow-lg">
                          <img 
                            src={activeStrategy.image} 
                            alt={activeStrategy.leader}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-lg text-white font-medium">{activeStrategy.leader}</p>
                          <p className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Deal Lead</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                        <p className="text-white/50 text-sm">{activeStrategy.description}</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Card navigation dots */}
              <div className="flex justify-center gap-3 mt-8">
                {strategies.map((strategy, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="group relative"
                  >
                    <motion.div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeIndex === index 
                          ? `w-10 bg-gradient-to-r ${strategy.color}` 
                          : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                      layout
                    />
                  </button>
                ))}
              </div>
              
              {/* Single stat */}
              <motion.div 
                className="flex justify-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="text-center">
                  <p className="text-2xl font-light text-white/80" style={{ fontFamily: "'Playfair Display', serif" }}>
                    3
                  </p>
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.15em] mt-1">Strategies</p>
                </div>
              </motion.div>
              
              {/* Disclaimer */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center text-[9px] text-white/25 mt-6 max-w-[280px] mx-auto leading-relaxed"
              >
                Past performance is not indicative of future results. Target returns are not guaranteed.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
