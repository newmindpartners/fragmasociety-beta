import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Shield, Coins, BarChart3, CheckCircle2, Info } from "lucide-react";
import { useState } from "react";

type OptionType = "covered-call" | "put" | "call" | "sell-put";

const optionsData: Record<OptionType, {
  title: string;
  description: string;
  benefit: string;
  icon: typeof TrendingUp;
  color: string;
  payoffDescription: string;
}> = {
  "covered-call": {
    title: "Covered Call",
    description: "Earn yield by letting other traders pay for the right to buy your asset later",
    benefit: "Generate income on assets you hold",
    icon: Coins,
    color: "primary",
    payoffDescription: "Collect premium, cap upside"
  },
  "put": {
    title: "Put Protection",
    description: "Protect yourself from price drops — like insurance for your portfolio",
    benefit: "Downside protection with limited cost",
    icon: Shield,
    color: "green-400",
    payoffDescription: "Pay premium, protect downside"
  },
  "call": {
    title: "Call Option",
    description: "Bet on price increases with limited risk — your max loss is the premium paid",
    benefit: "Leverage upside with defined risk",
    icon: TrendingUp,
    color: "accent",
    payoffDescription: "Pay premium, unlimited upside"
  },
  "sell-put": {
    title: "Sell Put",
    description: "Get paid to potentially buy an asset at a lower price",
    benefit: "Earn premium while waiting to buy",
    icon: BarChart3,
    color: "amber-400",
    payoffDescription: "Collect premium, obligated to buy"
  }
};

