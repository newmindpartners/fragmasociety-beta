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
  Users
} from "lucide-react";

const benefits = [
  { icon: TrendingUp, label: "New revenue stream", number: "01" },
  { icon: Heart, label: "Community loyalty", number: "02" },
  { icon: Award, label: "Institutional credibility", number: "03" },
  { icon: Coins, label: "Tokenized ownership", number: "04" },
  { icon: Globe, label: "Global access", number: "05" },
  { icon: ArrowLeftRight, label: "Built-in liquidity", number: "06" },
  { icon: FileText, label: "Automated payouts", number: "07" },
  { icon: Megaphone, label: "Brand storytelling", number: "08" },
  { icon: Users, label: "Investor ecosystem", number: "09" },
];

export const SignatureDealBenefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" ref={containerRef}>
      {/* Premium Light Background - matching Marketplace */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-slate-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header - Marketplace style */}
        <div className="max-w-4xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              Unlock Your Potential
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1]"
          >
            What you unlock with a
            <br />
            <span className="italic text-slate-500 font-serif">Signature Deal.</span>
          </motion.h2>
        </div>

        {/* Benefits Grid - Compact 3x3 */}
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-4 lg:gap-6 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.04 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-pointer"
              >
                <motion.div
                  className="relative flex flex-col items-center text-center p-4 lg:p-5 rounded-sm overflow-hidden"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(165deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.98) 100%)'
                      : 'rgba(255, 255, 255, 0.7)',
                    border: isHovered 
                      ? '1px solid rgba(139, 92, 246, 0.25)' 
                      : '1px solid rgba(226, 232, 240, 0.6)',
                    boxShadow: isHovered 
                      ? '0 20px 40px -10px rgba(15, 23, 42, 0.4)'
                      : '0 2px 15px -5px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  animate={{ 
                    y: isHovered ? -6 : 0,
                    scale: isHovered ? 1.03 : 1
                  }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                  {/* Icon */}
                  <motion.div
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-sm flex items-center justify-center mb-3 ${
                      isHovered 
                        ? 'bg-slate-800/50 border-slate-600/30' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                    style={{ 
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    animate={{ rotate: isHovered ? 6 : 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon 
                      className={`w-5 h-5 lg:w-6 lg:h-6 ${
                        isHovered ? 'text-violet-300' : 'text-slate-500'
                      }`} 
                      style={{ transition: 'color 0.4s' }}
                      strokeWidth={1.5} 
                    />
                  </motion.div>
                  
                  {/* Label */}
                  <span 
                    className={`text-xs lg:text-sm font-medium leading-tight ${
                      isHovered ? 'text-white/90' : 'text-slate-700'
                    }`}
                    style={{ transition: 'color 0.4s' }}
                  >
                    {benefit.label}
                  </span>

                  {/* Bottom accent line */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500/60 to-slate-600/30"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Statement - Clean, consistent typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-900 leading-relaxed tracking-tight">
            This is not just fundraising. This is{" "}
            <span className="italic text-slate-500 font-serif">brand-owned private markets.</span>
          </p>
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="h-px w-48 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
