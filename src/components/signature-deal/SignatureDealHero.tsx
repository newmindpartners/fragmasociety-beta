import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";

export const SignatureDealHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Premium dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,30%,5%)] via-background to-background" />
      
      {/* Animated luxury orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-primary/25 to-cyan-500/15 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-violet-500/20 to-primary/15 rounded-full blur-[120px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Golden accent */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/20 mb-8"
          >
            <Rocket className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-semibold tracking-wide">For Visionaries & Industry Leaders</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold mb-8 leading-[1.1]"
          >
            <span className="text-white">Launch Your</span>
            <br />
            <span className="text-gradient">
              Signature Deal
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto mb-6 leading-relaxed"
          >
            Turn your vision, asset, or expertise into an investment loved by your audience.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-white/50 max-w-2xl mx-auto mb-12"
          >
            We help industry leaders design, structure, and launch iconic investment deals that attract capital, unlock new revenue, and deepen community loyalty — all powered by regulated, tokenized infrastructure.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" variant="outline" className="group text-base px-8 py-6 border-white text-white hover:bg-white hover:text-background">
              Start Your Deal
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 border-white/30 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/50">
              Book a Strategy Call
            </Button>
          </motion.div>

          {/* Distinction statement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div className="inline-block px-8 py-4 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
              <p className="text-muted-foreground text-sm mb-1">This is not crowdfunding.</p>
              <p className="text-foreground font-semibold text-lg">
                This is <span className="bg-gradient-to-r from-cyan-400 to-teal-300 bg-clip-text text-transparent">co-ownership</span> — elevated.
              </p>
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
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
};
