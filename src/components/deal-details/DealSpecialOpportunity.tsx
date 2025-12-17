import { motion } from "framer-motion";
import { Flame, CheckCircle, ArrowRight } from "lucide-react";
import type { DealData } from "@/types/deal";

interface DealSpecialOpportunityProps {
  deal: DealData;
}

export const DealSpecialOpportunity = ({ deal }: DealSpecialOpportunityProps) => {
  if (!deal.specialOpportunity) return null;

  return (
    <section className="py-32 relative overflow-hidden bg-navy-deep">
      {/* Subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/5" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="border border-foreground/10 p-10 md:p-16">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-14 h-14 border border-foreground/20 flex items-center justify-center"
              >
                <Flame className="w-6 h-6 text-foreground/60" />
              </motion.div>
              <div>
                <p className="text-[10px] text-foreground/40 uppercase tracking-[0.3em] mb-1">Special Opportunity</p>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-foreground">{deal.specialOpportunity.title}</h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-foreground/60 mb-12 leading-relaxed font-light max-w-2xl">
              {deal.specialOpportunity.description}
            </p>

            {/* Bullet Points */}
            {deal.specialOpportunity.bulletPoints && (
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {deal.specialOpportunity.bulletPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle className="w-4 h-4 text-foreground/40 flex-shrink-0 mt-1" />
                    <p className="text-sm text-foreground/50 font-light leading-relaxed">{point}</p>
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
              className="pt-8 border-t border-foreground/10"
            >
              <div className="inline-flex items-center gap-3 text-foreground/50 text-sm font-light">
                <div className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
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
