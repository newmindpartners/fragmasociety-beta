import { motion } from "framer-motion";
import { BookOpen, Shield, TrendingUp, ArrowLeftRight } from "lucide-react";
import { useState } from "react";

export const MarketplaceDifference = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    { 
      icon: BookOpen, 
      number: "01",
      title: "A Strong Order Book", 
      description: "Every deal is built around a real, transparent order book with full market depth visibility." 
    },
    { 
      icon: Shield, 
      number: "02",
      title: "Clear Legal Structure", 
      description: "Compliant asset structuring with professional governance and regulatory frameworks." 
    },
    { 
      icon: TrendingUp, 
      number: "03",
      title: "Transparent Yield", 
      description: "Clear return objectives with measurable performance and regular distributions." 
    },
    { 
      icon: ArrowLeftRight, 
      number: "04",
      title: "Secondary Liquidity", 
      description: "Optional marketplace listing for flexible exit strategies and portfolio rebalancing." 
    },
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-slate-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
              For Traders & Investors
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#1e293b] leading-[1.05] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Designed with leaders,
            <br />
            <span className="italic text-slate-400">built for investors.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mt-8 leading-relaxed"
          >
            We work hand-in-hand with each industry leader to structure a compliant, 
            attractive, and long-term aligned investment product. Every marketplace feature combines:
          </motion.p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative p-8 transition-all duration-500 cursor-pointer ${
                hoveredIndex === i 
                  ? 'bg-[#1e293b]' 
                  : 'bg-white border border-slate-200'
              }`}
              style={{
                boxShadow: hoveredIndex === i 
                  ? '0 25px 50px -12px rgba(15, 23, 42, 0.25)'
                  : '0 1px 3px rgba(0, 0, 0, 0.02)',
              }}
            >
              {/* Large watermark number */}
              <span 
                className={`absolute top-4 right-4 text-8xl font-extralight transition-colors duration-500 ${
                  hoveredIndex === i ? 'text-slate-700' : 'text-slate-100'
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {feature.number}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 border flex items-center justify-center mb-8 relative z-10 transition-all duration-500 ${
                hoveredIndex === i 
                  ? 'border-slate-600 bg-slate-800' 
                  : 'border-slate-200 bg-slate-50'
              }`}>
                <feature.icon className={`w-6 h-6 transition-colors duration-500 ${
                  hoveredIndex === i ? 'text-violet-400' : 'text-slate-400'
                }`} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className={`text-xl font-medium mb-3 transition-colors duration-500 relative z-10 ${
                hoveredIndex === i ? 'text-white' : 'text-[#1e293b]'
              }`} style={{ fontFamily: "'Playfair Display', serif" }}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-relaxed transition-colors duration-500 relative z-10 ${
                hoveredIndex === i ? 'text-slate-300' : 'text-slate-500'
              }`}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
