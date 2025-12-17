import { motion } from "framer-motion";
import { 
  UserCheck, 
  FileText, 
  CreditCard, 
  Coins, 
  TrendingUp, 
  ArrowRightLeft,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Express Interest",
    description: "Register your interest and complete investor verification (KYC/AML).",
    detail: "5-10 minutes",
  },
  {
    icon: FileText,
    title: "Review Documents",
    description: "Access full documentation including term sheet and risk disclosures.",
    detail: "Full access",
  },
  {
    icon: CreditCard,
    title: "Subscribe & Fund",
    description: "Complete subscription and transfer funds securely.",
    detail: "Bank or crypto",
  },
  {
    icon: Coins,
    title: "Receive Tokens",
    description: "Tokens representing your ownership are issued to your wallet.",
    detail: "Non-custodial",
  },
  {
    icon: TrendingUp,
    title: "Earn Distributions",
    description: "Receive automated payouts directly to your wallet.",
    detail: "Automated",
  },
  {
    icon: ArrowRightLeft,
    title: "Trade on Secondary",
    description: "List your position on the Fragma secondary marketplace.",
    detail: "Exit anytime",
  },
];

export const DealHowItWorks = () => {
  return (
    <section className="py-32 bg-[#F8F7F5] relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-neutral-300" />
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-500 font-medium">
              Process
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-neutral-900 leading-[1.1]"
          >
            How it <span className="italic text-neutral-600">works</span>
          </motion.h2>
        </div>

        {/* Steps - Visual timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white border border-neutral-200 p-8 h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
                {/* Step number - Large watermark */}
                <div className="mb-8">
                  <span className="text-6xl font-extralight text-neutral-200 group-hover:text-neutral-300 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 border border-neutral-200 flex items-center justify-center mb-6 group-hover:border-neutral-300 transition-colors">
                  <step.icon className="w-5 h-5 text-neutral-400" />
                </div>
                
                {/* Content */}
                <h3 className="text-base font-medium text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light mb-6">{step.description}</p>
                
                {/* Detail badge */}
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-xs text-neutral-600">
                  <div className="w-1 h-1 rounded-full bg-neutral-400" />
                  {step.detail}
                </span>
              </div>

              {/* Connector arrow - only between items */}
              {index < steps.length - 1 && index !== 2 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 bg-white border border-neutral-200 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-neutral-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
            <span className="text-sm text-neutral-500 font-light">Full support from our investor relations team at every step</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
