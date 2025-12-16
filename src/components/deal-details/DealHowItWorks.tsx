import { motion } from "framer-motion";
import { 
  UserCheck, 
  FileText, 
  CreditCard, 
  Coins, 
  TrendingUp, 
  ArrowRightLeft,
  CheckCircle
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserCheck,
    title: "Express Interest",
    description: "Register your interest and complete investor verification (KYC/AML). This ensures compliance and protects all parties.",
    detail: "Takes 5-10 minutes",
  },
  {
    number: "02",
    icon: FileText,
    title: "Review Documents",
    description: "Access full documentation including term sheet, subscription agreement, and risk disclosures. Take time to understand the opportunity.",
    detail: "All documents available",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Subscribe & Fund",
    description: "Complete subscription and transfer funds. Your investment is held securely until the raise closes.",
    detail: "Bank transfer or crypto",
  },
  {
    number: "04",
    icon: Coins,
    title: "Receive Tokens",
    description: "Upon successful close, tokens representing your ownership are issued directly to your wallet. You now hold a fractional stake.",
    detail: "Non-custodial ownership",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Earn Distributions",
    description: "Receive automated payouts when revenue events occur or at scheduled intervals, directly to your wallet.",
    detail: "Automated distributions",
  },
  {
    number: "06",
    icon: ArrowRightLeft,
    title: "Trade on Secondary",
    description: "Need liquidity? List your position on the Fragma secondary marketplace and trade with other investors.",
    detail: "Exit when you want",
  },
];

export const DealHowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-foreground">How It </span>
            <span className="bg-gradient-to-r from-primary via-[hsl(175,70%,50%)] to-primary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From expressing interest to receiving returns - your investment journey
          </p>
        </motion.div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
              )}

              <div className="flex gap-6 mb-8">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center"
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-background text-[10px] font-bold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/20 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                      <span className="flex-shrink-0 px-3 py-1 rounded-full bg-white/10 text-[11px] text-white/70 whitespace-nowrap">
                        {step.detail}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="max-w-2xl mx-auto mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Full support from our investor relations team at every step</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
