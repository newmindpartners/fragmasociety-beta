import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Wallet, Lock, BarChart3, Coins, Shield, Zap, ArrowDown } from "lucide-react";

export const TokenOwnership = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVault, setActiveVault] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveVault((prev) => (prev + 1) % 2);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  const vaults = [
    { icon: Wallet, title: "Your Wallet", desc: "Direct control", color: "from-blue-500 to-cyan-500" },
    { icon: Lock, title: "Smart Vault", desc: "Automated & secure", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Coins className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Digital Ownership</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                tokens
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Digital proof of ownership. Always in your control.
            </p>
          </motion.div>

          {/* Main token flow visualization */}
          <div className="relative">
            {/* Investment to Token flow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center mb-12"
            >
              {/* Investment input */}
              <motion.div
                className="flex items-center gap-4 px-8 py-5 bg-card/80 border border-border/50 rounded-2xl mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">€</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">You invest</p>
                  <p className="text-2xl font-bold">€1,000</p>
                </div>
              </motion.div>

              {/* Animated arrow */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="my-4"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <ArrowDown className="w-6 h-6 text-primary" />
                </div>
              </motion.div>

              {/* Token output */}
              <motion.div
                className="relative"
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {/* Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-3xl blur-2xl"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <div className="relative flex items-center gap-6 px-10 py-6 bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-3xl">
                  <motion.div
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Coins className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-sm text-muted-foreground">You receive</p>
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      100 Tokens
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">= Your ownership share</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Vault options */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
              {vaults.map((vault, index) => {
                const isActive = activeVault === index;
                return (
                  <motion.div
                    key={index}
                    onClick={() => setActiveVault(index)}
                    className="relative cursor-pointer group"
                    whileHover={{ y: -5 }}
                  >
                    {/* Glow */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${vault.color} rounded-3xl blur-xl`}
                      animate={{ opacity: isActive ? 0.4 : 0 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className={`relative p-6 rounded-3xl border transition-all ${
                      isActive 
                        ? "bg-card border-primary/50" 
                        : "bg-card/50 border-border/50 hover:border-primary/30"
                    }`}>
                      <div className="flex items-center gap-4">
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${vault.color} flex items-center justify-center`}
                          animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <vault.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-xl font-bold">{vault.title}</h3>
                          <p className="text-muted-foreground">{vault.desc}</p>
                        </div>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary"
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Portfolio preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 max-w-lg mx-auto"
            >
              <div className="p-6 bg-card/80 border border-border/50 rounded-2xl">
                <div className="flex items-center gap-2 mb-5">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Your Portfolio</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: "Deal", value: "Malibu Villa", icon: "🏠" },
                    { label: "Tokens", value: "100 units", icon: "🪙" },
                    { label: "Invested", value: "€1,000", icon: "💰" },
                    { label: "Current", value: "€1,120", icon: "📈", highlight: true },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                      className={`flex items-center justify-between p-3 rounded-xl ${
                        item.highlight ? "bg-primary/10 border border-primary/20" : "bg-muted/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-muted-foreground">{item.label}</span>
                      </div>
                      <span className={`font-semibold ${item.highlight ? "text-primary" : ""}`}>
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
