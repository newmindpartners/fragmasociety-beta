import { motion } from "framer-motion";
import { Building2, Landmark, Server, Gem, ArrowUpRight } from "lucide-react";

// Import strategy background images
import smeCreditBg from "@/assets/strategy-sme-credit.jpg";
import btcMiningBg from "@/assets/strategy-btc-mining.jpg";
import aiInfraBg from "@/assets/strategy-ai-infrastructure.jpg";
import ecosystemBg from "@/assets/strategy-ecosystem.jpg";

export const StrategyPillars = () => {
  const pillars = [
    {
      icon: Building2,
      title: "Prime Real Estate",
      description: "Curated residential and commercial opportunities in high-demand markets.",
      bgImage: smeCreditBg,
      allocation: "30-40%",
      highlights: ["Development", "Repositioning", "Income Assets"]
    },
    {
      icon: Landmark,
      title: "Private Credit",
      description: "Senior-secured lending to established businesses with stable cash flows.",
      bgImage: btcMiningBg,
      allocation: "25-35%",
      highlights: ["Senior Secured", "Stable Income", "Downside Protection"]
    },
    {
      icon: Server,
      title: "Digital Infrastructure",
      description: "GPU clusters and data centers powering AI and enterprise workloads.",
      bgImage: aiInfraBg,
      allocation: "15-25%",
      highlights: ["GPU Clusters", "Long-term Contracts", "AI/ML Demand"]
    },
    {
      icon: Gem,
      title: "Signature Deals",
      description: "Exclusive co-investment opportunities in exceptional alternative assets.",
      bgImage: ecosystemBg,
      allocation: "10-20%",
      highlights: ["Film Finance", "Luxury Assets", "Exclusive Access"]
    }
  ];

  return (
    <section className="py-28 bg-slate-950 relative overflow-hidden">
      {/* Dramatic background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-violet-900/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-slate-800/30 rounded-full blur-[120px]" />
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
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
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/30" />
            <span className="text-[11px] tracking-[0.3em] uppercase text-white/50 font-light">
              Portfolio Allocation
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/30" />
          </motion.div>
          
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-[1.1]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What You Get
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
            Four pillars of diversified exposure, carefully weighted for risk-adjusted returns.
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Main large card - Real Estate */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 lg:row-span-2 group relative overflow-hidden rounded-3xl min-h-[400px] lg:min-h-[500px]"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img 
                src={pillars[0].bgImage} 
                alt="" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8 lg:p-10">
              <div className="flex items-start justify-between">
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <span className="text-4xl lg:text-5xl font-light text-white/90" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {pillars[0].allocation}
                  </span>
                  <p className="text-white/40 text-xs mt-1">allocation</p>
                </div>
              </div>
              
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {pillars[0].highlights.map((tag, i) => (
                    <span key={i} className="text-[10px] tracking-wider uppercase px-3 py-1 rounded-full bg-white/10 text-white/60 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 
                  className="text-3xl lg:text-4xl font-light text-white mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {pillars[0].title}
                </h3>
                <p className="text-white/50 text-base lg:text-lg leading-relaxed max-w-md">
                  {pillars[0].description}
                </p>
              </div>
            </div>
            
            {/* Hover arrow */}
            <motion.div 
              className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/0 border border-white/0 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20"
              whileHover={{ scale: 1.1 }}
            >
              <ArrowUpRight className="w-5 h-5 text-white/0 group-hover:text-white/80 transition-colors" />
            </motion.div>
          </motion.div>
          
          {/* Right column - 3 smaller cards */}
          {pillars.slice(1).map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * (index + 1) }}
              className="lg:col-span-5 group relative overflow-hidden rounded-3xl min-h-[200px] lg:min-h-0"
            >
              {/* Background */}
              <div className="absolute inset-0">
                <img 
                  src={pillar.bgImage} 
                  alt="" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex items-center p-6 lg:p-8">
                <div className="flex items-center gap-5 w-full">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <pillar.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 
                        className="text-xl font-light text-white truncate"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {pillar.title}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/10 shrink-0">
                        {pillar.allocation}
                      </span>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                      {pillar.description}
                    </p>
                  </div>
                  
                  <motion.div 
                    className="w-10 h-10 shrink-0 rounded-full bg-white/0 border border-white/0 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ArrowUpRight className="w-5 h-5 text-white/0 group-hover:text-white/80 transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-12 border-t border-white/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "4", label: "Asset Classes" },
              { value: "€50", label: "Min Investment" },
              { value: "Quarterly", label: "Distributions" },
              { value: "Luxembourg", label: "Jurisdiction" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <p className="text-2xl md:text-3xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-white/40 tracking-wider uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
