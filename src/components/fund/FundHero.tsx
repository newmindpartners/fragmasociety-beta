import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, TrendingUp, Shield, Zap, BarChart3, Landmark, Cpu, Bitcoin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const FundAnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
    
    {/* Large gradient orb */}
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.08, 0.15, 0.08],
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-full blur-[200px]"
    />
    
    {/* Secondary orb */}
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.05, 0.12, 0.05]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px]"
    />
    
    {/* Animated lines */}
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
      <motion.line
        x1="0%" y1="30%" x2="100%" y2="70%"
        stroke="hsl(var(--primary))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.line
        x1="100%" y1="20%" x2="0%" y2="80%"
        stroke="hsl(var(--accent))"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

// Strategy data for the animated showcase
const strategies = [
  {
    id: 1,
    title: "SME Credit",
    subtitle: "Private Lending",
    description: "Secured lending to established SMEs with stable cash flows",
    icon: Landmark,
    color: "from-emerald-500/20 to-teal-500/20",
    accentColor: "emerald",
    yield: "8-12%",
    category: "Income"
  },
  {
    id: 2,
    title: "BTC Mining",
    subtitle: "Digital Infrastructure",
    description: "Institutional-grade Bitcoin mining operations",
    icon: Bitcoin,
    color: "from-amber-500/20 to-orange-500/20",
    accentColor: "amber",
    yield: "Variable",
    category: "Income"
  },
  {
    id: 3,
    title: "AI/HPC Infra",
    subtitle: "Compute Power",
    description: "High-performance computing for AI workloads",
    icon: Cpu,
    color: "from-violet-500/20 to-purple-500/20",
    accentColor: "violet",
    yield: "10-15%",
    category: "Growth"
  },
  {
    id: 4,
    title: "Ecosystem Equity",
    subtitle: "Strategic Positions",
    description: "Equity stakes in digital infrastructure companies",
    icon: Building2,
    color: "from-primary/20 to-accent/20",
    accentColor: "primary",
    yield: "Capital Gains",
    category: "Growth"
  }
];

const StrategyCard = ({ strategy, isActive, onClick }: { strategy: typeof strategies[0]; isActive: boolean; onClick: () => void }) => {
  const Icon = strategy.icon;
  
  return (
    <motion.div
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl p-5 transition-all duration-500 ${
        isActive 
          ? 'glass border border-primary/30 shadow-lg shadow-primary/10' 
          : 'bg-card/30 border border-border/20 hover:border-border/40'
      }`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Active glow */}
      {isActive && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      <div className="relative z-10 flex items-start gap-4">
        <motion.div 
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${strategy.color} flex items-center justify-center flex-shrink-0`}
          animate={{ rotate: isActive ? [0, 5, -5, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'} transition-colors duration-300`} />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold ${isActive ? 'text-foreground' : 'text-muted-foreground'} transition-colors duration-300`}>
              {strategy.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              strategy.category === 'Income' 
                ? 'bg-emerald-500/10 text-emerald-400' 
                : 'bg-violet-500/10 text-violet-400'
            }`}>
              {strategy.category}
            </span>
          </div>
          <p className="text-xs text-muted-foreground/70">{strategy.subtitle}</p>
          
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {strategy.description}
                </p>
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/20">
                  <div>
                    <span className="text-xs text-muted-foreground/60">Target Yield</span>
                    <p className="text-sm font-medium text-primary">{strategy.yield}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, delay }: { icon: React.ComponentType<{ className?: string }>; title: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -4, scale: 1.02 }}
    className="flex items-center gap-3 glass px-5 py-3 rounded-xl cursor-default group"
  >
    <motion.div 
      className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center"
      whileHover={{ rotate: 5 }}
    >
      <Icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors duration-300" />
    </motion.div>
    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">{title}</span>
  </motion.div>
);

const StrategiesShowcase = () => {
  const [activeStrategy, setActiveStrategy] = useState(0);
  
  // Auto-rotate through strategies
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStrategy((prev) => (prev + 1) % strategies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-3">
      {strategies.map((strategy, index) => (
        <motion.div
          key={strategy.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
        >
          <StrategyCard
            strategy={strategy}
            isActive={activeStrategy === index}
            onClick={() => setActiveStrategy(index)}
          />
        </motion.div>
      ))}
      
      {/* Progress indicator */}
      <div className="flex justify-center gap-2 pt-4">
        {strategies.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveStrategy(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeStrategy === index 
                ? 'w-8 bg-primary' 
                : 'w-2 bg-border hover:bg-muted-foreground/50'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export const FundHero = () => {
  const metrics = [
    { value: "8%", label: "p.a.", sublabel: "Min. Distribution" },
    { value: "10-12%", label: "p.a.", sublabel: "Target Range" },
    { value: "15%", label: "IRR", sublabel: "Net Target" },
  ];

  const features = [
    { icon: TrendingUp, title: "Stable Yield Engine" },
    { icon: Shield, title: "Luxembourg Structure" },
    { icon: Zap, title: "Digital Infrastructure" },
    { icon: BarChart3, title: "Secondary Liquidity" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <FundAnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Headline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8"
            >
              <motion.div 
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-medium tracking-wider text-primary uppercase">Institutional Grade</span>
            </motion.div>
            
            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="block"
              >
                A Smarter Way
              </motion.span>
              <motion.span 
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
              >
                to <span className="text-gradient">Earn</span> and
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-gradient block"
              >
                Grow.
              </motion.span>
            </h1>
            
            {/* Short tagline */}
            <motion.p 
              className="text-lg text-muted-foreground mb-10 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Dual-engine fund combining stable yield with growth potential.
            </motion.p>
            
            {/* Feature pills */}
            <motion.div 
              className="flex flex-wrap gap-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              {features.map((feature, i) => (
                <FeatureCard key={i} {...feature} delay={1.2 + i * 0.1} />
              ))}
            </motion.div>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <Button size="lg" className="group btn-glow relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Request PPM
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Phone size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Book Call
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-xs text-muted-foreground/60 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              Professional investors only. Capital at risk.
            </motion.p>
          </motion.div>
          
          {/* Right Column - Animated Strategies Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-gradient-to-tr from-accent/10 to-transparent blur-2xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2] 
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <motion.div 
                    className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Investment Strategies</span>
                  <motion.div 
                    className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  />
                </div>
              </motion.div>
              
              {/* Strategy Cards */}
              <StrategiesShowcase />
              
              {/* Bottom stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="mt-6 grid grid-cols-3 gap-4"
              >
                {[
                  { label: "Income Sleeve", value: "60%" },
                  { label: "Equity Sleeve", value: "40%" },
                  { label: "Strategies", value: "4" }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-3 rounded-xl bg-card/30 border border-border/20"
                    whileHover={{ scale: 1.05, borderColor: 'hsl(var(--primary) / 0.3)' }}
                  >
                    <motion.p 
                      className="text-2xl font-bold text-gradient"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.8 + i * 0.1, type: "spring" }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
