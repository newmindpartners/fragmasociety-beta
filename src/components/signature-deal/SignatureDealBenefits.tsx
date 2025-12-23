import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  TrendingUp, 
  Heart, 
  Award, 
  Coins, 
  Globe, 
  ArrowLeftRight, 
  FileText, 
  Megaphone,
  Users,
  Sparkles
} from "lucide-react";

const benefits = [
  { icon: TrendingUp, label: "New revenue stream" },
  { icon: Heart, label: "Community loyalty" },
  { icon: Award, label: "Institutional credibility" },
  { icon: Coins, label: "Tokenized ownership" },
  { icon: Globe, label: "Global access" },
  { icon: ArrowLeftRight, label: "Built-in liquidity" },
  { icon: FileText, label: "Automated payouts" },
  { icon: Megaphone, label: "Brand storytelling" },
  { icon: Users, label: "Investor ecosystem" },
];

export const SignatureDealBenefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden" ref={containerRef}>
      {/* Premium Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(90deg, #0f172a 1px, transparent 1px), linear-gradient(180deg, #0f172a 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Compact Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-medium">
              Unlock Your Potential
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-slate-900 leading-tight tracking-tight">
            What you unlock with a{" "}
            <span 
              className="font-signature italic"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Signature Deal
            </span>
          </h2>
        </motion.div>

        {/* Visual Benefits Grid - Compact Icon Cards */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.04 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group"
                >
                  <motion.div
                    className="relative flex flex-col items-center text-center cursor-pointer"
                    animate={{ y: isHovered ? -4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Icon Circle */}
                    <motion.div
                      className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-3 transition-all duration-400 ${
                        isHovered 
                          ? 'bg-slate-900 shadow-xl' 
                          : 'bg-white border border-slate-200 shadow-sm'
                      }`}
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        rotate: isHovered ? 6 : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon 
                        className={`w-7 h-7 lg:w-8 lg:h-8 transition-colors duration-300 ${
                          isHovered ? 'text-white' : 'text-slate-400'
                        }`} 
                        strokeWidth={1.5} 
                      />
                    </motion.div>
                    
                    {/* Label */}
                    <span className={`text-[11px] lg:text-xs font-medium leading-tight transition-colors duration-300 max-w-[80px] ${
                      isHovered ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {benefit.label}
                    </span>
                    
                    {/* Hover indicator dot */}
                    <motion.div
                      className="w-1 h-1 rounded-full bg-violet-500 mt-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Compact Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-slate-200 shadow-sm">
            <span className="text-slate-400 text-sm">This is not just fundraising.</span>
            <span className="w-px h-4 bg-slate-200" />
            <span className="text-sm font-medium text-slate-700">
              This is{" "}
              <span 
                className="font-signature italic"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                brand-owned private markets
              </span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </section>
  );
};
