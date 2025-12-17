import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert } from "lucide-react";
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
    <section className="py-32 relative overflow-hidden">
      {/* Light Grey Studio Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-radial from-slate-200/50 via-slate-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-slate-400" />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
              Important
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 leading-[1.1]"
          >
            Risk <span className="italic text-slate-500 font-serif">Factors</span>
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
            <div className="bg-slate-800 p-8 relative overflow-hidden">
              <div className="flex items-start gap-5 relative">
                <div className="w-14 h-14 bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-7 h-7 text-slate-300" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white mb-3">Capital at Risk</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Investing in this opportunity involves a high degree of risk. You may lose some or all of your 
                    invested capital. This investment is illiquid — you may not be able to sell your position quickly 
                    or at all. Target returns are projections only and are not guaranteed.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Risk List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            {deal.risks.map((risk, index) => (
              <Accordion key={index} type="single" collapsible>
                <AccordionItem
                  value={`risk-${index}`}
                  className="bg-white border border-slate-200 overflow-hidden data-[state=open]:border-slate-300 transition-all"
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-slate-50 transition-colors text-left">
                    <div className="flex items-center gap-4">
                      <span className="w-9 h-9 bg-slate-100 text-slate-600 text-sm font-medium flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="font-medium text-slate-800">{risk.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-slate-600 leading-relaxed pl-[52px]">
                      {risk.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </motion.div>

          {/* Bottom Disclaimer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-white border border-slate-200"
          >
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-500 leading-relaxed">
                <strong className="text-slate-700">Disclaimer:</strong> This page is for informational purposes only 
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
