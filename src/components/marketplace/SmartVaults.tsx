import { motion, AnimatePresence } from "framer-motion";
import { Lock, Shield, Coins, CheckCircle2, KeyRound, Building2, Wallet, Link2 } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  { label: "Asset enters vault", icon: Wallet, description: "Deposit your asset" },
  { label: "Smart contract locks", icon: Lock, description: "Secured on-chain" },
  { label: "Order placed", icon: Coins, description: "List on marketplace" },
  { label: "Trade executes", icon: CheckCircle2, description: "Settlement complete" },
];

const VaultAnimation = () => {
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
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-violet-500/10 rounded-3xl blur-[100px]"
      />

      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 relative z-10">
        {/* Main Vault Visual */}
        <div className="relative h-72 mb-10 flex items-center justify-center">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-56 h-56 border-2 border-dashed border-violet-500/30 rounded-full"
          />

          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-44 h-44 border border-violet-500/50 rounded-full"
          />

          {/* Inner vault */}
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="w-36 h-36 bg-gradient-to-br from-violet-500/25 to-violet-500/5 rounded-2xl rotate-45 border border-violet-500/40 flex items-center justify-center shadow-lg shadow-violet-500/10">
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

          {/* Orbiting tokens */}
          {[
            { angle: 0, Icon: Coins },
            { angle: 120, Icon: Link2 },
            { angle: 240, Icon: Shield }
          ].map(({ angle, Icon }, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [angle, angle + 360] }}
              transition={{ duration: 18 + i * 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56"
              style={{ transformOrigin: "center" }}
            >
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-violet-500/15 border border-violet-500/40 flex items-center justify-center backdrop-blur-sm"
              >
                <Icon className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
          ))}

          {/* Step label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute top-0 inset-x-0 flex justify-center"
            >
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/20 backdrop-blur-md">
                <span className="text-base font-semibold text-white">{steps[activeStep].description}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Timeline */}
        <div className="relative px-4">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-white/10" />
          <motion.div
            className="absolute top-5 left-8 h-0.5 bg-gradient-to-r from-violet-500 to-violet-500/60"
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
                        ? "bg-white text-violet-600 shadow-lg" 
                        : isPast 
                          ? "bg-white/80 text-violet-600" 
                          : "bg-white/10 text-white/50 border border-white/20"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </motion.div>
                  <span className={`text-xs mt-3 text-center max-w-[90px] ${
                    isActive ? "text-white font-medium" : isPast ? "text-white/70" : "text-white/40"
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Step <span className="text-white font-bold">{activeStep + 1}</span> of {steps.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export const SmartVaults = () => {
  const benefits = [
    { icon: KeyRound, title: "Your assets never held by platform" },
    { icon: Shield, title: "No counterparty holding funds" },
    { icon: Building2, title: "No platform insolvency risk" },
    { icon: Lock, title: "Maximum security & transparency" },
  ];

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Deep slate/navy background - matching SignatureDealsBanner */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Violet glow accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-violet-900/15 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-slate-700/20 rounded-full blur-3xl" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.08) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/5 text-white border border-white/20">
              Smart Vaults
            </span>
            
            <h2 
              className="text-4xl lg:text-6xl font-serif font-bold mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              True
              <br />
              decentralization.
            </h2>
            
            <p className="text-xl mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Fragma uses Smart Vaults — an advanced Cardano-based mechanism 
              powered by Genius Yield's architecture.
            </p>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">What is a Smart Vault?</h3>
              <ul className="space-y-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  A secure digital locker for your assets
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  Controlled entirely by smart contracts
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  Assets stay until you decide to trade
                </li>
              </ul>
            </div>

            <motion.p
              className="text-white font-medium mb-8 p-4 border-l-2 border-violet-500 bg-violet-500/10 rounded-r-lg"
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
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <benefit.icon className="w-5 h-5 text-violet-400 flex-shrink-0" />
                  <span className="text-sm text-white">{benefit.title}</span>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-white font-semibold text-lg">
              This is true ownership, not just a pretty interface.
            </p>
          </motion.div>

          {/* Right - Animation */}
          <VaultAnimation />
        </div>
      </div>

      {/* Bottom border accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};
