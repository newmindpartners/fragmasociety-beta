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
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-cream">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(90deg, hsl(var(--light-border)) 1px, transparent 1px), linear-gradient(hsl(var(--light-border)) 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-violet-100 text-violet-600 border border-violet-200">
            Security & Trust
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-light-text mb-6">
            Your Assets.
            <span className="block bg-gradient-to-r from-violet-600 to-violet-400 bg-clip-text text-transparent">Your Control.</span>
          </h2>
          <p className="text-xl text-light-muted max-w-2xl mx-auto">
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
                <div className="relative p-8 bg-white rounded-2xl border border-slate-200/80 hover:border-violet-300 hover:shadow-xl hover:shadow-violet-100/50 transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center mb-4 group-hover:bg-violet-600 transition-colors">
                    <Icon className="w-6 h-6 text-violet-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{point.title}</h4>
                  <p className="text-slate-500 leading-relaxed">{point.description}</p>
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
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full border border-slate-200 shadow-lg shadow-slate-100">
            <ShieldCheck className="w-6 h-6 text-violet-600" />
            <span className="text-slate-600">
              Powered by <span className="text-slate-900 font-medium">Cardano</span> blockchain and <span className="text-slate-900 font-medium">Genius Yield</span> smart contracts
            </span>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-16 pt-8 border-t border-slate-200"
        >
          <p className="text-sm text-slate-400 text-center max-w-3xl mx-auto leading-relaxed">
            <span className="font-medium text-slate-500">Important:</span> All investments carry risk. 
            Past performance does not guarantee future results. Please read all offering documents 
            carefully and consider your financial situation before investing.
          </p>
        </motion.div>
      </div>
    </section>
  );
};