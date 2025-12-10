import { motion } from "framer-motion";
import { TrendingUp, Shield, Layers, Sparkles, ArrowDown } from "lucide-react";
import { useState } from "react";

const DistributionBar = ({ 
  value, 
  label, 
  description, 
  percentage, 
  delay,
  isHighlight 
}: { 
  value: string; 
  label: string; 
  description: string; 
  percentage: number;
  delay: number;
  isHighlight?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 cursor-pointer ${
        isHighlight 
          ? 'bg-gradient-to-r from-primary/20 via-primary/10 to-transparent border border-primary/40' 
          : 'bg-card/50 border border-border/50 hover:border-primary/30'
      }`}>
        {/* Animated fill bar */}
        <motion.div
          className={`absolute inset-0 ${isHighlight ? 'bg-primary/10' : 'bg-primary/5'}`}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: percentage / 100 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
        
        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{ translateX: isHovered ? "200%" : "-100%" }}
          transition={{ duration: 0.6 }}
        />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Animated icon */}
            <motion.div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                isHighlight ? 'bg-primary/30' : 'bg-primary/10'
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {isHighlight ? (
                <Shield className="w-6 h-6 text-primary" />
              ) : (
                <TrendingUp className="w-6 h-6 text-primary" />
              )}
            </motion.div>
            
            <div>
              <div className="flex items-baseline gap-2">
                <motion.span 
                  className={`text-3xl font-bold ${isHighlight ? 'text-primary' : 'text-foreground'}`}
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {value}
                </motion.span>
                <span className="text-muted-foreground text-sm">{label}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
          
          {/* Percentage indicator */}
          <motion.div
            className="hidden md:flex items-center gap-2 text-primary/60"
            animate={{ opacity: isHovered ? 1 : 0.5 }}
          >
            <div className="w-24 h-2 rounded-full bg-border/50 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: `${percentage}%` }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.5, duration: 0.6 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const WaterfallStep = ({ 
  step, 
  text, 
  delay,
  isLast 
}: { 
  step: number; 
  text: string; 
  delay: number;
  isLast?: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const icons = [Layers, Shield, Sparkles, TrendingUp];
  const Icon = icons[step - 1];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        {/* Animated step indicator */}
        <div className="relative flex flex-col items-center">
          <motion.div
            className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 bg-primary/20"
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div
              animate={{ 
                rotate: isHovered ? 360 : 0,
                scale: isHovered ? 1.2 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-6 h-6 text-primary relative z-10" />
            </motion.div>
            
            {/* Step number badge */}
            <motion.span
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center"
              animate={{ scale: isHovered ? 1.2 : 1 }}
            >
              {step}
            </motion.span>
          </motion.div>
          
          {/* Connecting line with animation */}
          {!isLast && (
            <div className="relative w-0.5 h-16 mt-2">
              <div className="absolute inset-0 bg-border/30" />
              <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-primary/20"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ delay: delay + 0.3, duration: 0.5 }}
              />
              {/* Flowing dot animation */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                animate={{ 
                  y: [0, 60, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: delay
                }}
              />
            </div>
          )}
        </div>
        
        {/* Content card */}
        <motion.div
          className={`flex-1 p-4 rounded-xl border transition-all duration-300 ${
            isHovered 
              ? 'bg-primary/5 border-primary/30 shadow-lg shadow-primary/5' 
              : 'bg-card/30 border-border/30'
          }`}
          animate={{ x: isHovered ? 5 : 0 }}
        >
          <p className="text-muted-foreground leading-relaxed">{text}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const FundReturns = () => {
  const distributionLadder = [
    { value: "8%", label: "p.a.", description: "Minimum distribution objective (\"8% Floor\")", percentage: 55, highlight: true },
    { value: "10–12%", label: "p.a.", description: "Target annual distribution range", percentage: 75 },
    { value: "12–15%", label: "p.a.", description: "Illustrative target net IRR (5–7 year horizon)", percentage: 100 }
  ];

  const waterfall = [
    "Operating expenses & debt service (if any).",
    "Distributions to investors up to the 8% Floor.",
    "Allocation to the Distribution Reserve Account until 1–2 years of 8% distributions are provisioned.",
    "Top-up distributions and performance remuneration as available above the Floor and Reserve."
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Returns & Distributions</span>
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Engineered for resilient distributions with upside.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Distribution Profile - Visual bars */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-serif font-bold text-foreground mb-8 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              Distribution Profile
            </motion.h3>
            
            <div className="space-y-4">
              {distributionLadder.map((item, index) => (
                <DistributionBar
                  key={index}
                  value={item.value}
                  label={item.label}
                  description={item.description}
                  percentage={item.percentage}
                  delay={index * 0.15}
                  isHighlight={item.highlight}
                />
              ))}
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-sm text-muted-foreground mt-6 p-4 rounded-xl bg-card/30 border border-border/30"
            >
              All combining Income Sleeve cashflows and realised equity gains, net of Fund-level fees and expenses.
            </motion.p>
          </div>

          {/* Waterfall - Visual flow diagram */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl font-serif font-bold text-foreground mb-8 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <ArrowDown className="w-5 h-5 text-primary" />
              </div>
              Distribution Waterfall
            </motion.h3>
            
            <div className="space-y-2">
              {waterfall.map((step, index) => (
                <WaterfallStep
                  key={index}
                  step={index + 1}
                  text={step}
                  delay={index * 0.15}
                  isLast={index === waterfall.length - 1}
                />
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="mt-8 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20"
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Performance fees only accrue after the 8% Floor and Reserve targets are satisfied, with Manager co-investment ensuring alignment.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-xs text-muted-foreground text-center mt-16 max-w-2xl mx-auto"
        >
          All figures are investment objectives only and not guarantees. Actual returns may be materially lower or higher.
        </motion.p>
      </div>
    </section>
  );
};
