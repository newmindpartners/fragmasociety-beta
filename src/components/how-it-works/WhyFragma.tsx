import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Shield, Lock, KeyRound, Building2, Wallet, Coins, CheckCircle2, Link2, ShieldCheck, Sparkles, Key } from "lucide-react";

const steps = [
  { label: "Asset enters", icon: Wallet, description: "Deposit securely" },
  { label: "Smart contract", icon: Lock, description: "On-chain lock" },
  { label: "Order placed", icon: Coins, description: "List to trade" },
  { label: "Trade executes", icon: CheckCircle2, description: "Settlement complete" },
];

const VaultVisual = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const ActiveIcon = steps[activeStep].icon;

  return (
    <div className="relative">
      {/* Background Glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute inset-0 bg-violet-500/20 rounded-3xl blur-[120px]"
      />

      <div className="relative z-10">
        {/* Label above visual */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="flex justify-center mb-8"
          >
            <div className="px-6 py-3 rounded-full bg-white/5 border border-white/20 backdrop-blur-md">
              <span className="text-base font-semibold text-white">{steps[activeStep].description}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main Vault Animation */}
        <div className="relative h-72 flex items-center justify-center">
          {/* Outer dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 border-2 border-dashed border-violet-500/30 rounded-full"
          />

          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 border border-violet-500/50 rounded-full"
          />

          {/* Inner vault diamond */}
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="relative"
          >
            <div className="w-36 h-36 bg-gradient-to-br from-violet-500/25 via-violet-600/15 to-violet-900/20 rounded-2xl rotate-45 border border-violet-400/40 flex items-center justify-center shadow-2xl shadow-violet-500/20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ scale: 0, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1, rotate: -45, opacity: 1 }}
                  exit={{ scale: 0, rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  <ActiveIcon className="w-14 h-14 text-white" />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Orbiting elements */}
          {[
            { angle: 0, Icon: Coins },
            { angle: 120, Icon: Link2 },
            { angle: 240, Icon: Shield }
          ].map(({ angle, Icon }, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [angle, angle + 360] }}
              transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
              className="absolute w-64 h-64"
              style={{ transformOrigin: "center" }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-violet-500/15 border border-violet-400/40 flex items-center justify-center backdrop-blur-sm"
              >
                <Icon className="w-5 h-5 text-violet-300" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Progress Timeline */}
        <div className="relative mt-10 px-4">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-border" />
          <motion.div
            className="absolute top-5 left-8 h-0.5 bg-gradient-to-r from-violet-500 to-violet-400"
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
            style={{ maxWidth: "calc(100% - 4rem)" }}
          />

          <div className="flex justify-between relative">
            {steps.map((step, i) => {
              const StepIcon = step.icon;
              const isActive = i === activeStep;
              const isPast = i < activeStep;

              return (
                <div key={i} className="flex flex-col items-center">
                  <motion.div
                    animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? "bg-violet-500 text-white shadow-lg shadow-violet-500/50" 
                        : isPast 
                          ? "bg-violet-500/50 text-white" 
                          : "bg-muted/80 text-muted-foreground border border-border"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </motion.div>
                  <span className={`text-xs mt-3 text-center max-w-[80px] font-medium ${
                    isActive ? "text-white" : isPast ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

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

const smallBenefits = [
  { icon: KeyRound, title: "Your assets never held by platform" },
  { icon: Shield, title: "No counterparty holding funds" },
  { icon: Building2, title: "No platform insolvency risk" },
  { icon: Lock, title: "Maximum security & transparency" },
];

export const WhyFragma = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-32 section-gradient-radial relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 section-lines opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-5 py-2.5 mb-8 text-xs font-bold tracking-[0.25em] uppercase rounded-full bg-white/5 text-white border border-white/20 backdrop-blur-sm">
              Smart Vaults
            </span>
            
            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-8 leading-[1.1]">
              True
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-400 bg-clip-text text-transparent">decentralization.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Fragma uses Smart Vaults — an advanced Cardano-based mechanism 
              powered by Genius Yield's architecture.
            </p>

            {/* Smart Vault Explanation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="glass rounded-2xl p-8 mb-8"
            >
              <h3 className="text-lg font-bold text-foreground mb-5">What is a Smart Vault?</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50" />
                  <span>A secure digital locker for your assets</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50" />
                  <span>Controlled entirely by smart contracts</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-sm shadow-violet-500/50" />
                  <span>Assets stay until you decide to trade</span>
                </li>
              </ul>
            </motion.div>

            {/* Highlight Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="p-5 border-l-2 border-violet-500 bg-violet-500/5 rounded-r-xl mb-10"
            >
              <p className="text-foreground font-medium leading-relaxed">
                Neither Fragma nor any third party can move your tokens.
                Only you can approve trades through signed transactions.
              </p>
            </motion.div>

            {/* Small Benefits Grid */}
            <div className="grid grid-cols-2 gap-4">
              {smallBenefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-violet-500/30 transition-all duration-300 cursor-default"
                >
                  <benefit.icon className="w-5 h-5 text-violet-400 flex-shrink-0" />
                  <span className="text-sm text-foreground font-medium">{benefit.title}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="mt-10 text-white font-semibold text-lg"
            >
              This is true ownership, not just a pretty interface.
            </motion.p>
          </motion.div>

          {/* Right - Vault Animation */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <VaultVisual />
          </motion.div>
        </div>

        {/* Benefits Grid - Below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                <div className="relative p-8 bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-violet-500/40 hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500 h-full">
                  <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:bg-violet-500 group-hover:border-violet-500 transition-all duration-500">
                    <benefit.icon className="w-6 h-6 text-violet-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-card/60 backdrop-blur-sm rounded-full border border-border/50">
            <ShieldCheck className="w-6 h-6 text-violet-400" />
            <span className="text-muted-foreground">
              Powered by <span className="text-foreground font-medium">Cardano</span> blockchain and <span className="text-foreground font-medium">Genius Yield</span> smart contracts
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
