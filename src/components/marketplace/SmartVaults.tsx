import { motion } from "framer-motion";
import { Lock, Shield, Coins, CheckCircle2, KeyRound, Building2 } from "lucide-react";
import { useState } from "react";

const VaultAnimation = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { label: "Asset enters vault", active: step >= 0 },
    { label: "Smart contract locks", active: step >= 1 },
    { label: "Order placed", active: step >= 2 },
    { label: "Trade executes", active: step >= 3 },
  ];

  return (
    <div className="relative">
      {/* Glow */}
      <motion.div
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-primary/20 rounded-3xl blur-[80px]"
      />

      <div className="glass rounded-3xl p-8 relative z-10">
        {/* Vault Visual */}
        <div className="relative h-64 mb-8">
          {/* Vault Hexagon */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              {/* Outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-48 h-48 border-2 border-dashed border-primary/30 rounded-full"
              />
              
              {/* Middle ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 w-40 h-40 border border-primary/50 rounded-full"
              />

              {/* Inner vault */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-48 h-48 flex items-center justify-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl rotate-45 border border-primary/30 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(var(--primary), 0.3)",
                        "0 0 40px rgba(var(--primary), 0.5)",
                        "0 0 20px rgba(var(--primary), 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="-rotate-45"
                  >
                    <Lock className="w-12 h-12 text-primary" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Orbiting tokens */}
              {[0, 120, 240].map((angle, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: [angle, angle + 360] }}
                  transition={{ duration: 15 + i * 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-48 h-48"
                  style={{ transformOrigin: "center" }}
                >
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Coins className="w-4 h-4 text-primary" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center relative">
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute top-4 left-0 h-0.5 bg-primary"
          />
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.3 }}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                animate={s.active ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, delay: i * 0.3 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  s.active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
              </motion.div>
              <span className="text-xs text-muted-foreground mt-2 text-center max-w-[80px]">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SmartVaults = () => {
  const benefits = [
    { icon: KeyRound, title: "Your assets are never held by the platform" },
    { icon: Shield, title: "No counterparty holding your funds" },
    { icon: Building2, title: "No risk of platform insolvency" },
    { icon: Lock, title: "Maximum security & transparency" },
  ];

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              Smart Vaults
            </span>
            
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              The secret to{" "}
              <span className="text-gradient">true decentralization.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fragma uses Smart Vaults, an advanced Cardano-based mechanism 
              inspired by Genius Yield's architecture.
            </p>

            <div className="glass rounded-xl p-6 mb-8">
              <h3 className="text-lg font-medium text-foreground mb-4">What is a Smart Vault?</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  A secure digital locker
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Controlled by smart contracts
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Where your assets stay until you decide to trade
                </li>
              </ul>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-foreground font-medium mb-8 p-4 border-l-2 border-primary bg-primary/5 rounded-r-lg"
            >
              Neither Fragma nor any third party can move your tokens.
              Only you can approve trades through signed transactions.
            </motion.p>

            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                >
                  <benefit.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{benefit.title}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-primary font-medium"
            >
              This is true ownership, not just a pretty interface.
            </motion.p>
          </motion.div>

          {/* Right - Animation */}
          <VaultAnimation />
        </div>
      </div>
    </section>
  );
};
