import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp } from "lucide-react";

export const MarketplaceCTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Deep slate/navy background - matching SignatureDealsBanner */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
      
      {/* Violet glow accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-900/15 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[200px] bg-slate-700/20 rounded-full blur-3xl" />
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px]"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(148,130,180,0.08) 0%, transparent 70%)'
        }}
      />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center justify-center gap-4 mb-8">
            <div className="w-12 h-px" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>Start Trading Today</span>
            <div className="w-12 h-px" style={{ background: 'rgba(255,255,255,0.3)' }} />
          </motion.div>

          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8" 
            style={{ 
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #ffffff 0%, #c4b5d4 40%, #9a8cb0 60%, #ffffff 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Trade real assets.<br /><span className="italic" style={{ color: 'rgba(255,255,255,0.5)', WebkitTextFillColor: 'unset' }}>Full control.</span>
          </h2>

          <p className="text-lg mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Browse the marketplace, create your first order, and experience non-custodial trading built on institutional-grade technology.
          </p>

          <Button size="lg" className="bg-white text-slate-900 hover:bg-white/90 rounded-sm px-10 h-14 text-sm font-medium tracking-wide">
            Explore Marketplace <ArrowRight className="ml-3 h-4 w-4" />
          </Button>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="mt-20 pt-12 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[{ icon: Shield, label: "Non-Custodial", value: "100%" }, { icon: Zap, label: "Settlement", value: "Instant" }, { icon: TrendingUp, label: "Volume", value: "€24M+" }, { label: "Architecture", value: "Cardano" }].map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 + i * 0.1 }} className="text-center">
                  <p className="text-2xl font-medium text-white mb-2">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.15em]" style={{ color: 'rgba(255,255,255,0.4)' }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom border accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.3) 50%, transparent 100%)'
        }}
      />
    </section>
  );
};
