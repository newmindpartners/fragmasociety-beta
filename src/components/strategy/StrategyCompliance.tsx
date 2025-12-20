import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, Shield, Eye, FileCheck } from "lucide-react";

const complianceItems = [
  {
    icon: Scale,
    title: "MiCA Compliance",
    description: "Native compliance with Crypto-asset Markets regulations, anticipating future directives."
  },
  {
    icon: Shield,
    title: "AMLD5 Integration",
    description: "Robust anti-money laundering procedures built into every transaction and verification."
  },
  {
    icon: Eye,
    title: "GDPR Protection",
    description: "Selective data disclosure and complete auditability respecting user privacy."
  }
];

export const StrategyCompliance = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section 
      ref={ref}
      className="relative py-20 md:py-28 overflow-hidden bg-[#f8fafc]"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white/80" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Icon */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="flex justify-center mb-6"
          >
            <div className="w-14 h-14 rounded-xl bg-[#1e40af]/5 border border-[#1e40af]/10 flex items-center justify-center">
              <FileCheck className="w-7 h-7 text-[#1e40af]" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#0f172a] mb-5 tracking-tight leading-tight"
          >
            Regulations Integrated at Architecture Level
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-base md:text-lg text-[#64748b] max-w-xl mx-auto mb-14 leading-relaxed"
          >
            Built-in compliance frameworks ensuring your business meets all regulatory standards from day one
          </motion.p>

          {/* Compliance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-14">
            {complianceItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.7, 
                  delay: 0.3 + index * 0.1, 
                  ease: [0.22, 1, 0.36, 1] as const 
                }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="group relative"
              >
                <div className="relative h-full p-7 lg:p-8 rounded-2xl bg-white border border-[#e2e8f0] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-400 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#1e40af]/20">
                  {/* Icon */}
                  <motion.div 
                    className="mb-5"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#1e40af]/5 border border-[#1e40af]/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#1e40af]/8 group-hover:border-[#1e40af]/20">
                      <item.icon className="w-6 h-6 text-[#1e40af]" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-xl font-semibold text-[#0f172a] mb-3 text-left font-sans">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#64748b] leading-relaxed text-left text-sm lg:text-base">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Statement */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="text-sm md:text-base text-[#64748b] max-w-2xl mx-auto leading-relaxed italic"
          >
            Our platform architecture integrates regulatory compliance at every layer, ensuring seamless adherence to evolving financial regulations while maintaining operational efficiency.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
