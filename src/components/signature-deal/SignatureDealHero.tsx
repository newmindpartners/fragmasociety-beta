import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, Award, Briefcase, Trophy, Gem, TrendingUp, Music, Film, Building2, Palette } from "lucide-react";
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
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeIndustry = industries[activeIndex];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-screen sliding background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={activeIndustry.image} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* Subtle animated gradient accent */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1/2 opacity-30"
        style={{ background: 'linear-gradient(to top, hsl(262 84% 64% / 0.2), transparent)' }}
        animate={{ opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

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
                <Sparkles className="w-3.5 h-3.5 text-primary" />
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
              <span className="text-gradient font-signature italic">
                Signature Deal
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/50 mb-4 leading-relaxed max-w-md"
            >
              Turn your vision, asset, or expertise into an investment loved by your audience.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-base text-white/40 mb-10 leading-relaxed max-w-lg"
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

          </div>
          
          {/* Right - Premium Visual Showcase */}
          <motion.div 
            className="relative hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-[520px] h-[580px]">
              
              {/* Center Card - "You Are The Leader" */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] z-30">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/98 to-slate-800/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50"
                >
                  {/* Premium card glow */}
                  <div className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl" />
                  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/10 blur-3xl" />
                  
                  <div className="relative p-7">
                    {/* Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center mb-7"
                    >
                      <p className="text-[11px] uppercase tracking-[0.3em] text-primary mb-2 font-medium">You Are The</p>
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
                            className="text-lg font-light text-primary w-7 group-hover:text-primary/80 transition-colors"
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
                        className="flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
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
                <div className="flex justify-center gap-2 mt-6">
                  {industries.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className="group relative"
                    >
                      <motion.div
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeIndex === index 
                            ? 'w-8 bg-primary' 
                            : 'w-1.5 bg-white/25 hover:bg-white/50'
                        }`}
                        layout
                      />
                    </button>
                  ))}
                </div>
                
                {/* Highlighted text */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-primary/30"
                >
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-sm text-white/80 font-medium whitespace-nowrap">
                    This is not crowdfunding. This is <span className="text-primary">co-ownership</span> — elevated.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
};
