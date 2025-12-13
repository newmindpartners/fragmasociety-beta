import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Wallet, Lock, Coins, ArrowDown, CircleDollarSign, Info } from "lucide-react";

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
    { icon: Wallet, title: "Your Wallet", desc: "Direct control" },
    { icon: Lock, title: "Smart Vault", desc: "Automated & secure" },
  ];

  const claimStats = [
    { label: "Earned this week", value: "23", unit: "ADA", divider: true },
    { label: "Available to claim", value: "$112.45", unit: "≈ 58.23 ADA", divider: true },
    { label: "Last claimed", value: "$85.10", unit: "Apr 13, 2025", divider: true },
    { label: "Next claim", value: "6 Days", unit: "Apr 16, 2025", divider: false },
  ];

  return (
    <section ref={ref} className="py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border mb-4">
              <Coins className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Digital Ownership</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Get your{" "}
              <span className="text-primary">tokens</span>
            </h2>
            <p className="text-muted-foreground">
              Digital proof of ownership. Always in your control.
            </p>
          </motion.div>

          {/* 2-Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Token Flow */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[hsl(230,30%,97%)] rounded-2xl p-6 shadow-sm space-y-4"
            >
              {/* Investment input card */}
              <div className="p-5 bg-white border border-[hsl(230,20%,90%)] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(230,70%,35%)] flex items-center justify-center">
                    <CircleDollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[hsl(230,20%,55%)]">You invest</p>
                    <p className="text-xl font-bold text-[hsl(230,60%,30%)]">€1,000</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-[hsl(230,20%,92%)] flex items-center justify-center"
                >
                  <ArrowDown className="w-5 h-5 text-[hsl(230,20%,55%)]" />
                </motion.div>
              </div>

              {/* Token output card */}
              <div className="p-5 bg-white border border-[hsl(230,70%,80%)] rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[hsl(230,70%,35%)] flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-[hsl(230,20%,55%)]">You receive</p>
                    <p className="text-xl font-bold text-[hsl(230,70%,35%)]">100 Tokens</p>
                    <p className="text-xs text-[hsl(230,20%,55%)]">= Your ownership share</p>
                  </div>
                </div>
              </div>

              {/* Vault options */}
              <div className="grid grid-cols-2 gap-3 mt-2">
                {vaults.map((vault, index) => {
                  const isActive = activeVault === index;
                  return (
                    <motion.div
                      key={index}
                      onClick={() => setActiveVault(index)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                        isActive 
                          ? "bg-white border-[hsl(230,70%,35%)]" 
                          : "bg-white border-[hsl(230,20%,90%)] hover:border-[hsl(230,20%,70%)]"
                      }`}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive ? "bg-[hsl(230,70%,35%)]" : "bg-[hsl(230,20%,92%)]"
                        }`}>
                          <vault.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-[hsl(230,20%,55%)]"}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-[hsl(230,60%,30%)]">{vault.title}</h3>
                          <p className="text-xs text-[hsl(230,20%,55%)]">{vault.desc}</p>
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[hsl(230,70%,35%)]"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Claim Income Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[hsl(230,30%,97%)] rounded-2xl p-6 shadow-sm"
            >
              {/* Header */}
              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-xl font-semibold text-[hsl(230,30%,20%)]">Claim Income</h3>
                <div className="w-6 h-6 rounded-full bg-[hsl(230,20%,92%)] flex items-center justify-center">
                  <Info className="w-3.5 h-3.5 text-[hsl(230,20%,60%)]" />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex items-start justify-between mb-8">
                {claimStats.map((stat, index) => (
                  <div key={index} className="flex items-start">
                    <div className="pr-4">
                      <p className="text-sm text-[hsl(230,20%,55%)] mb-2 leading-tight">
                        {stat.label.split(' ').slice(0, 2).join(' ')}<br />
                        {stat.label.split(' ').slice(2).join(' ')}
                      </p>
                      <p className="text-xl font-bold text-[hsl(230,60%,30%)]">{stat.value}</p>
                      <p className="text-xs text-[hsl(230,20%,55%)] mt-0.5">{stat.unit}</p>
                    </div>
                    {stat.divider && (
                      <div className="w-px h-16 bg-[hsl(230,20%,85%)] mr-4" />
                    )}
                  </div>
                ))}
              </div>

              {/* Claim Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-[hsl(230,70%,35%)] hover:bg-[hsl(230,70%,30%)] text-white font-semibold rounded-full text-lg transition-colors"
              >
                Claim Income
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};