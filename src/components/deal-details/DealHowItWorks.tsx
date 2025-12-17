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

// Background image
import howItWorksBg from "@/assets/how-it-works-hero-bg.jpg";

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
    <section className="py-32 relative overflow-hidden min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={howItWorksBg} 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7F5]/95 via-[#F8F7F5]/90 to-[#F8F7F5]/95" />
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
            <div className="w-12 h-px bg-neutral-400" />
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

        {/* Steps - Glassmorphism Cards */}
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
                  className="relative p-8 h-full overflow-hidden"
                  style={{
                    background: isHovered 
                      ? 'linear-gradient(135deg, rgba(225,240,245,0.95) 0%, rgba(255,255,255,0.9) 100%)'
                      : 'rgba(255, 255, 255, 0.65)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: isHovered ? '1px solid rgba(0, 200, 180, 0.3)' : '1px solid rgba(0, 0, 0, 0.06)',
                    boxShadow: isHovered 
                      ? '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 200, 180, 0.1)'
                      : '0 4px 20px -5px rgba(0, 0, 0, 0.06)',
                  }}
                  animate={{ 
                    y: isHovered ? -8 : 0,
                    scale: isHovered ? 1.02 : 1 
                  }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                    <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-primary/10 via-transparent to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
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
                      <span className={`text-6xl font-extralight transition-colors duration-500 ${
                        isHovered ? 'text-primary/60' : 'text-neutral-200'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </motion.div>
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-14 h-14 border flex items-center justify-center mb-6 transition-all duration-500 ${
                        isHovered 
                          ? 'border-primary/40 bg-primary/10 shadow-lg shadow-primary/20' 
                          : 'border-neutral-200/80 bg-white/50'
                      }`}
                      animate={{ 
                        rotate: isHovered ? 6 : 0,
                        scale: isHovered ? 1.1 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className={`w-6 h-6 transition-colors duration-500 ${
                        isHovered ? 'text-primary' : 'text-neutral-400'
                      }`} />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.h3 
                      className={`text-lg font-medium mb-3 transition-colors duration-500 ${
                        isHovered ? 'text-neutral-900' : 'text-neutral-800'
                      }`}
                      animate={{ y: isHovered ? -2 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    
                    <p className={`text-sm leading-relaxed font-light mb-6 transition-colors duration-500 ${
                      isHovered ? 'text-neutral-600' : 'text-neutral-500'
                    }`}>
                      {step.description}
                    </p>
                    
                    {/* Detail badge */}
                    <motion.span 
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs transition-all duration-500 ${
                        isHovered 
                          ? 'bg-primary/15 text-primary border border-primary/20' 
                          : 'bg-white/60 text-neutral-600 border border-neutral-200/50'
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
                  </div>

                  {/* Bottom accent */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? '100%' : 0 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Corner accent */}
                  <motion.div 
                    className="absolute top-0 right-0 w-16 h-16 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent -translate-y-1/2 translate-x-1/2 rotate-45" />
                  </motion.div>
                </motion.div>

                {/* Connector arrow */}
                {index < steps.length - 1 && index !== 2 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <motion.div 
                      className="w-6 h-6 bg-white/80 backdrop-blur border border-neutral-200/50 flex items-center justify-center shadow-sm"
                      animate={{ 
                        scale: isHovered ? 1.2 : 1,
                        backgroundColor: isHovered ? 'hsl(172, 83%, 50%)' : 'rgba(255,255,255,0.8)'
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
          className="mt-16 pt-8 border-t border-neutral-200/50"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-neutral-500 font-light">Full support from our investor relations team at every step</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
