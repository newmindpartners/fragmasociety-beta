import { motion } from "framer-motion";
import { Target, Pickaxe, DollarSign, Lightbulb, LogOut, ArrowRight } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealStrategyProps {
  deal: DealData;
}

const strategyIcons: React.ElementType[] = [
  Target,
  Pickaxe,
  DollarSign,
  Lightbulb,
  LogOut,
];

const stepColors = [
  { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-600", accent: "bg-blue-500" },
  { bg: "bg-amber-50", border: "border-amber-100", icon: "text-amber-600", accent: "bg-amber-500" },
  { bg: "bg-emerald-50", border: "border-emerald-100", icon: "text-emerald-600", accent: "bg-emerald-500" },
  { bg: "bg-purple-50", border: "border-purple-100", icon: "text-purple-600", accent: "bg-purple-500" },
  { bg: "bg-rose-50", border: "border-rose-100", icon: "text-rose-600", accent: "bg-rose-500" },
];

export const DealStrategy = ({ deal }: DealStrategyProps) => {
  if (!deal.strategies || deal.strategies.length === 0) return null;

  return (
    <section className="py-32 bg-neutral-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-blue-50 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-gradient-to-l from-amber-50 to-transparent rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header - Editorial Style */}
        <div className="max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-neutral-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-400 font-medium">
              Strategy
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-[3.5rem] font-light text-neutral-900 leading-[1.15] tracking-tight"
          >
            A methodical approach
            <br />
            <span className="italic text-amber-700">to exceptional returns</span>
          </motion.h2>
        </div>

        {/* Strategy Steps - Visual Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {deal.strategies.map((strategy, index) => {
            const Icon = strategyIcons[index] || Lightbulb;
            const colors = stepColors[index % stepColors.length];

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Card */}
                <div className={`bg-white rounded-2xl border border-neutral-100 p-6 h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden`}>
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${colors.accent}`} />
                  
                  {/* Step number - Large */}
                  <div className="absolute top-4 right-4">
                    <span className="text-6xl font-extralight text-neutral-100 group-hover:text-neutral-200 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-6 h-6 ${colors.icon}`} strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg font-medium text-neutral-900 mb-3 leading-tight">
                    {strategy.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-500 leading-relaxed">
                    {strategy.description}
                  </p>
                  
                  {/* Arrow connector - Hidden on last item */}
                  {index < deal.strategies.length - 1 && (
                    <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-white border border-neutral-200 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 text-neutral-400" />
                      </div>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-8 border-t border-neutral-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <p className="text-sm text-neutral-500 tracking-wide">
              Each phase executed with precision to maximize value creation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
