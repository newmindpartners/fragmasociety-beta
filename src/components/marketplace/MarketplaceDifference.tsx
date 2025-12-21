import { motion } from "framer-motion";
import { Check, X, Zap, Shield, Users } from "lucide-react";

export const MarketplaceDifference = () => {
  const comparisons = [
    { feature: "True order book trading", traditional: false, fragma: true },
    { feature: "Non-custodial wallets", traditional: false, fragma: true },
    { feature: "Set your own price", traditional: false, fragma: true },
    { feature: "On-chain settlement", traditional: false, fragma: true },
    { feature: "Options trading", traditional: false, fragma: true },
    { feature: "Decentralized architecture", traditional: false, fragma: true },
  ];

  const differentiators = [
    { 
      icon: Zap, 
      title: "True P2P", 
      desc: "Direct trades, zero intermediaries" 
    },
    { 
      icon: Shield, 
      title: "Your Keys", 
      desc: "Complete asset ownership" 
    },
    { 
      icon: Users, 
      title: "Open Market", 
      desc: "Set your price, find buyers" 
    },
  ];

  return (
    <section className="relative py-20 section-light-mesh overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[hsl(var(--cream))]/60 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header - Compact */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-light-muted px-3 py-1.5 border border-[hsl(var(--light-border))] rounded-full bg-white/60 backdrop-blur-sm">
              <motion.span 
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              The Difference
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-light text-light-primary leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Not just another{" "}
            <span className="text-light-muted">trading platform.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-light-muted max-w-xl"
          >
            Traditional platforms give you buttons. We give you a real marketplace — 
            100% decentralized, completely non-custodial.
          </motion.p>
        </div>

        {/* Main Content Grid - Compact */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left - Differentiators */}
          <div className="lg:col-span-4">
            {/* Differentiator Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              {differentiators.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[hsl(var(--light-border))] bg-white/70 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-light-primary">{item.title}</h4>
                    <p className="text-xs text-light-muted">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Comparison Table */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative bg-white/60 backdrop-blur-sm rounded-2xl border border-[hsl(var(--light-border))] p-6 shadow-light"
            >
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 mb-4 pb-3 border-b border-[hsl(var(--light-border))]">
                <div className="col-span-6">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-light-muted">Feature</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-light-muted/60">Traditional</span>
                </div>
                <div className="col-span-3 text-center">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-primary">Fragma</span>
                </div>
              </div>

              {/* Table Rows */}
              <div className="space-y-0">
                {comparisons.map((item, index) => (
                  <motion.div
                    key={item.feature}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    whileHover={{ backgroundColor: 'hsl(var(--cream) / 0.5)' }}
                    className="grid grid-cols-12 gap-4 py-3 border-b border-[hsl(var(--light-border))]/50 items-center group cursor-default transition-colors rounded-lg"
                  >
                    <div className="col-span-6">
                      <span className="text-sm text-light-muted group-hover:text-light-primary transition-colors">
                        {item.feature}
                      </span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {item.traditional ? (
                        <Check className="w-4 h-4 text-muted-foreground/50" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center">
                          <X className="w-3 h-3 text-destructive/70" />
                        </div>
                      )}
                    </div>
                    <div className="col-span-3 flex justify-center">
                      {item.fragma ? (
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-primary" />
                        </motion.div>
                      ) : (
                        <X className="w-3 h-3 text-destructive/70" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="mt-6 flex items-center gap-3 p-3 rounded-xl border border-primary/30 bg-primary/10"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-light-muted">
                  All <span className="text-primary font-medium">6 features</span> available on Fragma
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};