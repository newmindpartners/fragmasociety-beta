import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Shield, Scale, Wallet, Link2, FileWarning } from "lucide-react";

const safetyPoints = [
  {
    icon: Shield,
    title: "KYC & compliance first",
    description: "We verify who you are and what you're allowed to access, so you only see suitable opportunities.",
  },
  {
    icon: Scale,
    title: "Regulated structures",
    description: "Deals are issued through compliant SPVs or securitisation vehicles, primarily in Luxembourg or partner regimes.",
  },
  {
    icon: Wallet,
    title: "Non-custodial model",
    description: "We don't hold your assets; you keep control through wallets and Smart Vaults.",
  },
  {
    icon: Link2,
    title: "On-chain records",
    description: "Ownership and transactions are recorded on the Cardano blockchain for maximum transparency.",
  },
  {
    icon: FileWarning,
    title: "Clear risk explanations",
    description: "Every deal page explains the main risks in plain language; nothing is \"hidden in the small print.\"",
  },
];

export const SafetyTrust = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Safe by design.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Transparent by technology.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 mb-8"
          >
            {safetyPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4 p-5 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{point.title}</h3>
                  <p className="text-muted-foreground">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="p-6 bg-destructive/5 border border-destructive/20 rounded-xl"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              All investments involve risk, including the possible loss of capital. Target returns 
              are not guaranteed. Please diversify and, where necessary, consult your own financial, 
              tax and legal advisors.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
