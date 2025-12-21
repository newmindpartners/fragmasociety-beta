import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Zap, Globe, Lock, Users, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Institutional-Grade Security",
    description: "Bank-level custody with multi-signature wallets and audited smart contracts protect your investments.",
    number: "01"
  },
  {
    icon: Zap,
    title: "Instant Settlement",
    description: "On-chain transactions mean no waiting. Your purchases, trades, and payouts settle in real-time.",
    number: "02"
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Invest in premium assets worldwide from anywhere. No borders, no barriers, no minimums of millions.",
    number: "03"
  },
  {
    icon: Lock,
    title: "Non-Custodial Design",
    description: "You hold your tokens. We never take custody of your assets—true ownership, always.",
    number: "04"
  },
  {
    icon: Users,
    title: "Curated Opportunities",
    description: "Every deal undergoes rigorous due diligence by industry experts before reaching you.",
    number: "05"
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    description: "Real-time dashboards, on-chain proof of reserves, and detailed performance analytics.",
    number: "06"
  }
];

export const WhyFragma = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Premium Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      
      {/* Subtle accent gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-violet-100/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-slate-100/50 via-transparent to-transparent" />
      </div>
      
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-gradient-to-r from-violet-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              The Fragma Advantage
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight text-slate-900 leading-[1.05] mb-6"
          >
            Why Choose
            <span className="block font-serif italic text-slate-500 mt-2">Fragma Society</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            Built on transparency, security, and accessibility—we're redefining 
            what it means to invest in premium assets.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const isHovered = hoveredIndex === index;
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative p-8 lg:p-10 h-full rounded-xl overflow-hidden"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(165deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.98) 100%)'
                      : 'rgba(255, 255, 255, 0.9)',
                    border: isHovered 
                      ? '1px solid rgba(139, 92, 246, 0.3)' 
                      : '1px solid rgba(226, 232, 240, 0.8)',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(15, 23, 42, 0.4), 0 0 40px -10px rgba(139, 92, 246, 0.15)'
                      : '0 4px 20px -8px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  animate={{ 
                    y: isHovered ? -6 : 0,
                    scale: isHovered ? 1.02 : 1
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Large decorative number */}
                  <span 
                    className={`absolute top-4 right-4 text-[80px] font-extralight leading-none transition-colors duration-500 ${
                      isHovered ? 'text-white/[0.03]' : 'text-slate-900/[0.03]'
                    }`}
                    style={{ fontFamily: 'serif' }}
                  >
                    {feature.number}
                  </span>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 ${
                    isHovered 
                      ? 'bg-violet-500/20' 
                      : 'bg-slate-100'
                  }`}>
                    <Icon 
                      className={`w-7 h-7 transition-colors duration-500 ${
                        isHovered ? 'text-violet-400' : 'text-slate-600'
                      }`} 
                      strokeWidth={1.5} 
                    />
                  </div>
                  
                  {/* Title */}
                  <h3 className={`text-xl lg:text-2xl font-medium mb-3 transition-colors duration-500 ${
                    isHovered ? 'text-white' : 'text-slate-900'
                  }`}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-base leading-relaxed transition-colors duration-500 ${
                    isHovered ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {feature.description}
                  </p>
                  
                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500 to-violet-400"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};