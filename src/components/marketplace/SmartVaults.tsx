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
      {/* Background Glow - turquoise accent */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-turquoise/10 rounded-3xl blur-[100px]"
      />

      <div className="bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-2xl p-8 relative z-10">
        {/* Main Vault Visual */}
        <div className="relative h-72 mb-10 flex items-center justify-center">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-56 h-56 border-2 border-dashed border-turquoise/20 rounded-full"
          />

          {/* Middle ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute w-44 h-44 border border-turquoise/40 rounded-full"
          />

          {/* Inner vault */}
          <motion.div
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="w-36 h-36 bg-gradient-to-br from-turquoise/20 to-turquoise/5 rounded-2xl rotate-45 border border-turquoise/30 flex items-center justify-center shadow-lg shadow-turquoise/10">
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
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-turquoise/10 border border-turquoise/30 flex items-center justify-center backdrop-blur-sm"
              >
                <Icon className="w-5 h-5 text-white/80" />
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
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/15 backdrop-blur-md">
                <span className="text-sm font-medium text-white">{steps[activeStep].description}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Timeline */}
        <div className="relative px-4">
          <div className="absolute top-5 left-8 right-8 h-px bg-white/10" />
          <motion.div
            className="absolute top-5 left-8 h-px bg-gradient-to-r from-turquoise to-turquoise/50"
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
                    animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? "bg-turquoise text-slate-900 shadow-lg shadow-turquoise/30" 
                        : isPast 
                          ? "bg-turquoise/80 text-slate-900" 
                          : "bg-white/5 text-white/40 border border-white/15"
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                  </motion.div>
                  <span className={`text-[10px] mt-3 text-center max-w-[80px] tracking-wide ${
                    isActive ? "text-white font-medium" : isPast ? "text-white/60" : "text-white/30"
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-white/40">
            Step <span className="text-white font-semibold">{activeStep + 1}</span> of {steps.length}
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
      {/* Deep slate/navy background - matching rest of site */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Subtle glow accents - turquoise to match brand */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[250px] bg-turquoise/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-slate-700/15 rounded-full blur-3xl" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(89,195,195,0.06) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-turquoise/20 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 mb-6 text-[10px] tracking-[0.2em] uppercase bg-white/5 text-white/70 border border-white/15 rounded-sm">
              Smart Vaults
            </span>
            
            <h2 
              className="text-4xl lg:text-6xl font-serif font-light leading-[1.1] mb-6 tracking-tight"
              style={{ 
                fontFamily: "'Playfair Display', serif",
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
            
            <p className="text-lg text-white/50 mb-8 leading-relaxed max-w-lg">
              Fragma uses Smart Vaults — an advanced Cardano-based mechanism 
              powered by Genius Yield's architecture.
            </p>

            <div className="bg-white/[0.03] border border-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
              <h3 className="text-sm font-semibold text-white mb-4 tracking-wide">What is a Smart Vault?</h3>
              <ul className="space-y-3 text-white/50 text-sm">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-turquoise" />
                  A secure digital locker for your assets
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-turquoise" />
                  Controlled entirely by smart contracts
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-turquoise" />
                  Assets stay until you decide to trade
                </li>
              </ul>
            </div>

            <motion.p
              className="text-white/80 text-sm mb-8 p-4 border-l-2 border-turquoise bg-turquoise/5 rounded-r-lg leading-relaxed"
            >
              Neither Fragma nor any third party can move your tokens.
              Only you can approve trades through signed transactions.
            </motion.p>

            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10 transition-colors hover:bg-white/[0.05]"
                >
                  <benefit.icon className="w-4 h-4 text-turquoise flex-shrink-0" />
                  <span className="text-xs text-white/80 leading-snug">{benefit.title}</span>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-white/60 text-sm font-medium">
              This is true ownership, not just a pretty interface.
            </p>
          </motion.div>

          {/* Right - Animation */}
          <VaultAnimation />
        </div>
      </div>

      {/* Bottom border accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-turquoise/15 to-transparent" />
    </section>
  );
};
