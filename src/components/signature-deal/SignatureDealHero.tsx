import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Crown, Diamond, Star, Trophy, Gem, TrendingUp, Music, Film, Building2, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import rwaFilm from "@/assets/rwa-film.jpg";
import rwaLuxury from "@/assets/rwa-luxury.jpg";
import rwaVilla from "@/assets/rwa-villa.jpg";
import rwaCommercial from "@/assets/rwa-commercial.jpg";
import categoryMusic from "@/assets/category-music.jpg";
import categoryFilm from "@/assets/category-film.jpg";
import categorySports from "@/assets/category-sports.jpg";
import categoryCredit from "@/assets/category-credit.jpg";

const industries = [
  {
    id: 1,
    title: "Film & Entertainment",
    subtitle: "Blockbuster Productions",
    image: categoryFilm,
    icon: Film,
  },
  {
    id: 2,
    title: "Music Rights",
    subtitle: "Royalty Catalogs",
    image: categoryMusic,
    icon: Music,
  },
  {
    id: 3,
    title: "Prime Real Estate",
    subtitle: "Global Properties",
    image: rwaVilla,
    icon: TrendingUp,
  },
  {
    id: 4,
    title: "Sports & Athletes",
    subtitle: "Performance Assets",
    image: categorySports,
    icon: Trophy,
  },
  {
    id: 5,
    title: "Luxury & Art",
    subtitle: "Fine Collectibles",
    image: rwaLuxury,
    icon: Palette,
  },
  {
    id: 6,
    title: "Corporate Credit",
    subtitle: "Private Debt",
    image: categoryCredit,
    icon: Gem,
  },
  {
    id: 7,
    title: "Commercial Assets",
    subtitle: "Infrastructure",
    image: rwaCommercial,
    icon: Building2,
  }
];

