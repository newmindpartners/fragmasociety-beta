import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Target, TrendingUp, TrendingDown, Zap, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const TwoWayOrderDemo = () => {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px]"
      />

      <div className="glass rounded-3xl p-8 relative z-10">
        <div className="text-center mb-8">
          <ArrowLeftRight className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-xl font-serif font-bold text-foreground">Two-Way Order Demo</h3>
        </div>

        <div className="relative h-80">
          {/* Central Asset */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 border border-primary/40 flex items-center justify-center z-10"
            animate={{ 
              scale: phase === 3 ? [1, 1.1, 1] : 1,
              boxShadow: phase === 3 
                ? ["0 0 0px rgba(var(--primary), 0)", "0 0 40px rgba(var(--primary), 0.5)", "0 0 0px rgba(var(--primary), 0)"]
                : "0 0 0px rgba(var(--primary), 0)"
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-2xl font-bold text-foreground">RWA</span>
          </motion.div>

          {/* Buy Order */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: phase >= 1 ? 1 : 0,
              x: phase >= 1 ? 0 : 50,
              scale: phase === 1 ? 1.05 : 1
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          >
            <div className="glass rounded-xl p-4 border border-green-500/30 bg-green-500/5 w-32">
              <TrendingDown className="w-5 h-5 text-green-400 mb-2" />
              <p className="text-xs text-muted-foreground">Buy Order</p>
              <p className="text-lg font-bold text-green-400">€95</p>
              {phase >= 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2"
                >
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">Active</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Sell Order */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ 
              opacity: phase >= 2 ? 1 : 0,
              x: phase >= 2 ? 0 : -50,
              scale: phase === 2 ? 1.05 : 1
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <div className="glass rounded-xl p-4 border border-red-500/30 bg-red-500/5 w-32">
              <TrendingUp className="w-5 h-5 text-red-400 mb-2" />
              <p className="text-xs text-muted-foreground">Sell Order</p>
              <p className="text-lg font-bold text-red-400">€120</p>
              {phase >= 2 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2"
                >
                  <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">Active</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.line
              x1="20%"
              y1="50%"
              x2="38%"
              y2="50%"
              stroke="rgba(34, 197, 94, 0.5)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.line
              x1="62%"
              y1="50%"
              x2="80%"
              y2="50%"
              stroke="rgba(239, 68, 68, 0.5)"
              strokeWidth="2"
              strokeDasharray="5,5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: phase >= 2 ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* Execution Flash */}
          <AnimatePresence>
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="glass rounded-xl p-4 border border-primary/40 bg-primary/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">Smart contract handles the rest</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phase Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2, 3].map(p => (
            <motion.div
              key={p}
              className={`w-2 h-2 rounded-full ${phase === p ? "bg-primary" : "bg-muted"}`}
              animate={{ scale: phase === p ? 1.2 : 1 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const TwoWayOrders = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Demo */}
          <TwoWayOrderDemo />

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              Two-Way Orders
            </span>
            
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Trade with{" "}
              <span className="text-gradient">precision.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fragma's marketplace supports "two-way orders" — a feature common in pro trading 
              but rare in tokenised RWA.
            </p>

            <div className="space-y-4 mb-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20"
              >
                <Target className="w-6 h-6 text-green-400 flex-shrink-0" />
                <span className="text-foreground">Place buy orders at the price you decide</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <Target className="w-6 h-6 text-red-400 flex-shrink-0" />
                <span className="text-foreground">Place sell orders at the price you want</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20"
              >
                <ArrowLeftRight className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-foreground">Keep both active at the same time</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-accent/10 border border-accent/20"
              >
                <Zap className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="text-foreground">Auto-match when market conditions are right</span>
              </motion.div>
            </div>

            <div className="glass rounded-xl p-6">
              <h4 className="text-foreground font-medium mb-3">Example:</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>You want to buy at <span className="text-green-400 font-medium">€95</span></p>
                <p>You want to sell if price hits <span className="text-red-400 font-medium">€120</span></p>
                <p className="text-foreground mt-4">
                  Place both orders and walk away — the smart contract handles the rest.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
