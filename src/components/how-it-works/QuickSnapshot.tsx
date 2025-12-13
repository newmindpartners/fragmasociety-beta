import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { UserPlus, Eye, FileSearch, Coins, Wallet, TrendingUp } from "lucide-react";

const steps = [
  { icon: UserPlus, label: "Sign up & KYC" },
  { icon: Eye, label: "See Signature Deals you're eligible for" },
  { icon: FileSearch, label: "Pick a deal & read the terms" },
  { icon: Coins, label: "Invest from as little as €50" },
  { icon: Wallet, label: "Receive tokens as proof of ownership" },
  { icon: TrendingUp, label: "Earn payouts & optionally trade on the secondary marketplace" },
];

export const QuickSnapshot = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold">
              How It Works in{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                6 Steps
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            {/* Connection line */}
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-accent hidden md:block" />

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 transition-all hover:translate-x-1"
                >
                  <div className="relative z-10 w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary">{index + 1}.</span>
                    <span className="text-foreground font-medium">{step.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
