import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Zap, Globe, Lock, Users, BarChart3, ArrowRight, Key, ShieldCheck, Sparkles } from "lucide-react";

const benefits = [
  {
    title: "You Hold Your Keys",
    description: "Assets never leave your wallet until the trade is complete. No intermediary custody.",
    icon: Key
  },
  {
    title: "No Counterparty Risk",
    description: "Smart contracts ensure atomic swaps. Either both parties get what they agreed, or nothing happens.",
    icon: ShieldCheck
  },
  {
    title: "Instant Settlement",
    description: "Trades settle in seconds, not days. No clearing houses, no delays.",
    icon: Sparkles
  },
  {
    title: "Full Transparency",
    description: "Every transaction is recorded on-chain. Complete audit trail, always.",
    icon: Lock
  }
];

const features = [
  { icon: Shield, title: "Bank-level security", description: "Institutional-grade custody" },
  { icon: Zap, title: "Real-time settlement", description: "On-chain in seconds" },
  { icon: Globe, title: "Global access", description: "Invest from anywhere" },
  { icon: Users, title: "Curated deals", description: "Expert-vetted opportunities" },
  { icon: BarChart3, title: "Full transparency", description: "On-chain proof" },
];

export const WhyFragma = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 section-mesh relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/5 text-white border border-white/20">
              The Fragma Advantage
            </span>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              True
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-violet-300 bg-clip-text text-transparent">decentralization.</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Your assets, your control. Non-custodial by design, transparent by default.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              <div className="relative p-8 bg-card rounded-2xl border border-border/50 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 group-hover:border-violet-500 transition-colors">
                    <benefit.icon className="w-6 h-6 text-violet-400 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border/50 hover:border-violet-500/30 transition-all cursor-default"
            >
              <div className="w-10 h-10 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote highlight */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-white font-medium mt-12 max-w-2xl mx-auto text-center pl-4 border-l-2 border-violet-500"
        >
          This isn't a "platform" holding your assets. It's true self-custody with institutional-grade infrastructure.
        </motion.p>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-card rounded-full border border-border/50">
            <ShieldCheck className="w-6 h-6 text-violet-400" />
            <span className="text-muted-foreground">
              Powered by <span className="text-foreground font-medium">Cardano</span> blockchain with <span className="text-foreground font-medium">smart contract</span> security
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};