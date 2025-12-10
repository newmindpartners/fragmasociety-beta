import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/Badge";

const FundAnimatedBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-navy-deep" />
    
    {/* Pulsing ripple around the card area */}
    <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px]">
      {[1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border border-primary/20 rounded-full"
          initial={{ scale: 0.3, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 6, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
        />
      ))}
    </div>
    
    <motion.div 
      animate={{ opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"
    />
  </div>
);

const DonutChart = () => (
  <div className="relative w-32 h-32">
    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
      {/* Background circle */}
      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
      {/* Income Sleeve - 60% */}
      <motion.circle
        cx="50" cy="50" r="40"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="12"
        strokeDasharray="150.8 251.3"
        initial={{ strokeDashoffset: 251.3 }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
      {/* Equity Sleeve - 40% */}
      <motion.circle
        cx="50" cy="50" r="40"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="12"
        strokeDasharray="100.5 251.3"
        strokeDashoffset="-150.8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-xs text-muted-foreground font-medium">60/40</span>
    </div>
  </div>
);

export const FundHero = () => {
  const metrics = [
    { value: "8%", label: "p.a.", description: "Minimum distribution objective" },
    { value: "10–12%", label: "p.a.", description: "Target annual distribution range" },
    { value: "12–15%", label: "p.a.", description: "Target net IRR" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <FundAnimatedBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6">FRAGMA FUND • LUXEMBOURG STRUCTURE</Badge>
            
            <h1 className="text-4xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6">
              Invest with Fragma Fund.{" "}
              <span className="text-gradient">
                Secured yield & growth
              </span>{" "}
              from real-world and digital infrastructure.
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fragma Fund is a Luxembourg securitisation-based vehicle targeting stable distributions from SME credit, BTC mining revenues and AI/HPC infrastructure, with upside from Fragma ecosystem equity. Designed for family offices, UHNWIs and institutional / accredited investors.
            </p>
            
            {/* Metrics Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass px-4 py-2 rounded-full"
                >
                  <span className="text-primary font-bold">{metric.value}</span>
                  <span className="text-muted-foreground text-sm ml-1">{metric.label}</span>
                  <span className="text-muted-foreground text-xs ml-2 hidden sm:inline">— {metric.description}</span>
                </motion.div>
              ))}
            </div>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-4">
              <Button size="lg" className="group">
                Request full PPM
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="group">
                <Phone size={18} className="mr-2" />
                Book an allocation call
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground">
              For professional / qualified investors only. Objectives, not guarantees. Capital at risk.
            </p>
          </motion.div>
          
          {/* Right Column - Glassmorphism Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="glass rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">Fund Objectives</h3>
              
              <div className="flex items-center gap-8 mb-6">
                <DonutChart />
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="text-sm text-foreground">60% Income Sleeve</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent" />
                    <span className="text-sm text-foreground">40% Equity Sleeve</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-border pt-6">
                <div>
                  <p className="text-sm text-muted-foreground">Income Sleeve Focus</p>
                  <p className="text-foreground">SME Credit • BTC Mining • AI/HPC Infra</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Equity Sleeve Focus</p>
                  <p className="text-foreground">Fragma Ecosystem • Digital Infrastructure</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle</p>
                  <p className="text-foreground">Luxembourg Securitisation</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