export const SignatureDealHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % industries.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeIndustry = industries[activeIndex];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0a0a0f]">
      {/* Full-screen sliding background images with Ken Burns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <motion.img 
            src={activeIndustry.image} 
            alt="" 
            className="w-full h-full object-cover"
            animate={{ scale: [1.05, 1.1] }}
            transition={{ duration: 8, ease: "linear" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Luxury gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      
      {/* Premium gold/warm accent glow */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-2/3"
        style={{ 
          background: 'radial-gradient(ellipse at 30% 100%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139,92,246,0.06) 0%, transparent 40%)'
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Luxury noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32">
        <div className="absolute top-8 left-8 w-16 h-px bg-gradient-to-r from-amber-400/40 to-transparent" />
        <div className="absolute top-8 left-8 w-px h-16 bg-gradient-to-b from-amber-400/40 to-transparent" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-8 right-8 w-16 h-px bg-gradient-to-l from-amber-400/40 to-transparent" />
        <div className="absolute top-8 right-8 w-px h-16 bg-gradient-to-b from-amber-400/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-16 min-h-screen flex items-center pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Luxury badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <span className="inline-flex items-center gap-3 px-6 py-3 text-[9px] tracking-[0.35em] uppercase text-amber-200/90 border border-amber-400/20 bg-gradient-to-r from-amber-900/10 to-transparent backdrop-blur-sm">
                <Diamond className="w-3 h-3 text-amber-400" />
                Exclusive For Visionaries
                <Diamond className="w-3 h-3 text-amber-400" />
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <span 
                className="block text-5xl md:text-6xl lg:text-7xl font-extralight leading-[0.9] tracking-tight text-white/90"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Launch Your
              </span>
              <span 
                className="block text-6xl md:text-7xl lg:text-[5.5rem] mt-3"
                style={{ 
                  fontFamily: "'Caveat', cursive", 
                  fontWeight: 500,
                  background: 'linear-gradient(135deg, #c9a86c 0%, #f4d484 25%, #c9a86c 50%, #a67c52 75%, #c9a86c 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <motion.span
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ display: 'inline-block' }}
                >
                  Signature Deal
                </motion.span>
              </span>
            </motion.h1>
            
            {/* Elegant divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-24 h-px bg-gradient-to-r from-amber-400/60 via-amber-300/40 to-transparent mb-8 origin-left"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/50 mb-4 leading-relaxed max-w-md font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Turn your vision, asset, or expertise into an investment 
              <span className="text-amber-300/70 italic"> loved by your audience.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm text-white/35 mb-12 leading-relaxed max-w-lg"
            >
              We help industry leaders design, structure, and launch iconic investment deals — 
              all powered by regulated, tokenized infrastructure.
            </motion.p>

            {/* Luxury feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              {[
                { icon: Crown, label: "Elevate Your Brand" },
                { icon: Star, label: "Build Legacy" },
                { icon: Gem, label: "Unlock Capital" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-3 px-5 py-3 border border-white/10 bg-white/[0.02] backdrop-blur-sm text-xs text-white/60 tracking-wide"
                >
                  <item.icon className="w-4 h-4 text-amber-400/70" strokeWidth={1.5} />
                  <span className="uppercase tracking-[0.15em]">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap items-center gap-5"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-amber-600 to-amber-500 text-black hover:from-amber-500 hover:to-amber-400 px-10 h-14 text-xs font-semibold tracking-[0.2em] uppercase border-0 shadow-xl shadow-amber-900/30"
              >
                <Link to="/auth">
                  Start Your Deal
                  <ArrowRight className="w-4 h-4 ml-3" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/15 text-white/80 hover:bg-white/5 hover:border-white/25 px-8 h-14 text-xs tracking-[0.15em] uppercase bg-transparent backdrop-blur-sm"
              >
                <Play className="w-3.5 h-3.5 mr-3" fill="currentColor" />
                Strategy Call
              </Button>
            </motion.div>
          </div>
          
          {/* Right - Luxury Visual */}
          <motion.div 
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative w-[560px] h-[620px]">
              
              {/* Elegant outer glow */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)' }}
              />

              {/* Decorative diamond rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px]"
              >
                <div className="absolute inset-0 border border-amber-400/10 rounded-full" />
                {[0, 90, 180, 270].map((angle, i) => (
                  <div 
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2"
                    style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-240px)` }}
                  >
                    <Diamond className="w-2 h-2 text-amber-400/40" />
                  </div>
                ))}
              </motion.div>

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] border border-dashed border-white/5 rounded-full"
              />

              {/* Floating industry cards */}
              {[
                { angle: -30, delay: 0 },
                { angle: 30, delay: 0.3 },
                { angle: 150, delay: 0.6 },
                { angle: 210, delay: 0.9 },
              ].map((item, i) => {
                const industry = industries[i % industries.length];
                const radius = 200;
                const x = Math.cos((item.angle * Math.PI) / 180) * radius;
                const y = Math.sin((item.angle * Math.PI) / 180) * radius;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + item.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-1/2 left-1/2"
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  >
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                      className={`w-16 h-16 flex items-center justify-center backdrop-blur-xl border shadow-2xl transition-all duration-500 ${
                        i === activeIndex % 4 
                          ? 'bg-gradient-to-br from-amber-900/40 to-amber-800/20 border-amber-400/30 shadow-amber-900/30' 
                          : 'bg-white/5 border-white/10 shadow-black/30'
                      }`}
                    >
                      <industry.icon 
                        className={`w-6 h-6 ${i === activeIndex % 4 ? 'text-amber-300' : 'text-white/50'}`} 
                        strokeWidth={1.5} 
                      />
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Center Premium Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] z-30">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative overflow-hidden bg-gradient-to-br from-[#1a1a24] to-[#12121a] backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60"
                >
                  {/* Gold accent line top */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                  
                  {/* Premium card glow */}
                  <motion.div 
                    className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 blur-3xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  
                  <div className="relative p-6">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center mb-5"
                    >
                      <Crown className="w-5 h-5 text-amber-400/80 mx-auto mb-3" strokeWidth={1.5} />
                      <p className="text-[9px] uppercase tracking-[0.4em] text-amber-400/70 mb-1 font-medium">You Are The</p>
                      <h3 
                        className="text-lg font-light text-white/90 leading-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        Industry Leader
                      </h3>
                    </motion.div>

                    {/* Elegant divider */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-400/20" />
                      <Diamond className="w-2 h-2 text-amber-400/40" />
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-400/20" />
                    </div>
                    
                    {/* Active Industry */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-400/20 flex items-center justify-center">
                          <activeIndustry.icon className="w-4 h-4 text-amber-300" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[8px] uppercase tracking-[0.2em] text-white/40 mb-0.5">Your Industry</p>
                          <p className="text-sm text-white/80 font-light">{activeIndustry.title}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Bottom text */}
                    <motion.p 
                      className="text-center text-[9px] text-white/30 mt-5 tracking-wider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      Join 15+ leaders who launched with Fragma
                    </motion.p>
                  </div>

                  {/* Gold accent line bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                </motion.div>
                
                {/* Navigation dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {industries.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className="group relative"
                    >
                      <motion.div
                        className={`h-1 transition-all duration-500 ${
                          activeIndex === index 
                            ? 'w-8 bg-gradient-to-r from-amber-400 to-amber-300' 
                            : 'w-1 bg-white/20 hover:bg-white/40'
                        }`}
                        layout
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center"
              >
                <p className="text-[10px] text-white/40 tracking-[0.3em] uppercase">
                  Not crowdfunding. <span className="text-amber-400/60">Co-ownership</span> — elevated.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
    </section>
  );
};
