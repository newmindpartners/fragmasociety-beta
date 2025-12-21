import { motion } from "framer-motion";
import { Check, X, Zap, Shield, Users, ArrowRight } from "lucide-react";

export const MarketplaceDifference = () => {
  const comparisons = [
    { feature: "True order book trading", traditional: false, fragma: true },
    { feature: "Non-custodial wallets", traditional: false, fragma: true },
    { feature: "Set your own price", traditional: false, fragma: true },
    { feature: "On-chain settlement", traditional: false, fragma: true },
    { feature: "Options trading", traditional: false, fragma: true },
    { feature: "Decentralized architecture", traditional: false, fragma: true },
  ];

  const highlights = [
    { icon: Zap, title: "True P2P", desc: "Direct trades, zero intermediaries" },
    { icon: Shield, title: "Your Keys", desc: "Complete asset ownership" },
    { icon: Users, title: "Open Market", desc: "Set your price, find buyers" },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-xs font-semibold tracking-widest uppercase rounded-full bg-secondary/80 text-foreground border border-border/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              The Difference
            </span>
            
            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-[1.1]">
              Not just another
              <br />
              <span className="text-gradient italic">trading platform.</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Traditional platforms give you buttons. We give you a real marketplace — 
              100% decentralized, completely non-custodial.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Highlights */}
          <div className="lg:col-span-4 space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 8 }}
                className="group flex items-center gap-5 p-6 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto" />
              </motion.div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden"
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 p-6 border-b border-border/50 bg-secondary/30">
                <div className="col-span-6">
                  <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Feature</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground/60">Traditional</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-xs font-semibold tracking-widest uppercase text-primary">Fragma</span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="divide-y divide-border/30">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="grid grid-cols-12 gap-4 p-6 items-center hover:bg-secondary/20 transition-colors"
                  >
                    <div className="col-span-6">
                      <span className="text-foreground font-medium">{item.feature}</span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                        <X className="w-4 h-4 text-destructive" />
                      </div>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
                      >
                        <Check className="w-4 h-4 text-primary" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-t border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">
                    All <span className="text-primary font-bold">6 features</span> available exclusively on Fragma
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
