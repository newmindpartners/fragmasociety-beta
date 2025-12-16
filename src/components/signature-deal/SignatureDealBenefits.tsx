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
      {/* Dark navy background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,40%,4%)] via-[hsl(220,35%,6%)] to-background" />
      
      {/* Turquoise ambient glows */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-teal-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-white/50 font-medium text-sm tracking-wider uppercase mb-4 block">
            Unlock Your Potential
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            What you unlock with a
            <br />
            <span className="text-gradient">
              Signature Deal
            </span>
          </h2>
        </motion.div>

        {/* Benefits Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -3 }}
                  className="group relative"
                >
                  {/* Glass card */}
                  <div className="relative flex items-center gap-4 p-5 rounded-2xl 
                    bg-white/[0.03] backdrop-blur-2xl 
                    border border-white/[0.06] 
                    hover:bg-white/[0.06] hover:border-white/15
                    transition-all duration-500 overflow-hidden
                    shadow-[0_4px_24px_-8px_rgba(0,0,0,0.3)]"
                  >
                    {/* Turquoise spotlight gradient on hover */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-gradient-to-tr from-cyan-500/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    {/* Inner top highlight */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    {/* Icon container with glass effect */}
                    <div className="relative w-12 h-12 rounded-xl 
                      bg-white/[0.05] backdrop-blur 
                      border border-white/10 
                      flex items-center justify-center flex-shrink-0
                      group-hover:bg-white/[0.1] group-hover:border-white/20
                      group-hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]
                      transition-all duration-500"
                    >
                      <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors duration-300" />
                    </div>
                    
                    {/* Label */}
                    <span className="relative z-10 text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                      {benefit.label}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="inline-block px-10 py-8 rounded-3xl 
            bg-white/[0.02] backdrop-blur-2xl 
            border border-white/[0.06]
            shadow-[0_8px_40px_-15px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]"
          >
            {/* Turquoise accent glow */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <p className="text-white/50 text-lg mb-2">This is not just fundraising.</p>
            <p className="text-2xl font-serif font-bold text-white">
              This is <span className="text-gradient">brand-owned private markets</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
