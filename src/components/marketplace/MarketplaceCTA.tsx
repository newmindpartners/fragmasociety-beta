import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";

export const MarketplaceCTA = () => {
  return (
    <section className="py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px bg-slate-600" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-500 font-medium">Start Trading Today</span>
            <div className="w-12 h-px bg-slate-600" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trade real assets.<br /><span className="italic text-slate-400">Full control.</span>
          </h2>

          <p className="text-lg text-slate-400 mb-12 max-w-xl mx-auto leading-relaxed">
            Browse the marketplace, create your first order, and experience non-custodial trading built on institutional-grade technology.
          </p>

          <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-10 h-14 text-sm font-medium tracking-wide">
            Explore Marketplace <ArrowRight className="ml-3 h-4 w-4" />
          </Button>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-20 pt-12 border-t border-slate-700/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[{ icon: Shield, label: "Non-Custodial", value: "100%" }, { icon: Zap, label: "Settlement", value: "Instant" }, { icon: TrendingUp, label: "Volume", value: "€24M+" }, { label: "Architecture", value: "Cardano" }].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1 }} className="text-center">
                  <p className="text-2xl font-medium text-white mb-2">{stat.value}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-[0.15em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
