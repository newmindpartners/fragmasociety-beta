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
  { icon: TrendingUp, label: "A new revenue stream", number: "01" },
  { icon: Heart, label: "Community equity & loyalty", number: "02" },
  { icon: Award, label: "Institutional credibility", number: "03" },
  { icon: Coins, label: "Tokenized ownership", number: "04" },
  { icon: Globe, label: "Global investment access", number: "05" },
  { icon: ArrowLeftRight, label: "Built-in liquidity", number: "06" },
  { icon: FileText, label: "Automated reporting & payouts", number: "07" },
  { icon: Megaphone, label: "Premium brand storytelling", number: "08" },
  { icon: Users, label: "A long-term investor ecosystem", number: "09" },
];

export const SignatureDealBenefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 lg:py-40 relative overflow-hidden" ref={containerRef}>
      {/* Premium Light Background */}
      <div className="absolute inset-0 bg-[#fafafa]" />
      
      {/* Elegant diagonal gradient accent */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[120%] h-[200%] bg-gradient-to-bl from-slate-100/90 via-white/60 to-transparent rotate-12 origin-center" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[80%] h-[150%] bg-gradient-to-tr from-violet-50/30 via-transparent to-transparent -rotate-12" />
      </div>
      
      {/* Subtle dot pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #0f172a 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Editorial Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 mb-8"
          >
            <motion.div 
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white border border-slate-200 shadow-sm"
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles className="w-4 h-4 text-violet-500" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-slate-500 font-medium">
                Unlock Your Potential
              </span>
            </motion.div>
            <div className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extralight text-slate-900 leading-[1] tracking-tight mb-4">
                What you unlock with a
              </h2>
              <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2] tracking-tight">
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
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-slate-500 text-lg lg:text-xl leading-relaxed max-w-md lg:ml-auto font-light"
            >
              Transform your vision into a world-class investment opportunity with these exclusive benefits.
            </motion.p>
          </div>
        </div>

        {/* Premium Benefits Grid - Masonry Style */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const isHovered = hoveredIndex === index;
              const isLarge = index === 0 || index === 4 || index === 8;
              
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + index * 0.06 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative ${isLarge ? 'md:col-span-1' : ''}`}
                >
                  {/* Card */}
                  <motion.div
                    className="relative h-full p-6 lg:p-8 overflow-hidden cursor-pointer"
                    style={{
                      background: isHovered 
                        ? 'linear-gradient(165deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.98) 50%, rgba(51,65,85,0.96) 100%)'
                        : 'rgba(255, 255, 255, 0.95)',
                      border: isHovered 
                        ? '1px solid rgba(139, 92, 246, 0.3)' 
                        : '1px solid rgba(226, 232, 240, 0.8)',
                      boxShadow: isHovered 
                        ? '0 25px 50px -12px rgba(15, 23, 42, 0.4), 0 0 40px -10px rgba(139, 92, 246, 0.15)'
                        : '0 4px 20px -8px rgba(0, 0, 0, 0.08)',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    animate={{ 
                      y: isHovered ? -8 : 0,
                      scale: isHovered ? 1.02 : 1
                    }}
                    transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {/* Large decorative number */}
                    <motion.span 
                      className={`absolute top-4 right-4 text-6xl lg:text-7xl font-extralight leading-none transition-colors duration-500 ${
                        isHovered ? 'text-white/[0.06]' : 'text-slate-900/[0.04]'
                      }`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {benefit.number}
                    </motion.span>
                    
                    {/* Top corner accent */}
                    <motion.div 
                      className="absolute top-0 left-0 w-16 h-16"
                      style={{
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 50%)'
                      }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0.3,
                        scale: isHovered ? 1.5 : 1
                      }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full min-h-[140px]">
                      {/* Icon */}
                      <motion.div 
                        className={`w-14 h-14 flex items-center justify-center mb-6 transition-all duration-500 ${
                          isHovered 
                            ? 'bg-violet-500/20 border-violet-400/30' 
                            : 'bg-slate-50 border-slate-200'
                        }`}
                        style={{ borderWidth: '1px', borderStyle: 'solid' }}
                        animate={{ 
                          rotate: isHovered ? 6 : 0,
                          scale: isHovered ? 1.05 : 1
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <Icon 
                          className={`w-6 h-6 transition-colors duration-500 ${
                            isHovered ? 'text-violet-300' : 'text-slate-500'
                          }`} 
                          strokeWidth={1.5} 
                        />
                      </motion.div>
                      
                      {/* Label */}
                      <h3 className={`text-lg lg:text-xl font-medium transition-colors duration-500 leading-snug ${
                        isHovered ? 'text-white' : 'text-slate-800'
                      }`}>
                        {benefit.label}
                      </h3>
                    </div>
                    
                    {/* Bottom accent line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500/60 via-violet-400/40 to-slate-600/30"
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

        {/* Bottom Statement - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Decorative line */}
            <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            
            {/* Content card */}
            <div className="relative bg-white border border-slate-200 px-10 py-10 lg:px-16 lg:py-12 mx-auto max-w-2xl"
              style={{ boxShadow: '0 8px 40px -12px rgba(0, 0, 0, 0.08)' }}
            >
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-violet-400" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-violet-400" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-violet-400" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-violet-400" />
              
              <div className="text-center">
                <p className="text-slate-400 text-lg mb-3 font-light">This is not just fundraising.</p>
                <p className="text-2xl md:text-3xl font-light text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  This is{" "}
                  <span 
                    className="font-signature italic"
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 50%, #c4b5fd 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    brand-owned private markets
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
    </section>
  );
};
