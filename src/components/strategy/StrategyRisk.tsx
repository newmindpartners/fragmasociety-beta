import { motion } from "framer-motion";
import { AlertTriangle, Globe } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import strategyRiskBg from "@/assets/strategy-risk-bg.jpg";

export const StrategyRisk = () => {
  const risks = [
    {
      title: "Credit & default risk (SME portfolio)",
      content: "Borrower default, restructuring and recovery risk in SME loans/bonds; mitigated via collateral, covenants and diversification."
    },
    {
      title: "BTC price & regulatory risk",
      content: "Volatility of BTC price, network difficulty and energy/regulatory changes affecting mining returns."
    },
    {
      title: "Technology & obsolescence risk",
      content: "Hardware and AI/HPC infrastructure becoming outdated, mitigated via modern fleets and technical DD."
    },
    {
      title: "Illiquidity & valuation risk",
      content: "Private equity positions and notes are illiquid; investors must be prepared to hold to maturity and may experience valuation volatility."
    },
    {
      title: "Legal, tax & regulatory risk",
      content: "Potential changes impacting the structure or investor outcomes."
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0">
        <img 
          src={strategyRiskBg} 
          alt="" 
          className="w-full h-full object-cover scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Disciplined risk management across credit, infrastructure and equity.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-8 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200/80">
              <p className="font-medium text-amber-200 mb-1">Capital at Risk</p>
              <p>
                You could lose some or all of your investment. Target returns only – no guarantee. 
                Unlisted, illiquid securities – you may not be able to sell quickly or at all. 
                Past performance and targets are not reliable indicators of future results.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-2">
            {risks.map((risk, index) => (
              <AccordionItem
                key={index}
                value={`risk-${index}`}
                className="bg-card border border-border rounded-lg px-4"
              >
                <AccordionTrigger className="text-foreground hover:text-primary transition-colors">
                  {risk.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {risk.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
          Detailed risk factors and investor representations are set out in the Documentation. Prospective investors must review these carefully and consult independent advisors before investing.
        </p>
      </div>
    </section>
  );
};
