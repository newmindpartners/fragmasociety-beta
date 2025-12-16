import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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
import signatureDealBg from "@/assets/signature-deal-advantage-bg.jpg";

const benefits = [
  { icon: TrendingUp, label: "A new revenue stream" },
  { icon: Heart, label: "Community equity & loyalty" },
  { icon: Award, label: "Institutional credibility" },
  { icon: Coins, label: "Tokenized ownership" },
  { icon: Globe, label: "Global investment access" },
  { icon: ArrowLeftRight, label: "Built-in liquidity" },
  { icon: FileText, label: "Automated reporting & payouts" },
  { icon: Megaphone, label: "Premium brand storytelling" },
  { icon: Users, label: "A long-term recurring investor ecosystem" },
];

export const SignatureDealBenefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${signatureDealBg})` }}
      />
      
      {/* Deep dark navy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,50%,3%)/95] via-[hsl(220,45%,5%)/92] to-[hsl(220,40%,4%)/95]" />
      
      {/* Additional dark gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(220,50%,2%)_100%)]" />
      
      {/* Turquoise ambient spotlights */}
      <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-gradient-to-br from-cyan-500/[0.08] via-teal-500/[0.04] to-transparent rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400/[0.06] via-transparent to-transparent rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gradient-to-r from-teal-500/[0.05] to-transparent rounded-full blur-[120px] pointer-events-none" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${10 + (i * 8)}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full 
              bg-white/[0.03] backdrop-blur-xl border border-white/[0.08]
              mb-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 animate-pulse" />
            <span className="text-white/50 font-medium text-sm tracking-[0.2em] uppercase relative z-10">
              Unlock Your Potential
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            What you unlock with a
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Signature Deal
            </span>
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group relative"
                >
                  {/* Premium glass card */}
                  <div className="relative flex items-center gap-5 p-6 rounded-2xl 
                    bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent
                    backdrop-blur-2xl 
                    border border-white/[0.08] 
                    hover:border-cyan-500/30
                    transition-all duration-700 overflow-hidden
                    shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)]
                    hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.15),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  >
                    {/* Turquoise glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.08] via-teal-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Corner spotlight */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-cyan-500/20 via-teal-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
                    
                    {/* Inner top highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent group-hover:via-cyan-400/30 transition-colors duration-500" />
                    
                    {/* Bottom edge glow */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500/0 to-transparent group-hover:via-cyan-500/20 transition-all duration-500" />
                    
                    {/* Icon container */}
                    <div className="relative w-14 h-14 rounded-xl 
                      bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent
                      backdrop-blur-xl 
                      border border-white/[0.1] 
                      flex items-center justify-center flex-shrink-0
                      group-hover:border-cyan-500/30
                      group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2),inset_0_0_20px_rgba(6,182,212,0.05)]
                      transition-all duration-500"
                    >
                      {/* Icon inner glow */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 to-teal-500/0 group-hover:from-cyan-500/10 group-hover:to-teal-500/5 transition-all duration-500" />
                      
                      <Icon className="w-6 h-6 text-white/60 group-hover:text-cyan-400 transition-colors duration-500 relative z-10" />
                    </div>
                    
                    {/* Label */}
                    <span className="relative z-10 text-white/80 font-medium text-lg group-hover:text-white transition-colors duration-500">
                      {benefit.label}
                    </span>
                    
                    {/* Trailing particle on hover */}
                    <motion.div
                      className="absolute right-4 w-1.5 h-1.5 bg-cyan-400/50 rounded-full opacity-0 group-hover:opacity-100"
                      animate={{
                        y: [-5, 5, -5],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="relative inline-block px-12 py-10 rounded-3xl 
            bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent
            backdrop-blur-2xl 
            border border-white/[0.08]
            shadow-[0_16px_64px_-20px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
            overflow-hidden"
          >
            {/* Turquoise accent glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-60 h-40 bg-gradient-to-b from-cyan-500/15 via-cyan-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
            
            {/* Side glows */}
            <div className="absolute top-1/2 -left-10 w-20 h-40 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-1/2 -right-10 w-20 h-40 bg-gradient-to-l from-teal-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
            
            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <p className="text-white/40 text-lg mb-3 relative z-10">This is not just fundraising.</p>
            <p className="text-2xl md:text-3xl font-serif font-bold text-white relative z-10">
              This is{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                brand-owned private markets
              </span>
              .
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
