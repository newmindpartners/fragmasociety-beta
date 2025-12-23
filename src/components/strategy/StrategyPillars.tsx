import { motion } from "framer-motion";
import { Bitcoin, Building2, Film, ArrowRight, TrendingUp, Shield, Clock, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Import images
import btcMiningBg from "@/assets/strategy-btc-mining.jpg";
import philippeNaouri from "@/assets/philippe-naouri.png";
import philippeBanner from "@/assets/philippe-banner.png";
import timLevy from "@/assets/tim-levy.png";
import timBanner from "@/assets/tim-banner.png";

export const StrategyPillars = () => {
  const strategies = [
    {
      id: 1,
      icon: Bitcoin,
      title: "BTC Mining",
      subtitle: "Digital Infrastructure",
      allocation: "30%",
      description: "Institutional-grade Bitcoin mining operations with emphasis on low-cost power and modern fleets.",
      bgImage: btcMiningBg,
      leaderImage: null,
      leader: null,
      highlights: ["Hashrate Contracts", "Revenue Share", "Professional Operators"],
      gradientFrom: "from-amber-500",
      gradientTo: "to-orange-600",
      glowColor: "rgba(245, 158, 11, 0.15)",
      hoverDetails: {
        targetReturn: "18-25% APY",
        riskLevel: "Medium-High",
        liquidity: "Quarterly",
        keyMetric: "50+ MW capacity"
      }
    },
    {
      id: 2,
      icon: Building2,
      title: "Prime Real Estate",
      subtitle: "Signature Deal",
      leader: "Philippe Naouri",
      leaderRole: "Deal Lead",
      allocation: "35%",
      description: "Curated residential and commercial opportunities in high-demand markets across Europe and the US.",
      bgImage: philippeBanner,
      leaderImage: philippeNaouri,
      highlights: ["Malibu Development", "European Assets", "Income Generation"],
      gradientFrom: "from-violet-500",
      gradientTo: "to-purple-600",
      glowColor: "rgba(139, 92, 246, 0.15)",
      hoverDetails: {
        targetReturn: "15-22% IRR",
        riskLevel: "Medium",
        liquidity: "24-36 months",
        keyMetric: "$50M+ portfolio"
      }
    },
    {
      id: 3,
      icon: Film,
      title: "Film & Corporate Loans",
      subtitle: "Signature Deal",
      leader: "Tim Levy",
      leaderRole: "Deal Lead",
      allocation: "35%",
      description: "Film financing and corporate lending with established entertainment industry relationships.",
      bgImage: timBanner,
      leaderImage: timLevy,
      highlights: ["Film Finance", "Corporate Loans", "Entertainment Industry"],
      gradientFrom: "from-cyan-500",
      gradientTo: "to-blue-600",
      glowColor: "rgba(6, 182, 212, 0.15)",
      hoverDetails: {
        targetReturn: "12-18% APY",
        riskLevel: "Medium",
        liquidity: "12-24 months",
        keyMetric: "20+ productions"
      }
    }
  ];

  return (
    <section className="py-32 lg:py-40 bg-slate-950 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(100,80,150,0.08),transparent_70%)]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Refined Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 lg:mb-24"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-light mb-6 block">
            Portfolio Composition
          </span>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What You Get
          </h2>
          <p className="text-white/30 max-w-md mx-auto text-base leading-relaxed">
            Three carefully selected strategies. One unified allocation.
          </p>
        </motion.div>

        {/* Strategy Cards - Clean Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12 }}
              className="group"
            >
              <div className="relative h-full">
                {/* Card Container */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-900/40 border border-white/[0.06] h-full flex flex-col transition-all duration-500 group-hover:border-white/[0.12] group-hover:bg-slate-900/60">
                  
                  {/* Image Section */}
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={strategy.bgImage} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `linear-gradient(to top, ${strategy.glowColor}, transparent)` }}
                    />
                    
                    {/* Hover Details Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-slate-950/80 backdrop-blur-sm">
                      <div className="grid grid-cols-2 gap-4 p-6 w-full">
                        <div className="flex items-center gap-3 bg-white/[0.05] rounded-xl p-3 border border-white/[0.08]">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${strategy.gradientFrom} ${strategy.gradientTo} flex items-center justify-center`}>
                            <TrendingUp className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-white/40">Target Return</p>
                            <p className="text-sm font-medium text-white">{strategy.hoverDetails.targetReturn}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/[0.05] rounded-xl p-3 border border-white/[0.08]">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${strategy.gradientFrom} ${strategy.gradientTo} flex items-center justify-center`}>
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-white/40">Risk Level</p>
                            <p className="text-sm font-medium text-white">{strategy.hoverDetails.riskLevel}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/[0.05] rounded-xl p-3 border border-white/[0.08]">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${strategy.gradientFrom} ${strategy.gradientTo} flex items-center justify-center`}>
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-white/40">Liquidity</p>
                            <p className="text-sm font-medium text-white">{strategy.hoverDetails.liquidity}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 bg-white/[0.05] rounded-xl p-3 border border-white/[0.08]">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${strategy.gradientFrom} ${strategy.gradientTo} flex items-center justify-center`}>
                            <Target className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-[9px] uppercase tracking-wider text-white/40">Key Metric</p>
                            <p className="text-sm font-medium text-white">{strategy.hoverDetails.keyMetric}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Allocation Badge - Top Left */}
                    <motion.div 
                      className="absolute top-5 left-5 z-10"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${strategy.gradientFrom} ${strategy.gradientTo} flex items-center justify-center shadow-xl`}>
                        <span 
                          className="text-xl font-semibold text-white"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {strategy.allocation}
                        </span>
                      </div>
                    </motion.div>
                    
                    {/* Icon - Top Right */}
                    <div className="absolute top-5 right-5 z-10">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.1] flex items-center justify-center">
                        <strategy.icon className="w-5 h-5 text-white/70" />
                      </div>
                    </div>
                    
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-7 flex-1 flex flex-col">
                    {/* Subtitle */}
                    <span className="text-[9px] tracking-[0.25em] uppercase text-white/35 font-medium">
                      {strategy.subtitle}
                    </span>
                    
                    {/* Title */}
                    <h3 
                      className="text-2xl font-light text-white mt-2 mb-1"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {strategy.title}
                    </h3>
                    
                    {/* Leader name */}
                    {strategy.leader && (
                      <p className={`text-sm bg-gradient-to-r ${strategy.gradientFrom} ${strategy.gradientTo} bg-clip-text text-transparent mb-4`}>
                        Led by {strategy.leader}
                      </p>
                    )}
                    
                    {/* Description */}
                    <p className="text-white/35 text-sm leading-relaxed mb-6 flex-1">
                      {strategy.description}
                    </p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {strategy.highlights.map((tag, i) => (
                        <span 
                          key={i} 
                          className="text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-lg bg-white/[0.04] text-white/40 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Allocation Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 max-w-xl mx-auto"
        >
          <div className="h-1.5 rounded-full bg-white/[0.04] overflow-hidden flex">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              whileInView={{ width: "30%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <motion.div 
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: "35%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              whileInView={{ width: "35%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            />
          </div>
          <div className="flex justify-between mt-3 text-[10px] text-white/25 tracking-wide">
            <span>BTC Mining</span>
            <span>Real Estate</span>
            <span>Film & Loans</span>
          </div>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-slate-900 hover:bg-white/90 rounded-full px-10 h-14 text-sm font-medium shadow-xl shadow-white/5"
          >
            <Link to="/auth">
              Register Your Interest
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
          
          <p className="mt-6 text-[10px] text-white/20 max-w-xs mx-auto">
            For qualified investors only. Capital at risk.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
