import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Landmark, Wallet, Link2, Check } from "lucide-react";

const safetyFeatures = [
  { icon: Shield, title: "Compliant", desc: "KYC & regulated" },
  { icon: Landmark, title: "Luxembourg SPVs", desc: "Institutional structures" },
  { icon: Wallet, title: "Non-custodial", desc: "You control assets" },
  { icon: Link2, title: "On-chain", desc: "Cardano verified" },
];

export const SafetyTrustSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">
              Safe by design.{" "}
              <span className="text-gradient">Transparent.</span>
            </h2>
            <p className="text-lg text-white/50">
              Built for trust from the ground up.
            </p>
          </motion.div>

          {/* Simple 4-column feature row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          >
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="text-center group"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-4 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-sm text-white/40">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Simple disclaimer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-sm text-white/40"
          >
            <Check className="w-4 h-4 text-primary" />
            <span>All investments involve risk. Target returns are not guaranteed.</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
