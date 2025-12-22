import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, CheckCircle2, Lock, FileCheck, Users, BadgeCheck, Key, ShieldCheck } from "lucide-react";

const trustPoints = [
  {
    icon: Shield,
    title: "Bank-Level Custody",
    description: "Assets secured with institutional-grade custody partners."
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    description: "Fully regulated security token offerings with proper KYC."
  },
  {
    icon: Lock,
    title: "Non-Custodial Trading",
    description: "You maintain control of your tokens at all times."
  },
  {
    icon: BadgeCheck,
    title: "Audited Smart Contracts",
    description: "Third-party security audits on every contract."
  },
  {
    icon: Users,
    title: "Verified Investors",
    description: "All participants complete KYC verification."
  },
  {
    icon: CheckCircle2,
    title: "Transparent Reporting",
    description: "On-chain proof of reserves and real-time dashboards."
  }
];

export const TrustSecurity = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-background">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '64px 64px'
      }} />
      
      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-turquoise/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-[0.2em] uppercase rounded-full bg-turquoise/10 text-turquoise border border-turquoise/20">
            Security & Trust
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-light text-white mb-6">
            Your Assets.
            <span className="block text-turquoise">Your Control.</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Every layer of our platform is designed with security-first principles and complete transparency.
          </p>
        </motion.div>

        {/* Trust Points Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {trustPoints.map((point, i) => {
            const Icon = point.icon;
            
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative p-8 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 hover:border-turquoise/40 hover:bg-white/[0.06] transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-turquoise/10 flex items-center justify-center mb-4 group-hover:bg-turquoise transition-colors">
                    <Icon className="w-6 h-6 text-turquoise group-hover:text-background transition-colors" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2">{point.title}</h4>
                  <p className="text-white/50 leading-relaxed">{point.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/[0.03] backdrop-blur-sm rounded-full border border-white/10">
            <ShieldCheck className="w-6 h-6 text-turquoise" />
            <span className="text-white/60">
              Powered by <span className="text-white font-medium">Cardano</span> blockchain and <span className="text-white font-medium">Genius Yield</span> smart contracts
            </span>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-sm text-white/40 text-center max-w-3xl mx-auto leading-relaxed">
            <span className="font-medium text-white/50">Important:</span> All investments carry risk. 
            Past performance does not guarantee future results. Please read all offering documents 
            carefully and consider your financial situation before investing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
