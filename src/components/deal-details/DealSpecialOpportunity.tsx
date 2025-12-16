import { motion } from "framer-motion";
import { Flame, CheckCircle, ArrowRight } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealSpecialOpportunityProps {
  deal: DealData;
}

export const DealSpecialOpportunity = ({ deal }: DealSpecialOpportunityProps) => {
  if (!deal.specialOpportunity) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-red-500/10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-br from-amber-500/20 to-red-500/10 backdrop-blur-sm border border-amber-500/30 rounded-3xl p-8 md:p-12">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center"
              >
                <Flame className="w-6 h-6 text-amber-400" />
              </motion.div>
              <div>
                <p className="text-xs text-amber-300 uppercase tracking-wider font-semibold">Special Opportunity</p>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">{deal.specialOpportunity.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {deal.specialOpportunity.description}
            </p>

            {/* Bullet Points */}
            {deal.specialOpportunity.bulletPoints && (
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {deal.specialOpportunity.bulletPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{point}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-medium">
                <span>High-value coastal submarket opportunity</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
