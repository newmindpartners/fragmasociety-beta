import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import ctaBg from "@/assets/signature-deal-cta-bg.jpg";

export const SignatureDealCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden" ref={containerRef}>
      {/* Full background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      
      {/* Premium dark overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/75 to-slate-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.7)_100%)]" />

      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Ambient light effects */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-br from-violet-500/[0.08] via-slate-500/[0.05] to-transparent rounded-full blur-[150px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-5xl">
          {/* Section Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-10"
          >
            <div className="w-16 h-px bg-gradient-to-r from-white/50 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/50 font-medium">
              Ready to Launch?
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white leading-[1.05] mb-8"
          >
            Ready to launch your
            <br />
            <span className="italic text-white/50 font-serif">Signature Deal?</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mb-12 leading-relaxed"
          >
            Let's design a premium investment product around your vision — 
            and open it to investors worldwide.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button 
              size="lg" 
              className="group text-base px-10 py-7 bg-white text-slate-900 hover:bg-white/90 
                rounded-sm font-medium tracking-wide
                shadow-[0_20px_60px_-15px_rgba(255,255,255,0.25)]
                hover:shadow-[0_25px_70px_-15px_rgba(255,255,255,0.35)]
                transition-all duration-500"
            >
              Start Your Deal
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-10 py-7 rounded-sm font-medium tracking-wide
                border-white/20 text-white/80 
                hover:bg-white hover:text-slate-900 hover:border-white
                transition-all duration-500"
            >
              <Phone className="mr-3 w-4 h-4" />
              Book a Strategy Call
            </Button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <div className="grid grid-cols-3 gap-8 max-w-2xl">
              {[
                { value: "$50M+", label: "Deals Launched" },
                { value: "15+", label: "Global Partners" },
                { value: "100%", label: "Compliant" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[11px] tracking-[0.2em] uppercase text-white/30">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l border-t border-white/10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r border-b border-white/10" />
    </section>
  );
};
