import { motion } from "framer-motion";
import { AlertTriangle, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { DealData } from "@/types/deal";

interface DealRisksProps {
  deal: DealData;
}

export const DealRisks = ({ deal }: DealRisksProps) => {
  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.02]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">Important Information</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">Risk </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Factors
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Please carefully review all risk factors before making an investment decision
          </p>
        </motion.div>

        {/* Main Warning Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-300 mb-2">Capital at Risk</h3>
                <p className="text-sm text-red-200/80 leading-relaxed">
                  Investing in this opportunity involves a high degree of risk. You may lose some or all of your 
                  invested capital. This investment is illiquid - you may not be able to sell your position quickly 
                  or at all. Target returns are projections only and are not guaranteed. Past performance is not 
                  indicative of future results. This is not suitable for all investors.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Risk Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {deal.risks.map((risk, index) => (
              <AccordionItem
                key={index}
                value={`risk-${index}`}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden data-[state=open]:border-white/20"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3 text-left">
                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="font-medium text-foreground">{risk.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed pl-9">
                    {risk.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* Bottom Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Disclaimer:</strong> This page is for informational purposes only 
              and does not constitute investment advice, an offer to sell, or a solicitation of an offer to buy any securities. 
              Please consult with a qualified financial advisor before making any investment decisions. 
              Full risk disclosures are available in the offering documents.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
