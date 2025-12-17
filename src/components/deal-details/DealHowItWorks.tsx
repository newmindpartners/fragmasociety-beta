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

// Step graphics
const StepGraphic = ({ index, isHovered }: { index: number; isHovered: boolean }) => {
  const graphics = [
    <svg viewBox="0 0 48 48" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M12 40 C12 32 18 28 24 28 C30 28 36 32 36 40" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>,
    <svg viewBox="0 0 48 48" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M14 18 L34 18 M14 26 L28 26 M14 34 L22 34" stroke="currentColor" strokeWidth="1" />
    </svg>,
    <svg viewBox="0 0 48 48" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <rect x="8" y="14" width="32" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M8 22 L40 22" stroke="currentColor" strokeWidth="1" />
      <rect x="12" y="28" width="8" height="4" stroke="currentColor" strokeWidth="0.75" fill="none" />
    </svg>,
    <svg viewBox="0 0 48 48" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
    </svg>,
    <svg viewBox="0 0 48 48" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <path d="M8 36 L18 26 L28 32 L40 16" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="40" cy="16" r="3" fill="currentColor" />
    </svg>,
    <svg viewBox="0 0 48 48" className={`w-full h-full transition-colors duration-500 ${isHovered ? 'text-white' : 'text-slate-900'}`}>
      <path d="M12 24 L20 24 M28 24 L36 24" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 20 L12 24 L16 28 M32 20 L36 24 L32 28" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="24" cy="24" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>,
  ];
  return graphics[index % graphics.length];
};

export const DealHowItWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Light Grey Studio Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-radial from-white/80 via-slate-50/40 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-gradient-radial from-slate-200/50 via-slate-100/30 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-px bg-slate-400" />
            <span className="text-xs tracking-[0.4em] uppercase text-slate-500 font-medium">
              Process
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.1]"
          >
            How it <span className="italic text-slate-500 font-serif">works</span>
          </motion.h2>
        </div>

        {/* Steps Grid */}
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
                <motion.div 
                  className={`relative p-8 h-full overflow-hidden transition-all duration-500 ${
                    isHovered ? 'bg-slate-800' : 'bg-white border border-slate-200/50'
                  }`}
                  animate={{ 
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.02 : 1 
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Decorative graphic */}
                  <div className={`absolute top-6 right-6 w-12 h-12 transition-opacity duration-500 ${isHovered ? 'opacity-10' : 'opacity-[0.04]'}`}>
                    <StepGraphic index={index} isHovered={isHovered} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Step number */}
                    <motion.div 
                      className="mb-8"
                      animate={{ 
                        scale: isHovered ? 1.1 : 1,
                        x: isHovered ? 8 : 0 
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className={`text-6xl font-extralight transition-colors duration-500 font-serif ${
                        isHovered ? 'text-slate-600' : 'text-slate-200'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-14 h-14 border flex items-center justify-center mb-6 transition-all duration-500 ${
                        isHovered 
                          ? 'border-slate-600 bg-slate-700' 
                          : 'border-slate-200 bg-slate-50'
                      }`}
                      animate={{ 
                        rotate: isHovered ? 6 : 0,
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className={`w-6 h-6 transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-slate-500'
                      }`} />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.h3 
                      className={`text-lg font-medium mb-3 transition-colors duration-500 ${
                        isHovered ? 'text-white' : 'text-slate-900'
                      }`}
                      animate={{ y: isHovered ? -2 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    <p className={`text-sm leading-relaxed font-light mb-6 transition-colors duration-500 ${
                      isHovered ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {step.description}
                    </p>
                    
                    {/* Detail badge */}
                    <motion.span 
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs transition-all duration-500 ${
                        isHovered 
                          ? 'bg-slate-700 text-slate-300 border border-slate-600' 
                          : 'bg-slate-50 text-slate-600 border border-slate-200'
                      }`}
                      animate={{ scale: isHovered ? 1.05 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                          isHovered ? 'bg-slate-400' : 'bg-slate-400'
                        }`}
                        animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      {step.detail}
                    </motion.span>
                  </div>

                  {/* Bottom accent */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.div>

                {/* Connector arrow */}
                {index < steps.length - 1 && index !== 2 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <motion.div 
                      className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ${
                        isHovered ? 'bg-slate-800' : 'bg-white border border-slate-200'
                      }`}
                      animate={{ 
                        scale: isHovered ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowRight className={`w-3 h-3 transition-colors duration-300 ${
                        isHovered ? 'text-white' : 'text-slate-400'
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
          className="mt-16 pt-8 border-t border-slate-200/50"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-2 h-2 rounded-full bg-slate-600"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-slate-500 font-light">Full support from our investor relations team at every step</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
