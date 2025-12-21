import { motion } from "framer-motion";
import { X, Check, ArrowRight, Sparkles } from "lucide-react";

const ComparisonRow = ({ 
  feature, 
  traditional, 
  fragma, 
  delay 
}: { 
  feature: string; 
  traditional: boolean; 
  fragma: boolean; 
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ x: 4 }}
    className="grid grid-cols-3 gap-4 py-5 border-b border-slate-200 last:border-0 group cursor-default"
  >
    <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{feature}</span>
    <div className="flex justify-center">
      {traditional ? (
        <Check className="w-5 h-5 text-slate-400" />
      ) : (
        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
          <X className="w-4 h-4 text-red-400" />
        </div>
      )}
    </div>
    <div className="flex justify-center">
      {fragma ? (
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <Check className="w-5 h-5 text-primary" />
        </motion.div>
      ) : (
        <X className="w-5 h-5 text-red-400" />
      )}
    </div>
  </motion.div>
);

export const MarketplaceDifference = () => {
  const comparisons = [
    { feature: "True order book trading", traditional: false, fragma: true },
    { feature: "Non-custodial wallets", traditional: false, fragma: true },
    { feature: "Set your own price", traditional: false, fragma: true },
    { feature: "On-chain settlement", traditional: false, fragma: true },
    { feature: "Options trading", traditional: false, fragma: true },
    { feature: "No platform price control", traditional: false, fragma: true },
    { feature: "Decentralized architecture", traditional: false, fragma: true },
  ];

  return (
    <section className="py-32 section-light-mesh relative overflow-hidden">
      {/* Subtle geometric patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.span 
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20"
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              The Difference
            </motion.span>
            
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
              Not just another
              <br />
              <span className="text-gradient">trading platform.</span>
            </h2>
            
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Traditional platforms give you buttons. We give you a real marketplace — 
              100% decentralized, completely non-custodial.
            </p>

            <motion.div 
              className="glass-light rounded-2xl p-8 mb-8"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-slate-800 font-medium text-lg mb-4">
                "You're not trading on Fragma. You're trading with other investors, 
                using Fragma as the secure settlement layer."
              </p>
              <div className="flex items-center gap-3 text-primary">
                <ArrowRight className="w-5 h-5" />
                <span className="font-semibold">True peer-to-peer trading</span>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {[
                { label: "Safer", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
                { label: "More Transparent", color: "bg-primary/5 text-primary border-primary/20" },
                { label: "Full Freedom", color: "bg-blue-50 text-blue-600 border-blue-200" },
              ].map((tag, i) => (
                <motion.div
                  key={tag.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`px-5 py-2.5 rounded-xl border font-semibold ${tag.color}`}
                >
                  {tag.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-light rounded-3xl p-8 shadow-light"
          >
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200">
              <span className="text-slate-500 font-semibold text-sm uppercase tracking-wider">Feature</span>
              <span className="text-center text-slate-500 font-semibold text-sm uppercase tracking-wider">Traditional</span>
              <span className="text-center text-primary font-semibold text-sm uppercase tracking-wider">Fragma</span>
            </div>

            {/* Rows */}
            {comparisons.map((item, index) => (
              <ComparisonRow
                key={item.feature}
                {...item}
                delay={index * 0.08}
              />
            ))}

            {/* Footer badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/10 text-center"
            >
              <p className="text-primary font-semibold">✓ All 7 features available on Fragma</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
