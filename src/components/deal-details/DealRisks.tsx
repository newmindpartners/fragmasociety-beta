import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
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
    <section className="py-32 bg-neutral-50">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-amber-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-amber-600 font-medium">
              Important
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-neutral-900 leading-[1.1]"
          >
            Risk <span className="italic">Factors</span>
          </motion.h2>
        </div>

        <div className="max-w-3xl">
          {/* Main Warning Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-rose-900 mb-3">Capital at Risk</h3>
                  <p className="text-rose-800/80 leading-relaxed">
                    Investing in this opportunity involves a high degree of risk. You may lose some or all of your 
                    invested capital. This investment is illiquid — you may not be able to sell your position quickly 
                    or at all. Target returns are projections only and are not guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk Accordion - Clean */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {deal.risks.map((risk, index) => (
                <AccordionItem
                  key={index}
                  value={`risk-${index}`}
                  className="bg-white border border-neutral-200 rounded-xl overflow-hidden data-[state=open]:border-neutral-300 data-[state=open]:shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-neutral-50 transition-colors text-left">
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-neutral-100 text-neutral-600 text-sm font-medium flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="font-medium text-neutral-900">{risk.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-neutral-600 leading-relaxed pl-12">
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
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-white border border-neutral-200 rounded-xl"
          >
            <p className="text-sm text-neutral-500 leading-relaxed">
              <strong className="text-neutral-700">Disclaimer:</strong> This page is for informational purposes only 
              and does not constitute investment advice, an offer to sell, or a solicitation of an offer to buy any securities. 
              Please consult with a qualified financial advisor before making any investment decisions.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};