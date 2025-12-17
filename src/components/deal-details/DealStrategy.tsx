import { motion } from "framer-motion";
import { Target, Pickaxe, DollarSign, Lightbulb, LogOut } from "lucide-react";
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
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header - Editorial Style */}
        <div className="max-w-4xl mb-24">
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
            <span className="italic font-normal">to exceptional returns</span>
          </motion.h2>
        </div>

        {/* Strategy Steps - Luxury Editorial Layout */}
        <div className="space-y-0">
          {deal.strategies.map((strategy, index) => {
            const Icon = strategyIcons[index] || Lightbulb;
            const isLast = index === deal.strategies.length - 1;

            return (
              <motion.article
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="group"
              >
                <div 
                  className={`grid grid-cols-12 gap-6 lg:gap-12 py-16 lg:py-20 ${
                    !isLast ? 'border-b border-neutral-100' : ''
                  }`}
                >
                  {/* Step Number - Large & Prominent */}
                  <div className="col-span-3 md:col-span-2 lg:col-span-1">
                    <div className="sticky top-32">
                      <motion.span 
                        className="block text-[5rem] md:text-[6rem] lg:text-[7rem] font-extralight leading-none text-neutral-100 group-hover:text-neutral-200 transition-colors duration-700 select-none"
                        style={{ fontFeatureSettings: "'tnum'" }}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </motion.span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="col-span-9 md:col-span-10 lg:col-span-8">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16">
                      {/* Icon - Minimal Circle */}
                      <motion.div 
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-neutral-200 flex items-center justify-center group-hover:border-neutral-400 group-hover:bg-neutral-50 transition-all duration-500">
                          <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-neutral-400 group-hover:text-neutral-600 transition-colors duration-500" strokeWidth={1.5} />
                        </div>
                      </motion.div>

                      {/* Text Content */}
                      <div className="flex-1 max-w-2xl">
                        <motion.h3 
                          className="text-2xl lg:text-3xl font-medium text-neutral-900 mb-4 leading-tight group-hover:text-neutral-700 transition-colors duration-300"
                        >
                          {strategy.title}
                        </motion.h3>
                        
                        <p className="text-lg text-neutral-500 leading-relaxed">
                          {strategy.description}
                        </p>
                        
                        {/* Subtle animated indicator */}
                        <motion.div 
                          className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        >
                          <motion.div
                            className="w-8 h-px bg-neutral-300"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                          />
                          <span className="text-xs tracking-[0.2em] uppercase text-neutral-400">
                            Phase {index + 1}
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Right Decorative Element - Desktop Only */}
                  <div className="hidden lg:flex col-span-3 items-center justify-end">
                    <motion.div
                      className="relative"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                    >
                      {/* Minimal line with dot */}
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-24 h-px bg-neutral-100 origin-right"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        />
                        <motion.div
                          className="w-2 h-2 rounded-full bg-neutral-200 group-hover:bg-neutral-400 transition-colors duration-500"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  </div>
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
          className="mt-24 pt-12 border-t border-neutral-100"
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-1 rounded-full bg-neutral-300" />
            <p className="text-sm text-neutral-400 tracking-wide">
              Each phase executed with precision to maximize value creation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};