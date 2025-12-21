import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Building2, Landmark, TrendingUp } from "lucide-react";

export const MarketplaceCTA = () => {
  const features = [
    { icon: Building2, label: "Managed Portfolio" },
    { icon: Landmark, label: "Luxembourg Structure" },
    { icon: TrendingUp, label: "Target Distributions" },
    { icon: ArrowRight, label: "Secondary Market" },
  ];

  return (
    <section className="py-32 bg-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[180px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-12 h-px bg-slate-600" />
              <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
                Investment Vehicle
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Fragma <span className="italic text-violet-300">One</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 max-w-lg mb-8 leading-relaxed"
            >
              One click, broad exposure to RWA best opportunities and signature deals.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {features.map((feature, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-transparent border border-slate-700 text-slate-300 text-sm"
                >
                  <feature.icon className="w-4 h-4 text-slate-500" strokeWidth={1.5} />
                  {feature.label}
                </span>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                size="lg"
                className="bg-white text-[#0f172a] hover:bg-white/90 rounded-full px-8 h-14 text-sm font-medium tracking-wide"
              >
                Register your interest
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-6 mt-8 text-sm text-slate-500"
            >
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                Luxembourg Securitisation
              </span>
              <span className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                Professional Governance
              </span>
            </motion.div>
          </div>

          {/* Right - Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden">
              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-slate-600" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-slate-600" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-slate-600" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-slate-600" />
              
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </button>
              </div>
            </div>
            
            {/* Caption */}
            <p className="text-center text-sm text-slate-500 mt-4">
              Capital at risk. For professional / qualified investors only.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
