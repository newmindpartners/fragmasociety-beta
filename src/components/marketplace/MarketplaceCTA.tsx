import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap, TrendingUp } from "lucide-react";

// Real asset images for background showcase
const assetShowcase = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300",
];

export const MarketplaceCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-surface" />
      
      {/* Animated mesh */}
      <motion.div
        animate={{ 
          background: [
            "radial-gradient(circle at 30% 50%, hsl(172 83% 50% / 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 50%, hsl(172 83% 50% / 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 50%, hsl(172 83% 50% / 0.15) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute inset-0"
      />

      {/* Floating asset images */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {assetShowcase.map((img, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-2xl overflow-hidden opacity-[0.08]"
            style={{
              top: `${10 + i * 20}%`,
              left: i % 2 === 0 ? `${5 + i * 5}%` : `${75 - i * 5}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, i % 2 === 0 ? 5 : -5, 0],
            }}
            transition={{ duration: 8 + i * 2, repeat: Infinity }}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Start Trading Today</span>
          </motion.div>

          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">
            Trade real assets.
            <br />
            <span className="text-gradient">Full control.</span>
          </h2>

          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Browse the marketplace, create your first order, and experience 
            non-custodial trading built on institutional-grade technology.
          </p>

          {/* CTA */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-block"
          >
            <Button size="lg" className="group text-lg px-10 py-7 bg-white text-navy hover:bg-white/90 rounded-xl shadow-lg shadow-white/20">
              Explore Marketplace
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-20 pt-12 border-t border-white/10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: Shield, label: "Non-Custodial", value: "100%" },
                { icon: Zap, label: "Settlement", value: "Instant" },
                { icon: TrendingUp, label: "Trading Volume", value: "€24M+" },
                { label: "Architecture", value: "Cardano" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm text-white/50 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