const PayoffChart = ({ type }: { type: OptionType }) => {
  const getPath = () => {
    switch (type) {
      case "covered-call":
        return "M 20 80 L 100 80 L 100 40 L 180 40";
      case "put":
        return "M 20 40 L 80 40 L 100 80 L 180 80";
      case "call":
        return "M 20 80 L 100 80 L 180 20";
      case "sell-put":
        return "M 20 80 L 80 80 L 100 40 L 180 40";
    }
  };

  const getGradientId = () => `gradient-${type}`;
  const getAreaPath = () => {
    switch (type) {
      case "covered-call":
        return "M 20 80 L 100 80 L 100 40 L 180 40 L 180 100 L 20 100 Z";
      case "put":
        return "M 20 40 L 80 40 L 100 80 L 180 80 L 180 100 L 20 100 Z";
      case "call":
        return "M 20 80 L 100 80 L 180 20 L 180 100 L 20 100 Z";
      case "sell-put":
        return "M 20 80 L 80 80 L 100 40 L 180 40 L 180 100 L 20 100 Z";
    }
  };

  return (
    <div className="relative h-40 w-full">
      {/* Animated grid background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      <svg className="w-full h-full relative z-10" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id={getGradientId()} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Axis lines */}
        <motion.line 
          x1="20" y1="80" x2="180" y2="80" 
          stroke="rgba(255,255,255,0.15)" 
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.line 
          x1="100" y1="20" x2="100" y2="80" 
          stroke="rgba(255,255,255,0.1)" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
        
        {/* Area fill */}
        <motion.path
          d={getAreaPath()}
          fill={`url(#${getGradientId()})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        
        {/* Main payoff curve with glow */}
        <motion.path
          d={getPath()}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Animated point on the curve */}
        <motion.circle
          r="4"
          fill="hsl(var(--primary))"
          filter="url(#glow)"
          initial={{ cx: 20, cy: 80 }}
          animate={{ 
            cx: [20, 100, 180],
            cy: type === "call" ? [80, 80, 20] : type === "put" ? [40, 40, 80] : [80, 40, 40]
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
        />

        {/* Labels with fade in */}
        <motion.text 
          x="100" y="98" 
          fill="rgba(255,255,255,0.5)" 
          fontSize="8" 
          textAnchor="middle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Price
        </motion.text>
        <motion.text 
          x="8" y="50" 
          fill="rgba(255,255,255,0.5)" 
          fontSize="8" 
          textAnchor="middle"
          transform="rotate(-90, 8, 50)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          P/L
        </motion.text>
      </svg>
    </div>
  );
};

export const OptionsTrading = () => {
  const [activeOption, setActiveOption] = useState<OptionType>("covered-call");
  const currentOption = optionsData[activeOption];
  const IconComponent = currentOption.icon;

  return (
    <section className="py-24 section-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-white/5 text-white border border-white/20">
              Options Trading
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Simple, safe,{" "}
              <span className="text-gradient">powerful.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Beginner-friendly options trading to help you earn extra yield, 
              protect your portfolio, or speculate with defined risk.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Option Selector */}
          <div className="space-y-4">
            {(Object.keys(optionsData) as OptionType[]).map((key, index) => {
              const option = optionsData[key];
              const isActive = activeOption === key;
              const Icon = option.icon;

              return (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveOption(key)}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    isActive 
                      ? "bg-white/5 border-white/30 scale-[1.02]" 
                      : "bg-background/50 border-border/50 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive ? "bg-white/10" : "bg-muted"
                    }`}>
                      <Icon className={`w-6 h-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium mb-1 ${isActive ? "text-gradient" : "text-foreground"}`}>
                        {option.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{option.description}</p>
                    </div>
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center"
                      >
                        <CheckCircle2 className="w-4 h-4 text-background" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right - Detail View - Premium Design */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              key={activeOption}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="relative group"
            >
              {/* Ambient glow effect */}
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.02, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-2xl"
              />
              
              {/* Main card with gradient border */}
              <div className="relative rounded-3xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-white/10 overflow-hidden">
                <div className="glass rounded-3xl p-8 backdrop-blur-xl bg-background/80">
                  
                  {/* Header with floating icon */}
                  <div className="flex items-start gap-5 mb-8">
                    <motion.div 
                      className="relative"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {/* Icon glow ring */}
                      <motion.div
                        animate={{ 
                          boxShadow: [
                            "0 0 20px hsl(var(--primary) / 0.3)",
                            "0 0 40px hsl(var(--primary) / 0.5)",
                            "0 0 20px hsl(var(--primary) / 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-2xl"
                      />
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
                        <motion.div
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <IconComponent className="w-8 h-8 text-primary" />
                        </motion.div>
                      </div>
                    </motion.div>
                    
                    <div className="flex-1 pt-1">
                      <motion.h3 
                        className="text-3xl font-serif font-bold text-gradient mb-1"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {currentOption.title}
                      </motion.h3>
                      <motion.p 
                        className="text-sm text-muted-foreground font-medium tracking-wide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {currentOption.payoffDescription}
                      </motion.p>
                    </div>
                  </div>

                  {/* Description with elegant styling */}
                  <motion.p 
                    className="text-lg text-muted-foreground leading-relaxed mb-8 pl-4 border-l-2 border-primary/30"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {currentOption.description}
                  </motion.p>

                  {/* Key Benefit - Premium floating card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="relative mb-8 group/benefit"
                  >
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/benefit:translate-x-full transition-transform duration-1000" />
                    
                    <div className="relative p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 overflow-hidden">
                      <div className="flex items-center gap-3 mb-3">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </motion.div>
                        <span className="text-sm font-bold uppercase tracking-wider text-primary">Key Benefit</span>
                      </div>
                      <p className="text-lg text-foreground font-medium">{currentOption.benefit}</p>
                    </div>
                  </motion.div>

                  {/* Payoff Chart - Enhanced container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className="mb-8"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Payoff Diagram</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs text-primary font-medium">Live</span>
                      </div>
                    </div>
                    <div className="relative rounded-2xl p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 overflow-hidden">
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/30 rounded-tl-xl" />
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/30 rounded-br-xl" />
                      
                      <PayoffChart type={activeOption} />
                    </div>
                  </motion.div>

                  {/* Features - Premium pills with stagger animation */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { text: "Transparent", icon: "◇" },
                      { text: "On-chain", icon: "⬡" },
                      { text: "Easy to understand", icon: "○" },
                      { text: "Fully collateralised", icon: "◈" }
                    ].map((feature, i) => (
                      <motion.div
                        key={feature.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                        whileHover={{ scale: 1.03, x: 4 }}
                        className="group/feature flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-default"
                      >
                        <span className="text-primary/60 group-hover/feature:text-primary transition-colors text-sm">{feature.icon}</span>
                        <span className="text-sm font-medium text-foreground">{feature.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info badge - floating below */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-6 relative"
            >
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  No complex DeFi mechanics — just clean, intuitive tools designed for everyone.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
