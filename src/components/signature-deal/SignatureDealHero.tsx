import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, Award, Briefcase, Trophy, Gem, TrendingUp, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import signatureDealHeroBg from "@/assets/signature-deal-cta-bg.jpg";
import categorySports from "@/assets/category-sports.jpg";
import categoryLuxury from "@/assets/category-luxury.jpg";
import categoryEquities from "@/assets/category-equities.jpg";
import categoryCredit from "@/assets/category-credit.jpg";

const industries = [
  {
    id: 1,
    title: "Sports & Athletes",
    subtitle: "Equestrian & Performance",
    image: categorySports,
    icon: Trophy,
    color: "from-emerald-500 to-teal-600",
    accent: "emerald"
  },
  {
    id: 2,
    title: "Art & Collectibles",
    subtitle: "Fine Art & Luxury",
    image: categoryLuxury,
    icon: Palette,
    color: "from-rose-500 to-pink-600",
    accent: "rose"
  },
  {
    id: 3,
    title: "Fund & Equities",
    subtitle: "Structured Investments",
    image: categoryEquities,
    icon: TrendingUp,
    color: "from-violet-500 to-purple-600",
    accent: "violet"
  },
  {
    id: 4,
    title: "Private Credit",
    subtitle: "Corporate & SME Lending",
    image: categoryCredit,
    icon: Gem,
    color: "from-amber-500 to-orange-600",
    accent: "amber"
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
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const activeIndustry = industries[activeIndex];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      <div className="absolute inset-0">
        <img 
          src={signatureDealHeroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-20"
          style={{ filter: 'grayscale(30%) brightness(0.7)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-900/50" />
      </div>

      {/* Subtle ambient glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-cyan-900/15 rounded-full blur-[180px]" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[300px] bg-violet-900/10 rounded-full blur-[150px]" />

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
          
          {/* Right - Industry Showcase */}
          <motion.div 
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-[520px] h-[600px]">
              
              {/* Background floating images - positioned around edges */}
              {industries.map((industry, i) => {
                const positions = [
                  { top: '-2%', left: '65%', size: 'w-28 h-32', rotate: 8 },
                  { top: '8%', left: '-8%', size: 'w-24 h-28', rotate: -10 },
                  { top: '62%', left: '75%', size: 'w-26 h-30', rotate: 12 },
                  { top: '70%', left: '-5%', size: 'w-24 h-28', rotate: -8 },
                ];
                const pos = positions[i];
                const isActive = i === activeIndex;
                
                return (
                  <motion.div
                    key={industry.id}
                    className={`absolute ${pos.size} rounded-xl overflow-hidden cursor-pointer shadow-xl`}
                    style={{ top: pos.top, left: pos.left }}
                    initial={{ opacity: 0, scale: 0.8, rotate: pos.rotate }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.4, 
                      scale: isActive ? 1.1 : 0.95,
                      rotate: isActive ? 0 : pos.rotate,
                      zIndex: isActive ? 10 : 1
                    }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.05, opacity: 0.8 }}
                  >
                    <img 
                      src={industry.image} 
                      alt={industry.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    
                    {/* Active glow ring */}
                    {isActive && (
                      <motion.div 
                        className="absolute inset-0 rounded-xl ring-2 ring-white/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                );
              })}
              
              {/* Center - Main Visual Card - BIGGER */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative overflow-hidden rounded-3xl bg-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl"
                >
                  {/* Card glow */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-cyan-500 to-violet-500 opacity-25 blur-3xl" />
                  
                  <div className="relative p-8">
                    {/* Header - Empowering message */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center mb-8"
                    >
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-400 mb-3">You Are The</p>
                      <h3 
                        className="text-3xl font-light text-white leading-tight mb-3"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Industry Leader
                      </h3>
                      <p className="text-sm text-white/50">Your vision. Your deal. Your legacy.</p>
                    </motion.div>
                    
                    {/* Steps to launch - Bigger */}
                    <motion.div 
                      className="space-y-3 mb-6"
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
                          className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] transition-colors"
                        >
                          <span 
                            className="text-xl font-light text-cyan-400 w-8"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                          >
                            {step.number}
                          </span>
                          <div>
                            <p className="text-base text-white font-medium">{step.label}</p>
                            <p className="text-xs text-white/40">{step.desc}</p>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                    
                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-5" />
                    
                    {/* Active Industry Display - Bigger */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-white/[0.08] to-white/[0.03] border border-white/[0.12]"
                      >
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${activeIndustry.color} flex items-center justify-center shadow-lg`}>
                          <activeIndustry.icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] uppercase tracking-wider text-white/50 mb-1">Your Industry</p>
                          <p className="text-lg text-white font-medium">{activeIndustry.title}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* CTA hint */}
                    <motion.p 
                      className="text-center text-xs text-white/40 mt-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      Join 15+ leaders who launched with Fragma
                    </motion.p>
                  </div>
                </motion.div>
                
                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-5">
                  {industries.map((industry, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className="group relative"
                    >
                      <motion.div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeIndex === index 
                            ? `w-8 bg-gradient-to-r ${industry.color}` 
                            : 'w-1.5 bg-white/20 hover:bg-white/40'
                        }`}
                        layout
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute top-8 right-16 w-16 h-16 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute bottom-16 left-8 w-24 h-24 rounded-full border border-dashed border-white/5"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
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