import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Wallet, Lock, BarChart3, Coins, ArrowRight, Check } from "lucide-react";

const portfolioItems = [
  { label: "Deal name", value: "Malibu Villa" },
  { label: "Tokens", value: "250 units" },
  { label: "Invested", value: "€2,500" },
  { label: "Value", value: "€2,680" },
];

export const TokenOwnership = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/30 via-background to-background" />
      
      {/* Floating tokens animation */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20"
          style={{
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

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
              <span className="text-sm font-medium text-primary">Step 5</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your tokens.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Your ownership.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Digital proof that you own a piece of the deal.
            </p>
          </motion.div>

          {/* Main visualization */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Token animation */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-8 rounded-full border-2 border-dashed border-primary/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Center token */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary via-primary/80 to-accent flex items-center justify-center shadow-2xl shadow-primary/30">
                    <Coins className="w-20 h-20 text-white" />
                  </div>
                </motion.div>

                {/* Orbiting icons */}
                {[
                  { Icon: Lock, angle: 0, label: "Secure" },
                  { Icon: Wallet, angle: 120, label: "Non-custodial" },
                  { Icon: BarChart3, angle: 240, label: "Trackable" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{
                      left: "50%",
                      top: "50%",
                    }}
                    animate={{
                      x: Math.cos((item.angle + animationStep * 30) * (Math.PI / 180)) * 130 - 32,
                      y: Math.sin((item.angle + animationStep * 30) * (Math.PI / 180)) * 130 - 32,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-card border border-border/50 flex flex-col items-center justify-center gap-1 shadow-lg">
                      <item.Icon className="w-6 h-6 text-primary" />
                      <span className="text-[10px] text-muted-foreground">{item.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Storage options & portfolio */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Storage options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-muted-foreground mb-4">Tokens held in:</h3>
                
                {[
                  { icon: Wallet, title: "Your wallet", desc: "Non-custodial control" },
                  { icon: Lock, title: "Smart Vault", desc: "Secure & automated" },
                ].map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-5 bg-card/80 border border-border/50 rounded-2xl hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <option.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{option.title}</h4>
                      <p className="text-sm text-muted-foreground">{option.desc}</p>
                    </div>
                    <Check className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>

              {/* Portfolio preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="p-6 bg-gradient-to-br from-card/80 to-card/50 border border-primary/20 rounded-2xl"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold">Your Portfolio</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {portfolioItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                      className="p-3 bg-background/50 rounded-xl"
                    >
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-primary">{item.value}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
