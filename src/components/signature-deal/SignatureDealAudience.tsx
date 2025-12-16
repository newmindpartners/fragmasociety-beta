import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Palette, 
  Trophy, 
  Gem, 
  Film, 
  Music, 
  Building2, 
  Briefcase, 
  Users, 
  Crown,
  Sparkles
} from "lucide-react";

const audiences = [
  { icon: Palette, label: "Designers & Architects", delay: 0 },
  { icon: Trophy, label: "Athletes & Champions", delay: 0.05 },
  { icon: Gem, label: "Luxury Brands", delay: 0.1 },
  { icon: Film, label: "Film Studios & Producers", delay: 0.15 },
  { icon: Music, label: "Musicians & Entertainment IP Owners", delay: 0.2 },
  { icon: Building2, label: "Real Estate Developers", delay: 0.25 },
  { icon: Briefcase, label: "High-Value Asset Owners", delay: 0.3 },
  { icon: Users, label: "Entrepreneurs with a Loyal Audience", delay: 0.35 },
  { icon: Crown, label: "Cultural Icons & Lifestyle Brands", delay: 0.4 },
];

// Floating particle component
const FloatingParticle = ({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-cyan-400/30"
    style={{ left: x, top: y, width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      scale: [0.5, 1, 0.5],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Orbiting ring component
const OrbitRing = ({ size, duration, opacity }: { size: number; duration: number; opacity: number }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10"
    style={{ width: size, height: size }}
    animate={{ rotate: 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear" }}
  >
    <motion.div 
      className="absolute w-2 h-2 rounded-full bg-cyan-400"
      style={{ 
        top: -4, 
        left: '50%', 
        transform: 'translateX(-50%)',
        opacity 
      }}
    />
  </motion.div>
);

export const SignatureDealAudience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-40 relative overflow-hidden" ref={containerRef}>
      {/* Deep dark navy background with gradient */}
      <div className="absolute inset-0 bg-[hsl(220,45%,3%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,40%,5%)] via-[hsl(220,45%,4%)] to-[hsl(220,40%,6%)]" />
      
      {/* Large turquoise ambient glows */}
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-gradient-to-br from-cyan-500/[0.04] via-teal-500/[0.02] to-transparent rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-tl from-cyan-500/[0.03] via-transparent to-transparent rounded-full blur-[180px] pointer-events-none" />
      
      {/* Floating particles */}
      <FloatingParticle delay={0} x="10%" y="20%" size={6} />
      <FloatingParticle delay={1} x="85%" y="15%" size={4} />
      <FloatingParticle delay={2} x="15%" y="70%" size={5} />
      <FloatingParticle delay={1.5} x="90%" y="60%" size={6} />
      <FloatingParticle delay={0.5} x="50%" y="10%" size={4} />
      <FloatingParticle delay={2.5} x="70%" y="80%" size={5} />
      <FloatingParticle delay={3} x="25%" y="85%" size={4} />
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6,182,212,0.3) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with animated badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Animated badge */}
          <motion.div 
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[hsl(220,30%,10%)] border border-white/[0.08] mb-8 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </motion.div>
            <span className="text-sm text-white/70 font-medium relative z-10">Perfect For</span>
          </motion.div>
          
          {/* Main headline with staggered reveal */}
          <div className="overflow-hidden mb-4">
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight"
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Who Should Launch a
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight"
              initial={{ y: 100, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Signature Deal?
              </span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Audience Grid - Centered floating cards */}
        <div className="max-w-5xl mx-auto mb-20">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {audiences.map((audience, index) => {
              const Icon = audience.icon;
              const isHovered = hoveredIndex === index;
              
              return (
                <motion.div
                  key={audience.label}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + audience.delay,
                    type: "spring",
                    stiffness: 100
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative group"
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-cyan-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Card */}
                  <motion.div
                    className={`relative flex items-center gap-3 px-6 py-4 rounded-full cursor-pointer transition-all duration-500
                      ${isHovered 
                        ? 'bg-[hsl(220,30%,12%)] border-cyan-500/40 shadow-[0_0_40px_-10px_rgba(6,182,212,0.4),inset_0_1px_0_rgba(255,255,255,0.1)]' 
                        : 'bg-[hsl(220,35%,8%)]/80 border-white/[0.06]'
                      } border backdrop-blur-xl`}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -5,
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Inner top highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />
                    
                    {/* Icon with animated background */}
                    <motion.div 
                      className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500
                        ${isHovered 
                          ? 'bg-gradient-to-br from-cyan-500/30 to-teal-500/20 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                          : 'bg-white/[0.04]'
                        }`}
                    >
                      {/* Icon glow ring on hover */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-xl border border-cyan-400/50"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-cyan-400' : 'text-white/50'}`} />
                    </motion.div>
                    
                    {/* Label */}
                    <span className={`text-sm font-medium whitespace-nowrap transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/70'}`}>
                      {audience.label}
                    </span>
                    
                    {/* Trailing glow particles on hover */}
                    {isHovered && (
                      <>
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 rounded-full bg-cyan-400"
                            initial={{ opacity: 0, x: 0, y: 0 }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              x: [0, 20 + i * 10],
                              y: [0, -10 - i * 5],
                            }}
                            transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                            style={{ right: 10, top: '50%' }}
                          />
                        ))}
                      </>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom statement - Premium glass card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center"
        >
          <div className="relative">
            {/* Outer glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-teal-500/5 to-cyan-500/10 rounded-[2rem] blur-2xl" />
            
            {/* Orbiting rings around the card */}
            <div className="absolute inset-0 pointer-events-none">
              <OrbitRing size={400} duration={30} opacity={0.3} />
              <OrbitRing size={500} duration={40} opacity={0.2} />
            </div>
            
            {/* Glass card */}
            <div className="relative px-12 py-10 rounded-3xl 
              bg-[hsl(220,35%,8%)]/70 backdrop-blur-3xl 
              border border-white/[0.08]
              shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5),0_0_60px_-20px_rgba(6,182,212,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]
              overflow-hidden"
            >
              {/* Inner gradients */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-2xl" />
              
              {/* Top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.p 
                  className="text-white/40 text-lg md:text-xl mb-3"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1 }}
                >
                  If you have a valuable asset or a strong brand —
                </motion.p>
                <motion.p 
                  className="text-xl md:text-2xl font-serif font-bold text-white"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.1 }}
                >
                  your community{' '}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                      wants to invest
                    </span>
                    {/* Underline animation */}
                    <motion.span 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ delay: 1.3, duration: 0.6 }}
                      style={{ originX: 0 }}
                    />
                  </span>
                  {' '}in your success.
                </motion.p>
              </div>
              
              {/* Bottom highlight */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
