import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

export const MarketplaceCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <motion.div animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <motion.div animate={{ x: [0, -40, 0], y: [0, 40, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Start Trading Today</span>
          </motion.div>

          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-8 leading-tight">
            Trade real assets.<br /><span className="text-gradient italic">Full control.</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Browse the marketplace, create your first order, and experience non-custodial trading built on institutional-grade technology.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
            <Button size="lg" className="group text-lg px-10 py-7 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
              Explore Marketplace <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-20 pt-12 border-t border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[{ icon: Shield, label: "Non-Custodial", value: "100%" }, { icon: Zap, label: "Settlement", value: "Instant" }, { icon: TrendingUp, label: "Volume", value: "€24M+" }, { label: "Architecture", value: "Cardano" }].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1 }} className="text-center">
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
