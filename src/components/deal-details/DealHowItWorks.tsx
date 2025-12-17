import { motion } from "framer-motion";
import { 
  UserCheck, 
  FileText, 
  CreditCard, 
  Coins, 
  TrendingUp, 
  ArrowRightLeft,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Express Interest",
    description: "Register your interest and complete investor verification (KYC/AML).",
    detail: "5-10 minutes",
    color: { bg: "bg-blue-50", border: "border-blue-100", icon: "text-blue-600", accent: "from-blue-500 to-blue-600" },
  },
  {
    icon: FileText,
    title: "Review Documents",
    description: "Access full documentation including term sheet and risk disclosures.",
    detail: "Full access",
    color: { bg: "bg-purple-50", border: "border-purple-100", icon: "text-purple-600", accent: "from-purple-500 to-purple-600" },
  },
  {
    icon: CreditCard,
    title: "Subscribe & Fund",
    description: "Complete subscription and transfer funds securely.",
    detail: "Bank or crypto",
    color: { bg: "bg-amber-50", border: "border-amber-100", icon: "text-amber-600", accent: "from-amber-500 to-amber-600" },
  },
  {
    icon: Coins,
    title: "Receive Tokens",
    description: "Tokens representing your ownership are issued to your wallet.",
    detail: "Non-custodial",
    color: { bg: "bg-emerald-50", border: "border-emerald-100", icon: "text-emerald-600", accent: "from-emerald-500 to-emerald-600" },
  },
  {
    icon: TrendingUp,
    title: "Earn Distributions",
    description: "Receive automated payouts directly to your wallet.",
    detail: "Automated",
    color: { bg: "bg-rose-50", border: "border-rose-100", icon: "text-rose-600", accent: "from-rose-500 to-rose-600" },
  },
  {
    icon: ArrowRightLeft,
    title: "Trade on Secondary",
    description: "List your position on the Fragma secondary marketplace.",
    detail: "Exit anytime",
    color: { bg: "bg-indigo-50", border: "border-indigo-100", icon: "text-indigo-600", accent: "from-indigo-500 to-indigo-600" },
  },
];

export const DealHowItWorks = () => {
  return (
    <section className="py-32 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-r from-blue-50/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-gradient-to-l from-purple-50/50 to-transparent rounded-full blur-3xl" />
      </div>

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
            <span className="text-xs tracking-[0.4em] uppercase text-neutral-400 font-medium">
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
            How it <span className="italic text-amber-700">works</span>
          </motion.h2>
        </div>

        {/* Steps - Visual timeline */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl border border-neutral-100 p-8 h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color.accent}`} />
                
                {/* Step number - Large watermark */}
                <div className="absolute top-4 right-4">
                  <span className="text-7xl font-extralight text-neutral-100 group-hover:text-neutral-200 transition-colors">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl ${step.color.bg} ${step.color.border} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className={`w-6 h-6 ${step.color.icon}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-medium text-neutral-900 mb-3">{step.title}</h3>
                <p className="text-neutral-500 leading-relaxed mb-6">{step.description}</p>
                
                {/* Detail badge */}
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${step.color.bg} text-sm ${step.color.icon} font-medium`}>
                  <div className={`w-1.5 h-1.5 rounded-full bg-current`} />
                  {step.detail}
                </span>
              </div>

              {/* Connector arrow - only between items */}
              {index < steps.length - 1 && index !== 2 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                  <motion.div 
                    className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-sm"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </motion.div>
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
          className="mt-16 pt-8 border-t border-neutral-100"
        >
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4 max-w-xl">
            <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
            <span className="text-neutral-700">Full support from our investor relations team at every step</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
