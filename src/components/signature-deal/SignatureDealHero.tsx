import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, Award, Briefcase, Film, Building2, Music, Gem } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import signatureDealHeroBg from "@/assets/signature-deal-cta-bg.jpg";
import categoryFilm from "@/assets/category-film.jpg";
import categoryRealestate from "@/assets/category-realestate.jpg";
import categoryMusic from "@/assets/category-music.jpg";
import categoryLuxury from "@/assets/category-luxury.jpg";

const industries = [
  {
    id: 1,
    title: "Film & Entertainment",
    subtitle: "Blockbuster Productions",
    image: categoryFilm,
    icon: Film,
    color: "from-cyan-500 to-blue-600",
    accent: "cyan"
  },
  {
    id: 2,
    title: "Prime Real Estate",
    subtitle: "Global Properties",
    image: categoryRealestate,
    icon: Building2,
    color: "from-violet-500 to-purple-600",
    accent: "violet"
  },
  {
    id: 3,
    title: "Music & Royalties",
    subtitle: "Catalog Investments",
    image: categoryMusic,
    icon: Music,
    color: "from-rose-500 to-pink-600",
    accent: "rose"
  },
  {
    id: 4,
    title: "Luxury Assets",
    subtitle: "Collectibles & Art",
    image: categoryLuxury,
    icon: Gem,
    color: "from-amber-500 to-orange-600",
    accent: "amber"
  }
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
            <div className="relative w-[480px] h-[580px]">
              
              {/* Background floating images */}
              {industries.map((industry, i) => {
                const positions = [
                  { top: '0%', left: '60%', size: 'w-32 h-40', rotate: 6, delay: 0 },
                  { top: '15%', left: '0%', size: 'w-28 h-36', rotate: -8, delay: 0.1 },
                  { top: '55%', left: '70%', size: 'w-36 h-44', rotate: 12, delay: 0.2 },
                  { top: '65%', left: '5%', size: 'w-30 h-38', rotate: -5, delay: 0.3 },
                ];
                const pos = positions[i];
                const isActive = i === activeIndex;
                
                return (
                  <motion.div
                    key={industry.id}
                    className={`absolute ${pos.size} rounded-2xl overflow-hidden cursor-pointer transition-all duration-500`}
                    style={{ top: pos.top, left: pos.left }}
                    initial={{ opacity: 0, scale: 0.8, rotate: pos.rotate }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.4, 
                      scale: isActive ? 1.05 : 1,
                      rotate: isActive ? 0 : pos.rotate,
                      zIndex: isActive ? 10 : 1
                    }}
                    transition={{ duration: 0.5, delay: pos.delay }}
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.08, opacity: 0.9 }}
                  >
                    <img 
                      src={industry.image} 
                      alt={industry.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent transition-opacity duration-300 ${isActive ? 'opacity-60' : 'opacity-80'}`} />
                    
                    {/* Active glow ring */}
                    {isActive && (
                      <motion.div 
                        className={`absolute inset-0 rounded-2xl border-2 border-${industry.accent}-400/60`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                );
              })}
              
              {/* Center Main Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] z-20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="relative overflow-hidden rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-white/15 shadow-2xl"
                  >
                    {/* Card glow */}
                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${activeIndustry.color} opacity-30 blur-3xl`} />
                    
                    {/* Featured Image */}
                    <div className="relative h-44 overflow-hidden">
                      <motion.img 
                        src={activeIndustry.image} 
                        alt={activeIndustry.title}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                      
                      {/* Icon badge */}
                      <motion.div 
                        className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${activeIndustry.color} flex items-center justify-center shadow-lg`}
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <activeIndustry.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      
                      {/* "Your Deal" floating label */}
                      <motion.div 
                        className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-[9px] uppercase tracking-widest text-white/80 font-medium">Your Deal</span>
                      </motion.div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">{activeIndustry.subtitle}</p>
                        <h3 
                          className="text-xl font-light text-white mb-4"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {activeIndustry.title}
                        </h3>
                      </motion.div>
                      
                      {/* Mini stats */}
                      <motion.div 
                        className="flex gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                      >
                        <div className="flex-1 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                          <p className="text-lg font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>€10M+</p>
                          <p className="text-[8px] uppercase tracking-wider text-white/40">Deal Size</p>
                        </div>
                        <div className="flex-1 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                          <p className="text-lg font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>500+</p>
                          <p className="text-[8px] uppercase tracking-wider text-white/40">Investors</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-6">
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
                className="absolute top-10 right-20 w-20 h-20 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute bottom-20 left-10 w-32 h-32 rounded-full border border-dashed border-white/5"
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