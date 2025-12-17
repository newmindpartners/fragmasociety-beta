import { motion } from "framer-motion";
import { Target, Building2, Home, Hammer, DollarSign, Lightbulb } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealStrategyProps {
  deal: DealData;
}

const strategyIcons: Record<string, React.ElementType> = {
  acquisition: Target,
  offplan: Building2,
  rental: Home,
  building: Hammer,
  sale: DollarSign,
  default: Lightbulb,
};

export const DealStrategy = ({ deal }: DealStrategyProps) => {
  if (!deal.strategies || deal.strategies.length === 0) return null;

  const getIcon = (index: number) => {
    const iconKeys = ["acquisition", "offplan", "rental", "building", "sale"];
    const key = iconKeys[index] || "default";
    return strategyIcons[key];
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Target className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">Value Creation</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Investment </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Strategy
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Acquire prime land opportunities in Malibu, Beverly Hills & Pacific Palisades
          </p>
        </motion.div>

        {/* Strategy Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />

            <div className="grid lg:grid-cols-5 gap-6">
              {deal.strategies.map((strategy, index) => {
                const Icon = getIcon(index);
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Step Number */}
                    <div className="lg:absolute lg:-top-12 lg:left-1/2 lg:-translate-x-1/2 flex items-center justify-center mb-4 lg:mb-0">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-primary text-background font-bold text-lg flex items-center justify-center relative z-10"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </motion.div>
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-primary/30 transition-all h-full lg:mt-8"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-white/70" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-2">{strategy.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{strategy.description}</p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
