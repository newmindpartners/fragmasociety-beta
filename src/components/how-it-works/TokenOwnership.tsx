import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Wallet, Lock, BarChart3, Coins, ArrowDown, TrendingUp, Clock, CircleDollarSign } from "lucide-react";

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
              className="space-y-4"
            >
              {/* Investment input card */}
              <div className="p-5 bg-card border border-border rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    <CircleDollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">You invest</p>
                    <p className="text-xl font-bold">€1,000</p>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex justify-center">
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
                >
                  <ArrowDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </div>

              {/* Token output card */}
              <div className="p-5 bg-card border border-primary/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    <Coins className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">You receive</p>
                    <p className="text-xl font-bold text-primary">100 Tokens</p>
                    <p className="text-xs text-muted-foreground">= Your ownership share</p>
                  </div>
                </div>
              </div>

              {/* Vault options */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {vaults.map((vault, index) => {
                  const isActive = activeVault === index;
                  return (
                    <motion.div
                      key={index}
                      onClick={() => setActiveVault(index)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                        isActive 
                          ? "bg-card border-primary" 
                          : "bg-card/50 border-border hover:border-muted-foreground"
                      }`}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive ? "bg-primary" : "bg-muted"
                        }`}>
                          <vault.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm">{vault.title}</h3>
                          <p className="text-xs text-muted-foreground">{vault.desc}</p>
                        </div>
                      </div>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Dashboard Preview */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Dashboard Header */}
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">Your Portfolio</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="p-5 space-y-4">
                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Total Value</p>
                    <p className="text-lg font-bold">€1,120</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-500">+12%</span>
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Tokens Held</p>
                    <p className="text-lg font-bold">100</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Coins className="w-3 h-3 text-primary" />
                      <span className="text-xs text-muted-foreground">units</span>
                    </div>
                  </div>
                </div>

                {/* Holdings List */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Holdings</p>
                  
                  <div className="p-3 bg-background border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm">
                          🏠
                        </div>
                        <div>
                          <p className="font-medium text-sm">Malibu Villa</p>
                          <p className="text-xs text-muted-foreground">Real Estate</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">€1,120</p>
                        <p className="text-xs text-green-500">+€120</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Recent</p>
                  
                  <div className="space-y-2">
                    {[
                      { action: "Purchased", tokens: "100 tokens", time: "2 days ago" },
                      { action: "Yield received", tokens: "€12.50", time: "1 week ago" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{item.action}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium">{item.tokens}</span>
                          <p className="text-xs text-muted-foreground">{item.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
