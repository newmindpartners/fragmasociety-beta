import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Calendar, Target } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealMarketAnalysisProps {
  deal: DealData;
}

export const DealMarketAnalysis = ({ deal }: DealMarketAnalysisProps) => {
  if (!deal.marketData) return null;

  const getTrendIcon = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-slate-400" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-slate-500" />;
      default:
        return <Minus className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <section className="py-32 relative overflow-hidden bg-slate-900">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-slate-600" />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
              Market Intelligence
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
            Market <span className="italic text-slate-400 font-serif">Analysis</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl font-light">
            Current market conditions and future outlook for {deal.marketData.region}
          </p>
        </motion.div>

        {/* Key Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-700/50 mb-20">
          {deal.marketData.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-slate-900 p-8 group hover:bg-slate-800 transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">{stat.label}</span>
                {getTrendIcon(stat.trend)}
              </div>
              <p className="text-3xl font-light text-white mb-2">{stat.value}</p>
              {stat.description && (
                <p className="text-xs text-slate-500 font-light">{stat.description}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Projections */}
        <div className="grid md:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-slate-700 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-xl font-light text-white">Future Projections</h3>
            </div>
            <div className="space-y-6">
              {deal.marketData.projections.map((proj, index) => (
                <div key={index} className="border-l border-slate-700 pl-6">
                  <p className="text-sm font-medium text-white mb-2">{proj.period}</p>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 border border-slate-700 flex items-center justify-center">
                <Target className="w-5 h-5 text-slate-400" />
              </div>
              <h3 className="text-xl font-light text-white">Market Highlights</h3>
            </div>
            <ul className="space-y-4">
              {deal.marketData.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-slate-500 mt-2.5 flex-shrink-0" />
                  <p className="text-sm text-slate-400 font-light leading-relaxed">{highlight}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
