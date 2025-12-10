import { motion } from "framer-motion";
import { ArrowRight, Phone, TrendingUp, Key, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";

const FundAnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-navy-deep" />
    
    {/* Ambient glow orbs */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.15, 0.25, 0.15] 
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[180px]"
    />
    <motion.div 
      animate={{ 
        scale: [1.2, 1, 1.2],
        opacity: [0.1, 0.2, 0.1] 
      }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[150px]"
    />
    
    {/* Subtle grid overlay */}
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }}
    />
    
    {/* Pulsing ripple */}
    <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-[500px] h-[500px]">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-primary/10 rounded-full"
          initial={{ scale: 0.5, opacity: 0.4 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 8, repeat: Infinity, delay: i * 2.5, ease: "easeOut" }}
        />
      ))}
    </div>
  </div>
);

const DonutChart = () => (
  <motion.div 
    className="relative w-32 h-32"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
      <motion.circle
        cx="50" cy="50" r="40"
        fill="none"
        stroke="url(#primaryGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="150.8 251.3"
        initial={{ strokeDashoffset: 251.3 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      />
      <motion.circle
        cx="50" cy="50" r="40"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="100.5 251.3"
        strokeDashoffset="-150.8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      />
      <defs>
        <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xs text-muted-foreground font-medium">60/40</span>
    </div>
  </motion.div>
);

export const FundHero = () => {
  const metrics = [
    { value: "8%", label: "p.a.", description: "Minimum distribution objective" },
    { value: "10–12%", label: "p.a.", description: "Target annual distribution range" },
    { value: "12–15%", label: "p.a.", description: "Target net IRR" },
  ];

  const keyPoints = [
    {
      icon: TrendingUp,
      title: "EARN STEADY YIELD",
      description: "From diversified real-world & digital infrastructure assets."
    },
    {
      icon: Key,
      title: "JOIN INVESTOR BOARD",
      description: "Become a Fragma investor board member and get access to exclusive benefits."
    },
    {
      icon: RefreshCw,
      title: "TRADE ANYTIME",
      description: "Secondary liquidity on Fragma Society marketplace."
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <FundAnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge className="mb-6">FRAGMA FUND • LUXEMBOURG STRUCTURE</Badge>
            </motion.div>
            
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Fragma Fund.
              </motion.span>{" "}
              <motion.span 
                className="text-gradient"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Yield & Growth
              </motion.span>{" "}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Engineered.
              </motion.span>
            </h1>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              Fragma Fund is a Luxembourg securitisation-based vehicle targeting stable distributions from SME credit, BTC mining revenues and AI/HPC infrastructure, with upside from Fragma ecosystem equity. Designed for family offices, UHNWIs and institutional / accredited investors.
            </motion.p>
            
            {/* Metrics Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1 + index * 0.15, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="glass px-4 py-2 rounded-full cursor-default shine"
                >
                  <span className="text-primary font-bold">{metric.value}</span>
                  <span className="text-muted-foreground text-sm ml-1">{metric.label}</span>
                  <span className="text-muted-foreground text-xs ml-2 hidden sm:inline">— {metric.description}</span>
                </motion.div>
              ))}
            </div>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-4 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Button size="lg" className="group btn-glow">
                Request full PPM
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 flex items-center">
                  <Phone size={18} className="mr-2 group-hover:rotate-12 transition-transform duration-300" />
                  Book an allocation call
                </span>
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              For professional / qualified investors only. Objectives, not guarantees. Capital at risk.
            </motion.p>
          </motion.div>
          
          {/* Right Column - Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            <motion.div 
              className="glass rounded-2xl p-8 shadow-card shine float"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">Fund Objectives</h3>
              
              <div className="flex items-center gap-8 mb-6">
                <DonutChart />
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <span className="text-sm text-foreground">60% Income Sleeve</span>
                  </motion.div>
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-sm text-foreground">40% Equity Sleeve</span>
                  </motion.div>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-border/50 pt-6">
                {[
                  { label: "Income Sleeve Focus", value: "SME Credit • BTC Mining • AI/HPC Infra" },
                  { label: "Equity Sleeve Focus", value: "Fragma Ecosystem • Digital Infrastructure" },
                  { label: "Vehicle", value: "Luxembourg Securitisation" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground">{item.value}</p>
                  </motion.div>
                ))}
                <motion.div 
                  className="pt-2 border-t border-border/30"
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <p className="text-sm text-muted-foreground">Secondary Market</p>
                  <p className="text-foreground">Order book marketplace for fast & easy exit</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* 3 Key Points Highlights */}
        <div className="grid md:grid-cols-3 gap-5 mt-16">
          {keyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 1.2 + index * 0.15, 
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -4 }}
              className="card-premium p-6 group cursor-default"
            >
              <motion.div 
                className="icon-premium w-12 h-12 mb-5"
                whileHover={{ rotate: 5 }}
              >
                <point.icon className="w-5 h-5 text-primary" />
              </motion.div>
              <h4 className="text-sm font-bold text-foreground tracking-wider mb-2 group-hover:text-primary transition-colors duration-300">
                {point.title}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
