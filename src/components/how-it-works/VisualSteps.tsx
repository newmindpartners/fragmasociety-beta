import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { 
  UserPlus, 
  Search, 
  FileText, 
  CreditCard, 
  Wallet, 
  TrendingUp,
  ArrowRight,
  Check
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Sign up & verify",
    subtitle: "KYC in minutes",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "Browse deals",
    subtitle: "Curated opportunities",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: FileText,
    title: "Read the terms",
    subtitle: "Full transparency",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: CreditCard,
    title: "Invest",
    subtitle: "From €50",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Wallet,
    title: "Own tokens",
    subtitle: "Digital proof",
    color: "from-primary to-accent",
  },
  {
    icon: TrendingUp,
    title: "Earn & trade",
    subtitle: "Automated payouts",
    color: "from-yellow-500 to-orange-500",
  },
];

export const VisualSteps = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 via-background to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            6 steps to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ownership
            </span>
          </h2>
        </motion.div>

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-border/50" />
            <motion.div
              className="absolute top-16 left-0 h-0.5 bg-gradient-to-r from-primary to-accent"
              initial={{ width: "0%" }}
              animate={isInView ? { width: `${((activeStep + 1) / steps.length) * 100}%` } : {}}
              transition={{ duration: 0.5 }}
            />

            <div className="grid grid-cols-6 gap-4">
              {steps.map((step, index) => {
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveStep(index)}
                    className="relative cursor-pointer group"
                  >
                    {/* Icon container */}
                    <motion.div
                      className={`relative z-10 w-32 h-32 mx-auto rounded-3xl flex items-center justify-center transition-all duration-500 ${
                        isActive 
                          ? "bg-gradient-to-br " + step.color + " shadow-2xl shadow-primary/30" 
                          : isPast 
                            ? "bg-primary/20 border border-primary/30" 
                            : "bg-card/80 border border-border/50 group-hover:border-primary/30"
                      }`}
                      animate={isActive ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                    >
                      {isPast ? (
                        <Check className="w-10 h-10 text-white" />
                      ) : (
                        <step.icon className={`w-10 h-10 ${isActive ? "text-white" : "text-muted-foreground group-hover:text-white transition-colors"}`} />
                      )}
                      
                      {/* Step number */}
                      <div className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        isActive || isPast ? "bg-white text-background" : "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1}
                      </div>
                    </motion.div>

                    {/* Text */}
                    <div className="mt-6 text-center">
                      <h3 className={`font-semibold transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm mt-1 transition-colors ${isActive ? "text-primary" : "text-muted-foreground/60"}`}>
                        {step.subtitle}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
                  isActive ? "bg-card border border-primary/30" : "bg-card/50 border border-border/50"
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isActive ? "bg-gradient-to-br " + step.color : "bg-muted"
                }`}>
                  <step.icon className={`w-6 h-6 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                </div>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
