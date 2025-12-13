import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Shield, Landmark, FileCheck, Sparkles, X } from "lucide-react";

const features = [
  { icon: Users, label: "Industry leaders", color: "from-blue-500 to-cyan-500" },
  { icon: Shield, label: "Real assets", color: "from-purple-500 to-pink-500" },
  { icon: Landmark, label: "Regulated", color: "from-green-500 to-emerald-500" },
  { icon: FileCheck, label: "Clear terms", color: "from-orange-500 to-amber-500" },
];

const rejected = ["Random listings", "Unknown issuers", "Unverified assets", "Hidden terms"];

export const SignatureDealsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Signature Deals Only</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Curated.{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Not random.
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We only feature hand-picked deals from verified issuers.
            </p>
          </motion.div>

          {/* Two columns comparison */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* What we feature */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-2xl" />
              <div className="relative p-8 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">What we feature</h3>
                </div>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-background/50 rounded-2xl group hover:bg-primary/5 transition-colors"
                    >
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <span className="font-medium text-foreground">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What we reject */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="relative p-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                    <X className="w-5 h-5 text-destructive" />
                  </div>
                  <h3 className="text-xl font-bold text-muted-foreground">Not on Fragma</h3>
                </div>
                
                <div className="space-y-4">
                  {rejected.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-background/30 rounded-2xl opacity-60"
                    >
                      <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center">
                        <X className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <span className="text-muted-foreground line-through">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/20 rounded-2xl text-center"
          >
            <p className="text-lg font-medium">
              <span className="text-muted-foreground">Not hundreds of offers.</span>{" "}
              <span className="text-foreground">A short list of high-conviction deals.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
