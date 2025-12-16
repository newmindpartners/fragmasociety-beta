import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, TrendingUp, Shield, Zap, BarChart3, AlertTriangle, Lock, Landmark, Cpu, Bitcoin, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import strategy background images
import btcMiningBg from "@/assets/strategy-btc-mining.jpg";
import aiInfraBg from "@/assets/strategy-ai-infrastructure.jpg";
import smeCreditBg from "@/assets/strategy-sme-credit.jpg";
import ecosystemBg from "@/assets/strategy-ecosystem.jpg";
import strategyHeroBg from "@/assets/strategy-hero-bg.jpg";

const StrategyAnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Photo-realistic Background with Blur */}
    <motion.div 
      initial={{ scale: 1.1 }}
      animate={{ scale: 1 }}
      transition={{ duration: 20, ease: "easeOut" }}
      className="absolute inset-0"
    >
      <img 
        src={strategyHeroBg} 
        alt="" 
        className="w-full h-full object-cover scale-110 blur-[2px]"
      />
    </motion.div>
    
    {/* Dark Overlay with Gradient */}
    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background/90" />
    
    {/* Animated Gradient Orbs */}
    <motion.div 
      animate={{ 
        scale: [1, 1.3, 1],
        opacity: [0.1, 0.2, 0.1],
        x: [0, 50, 0],
        y: [0, -30, 0]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-primary/20 via-accent/15 to-transparent rounded-full blur-[200px]"
    />
    
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.08, 0.15, 0.08]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[150px]"
    />
    
    {/* Subtle Noise Texture Overlay */}
    <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" 
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
    />
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
    bgImage: smeCreditBg,
    iconBg: "from-emerald-600/80 to-emerald-900/80",
    focus: "Income Focus",
    category: "Income",
    accentColor: "emerald"
  },
  {
    id: 2,
    title: "BTC Mining",
    subtitle: "Digital Infrastructure",
    description: "Institutional-grade Bitcoin mining operations",
    icon: Bitcoin,
    bgImage: btcMiningBg,
    iconBg: "from-amber-600/80 to-amber-900/80",
    focus: "Variable Returns",
    category: "Income",
    accentColor: "amber"
  },
  {
    id: 3,
    title: "AI/HPC Infra",
    subtitle: "Compute Power",
    description: "High-performance computing for AI workloads",
    icon: Cpu,
    bgImage: aiInfraBg,
    iconBg: "from-violet-600/80 to-violet-900/80",
    focus: "Growth Potential",
    category: "Growth",
    accentColor: "violet"
  },
  {
    id: 4,
    title: "Ecosystem Equity",
    subtitle: "Strategic Positions",
    description: "Equity stakes in digital infrastructure companies",
    icon: Building2,
    bgImage: ecosystemBg,
    iconBg: "from-cyan-600/80 to-cyan-900/80",
    focus: "Capital Appreciation",
    category: "Growth",
    accentColor: "cyan"
  }
];

