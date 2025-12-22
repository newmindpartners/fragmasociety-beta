import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Shield, TrendingUp, Zap, ChevronRight, Coins, BarChart3 } from "lucide-react";
import palisadesBg from "@/assets/palisades-rebuild.jpg";

type OptionType = "call" | "put" | "covered" | "sell-put";

const optionsData: Record<OptionType, {
  title: string;
  description: string;
  benefit: string;
  icon: typeof Shield;
  example: { asset: string; strike: string; premium: string; potential: string };
}> = {
  call: {
    title: "Call Options",
    description: "Lock in the right to buy an asset at a fixed price. Perfect when you expect prices to rise.",
    benefit: "Unlimited upside with limited downside",
    icon: TrendingUp,
    example: { asset: "Malibu Estate", strike: "$2.5M", premium: "$50K", potential: "+$500K" }
  },
  put: {
    title: "Put Options",
    description: "Secure the right to sell at a guaranteed price. Ideal for protecting your existing holdings.",
    benefit: "Insurance against market downturns",
    icon: Shield,
    example: { asset: "LA Portfolio", strike: "$1.8M", premium: "$35K", potential: "Protected" }
  },
  covered: {
    title: "Covered Calls",
    description: "Earn premium income on assets you already own. Generate yield while waiting for appreciation.",
    benefit: "Additional income on existing holdings",
    icon: Coins,
    example: { asset: "Beverly Hills", strike: "$3.2M", premium: "$75K", potential: "+7.5% Yield" }
  },
  "sell-put": {
    title: "Sell Put",
    description: "Get paid to potentially buy an asset at a lower price you already want.",
    benefit: "Earn premium while waiting to buy",
    icon: BarChart3,
    example: { asset: "Pacific Palisades", strike: "$2.1M", premium: "$45K", potential: "+4.2% Yield" }
  }
};

// Animated counter component
const AnimatedValue = ({ value, prefix = "", suffix = "" }: { value: string; prefix?: string; suffix?: string }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
  
  useEffect(() => {
    const node = nodeRef.current;
    if (!node || isNaN(numericValue)) return;
    
    const controls = animate(0, numericValue, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (value.includes('M')) {
          node.textContent = `${prefix}$${v.toFixed(1)}M${suffix}`;
        } else if (value.includes('K')) {
          node.textContent = `${prefix}$${Math.round(v)}K${suffix}`;
        } else if (value.includes('%')) {
          node.textContent = `${prefix}${v.toFixed(1)}%${suffix}`;
        } else {
          node.textContent = `${prefix}${value}${suffix}`;
        }
      },
    });
    
    return () => controls.stop();
  }, [value, numericValue, prefix, suffix]);
  
  return <span ref={nodeRef}>{prefix}{value}{suffix}</span>;
};

