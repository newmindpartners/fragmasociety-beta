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
import { useState } from "react";

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

        {/* Steps - Premium Interactive */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative cursor-pointer"
              >
                <div className="bg-white border border-neutral-200 p-8 h-full relative overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl">
                  
                  {/* Hover background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-navy via-navy-surface to-navy opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />

                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Step number - Large watermark */}
                    <motion.div 
                      className="mb-8"
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        x: isHovered ? 10 : 0 
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className={`text-6xl font-extralight transition-colors duration-500 ${
                        isHovered ? 'text-primary' : 'text-neutral-200'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-12 h-12 border flex items-center justify-center mb-6 transition-all duration-500 ${
                        isHovered ? 'border-primary/50 bg-primary/10' : 'border-neutral-200'
                      }`}
                      animate={{ 
                        rotate: isHovered ? 6 : 0,
                        scale: isHovered ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className={`w-5 h-5 transition-colors duration-500 ${
                        isHovered ? 'text-primary' : 'text-neutral-400'
                      }`} />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.h3 
                      className={`text-base font-medium mb-3 transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-neutral-900'
                      }`}
                      animate={{ y: isHovered ? -2 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    <p className={`text-sm leading-relaxed font-light mb-6 transition-colors duration-500 ${
                      isHovered ? 'text-white/60' : 'text-neutral-500'
                    }`}>
                      {step.description}
                    </p>
                    
                    {/* Detail badge */}
                    <motion.span 
                      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs transition-all duration-500 ${
                        isHovered 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                      animate={{ scale: isHovered ? 1.05 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                          isHovered ? 'bg-primary' : 'bg-neutral-400'
                        }`}
                        animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      {step.detail}
                    </motion.span>

                    {/* Bottom accent */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                      initial={{ width: 0 }}
                      animate={{ width: isHovered ? '100%' : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </div>

                {/* Connector arrow */}
                {index < steps.length - 1 && index !== 2 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <motion.div 
                      className="w-6 h-6 bg-white border border-neutral-200 flex items-center justify-center shadow-sm"
                      animate={{ 
                        scale: isHovered ? 1.2 : 1,
                        backgroundColor: isHovered ? 'hsl(var(--primary))' : '#fff'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className={`w-3 h-3 transition-colors duration-300 ${
                        isHovered ? 'text-white' : 'text-neutral-400'
                      }`} />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
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
            <motion.div 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-neutral-500 font-light">Full support from our investor relations team at every step</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
