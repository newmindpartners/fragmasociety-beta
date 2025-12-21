import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is a Signature Deal and how does it differ from traditional investments?",
    answer: "A Signature Deal is an exclusive, curated investment opportunity that undergoes rigorous due diligence by our fund managers. Unlike traditional investments, these deals offer direct access to institutional-quality assets with transparent terms, tokenized ownership, and secondary market liquidity. Each deal is structured to provide professional investors with clear risk-adjusted returns while maintaining full regulatory compliance."
  },
  {
    question: "What are the minimum and maximum investment amounts?",
    answer: "Investment tickets typically range from €100,000 to €500,000 minimum, depending on the specific deal structure. Maximum allocations are set to ensure fair distribution among qualified investors. These thresholds ensure all participants meet accredited investor requirements and help maintain optimal fund management efficiency."
  },
  {
    question: "How is my capital protected in this investment structure?",
    answer: "Your investment is secured through multiple layers of protection: SPV (Special Purpose Vehicle) structuring isolates deal-specific risks, comprehensive insurance coverage on underlying assets, conservative loan-to-value ratios, and rigorous counterparty due diligence. Additionally, all deals undergo legal review by specialized investment attorneys."
  },
  {
    question: "What is the expected timeline for returns and distributions?",
    answer: "Distribution timelines vary by deal type. Income-generating deals typically distribute quarterly or monthly, while development deals may offer returns at specific milestones or upon exit. Each deal's timeline is clearly outlined in the offering documents, with target holding periods ranging from 18-60 months depending on the strategy."
  },
  {
    question: "What documents will I need to provide to complete my investment?",
    answer: "Required documents typically include: government-issued ID, accredited investor certification or verification, completed subscription agreement, W-9 (for US investors) or W-8BEN (for international), and source of funds documentation for larger investments. Our concierge team guides you through each requirement."
  },
  {
    question: "How can I exit or sell my position before the deal matures?",
    answer: "Tokenized positions can be offered on our secondary marketplace, subject to holding periods and transfer restrictions. We facilitate matching between buyers and sellers, with standard transfer fees. While liquidity is not guaranteed, our marketplace provides an exit option not available in traditional private investments."
  }
];

export const DealSectionFAQ = () => {

  if (faqs.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-16 px-6 lg:px-8 bg-gradient-to-b from-slate-50/50 to-white border-t border-slate-100"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-500">
              Expert insights for this section
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <AccordionItem 
                value={`faq-${index}`} 
                className="bg-white rounded-xl border border-slate-200/80 px-5 py-1 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="text-left text-[15px] font-medium text-slate-800 hover:text-violet-700 hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] leading-relaxed text-slate-600 pb-4 pr-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-slate-500">
            Have more questions?{" "}
            <a 
              href="mailto:investors@fragma.co" 
              className="text-violet-600 hover:text-violet-700 font-medium hover:underline"
            >
              Contact our investor relations team
            </a>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};
