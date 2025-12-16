import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wallet, Network, BookOpen, Link2, TrendingUp, Shield, Zap, Lock, Eye, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const features = [
  { 
    icon: Wallet, 
    title: "Non-custodial", 
    description: "Your keys, your assets",
    color: "from-emerald-500 to-teal-500"
  },
  { 
    icon: Network, 
    title: "Decentralized", 
    description: "No single point of failure",
    color: "from-blue-500 to-cyan-500"
  },
  { 
    icon: BookOpen, 
    title: "Order Book", 
    description: "Professional trading",
    color: "from-violet-500 to-purple-500"
  },
  { 
    icon: Link2, 
    title: "On-chain", 
    description: "Transparent settlement",
    color: "from-orange-500 to-amber-500"
  },
  { 
    icon: TrendingUp, 
    title: "Options", 
    description: "Advanced strategies",
    color: "from-pink-500 to-rose-500"
  },
  { 
    icon: Shield, 
    title: "Secure", 
    description: "Cardano powered",
    color: "from-primary to-accent"
  },
];

const FeatureShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const activeFeature = features[activeIndex];
  const ActiveIcon = activeFeature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative aspect-square max-w-lg mx-auto"
    >
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="url(#ringGradient)"
            strokeWidth="1"
            strokeDasharray="20 10"
          />
        </svg>
      </motion.div>

      {/* Middle pulsing ring */}
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute inset-8 rounded-full border border-primary/30"
      />

      {/* Inner glow ring */}
      <motion.div
        animate={{ 
          boxShadow: [
            "0 0 60px hsl(var(--primary) / 0.2), inset 0 0 60px hsl(var(--primary) / 0.1)",
            "0 0 100px hsl(var(--primary) / 0.3), inset 0 0 80px hsl(var(--primary) / 0.15)",
            "0 0 60px hsl(var(--primary) / 0.2), inset 0 0 60px hsl(var(--primary) / 0.1)"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-16 rounded-full bg-gradient-to-br from-card/80 to-background/90 backdrop-blur-xl border border-primary/20"
      />

      {/* Feature icons orbiting */}
      <div className="absolute inset-0">
        {features.map((feature, i) => {
          const angle = (i * 360) / features.length - 90;
          const radius = 42;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
          const isActive = i === activeIndex;
          const Icon = feature.icon;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isActive ? 1.3 : 1,
                opacity: 1,
              }}
              transition={{ 
                delay: 0.5 + i * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 120
              }}
              onClick={() => setActiveIndex(i)}
            >
              <motion.div
                animate={isActive ? {
                  boxShadow: [
                    "0 0 0px hsl(var(--primary) / 0)",
                    "0 0 30px hsl(var(--primary) / 0.6)",
                    "0 0 0px hsl(var(--primary) / 0)"
                  ]
                } : {}}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                className={`relative -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-br " + feature.color + " shadow-lg" 
                    : "bg-card/80 border border-border/50 hover:border-primary/50"
                }`}
              >
                <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                
                {/* Connection line to center */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-8 h-0.5 bg-gradient-to-r from-primary to-transparent origin-right"
                  style={{
                    right: "100%",
                    transform: `rotate(${angle + 180}deg)`,
                  }}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ scale: 0.5, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.5, opacity: 0, y: -20 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              className="flex flex-col items-center"
            >
              {/* Large feature icon */}
              <motion.div
                className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${activeFeature.color} flex items-center justify-center mb-4 shadow-2xl`}
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <ActiveIcon className="w-10 h-10 text-white" />
              </motion.div>

              {/* Feature title */}
              <motion.h3
                className="text-2xl font-serif font-bold text-foreground mb-1"
              >
                {activeFeature.title}
              </motion.h3>
              
              {/* Feature description */}
              <motion.p
                className="text-sm text-muted-foreground"
              >
                {activeFeature.description}
              </motion.p>

              {/* Checkmark indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mt-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs text-primary font-medium">Available on Fragma</span>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-primary/40"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() > 0.5 ? 10 : -10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Progress indicators */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {features.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? "w-8 bg-primary" : "w-1.5 bg-muted hover:bg-muted-foreground"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Corner accents */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/40 rounded-tl-lg"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/40 rounded-tr-lg"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/40 rounded-bl-lg"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/40 rounded-br-lg"
      />
    </motion.div>
  );
};

const FeaturePill = ({ icon: Icon, text, delay }: { icon: any; text: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/20 backdrop-blur-sm cursor-default"
  >
    <Icon className="w-4 h-4 text-white" />
    <span className="text-sm text-white">{text}</span>
  </motion.div>
);

export const MarketplaceHero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Floating orbs */}
      <motion.div
        animate={{ 
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ 
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-wider uppercase rounded-full bg-white/5 text-white border border-white/20">
                Secondary Marketplace
              </span>
              
              <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
                Your assets, your price,{" "}
                <span className="text-gradient">your pace.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                Trade tokenised real-world assets directly with other investors — no intermediaries, 
                no custodians holding your funds. Set your own price, place limit orders, 
                and manage your portfolio 24/7.
              </p>
            </motion.div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <FeaturePill icon={Wallet} text="Non-custodial" delay={0.8} />
              <FeaturePill icon={Network} text="Decentralized" delay={0.9} />
              <FeaturePill icon={BookOpen} text="Order book trading" delay={1.0} />
              <FeaturePill icon={Link2} text="On-chain settlement" delay={1.1} />
              <FeaturePill icon={TrendingUp} text="Options trading" delay={1.2} />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="group bg-white text-background hover:bg-white/90">
                Explore Marketplace
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Learn How It Works
              </Button>
            </motion.div>
          </div>

          {/* Right Content - Feature Showcase Animation */}
          <div className="hidden lg:block">
            <FeatureShowcase />
          </div>
        </div>
      </div>
    </section>
  );
};