// Floating particle effect
const FloatingOrb = ({ delay, size, position }: { delay: number; size: number; position: { x: string; y: string } }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: position.x,
      top: position.y,
      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
    }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.6, 0.3],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export const OptionsTrading = () => {
  const [activeOption, setActiveOption] = useState<OptionType>("call");
  const currentOption = optionsData[activeOption];
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const getPayoffPath = () => {
    switch (activeOption) {
      case "call": return "M 20 80 L 100 80 L 180 20";
      case "put": return "M 20 20 L 100 80 L 180 80";
      case "covered": return "M 20 80 L 100 80 L 100 40 L 180 40";
      case "sell-put": return "M 20 80 L 80 80 L 100 40 L 180 40";
    }
  };

  return (
    <section ref={sectionRef} className="py-32 lg:py-40 relative overflow-hidden">
      {/* Stunning Background Image with Overlay */}
      <div className="absolute inset-0">
        <motion.img 
          src={palisadesBg} 
          alt="" 
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Multi-layer overlay for depth */}
        <div className="absolute inset-0 bg-slate-950/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/40" />
      </div>
      
      {/* Elegant light accents */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-white/[0.02] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-amber-500/[0.03] rounded-full blur-[80px]" />
      
      {/* Floating orbs */}
      <FloatingOrb delay={0} size={300} position={{ x: '10%', y: '20%' }} />
      <FloatingOrb delay={2} size={200} position={{ x: '80%', y: '60%' }} />
      <FloatingOrb delay={4} size={250} position={{ x: '60%', y: '10%' }} />

      {/* Premium top border */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
      />
      
      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        {/* Header with staggered reveal */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 mb-8"
          >
            <motion.div 
              className="w-16 h-px bg-white/30"
              initial={{ width: 0 }}
              animate={isInView ? { width: 64 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <span className="text-[11px] tracking-[0.4em] uppercase font-medium text-white/50">
              Options Trading
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-[0.95] tracking-tight text-white"
          >
            Advanced Strategies for
            <motion.span 
              className="block font-serif italic text-white/50 mt-3"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Sophisticated Investors.
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg lg:text-xl max-w-xl mt-8 leading-relaxed text-white/50 font-light"
          >
            Hedge your positions, generate income, or leverage your conviction with institutional-grade options.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Option Selector with premium styling */}
          <div className="space-y-3">
            {(Object.keys(optionsData) as OptionType[]).map((type, index) => {
              const option = optionsData[type];
              const isActive = activeOption === type;
              const Icon = option.icon;
              
              return (
                <motion.button
                  key={type}
                  onClick={() => setActiveOption(type)}
                  initial={{ opacity: 0, x: -40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ x: 8 }}
                  className={`group w-full p-6 border text-left transition-all duration-500 backdrop-blur-sm relative overflow-hidden ${
                    isActive 
                      ? 'bg-white/10 border-white/30' 
                      : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                >
                  {/* Active indicator line */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px] bg-white"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <motion.div 
                        className={`w-14 h-14 border flex items-center justify-center transition-all duration-500 ${
                          isActive ? 'border-white bg-white' : 'border-white/20 bg-white/5 group-hover:border-white/40'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-slate-900' : 'text-white/60'}`} strokeWidth={1.5} />
                      </motion.div>
                      <div>
                        <h3 className="text-base font-medium text-white mb-0.5">{option.title}</h3>
                        <p className="text-sm text-white/40">{option.benefit}</p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-white/30'}`} />
                    </motion.div>
                  </div>
                </motion.button>
              );
            })}

            {/* Feature pills with stagger animation */}
            <motion.div 
              className="flex flex-wrap gap-3 mt-8 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {["No Margin Calls", "Defined Risk", "Premium Income", "Leverage"].map((feature, i) => (
                <motion.span 
                  key={i} 
                  className="px-4 py-2.5 bg-white/5 border border-white/10 text-sm text-white/50 backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
                >
                  <Zap className="w-3 h-3 inline mr-2 text-white/30" />
                  {feature}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Option Detail Card with premium animations */}
          <motion.div
            key={activeOption}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32"
          >
            <div className="bg-white/[0.03] border border-white/10 overflow-hidden backdrop-blur-md relative">
              {/* Subtle glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              {/* Header */}
              <div className="p-8 lg:p-10 border-b border-white/10 relative">
                <div className="flex items-center gap-5 mb-5">
                  <motion.div 
                    className="w-16 h-16 bg-white border border-white/20 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <currentOption.icon className="w-8 h-8 text-slate-900" strokeWidth={1.5} />
                  </motion.div>
                  <div>
                    <motion.h3 
                      className="text-2xl font-light text-white font-serif"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentOption.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-white/40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {currentOption.benefit}
                    </motion.p>
                  </div>
                </div>
                <motion.p 
                  className="leading-relaxed text-white/60"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  {currentOption.description}
                </motion.p>
              </div>

              {/* Example with animated values */}
              <div className="p-8 lg:p-10 bg-white/[0.02]">
                <motion.h4 
                  className="text-[10px] font-medium uppercase tracking-[0.3em] mb-6 text-white/30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  Example Trade
                </motion.h4>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(currentOption.example).map(([key, value], i) => (
                    <motion.div 
                      key={key} 
                      className={`p-5 border transition-all duration-300 ${
                        key === 'potential' 
                          ? 'bg-emerald-500/10 border-emerald-500/30' 
                          : 'bg-white/[0.02] border-white/10'
                      }`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      whileHover={{ borderColor: key === 'potential' ? 'rgba(16,185,129,0.5)' : 'rgba(255,255,255,0.2)' }}
                    >
                      <p className={`text-[10px] uppercase tracking-wider mb-2 ${
                        key === 'potential' ? 'text-emerald-400' : 'text-white/30'
                      }`}>
                        {key.replace('_', ' ')}
                      </p>
                      <p className={`text-xl font-medium ${key === 'potential' ? 'text-emerald-400' : 'text-white'}`}>
                        {value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Payoff Chart with enhanced animation */}
              <motion.div 
                className="p-8 lg:p-10 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <div className="relative h-32">
                  <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <motion.line 
                      x1="20" y1="80" x2="180" y2="80" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.line 
                      x1="100" y1="20" x2="100" y2="80" 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeDasharray="4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                    />
                    
                    {/* Main path with glow effect */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      d={getPayoffPath()}
                      fill="none"
                      stroke="url(#payoffGradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      filter="url(#glow)"
                    />
                    
                    {/* Gradient and glow definitions */}
                    <defs>
                      <linearGradient id="payoffGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                  </svg>
                  
                  {/* Labels */}
                  <motion.div 
                    className="absolute bottom-0 left-4 text-xs text-white/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    Loss
                  </motion.div>
                  <motion.div 
                    className="absolute bottom-0 right-4 text-xs text-emerald-400/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                  >
                    Profit
                  </motion.div>
                  <motion.div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 text-xs text-white/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7 }}
                  >
                    Strike
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Premium bottom border */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
      />
    </section>
  );
};
