import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, ChevronRight } from "lucide-react";
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

const riskColors = [
  { bg: "bg-rose-50", border: "border-rose-100", text: "text-rose-700", num: "bg-rose-100 text-rose-600" },
  { bg: "bg-amber-50", border: "border-amber-100", text: "text-amber-700", num: "bg-amber-100 text-amber-600" },
  { bg: "bg-orange-50", border: "border-orange-100", text: "text-orange-700", num: "bg-orange-100 text-orange-600" },
  { bg: "bg-red-50", border: "border-red-100", text: "text-red-700", num: "bg-red-100 text-red-600" },
  { bg: "bg-pink-50", border: "border-pink-100", text: "text-pink-700", num: "bg-pink-100 text-pink-600" },
];

export const DealRisks = ({ deal }: DealRisksProps) => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-l from-rose-50/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-rose-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-rose-600 font-medium">
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
            Risk <span className="italic text-rose-600">Factors</span>
          </motion.h2>
        </div>

        <div className="max-w-4xl">
          {/* Main Warning Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-rose-50 to-white border border-rose-200 rounded-2xl p-8 relative overflow-hidden">
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-100/50 rounded-full blur-2xl" />
              
              <div className="flex items-start gap-5 relative">
                <div className="w-14 h-14 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-7 h-7 text-rose-600" />
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

          {/* Risk List - Clean cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {deal.risks.map((risk, index) => {
              const colors = riskColors[index % riskColors.length];
              
              return (
                <Accordion key={index} type="single" collapsible>
                  <AccordionItem
                    value={`risk-${index}`}
                    className={`${colors.bg} border ${colors.border} rounded-xl overflow-hidden data-[state=open]:shadow-md transition-all`}
                  >
                    <AccordionTrigger className="px-6 py-5 hover:no-underline transition-colors text-left">
                      <div className="flex items-center gap-4">
                        <span className={`w-9 h-9 rounded-lg ${colors.num} text-sm font-semibold flex items-center justify-center flex-shrink-0`}>
                          {index + 1}
                        </span>
                        <span className={`font-medium ${colors.text}`}>{risk.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <p className="text-neutral-600 leading-relaxed pl-[52px]">
                        {risk.description}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })}
          </motion.div>

          {/* Bottom Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-neutral-50 border border-neutral-100 rounded-xl"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-neutral-500 leading-relaxed">
                <strong className="text-neutral-700">Disclaimer:</strong> This page is for informational purposes only 
                and does not constitute investment advice, an offer to sell, or a solicitation of an offer to buy any securities. 
                Please consult with a qualified financial advisor before making any investment decisions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
