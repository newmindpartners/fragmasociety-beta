import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, CheckCircle2, Lock, FileCheck, Users, BadgeCheck } from "lucide-react";

const trustPoints = [
  {
    icon: Shield,
    title: "Bank-Level Custody",
    description: "Assets secured with institutional-grade custody partners and multi-signature wallets."
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    description: "Fully regulated security token offerings with proper licensing and KYC/AML procedures."
  },
  {
    icon: Lock,
    title: "Non-Custodial Trading",
    description: "You maintain control of your tokens at all times—we never hold your assets."
  },
  {
    icon: BadgeCheck,
    title: "Audited Smart Contracts",
    description: "Every smart contract undergoes rigorous third-party security audits."
  },
  {
    icon: Users,
    title: "Verified Investors",
    description: "All participants complete KYC verification to ensure a trusted community."
  },
  {
    icon: CheckCircle2,
    title: "Transparent Reporting",
    description: "On-chain proof of reserves and real-time portfolio performance dashboards."
  }
];

export const TrustSecurity = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white" />
      
      {/* Subtle patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-radial from-violet-100/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-slate-100/40 via-transparent to-transparent" />
      </div>
      
      {/* Decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-gradient-to-r from-violet-400 to-transparent" />
              <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
                Security & Trust
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extralight text-slate-900 leading-[1.05] mb-6"
            >
              Built for
              <span className="block font-serif italic text-slate-500 mt-2">Your Peace of Mind</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10"
            >
              Every layer of our platform is designed with security-first principles, 
              regulatory compliance, and complete transparency.
            </motion.p>
            
            {/* Shield visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="relative w-64 h-64 mx-auto lg:mx-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-100 to-slate-100 rounded-full opacity-50" />
              <div className="absolute inset-4 bg-gradient-to-br from-white to-slate-50 rounded-full shadow-xl flex items-center justify-center">
                <Shield className="w-20 h-20 text-violet-500" strokeWidth={1} />
              </div>
              {/* Orbiting elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 bg-violet-500 rounded-full" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-3 h-3 bg-slate-400 rounded-full" />
              </motion.div>
            </motion.div>
          </div>

          {/* Right: Trust Points Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {trustPoints.map((point, index) => {
              const Icon = point.icon;
              
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group p-6 bg-white rounded-xl border border-slate-200/80 hover:border-violet-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center mb-4 group-hover:bg-violet-500 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-lg font-medium text-slate-900 mb-2">{point.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{point.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
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