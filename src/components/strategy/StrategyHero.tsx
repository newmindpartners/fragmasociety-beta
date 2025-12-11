import { motion } from "framer-motion";
import { ArrowRight, Phone, TrendingUp, Shield, Zap, BarChart3, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

const StrategyAnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
    
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
    
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.05, 0.12, 0.05]
      }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[150px]"
    />
  </div>
);

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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mb-8"
            >
              <motion.div 
                className="w-2 h-2 rounded-full bg-primary"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-xs font-medium tracking-wider text-primary uppercase">Fragma Strategy</span>
            </motion.div>
            
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
            
            <motion.p 
              className="text-lg text-muted-foreground mb-10 max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              {isAuthenticated 
                ? "Dual-engine strategy combining stable yield with growth potential."
                : "Income-focused strategy with regular distributions. Combining real-world and digital infrastructure assets in a Luxembourg securitisation structure."
              }
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
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="group btn-glow relative overflow-hidden">
                    <Link to="/auth">
                      <span className="relative z-10 flex items-center">
                        Access Investor Portal
                        <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="group">
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
          
          {/* Right Column - Metric Circles */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            <div className="relative">
              {isAuthenticated ? (
                <>
                  <motion.div
                    className="flex justify-center mb-6"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    <MetricCircle 
                      value="8%" 
                      label="p.a." 
                      sublabel="Target Distribution"
                      disclaimer="Target net annual distribution: 8% p.a. (not guaranteed)"
                      delay={0.8}
                      size="lg"
                    />
                  </motion.div>
                  
                  <div className="flex gap-8 justify-center">
                    <MetricCircle 
                      value="10-12%" 
                      label="p.a." 
                      sublabel="Target Range"
                      disclaimer="Illustrative target: 10–12% p.a. (not guaranteed)"
                      delay={1}
                    />
                    <MetricCircle 
                      value="15%" 
                      label="IRR" 
                      sublabel="Target Net"
                      disclaimer="Target net IRR: 15% – results may vary"
                      delay={1.2}
                    />
                  </div>
                </>
              ) : (
                <>
                  <motion.div
                    className="flex justify-center mb-6"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.7, type: "spring" }}
                  >
                    <LockedMetricCircle delay={0.8} size="lg" />
                  </motion.div>
                  
                  <div className="flex gap-8 justify-center">
                    <LockedMetricCircle delay={1} />
                    <LockedMetricCircle delay={1.2} />
                  </div>
                </>
              )}
            </div>
            
            {/* Bottom info card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="mt-10 glass rounded-2xl p-6 max-w-sm shine"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-2">
                  {["from-primary to-accent", "from-accent to-primary", "from-primary/80 to-accent/80"].map((gradient, i) => (
                    <motion.div
                      key={i}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-background`}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.5 + i * 0.1 }}
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Dual-Engine Approach</p>
                  <p className="text-xs text-muted-foreground">Income • Equity</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <motion.div 
                  className="p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
                  whileHover={{ x: 2 }}
                >
                  <span className="text-muted-foreground">SME Credit</span>
                </motion.div>
                <motion.div 
                  className="p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors cursor-default"
                  whileHover={{ x: 2 }}
                >
                  <span className="text-muted-foreground">BTC Mining</span>
                </motion.div>
                <motion.div 
                  className="p-2 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors cursor-default"
                  whileHover={{ x: 2 }}
                >
                  <span className="text-muted-foreground">AI/HPC Infra</span>
                </motion.div>
                <motion.div 
                  className="p-2 rounded-lg bg-accent/5 hover:bg-accent/10 transition-colors cursor-default"
                  whileHover={{ x: 2 }}
                >
                  <span className="text-muted-foreground">Ecosystem</span>
                </motion.div>
              </div>
              
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.8 }}
                  className="mt-4 pt-4 border-t border-border/50 text-center"
                >
                  <Link to="/auth" className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3" />
                    Login for detailed metrics
                  </Link>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
