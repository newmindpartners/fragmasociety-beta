import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const dynamicWords = ["Real Estate", "Private Credit", "Film Rights", "Luxury Assets"];

export const MarketplaceHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[100px]"
        />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/80 border border-border/50 backdrop-blur-sm">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-primary"
              />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                Secondary Market — Live
              </span>
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground leading-[0.95] tracking-tight mb-4">
              Trade tokenized
            </h1>
            
            {/* Animated word */}
            <div className="h-[80px] md:h-[100px] lg:h-[120px] overflow-hidden relative mb-8">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ y: 100, opacity: 0, rotateX: -45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: -100, opacity: 0, rotateX: 45 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-gradient italic"
                >
                  {dynamicWords[currentIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-10"
          >
            {dynamicWords.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            The world's first peer-to-peer marketplace for tokenized real-world assets.
            <span className="text-foreground font-medium"> Set your price. Trade on your terms.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Button 
              size="lg"
              className="group text-base px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Marketplace
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 border-border/50 text-foreground hover:bg-secondary rounded-xl"
            >
              <Play className="w-4 h-4 mr-2" fill="currentColor" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
          >
            {["Non-Custodial", "24/7 Trading", "Powered by Cardano", "Instant Settlement"].map((item, i) => (
              <motion.span 
                key={item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className="w-1 h-1 rounded-full bg-primary" />
                {item}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
