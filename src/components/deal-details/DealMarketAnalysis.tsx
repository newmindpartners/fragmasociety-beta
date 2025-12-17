import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, BarChart3, Target, Calendar } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealMarketAnalysisProps {
  deal: DealData;
}

export const DealMarketAnalysis = ({ deal }: DealMarketAnalysisProps) => {
  if (!deal.marketData) return null;

  const getTrendIcon = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-foreground/70" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-foreground/50" />;
      default:
        return <Minus className="w-4 h-4 text-foreground/30" />;
    }
  };

  return (
    <section className="py-32 relative overflow-hidden bg-navy-deep">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/50 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-foreground/40 uppercase mb-4 block">
            Market Intelligence
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-foreground mb-6">
            Market Analysis
          </h2>
          <p className="text-lg text-foreground/50 max-w-xl font-light">
            Current market conditions and future outlook for {deal.marketData.region}
          </p>
        </motion.div>

        {/* Key Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 mb-20">
          {deal.marketData.stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-navy-deep p-8 group hover:bg-navy transition-colors duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] text-foreground/40 uppercase tracking-[0.2em]">{stat.label}</span>
                {getTrendIcon(stat.trend)}
              </div>
              <p className="text-3xl font-serif font-light text-foreground mb-2">{stat.value}</p>
              {stat.description && (
                <p className="text-xs text-foreground/40 font-light">{stat.description}</p>
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
              <div className="w-12 h-12 rounded-none border border-foreground/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-foreground/60" />
              </div>
              <h3 className="text-xl font-serif font-light text-foreground">Future Projections</h3>
            </div>
            <div className="space-y-6">
              {deal.marketData.projections.map((proj, index) => (
                <div key={index} className="border-l border-foreground/20 pl-6">
                  <p className="text-sm font-medium text-foreground mb-2">{proj.period}</p>
                  <p className="text-sm text-foreground/50 font-light leading-relaxed">{proj.description}</p>
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
              <div className="w-12 h-12 rounded-none border border-foreground/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-foreground/60" />
              </div>
              <h3 className="text-xl font-serif font-light text-foreground">Market Highlights</h3>
            </div>
            <ul className="space-y-4">
              {deal.marketData.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="w-1 h-1 rounded-full bg-foreground/40 mt-2.5 flex-shrink-0" />
                  <p className="text-sm text-foreground/50 font-light leading-relaxed">{highlight}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
