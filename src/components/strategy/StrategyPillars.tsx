import { motion } from "framer-motion";
import { Bitcoin, Building2, Film, ArrowUpRight, Quote } from "lucide-react";

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
      highlights: ["Hashrate Contracts", "Revenue Share", "Professional Operators"],
      accent: "from-amber-500/20 to-orange-600/20"
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
      accent: "from-violet-500/20 to-purple-600/20"
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
      accent: "from-cyan-500/20 to-blue-600/20"
    }
  ];

  return (
    <section className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Dramatic background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,100,180,0.15),transparent)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(80,70,120,0.1),transparent)]" />
      </div>
      
      {/* Animated grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div 
            className="inline-flex items-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/40 to-white/20" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/40 font-light">
              Portfolio Composition
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-white/40 to-white/20" />
          </motion.div>
          
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-[0.95]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What You Get
          </h2>
          <p className="text-white/35 max-w-lg mx-auto text-lg leading-relaxed">
            Three carefully selected strategies. One unified allocation.
          </p>
        </motion.div>

        {/* Strategy Cards - Horizontal Layout */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-[2rem] bg-slate-900/50 border border-white/[0.08] backdrop-blur-sm h-full">
                {/* Top Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={strategy.bgImage} 
                    alt="" 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${strategy.accent} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                  
                  {/* Allocation Badge */}
                  <div className="absolute top-6 left-6">
                    <motion.div 
                      className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-2xl font-light text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {strategy.allocation}
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Icon */}
                  <div className="absolute top-6 right-6">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <strategy.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Leader Image (if exists) */}
                  {strategy.leaderImage && (
                    <div className="absolute -bottom-12 right-6">
                      <motion.div 
                        className="relative"
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.15 }}
                      >
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-slate-900 shadow-2xl">
                          <img 
                            src={strategy.leaderImage} 
                            alt={strategy.leader}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 rounded-2xl bg-white/20 blur-xl -z-10 scale-75" />
                      </motion.div>
                    </div>
                  )}
                </div>
                
                {/* Content Section */}
                <div className="p-8 pt-6">
                  {/* Subtitle */}
                  <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-medium">
                    {strategy.subtitle}
                  </span>
                  
                  {/* Title */}
                  <h3 
                    className="text-2xl font-light text-white mt-2 mb-2 group-hover:text-white/90 transition-colors"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {strategy.title}
                  </h3>
                  
                  {/* Leader name */}
                  {strategy.leader && (
                    <p className="text-sm text-violet-400/80 mb-4">
                      Led by {strategy.leader}
                    </p>
                  )}
                  
                  {/* Description */}
                  <p className="text-white/40 text-sm leading-relaxed mb-6">
                    {strategy.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {strategy.highlights.map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-[9px] tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/[0.05] text-white/50 border border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Hover CTA */}
                  <motion.div 
                    className="flex items-center gap-2 text-white/30 group-hover:text-white/60 transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-xs tracking-wider uppercase">Learn more</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>
                
                {/* Border glow on hover */}
                <div className="absolute inset-0 rounded-[2rem] border border-white/0 group-hover:border-white/10 transition-colors duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Quote/Statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 max-w-3xl mx-auto text-center"
        >
          <Quote className="w-8 h-8 text-white/10 mx-auto mb-6 rotate-180" />
          <p 
            className="text-xl md:text-2xl text-white/50 font-light leading-relaxed italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Three distinct opportunities. One allocation. 
            Complete exposure to Fragma's signature deals.
          </p>
        </motion.div>
        
        {/* Allocation visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 max-w-2xl mx-auto"
        >
          <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
              initial={{ width: 0 }}
              whileInView={{ width: "30%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            <motion.div 
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
              initial={{ width: 0 }}
              whileInView={{ width: "35%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
            />
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={{ width: 0 }}
              whileInView={{ width: "35%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
            />
          </div>
          <div className="flex justify-between mt-4 text-xs text-white/30">
            <span>BTC Mining</span>
            <span>Real Estate</span>
            <span>Film & Loans</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
