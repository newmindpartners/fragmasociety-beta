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
  { icon: TrendingUp, label: "A new revenue stream", color: "from-emerald-500 to-teal-500" },
  { icon: Heart, label: "Community equity & loyalty", color: "from-pink-500 to-rose-500" },
  { icon: Award, label: "Institutional credibility", color: "from-amber-500 to-orange-500" },
  { icon: Coins, label: "Tokenized ownership", color: "from-primary to-cyan-500" },
  { icon: Globe, label: "Global investment access", color: "from-blue-500 to-indigo-500" },
  { icon: ArrowLeftRight, label: "Built-in liquidity", color: "from-violet-500 to-purple-500" },
  { icon: FileText, label: "Automated reporting & payouts", color: "from-cyan-500 to-blue-500" },
  { icon: Megaphone, label: "Premium brand storytelling", color: "from-rose-500 to-pink-500" },
  { icon: Users, label: "A long-term recurring investor ecosystem", color: "from-indigo-500 to-violet-500" },
];

export const SignatureDealBenefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-[hsl(220,30%,6%)] to-background" />
      
      {/* Ambient glow */}
      <motion.div
        className="absolute top-1/2 right-0 w-[400px] h-[600px] bg-primary/15 rounded-full blur-[200px]"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

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
                  whileHover={{ scale: 1.03, x: 5 }}
                  className="group flex items-center gap-4 p-5 rounded-xl bg-card/40 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-background flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                      <Icon className="w-5 h-5 text-foreground group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <span className="text-foreground font-medium">{benefit.label}</span>
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
          <p className="text-muted-foreground text-lg mb-2">This is not just fundraising.</p>
          <p className="text-2xl font-bold text-foreground">
            This is <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">brand-owned private markets</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
