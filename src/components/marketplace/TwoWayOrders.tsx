import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Target, Zap, CheckCircle2, ArrowDown, ArrowUp, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const phases = [
  { id: 0, label: "Set Buy Limit", description: "Place your buy order" },
  { id: 1, label: "Set Sell Limit", description: "Place your sell order" },
  { id: 2, label: "Orders Active", description: "Both orders live simultaneously" },
  { id: 3, label: "Auto-Execute", description: "Smart contract matches trades" },
];

const TwoWayOrderDemo = () => {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(p => (p + 1) % 4);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Ambient glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-primary/20 rounded-3xl blur-[100px]"
      />

      <div className="glass rounded-3xl p-10 relative z-10 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            animate={{ rotate: phase === 2 ? [0, 180, 360] : 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/30 mb-4"
          >
            <ArrowLeftRight className="w-7 h-7 text-primary" />
          </motion.div>
          <h3 className="text-2xl font-serif font-bold text-foreground">Two-Way Order Demo</h3>
        </div>

        {/* Main visualization area */}
        <div className="relative h-[320px] flex items-center justify-center">
          
          {/* Center price display */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={phase === 3 ? {
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 0px hsl(var(--primary) / 0)",
                  "0 0 60px hsl(var(--primary) / 0.4)",
                  "0 0 0px hsl(var(--primary) / 0)"
                ]
              } : {}}
              transition={{ duration: 1, repeat: phase === 3 ? Infinity : 0 }}
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center backdrop-blur-sm"
            >
              <span className="text-xl font-bold text-primary">RWA</span>
            </motion.div>
          </div>

          {/* Buy Order Card - Left */}
          <motion.div
            className="absolute left-0 top-1/2"
            initial={{ opacity: 0, x: -100, y: "-50%" }}
            animate={{ 
              opacity: phase >= 0 ? 1 : 0,
              x: phase >= 0 ? 0 : -100,
              y: "-50%"
            }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={phase === 0 ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              transition={{ duration: 1.5, repeat: phase === 0 ? Infinity : 0 }}
              className={`relative p-5 rounded-2xl border-2 transition-all duration-500 ${
                phase >= 2 
                  ? "border-green-500/60 bg-green-500/10 shadow-lg shadow-green-500/10" 
                  : phase === 0 
                    ? "border-green-500/60 bg-green-500/10" 
                    : "border-border/50 bg-card/50"
              }`}
            >
              {/* Active indicator */}
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <ArrowDown className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Buy Order</span>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-3xl font-bold text-green-400">€95</span>
              </motion.div>

              <div className="mt-3 flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${phase >= 2 ? "bg-green-400 animate-pulse" : "bg-muted"}`} />
                <span className="text-xs text-muted-foreground">{phase >= 2 ? "Live" : "Pending"}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Sell Order Card - Right */}
          <motion.div
            className="absolute right-0 top-1/2"
            initial={{ opacity: 0, x: 100, y: "-50%" }}
            animate={{ 
              opacity: phase >= 1 ? 1 : 0,
              x: phase >= 1 ? 0 : 100,
              y: "-50%"
            }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={phase === 1 ? { scale: [1, 1.03, 1] } : { scale: 1 }}
              transition={{ duration: 1.5, repeat: phase === 1 ? Infinity : 0 }}
              className={`relative p-5 rounded-2xl border-2 transition-all duration-500 ${
                phase >= 2 
                  ? "border-red-500/60 bg-red-500/10 shadow-lg shadow-red-500/10" 
                  : phase === 1 
                    ? "border-red-500/60 bg-red-500/10" 
                    : "border-border/50 bg-card/50"
              }`}
            >
              {/* Active indicator */}
              <AnimatePresence>
                {phase >= 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <ArrowUp className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Sell Order</span>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-3xl font-bold text-red-400">€120</span>
              </motion.div>

              <div className="mt-3 flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${phase >= 2 ? "bg-red-400 animate-pulse" : "bg-muted"}`} />
                <span className="text-xs text-muted-foreground">{phase >= 2 ? "Live" : "Pending"}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Animated connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {/* Left line (buy → center) */}
            <motion.path
              d="M 130 160 Q 180 160 205 160"
              fill="none"
              stroke="url(#greenGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: phase >= 2 ? 1 : 0,
                opacity: phase >= 2 ? 1 : 0
              }}
              transition={{ duration: 0.8 }}
            />
            {/* Right line (center → sell) */}
            <motion.path
              d="M 245 160 Q 270 160 320 160"
              fill="none"
              stroke="url(#redGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: phase >= 2 ? 1 : 0,
                opacity: phase >= 2 ? 1 : 0
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            
            {/* Animated particles on execution */}
            {phase === 3 && (
              <>
                <motion.circle
                  r="4"
                  fill="hsl(var(--primary))"
                  initial={{ cx: 130, cy: 160 }}
                  animate={{ cx: [130, 205], cy: 160 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.circle
                  r="4"
                  fill="hsl(var(--primary))"
                  initial={{ cx: 320, cy: 160 }}
                  animate={{ cx: [320, 245], cy: 160 }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </>
            )}
            
            <defs>
              <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgb(239, 68, 68)" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Execution overlay */}
          <AnimatePresence>
            {phase === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2"
              >
                <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary/15 border border-primary/40 backdrop-blur-md">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary whitespace-nowrap">Smart contract executes automatically</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timeline progress */}
        <div className="mt-8 relative">
          {/* Background line */}
          <div className="absolute top-3 left-0 right-0 h-0.5 bg-border rounded-full" />
          
          {/* Progress line */}
          <motion.div
            className="absolute top-3 left-0 h-0.5 bg-gradient-to-r from-green-500 via-primary to-red-500 rounded-full"
            animate={{ width: `${((phase + 1) / 4) * 100}%` }}
            transition={{ duration: 0.5 }}
          />

          {/* Step indicators */}
          <div className="flex justify-between relative">
            {phases.map((p, i) => (
              <motion.div
                key={p.id}
                className="flex flex-col items-center"
                animate={{ opacity: phase >= i ? 1 : 0.4 }}
              >
                <motion.div
                  animate={phase === i ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{ duration: 0.5, repeat: phase === i ? Infinity : 0, repeatDelay: 1 }}
                  className={`w-6 h-6 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                    phase >= i 
                      ? i === 0 
                        ? "bg-green-500 text-white" 
                        : i === 1 
                          ? "bg-red-500 text-white"
                          : "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {phase > i ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-xs font-bold">{i + 1}</span>
                  )}
                </motion.div>
                <span className={`text-xs mt-2 text-center max-w-[70px] transition-colors ${
                  phase === i ? "text-foreground font-medium" : "text-muted-foreground"
                }`}>
                  {p.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Current phase description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-muted-foreground">{phases[phase].description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const TwoWayOrders = () => {
  return (
    <section className="py-24 section-gradient-radial relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/5 to-transparent" />
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
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-white/5 text-white border border-white/20">
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
