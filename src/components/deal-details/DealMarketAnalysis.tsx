import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Calendar, Target, BarChart3, Sparkles } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealMarketAnalysisProps {
  deal: DealData;
}

export const DealMarketAnalysis = ({ deal }: DealMarketAnalysisProps) => {
  if (!deal.marketData) return null;

  const getTrendIcon = (trend?: "up" | "down" | "stable") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-5 h-5 text-violet-400" />;
      case "down":
        return <TrendingDown className="w-5 h-5 text-slate-500" />;
      default:
        return <Minus className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Top subsection - Dark with violet accent */}
      <div className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950/30 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-violet-400" />
              </div>
              <span className="text-xs tracking-[0.4em] uppercase text-violet-400 font-medium">
                Market Intelligence
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.1] mb-6">
              Market <span className="italic text-violet-300 font-serif">Analysis</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-xl font-light">
              Current market conditions and future outlook for {deal.marketData.region}
            </p>
          </motion.div>

          {/* Key Stats Grid - Cards with violet accents */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deal.marketData.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:border-violet-500/30 transition-all duration-500">
                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                    <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-violet-500/10 to-transparent" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">{stat.label}</span>
                    <div className="p-2 rounded-lg bg-slate-700/50">
                      {getTrendIcon(stat.trend)}
                    </div>
                  </div>
                  <p className="text-3xl font-light text-white mb-2 group-hover:text-violet-100 transition-colors">{stat.value}</p>
                  {stat.description && (
                    <p className="text-xs text-slate-500 font-light">{stat.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle subsection - Light contrast */}
      <div className="py-24 bg-gradient-to-b from-slate-100 to-white relative">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Future Projections */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-violet-100 border border-violet-200 flex items-center justify-center shadow-lg shadow-violet-500/10">
                  <Calendar className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-slate-900">Future Projections</h3>
                  <p className="text-sm text-slate-500">Market outlook & forecasts</p>
                </div>
              </div>
              <div className="space-y-6">
                {deal.marketData.projections.map((proj, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative pl-6 border-l-2 border-violet-200 hover:border-violet-500 transition-colors"
                  >
                    <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-violet-500 group-hover:scale-125 transition-transform" />
                    <p className="text-lg font-medium text-slate-900 mb-2">{proj.period}</p>
                    <p className="text-sm text-slate-600 font-light leading-relaxed">{proj.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Market Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-light text-slate-900">Market Highlights</h3>
                  <p className="text-sm text-slate-500">Key investment drivers</p>
                </div>
              </div>
              <div className="space-y-4">
                {deal.marketData.highlights.map((highlight, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-500 transition-colors">
                      <Sparkles className="w-4 h-4 text-violet-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-sm text-slate-700 font-light leading-relaxed pt-1">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-2 bg-gradient-to-r from-slate-900 via-violet-600 to-slate-900" />
    </section>
  );
};
