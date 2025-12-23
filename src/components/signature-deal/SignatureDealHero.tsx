import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles, Users, Award, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

import signatureDealHeroBg from "@/assets/signature-deal-cta-bg.jpg";

export const SignatureDealHero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      <div className="absolute inset-0">
        <img 
          src={signatureDealHeroBg} 
          alt="" 
          className="w-full h-full object-cover opacity-25"
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
          
          {/* Right - Feature Cards */}
          <motion.div 
            className="relative hidden lg:flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-[400px]">
              {/* Stacked cards effect */}
              <div className="absolute top-6 left-6 right-0 bottom-0 rounded-3xl bg-white/[0.02] border border-white/[0.04] backdrop-blur-sm" />
              <div className="absolute top-3 left-3 right-0 bottom-0 rounded-3xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm" />
              
              {/* Main Card */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/[0.12]"
              >
                {/* Card glow effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500 to-teal-500 opacity-20 blur-3xl" />
                
                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-lg"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="text-right"
                    >
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/40 mb-1">Your Deal</p>
                      <p className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Signature
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Process Steps */}
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.75 }}
                  >
                    {[
                      { step: "01", label: "Define Your Vision", desc: "Asset, brand, or expertise" },
                      { step: "02", label: "Structure & Tokenize", desc: "Compliant investment vehicle" },
                      { step: "03", label: "Launch & Grow", desc: "Attract your audience" },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.06] transition-colors"
                      >
                        <span className="text-lg font-light text-cyan-400" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {item.step}
                        </span>
                        <div>
                          <p className="text-sm text-white font-medium">{item.label}</p>
                          <p className="text-[10px] text-white/40">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-white/5 via-white/15 to-white/5 my-6" />
                  
                  {/* Bottom CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-center"
                  >
                    <p className="text-white/50 text-sm mb-2">Ready to launch?</p>
                    <p className="text-[10px] text-white/30">Join visionaries building the future of ownership</p>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Stats row */}
              <motion.div 
                className="flex justify-center gap-10 mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {[
                  { value: "€50M+", label: "Deals Launched" },
                  { value: "12+", label: "Partners" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-light text-white/80" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {stat.value}
                    </p>
                    <p className="text-[9px] text-white/30 uppercase tracking-[0.15em] mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
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