// Premium Strategy Card with glassmorphism
const StrategyCard = ({ 
  strategy, 
  isActive, 
  onClick,
  index 
}: { 
  strategy: typeof strategies[0]; 
  isActive: boolean; 
  onClick: () => void;
  index: number;
}) => {
  const Icon = strategy.icon;
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };
  
  const rotateX = isHovered ? (mousePosition.y - 0.5) * -10 : 0;
  const rotateY = isHovered ? (mousePosition.x - 0.5) * 10 : 0;
  
  const categoryColors = {
    Income: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Growth: "bg-violet-500/20 text-violet-400 border-violet-500/30"
  };
  
  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative cursor-pointer"
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
          isActive ? 'z-10' : 'z-0'
        }`}
        animate={{
          rotateX,
          rotateY,
          scale: isActive ? 1.02 : isHovered ? 1.01 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Real background image - blurred */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ 
            backgroundImage: `url(${strategy.bgImage})`,
            filter: isActive ? 'blur(8px)' : 'blur(12px)',
            transform: isActive ? 'scale(1.1)' : 'scale(1.05)',
          }}
        />
        
        {/* Dark overlay for better readability */}
        <div className={`absolute inset-0 transition-all duration-500 ${
          isActive ? 'bg-black/50' : 'bg-black/60'
        }`} />
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Glass layer */}
        <div className={`absolute inset-0 backdrop-blur-sm transition-all duration-500 ${
          isActive ? 'bg-white/[0.06]' : 'bg-white/[0.02]'
        }`} />
        
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: isActive 
              ? `linear-gradient(${90 + mousePosition.x * 180}deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.3) 100%)`
              : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
            padding: '1px',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'xor',
            WebkitMaskComposite: 'xor',
          }}
          animate={{ opacity: isActive ? 1 : 0.5 }}
        />
        
        {/* Glare/shine sweep effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)`,
            transform: `translateX(${isHovered ? '100%' : '-100%'})`,
            transition: 'transform 0.6s ease-out',
          }}
        />
        
        {/* Content */}
        <div className={`relative z-10 p-5 transition-all duration-500 ${isActive ? 'py-6' : ''}`}>
          <div className="flex items-start gap-4">
            {/* Icon with glow */}
            <motion.div 
              className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${strategy.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}
              animate={{ 
                scale: isActive ? 1.05 : 1,
                boxShadow: isActive 
                  ? '0 8px 32px -4px rgba(0,0,0,0.4), 0 0 20px -5px rgba(255,255,255,0.1)' 
                  : '0 4px 16px -4px rgba(0,0,0,0.3)'
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0"
                style={{ 
                  background: 'radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)'
                }}
                animate={{ opacity: isActive ? 0.5 : 0 }}
              />
              <Icon className="w-7 h-7 text-white relative z-10" />
            </motion.div>
            
            {/* Text content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <motion.h3 
                  className="font-semibold text-white text-lg"
                  animate={{ opacity: isActive ? 1 : 0.8 }}
                >
                  {strategy.title}
                </motion.h3>
                <motion.span 
                  className={`text-xs px-2.5 py-1 rounded-full border ${categoryColors[strategy.category as keyof typeof categoryColors]}`}
                  animate={{ 
                    scale: isActive ? 1.05 : 1,
                    opacity: isActive ? 1 : 0.7
                  }}
                >
                  {strategy.category}
                </motion.span>
              </div>
              <p className="text-sm text-white/50">{strategy.subtitle}</p>
              
              {/* Expanded content when active */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-white/70 mt-4 leading-relaxed">
                      {strategy.description}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10">
                      <div>
                        <span className="text-xs text-white/40 block mb-1">Strategy Focus</span>
                        <p className="text-sm font-medium text-white">{strategy.focus}</p>
                      </div>
                      <motion.div
                        className="ml-auto"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <ArrowRight className="w-5 h-5 text-white/50" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* Bottom glow for active card */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            exit={{ opacity: 0, scaleX: 0 }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Premium Strategies Showcase
const StrategiesShowcase = () => {
  const [activeStrategy, setActiveStrategy] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStrategy((prev) => (prev + 1) % strategies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative">
      {/* Floating ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Cards */}
      <div className="space-y-3">
        {strategies.map((strategy, index) => (
          <StrategyCard
            key={strategy.id}
            strategy={strategy}
            isActive={activeStrategy === index}
            onClick={() => setActiveStrategy(index)}
            index={index}
          />
        ))}
      </div>
      
      {/* Progress indicators */}
      <div className="flex justify-center gap-3 pt-6">
        {strategies.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveStrategy(index)}
            className="relative h-1.5 rounded-full overflow-hidden bg-white/10"
            style={{ width: activeStrategy === index ? 32 : 8 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{ width: activeStrategy === index ? 32 : 8 }}
            transition={{ duration: 0.3 }}
          >
            {activeStrategy === index && (
              <motion.div
                className="absolute inset-0 bg-white rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4, ease: "linear" }}
              />
            )}
            {activeStrategy !== index && (
              <div className="absolute inset-0 bg-white/30 rounded-full" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

interface MetricCircleProps {
  value: string;
  label: string;
  sublabel: string;
  disclaimer: string;
  delay: number;
  size?: "lg" | "md";
}

const MetricCircle = ({ value, label, sublabel, disclaimer, delay, size = "md" }: MetricCircleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const circleSize = size === "lg" ? 180 : 140;
  const strokeWidth = size === "lg" ? 6 : 5;
  const radius = (circleSize - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.08, y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative cursor-pointer group"
      style={{ width: circleSize, height: circleSize }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-xl"
        animate={{ opacity: isHovered ? 0.8 : 0.3, scale: isHovered ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${circleSize} ${circleSize}`}>
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        <motion.circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="none"
          stroke="url(#metricGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * 0.15 }}
          transition={{ delay: delay + 0.3, duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="metricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--accent))" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
        <motion.span 
          className="text-2xl lg:text-3xl font-bold text-gradient"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {value}
        </motion.span>
        <span className="text-xs text-muted-foreground mt-1">{label}</span>
        <motion.span 
          className="text-[10px] text-muted-foreground/70 mt-0.5 max-w-[100px] leading-tight"
          animate={{ opacity: isHovered ? 1 : 0.7 }}
        >
          {sublabel}
        </motion.span>
      </div>
      
      {/* Disclaimer tooltip on hover */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 p-2 glass rounded-lg text-[10px] text-muted-foreground text-center z-20"
      >
        {disclaimer}
      </motion.div>
    </motion.div>
  );
};

const LockedMetricCircle = ({ delay, size = "md" }: { delay: number; size?: "lg" | "md" }) => {
  const circleSize = size === "lg" ? 180 : 140;
  const strokeWidth = size === "lg" ? 6 : 5;
  const radius = (circleSize - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
      style={{ width: circleSize, height: circleSize }}
    >
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-muted/30 to-muted/10 blur-xl"
        animate={{ opacity: 0.3 }}
      />
      
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox={`0 0 ${circleSize} ${circleSize}`}>
        <circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
          opacity={0.3}
        />
        <motion.circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * 0.5 }}
          transition={{ delay: delay + 0.3, duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3">
        <Lock className="w-6 h-6 text-muted-foreground mb-1" />
        <span className="text-xs text-muted-foreground">Login to view</span>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, delay }: { icon: any; title: string; delay: number }) => (
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

interface StrategyHeroProps {
  isAuthenticated?: boolean;
}

export const StrategyHero = ({ isAuthenticated = false }: StrategyHeroProps) => {
  const features = [
    { icon: TrendingUp, title: "Income-Focused" },
    { icon: Shield, title: "Luxembourg Structure" },
    { icon: Zap, title: "Digital Infrastructure" },
    { icon: BarChart3, title: "Secondary Liquidity" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      <StrategyAnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Risk Warning Banner - only show when authenticated */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-200 font-medium mb-1">Important Risk Information</p>
              <p className="text-amber-200/70 text-xs">
                Target returns only. No guarantee. Capital at risk. Unlisted, illiquid securities – you may not be able to sell quickly or at all. Past performance and targets are not reliable indicators of future results.
              </p>
            </div>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-card/80 border border-white/30 backdrop-blur-sm mb-8 shadow-[0_0_20px_rgba(255,255,255,0.15),0_0_40px_rgba(255,255,255,0.1)]"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-sm font-bold tracking-[0.15em] text-white uppercase">Exclusive Investment Vehicle</span>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
            
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="block"
              >
                Fragma <span className="text-gradient">One</span>
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-10 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              One fund. Broad exposure to real-world yield & digital infrastructure. Powered by the Fragma ecosystem.
            </motion.p>
            
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
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              {isAuthenticated ? (
                <>
                  <Button size="lg" className="group bg-white text-background hover:bg-white/90 hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.4)] hover:scale-[1.03] active:scale-[0.98]">
                    <span className="relative z-10 flex items-center">
                      Request PPM
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </span>
                  </Button>
                  <Button variant="outline" size="lg" className="group border-white text-white hover:bg-white hover:text-background">
                    <Phone size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Book Call
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="group bg-white text-background hover:bg-white/90 hover:shadow-[0_12px_40px_-10px_rgba(255,255,255,0.4)] hover:scale-[1.03] active:scale-[0.98]">
                    <Link to="/auth">
                      <span className="relative z-10 flex items-center">
                        Register to view strategy details
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="group border-white text-white hover:bg-white hover:text-background">
                    <Phone size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                    Book Call
                  </Button>
                </>
              )}
            </motion.div>
            
            <motion.p 
              className="text-xs text-muted-foreground/60 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              {isAuthenticated 
                ? "Professional investors only. Capital at risk."
                : "Capital at risk. Not suitable for everyone. For professional / qualified investors only."
              }
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
                      className="text-4xl font-bold text-white"
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
