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

export const DealStrategy = ({ deal }: DealStrategyProps) => {
  if (!deal.strategies || deal.strategies.length === 0) return null;

  return (
    <section className="py-32 bg-[#F8F7F5] relative overflow-hidden">
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
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-500 font-medium">
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
            <span className="italic text-neutral-600">to exceptional returns</span>
          </motion.h2>
        </div>

        {/* Strategy Steps - Minimal Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {deal.strategies.map((strategy, index) => {
            const Icon = strategyIcons[index] || Lightbulb;

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
                <div className="bg-white border border-neutral-200 p-8 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                  {/* Step number - Large */}
                  <div className="mb-8">
                    <span className="text-6xl font-extralight text-neutral-200 group-hover:text-neutral-300 transition-colors">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center mb-6 group-hover:border-neutral-300 transition-colors">
                    <Icon className="w-5 h-5 text-neutral-400" strokeWidth={1.5} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-base font-medium text-neutral-900 mb-3 leading-tight">
                    {strategy.title}
                  </h3>
                  
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">
                    {strategy.description}
                  </p>
                  
                  {/* Arrow connector - Hidden on last item */}
                  {index < deal.strategies.length - 1 && (
                    <div className="hidden xl:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 bg-white border border-neutral-200 flex items-center justify-center">
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
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <p className="text-sm text-neutral-500 tracking-wide font-light">
              Each phase executed with precision to maximize value creation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
