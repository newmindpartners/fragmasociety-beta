import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, Award, Briefcase, Trophy, Gem, TrendingUp, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import signatureDealHeroBg from "@/assets/signature-deal-advantage-bg.jpg";
import rwaFilm from "@/assets/rwa-film.jpg";
import rwaLuxury from "@/assets/rwa-luxury.jpg";
import rwaVilla from "@/assets/rwa-villa.jpg";
import rwaCommercial from "@/assets/rwa-commercial.jpg";

const industries = [
  {
    id: 1,
    title: "Film & Entertainment",
    subtitle: "Blockbuster Productions",
    image: rwaFilm,
    icon: Trophy,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "Luxury & Art",
    subtitle: "Fine Collectibles",
    image: rwaLuxury,
    icon: Palette,
    color: "from-rose-500 to-pink-600",
  },
  {
    id: 3,
    title: "Prime Real Estate",
    subtitle: "Global Properties",
    image: rwaVilla,
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: 4,
    title: "Commercial Assets",
    subtitle: "Infrastructure & Credit",
    image: rwaCommercial,
    icon: Gem,
    color: "from-amber-500 to-orange-600",
  }
];

const steps = [
  { number: "01", label: "Define", desc: "Your vision & asset" },
  { number: "02", label: "Structure", desc: "Compliant tokenization" },
  { number: "03", label: "Launch", desc: "To your audience" },
];

export const SignatureDealHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeIndustry = industries[activeIndex];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Premium dark background with texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0f172a,#020617)]" />
      
      {/* Background image with premium treatment */}
      <div className="absolute inset-0">
        <img 
          src={signatureDealHeroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-15"
          style={{ filter: 'grayscale(20%) contrast(1.1)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/80" />
      </div>

      {/* Animated gradient orbs */}
      <motion.div 
        className="absolute top-1/4 right-1/3 w-[800px] h-[600px] rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-[600px] h-[400px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }}
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 min-h-screen flex items-center pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Content */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 px-5 py-2.5 text-[10px] tracking-[0.2em] uppercase bg-white/5 backdrop-blur-sm text-white/80 border border-white/20 rounded-full">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                For Visionaries & Industry Leaders
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-white">Launch Your</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                Signature Deal
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/40 mb-4 leading-relaxed max-w-md"
            >
              Turn your vision, asset, or expertise into an investment loved by your audience.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base text-white/30 mb-10 leading-relaxed max-w-lg"
            >
              We help industry leaders design, structure, and launch iconic investment deals — all powered by regulated, tokenized infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                { icon: Users, label: "Build Community" },
                { icon: Award, label: "Elevate Your Brand" },
                { icon: Briefcase, label: "Unlock Capital" },
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
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-8 h-14 text-sm font-medium">
                <Link to="/auth">
                  Start Your Deal
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-14 text-sm font-medium bg-transparent">
                <Play className="w-4 h-4 mr-2" fill="currentColor" />
                Book a Strategy Call
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 text-xs text-white/30"
            >
              This is not crowdfunding. This is co-ownership — elevated.
            </motion.p>
          </div>
          
          {/* Right - Premium Visual Showcase */}
          <motion.div 
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-[560px] h-[620px]">
              
              {/* Decorative circles */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-white/[0.04]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-dashed border-white/[0.06]" />
              
              {/* Floating industry images - Positioned in a circle */}
              {industries.map((industry, i) => {
                const angles = [315, 45, 135, 225]; // Degrees for each corner
                const radius = 200;
                const angle = (angles[i] * Math.PI) / 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const isActive = i === activeIndex;
                
                return (
                  <motion.div
                    key={industry.id}
                    className="absolute cursor-pointer"
                    style={{ 
                      left: `calc(50% + ${x}px - 60px)`,
                      top: `calc(50% + ${y}px - 75px)`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.5, 
                      scale: isActive ? 1.15 : 1,
                      zIndex: isActive ? 20 : 5
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.1, opacity: 0.9 }}
                  >
                    <div className={`relative w-[120px] h-[150px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 ${isActive ? 'ring-2 ring-white/60 shadow-cyan-500/20' : ''}`}>
                      <img 
                        src={industry.image} 
                        alt={industry.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                      
                      {/* Industry icon badge */}
                      <motion.div 
                        className={`absolute top-2 left-2 w-8 h-8 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center shadow-lg`}
                        initial={{ scale: 0 }}
                        animate={{ scale: isActive ? 1 : 0.8 }}
                        transition={{ delay: 0.1 }}
                      >
                        <industry.icon className="w-4 h-4 text-white" />
                      </motion.div>
                      
                      {/* Label */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-[8px] uppercase tracking-widest text-white/60 truncate">{industry.subtitle}</p>
                        <p className="text-xs font-medium text-white truncate">{industry.title}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Center Card - "You Are The Leader" */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] z-30">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/98 to-slate-800/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
                >
                  {/* Premium card glow */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-cyan-500/30 to-violet-500/20 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-rose-500/20 to-orange-500/10 blur-3xl" />
                  
                  <div className="relative p-7">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center mb-7"
                    >
                      <p className="text-[11px] uppercase tracking-[0.3em] text-cyan-400 mb-2 font-medium">You Are The</p>
                      <h3 
                        className="text-2xl font-light text-white leading-tight mb-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Industry Leader
                      </h3>
                      <p className="text-sm text-white/50">Your vision. Your deal. Your legacy.</p>
                    </motion.div>
                    
                    {/* Steps */}
                    <motion.div 
                      className="space-y-2.5 mb-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {steps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.75 + i * 0.1 }}
                          className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.06] border border-white/[0.08] hover:bg-white/[0.1] transition-all duration-300 group"
                        >
                          <span 
                            className="text-lg font-light text-cyan-400 w-7 group-hover:text-cyan-300 transition-colors"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {step.number}
                          </span>
                          <div>
                            <p className="text-sm text-white font-medium">{step.label}</p>
                            <p className="text-[10px] text-white/40">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />
                    
                    {/* Active Industry */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/[0.12]"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activeIndustry.color} flex items-center justify-center shadow-lg`}>
                          <activeIndustry.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] uppercase tracking-wider text-white/50 mb-0.5">Your Industry</p>
                          <p className="text-base text-white font-medium">{activeIndustry.title}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Bottom text */}
                    <motion.p 
                      className="text-center text-[10px] text-white/40 mt-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      Join 15+ leaders who launched with Fragma
                    </motion.p>
                  </div>
                </motion.div>
                
                {/* Navigation dots */}
                <div className="flex justify-center gap-2.5 mt-6">
                  {industries.map((industry, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className="group relative"
                    >
                      <motion.div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          activeIndex === index 
                            ? `w-10 bg-gradient-to-r ${industry.color}` 
                            : 'w-2 bg-white/25 hover:bg-white/50'
                        }`}
                        layout
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};