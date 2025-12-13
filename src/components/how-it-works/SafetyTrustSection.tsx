import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Shield, Landmark, Wallet, Link2, FileWarning, Lock, CheckCircle2 } from "lucide-react";

const safetyFeatures = [
  {
    icon: Shield,
    title: "KYC & compliance first",
    description: "See only suitable opportunities",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Landmark,
    title: "Regulated structures",
    description: "Luxembourg SPVs & partners",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Wallet,
    title: "Non-custodial",
    description: "You control your assets",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Link2,
    title: "On-chain records",
    description: "Cardano blockchain",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: FileWarning,
    title: "Clear risks",
    description: "No hidden small print",
    color: "from-red-500 to-rose-500",
  },
];

export const SafetyTrustSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      {/* Animated shield background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Shield className="w-full h-full text-primary" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 mb-6"
            >
              <Lock className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Safe by design.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Transparent.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Built for trust from the ground up.
            </p>
          </motion.div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group cursor-pointer"
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-2xl`}
                  animate={{ opacity: hoveredIndex === index ? 0.3 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                <div className="relative h-full p-6 bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl hover:border-primary/30 transition-all overflow-hidden">
                  {/* Check badge */}
                  <motion.div
                    className="absolute top-4 right-4"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </motion.div>

                  <motion.div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Central trust badge - fills remaining space */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative md:col-span-2 lg:col-span-1"
            >
              <div className="h-full p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20 rounded-3xl flex flex-col items-center justify-center text-center">
                <motion.div
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(var(--primary), 0.2)",
                      "0 0 40px rgba(var(--primary), 0.4)",
                      "0 0 20px rgba(var(--primary), 0.2)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                >
                  <Shield className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="text-lg font-bold text-primary mb-1">Trusted Platform</h3>
                <p className="text-sm text-muted-foreground">Institutional-grade security</p>
              </div>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="p-6 bg-muted/30 border border-border/50 rounded-2xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <FileWarning className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All investments involve risk, including the possible loss of capital. Target returns 
                are not guaranteed. Please diversify and, where necessary, consult your own financial, 
                tax and legal advisors.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
