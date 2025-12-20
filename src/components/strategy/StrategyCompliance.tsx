import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scale, Shield, Eye, FileCheck, BadgeCheck } from "lucide-react";

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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section 
      ref={ref}
      className="relative py-32 overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 30% 20%, hsl(172 83% 50% / 0.03) 0%, transparent 50%),
          radial-gradient(ellipse at 70% 80%, hsl(204 100% 60% / 0.02) 0%, transparent 50%),
          linear-gradient(180deg, hsl(225 65% 6%) 0%, hsl(230 50% 3%) 50%, hsl(225 65% 6%) 100%)
        `
      }}
    >
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center"
        >
          {/* Top Icon Badge */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center border border-primary/20">
                <FileCheck className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-primary/10 blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6 tracking-tight"
          >
            Regulations Integrated at{" "}
            <span className="text-gradient">Architecture Level</span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-20 leading-relaxed"
          >
            Built-in compliance frameworks ensuring your business meets all regulatory standards from day one
          </motion.p>

          {/* Compliance Cards */}
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto mb-16"
          >
            {complianceItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative h-full p-8 lg:p-10 rounded-2xl bg-card/40 border border-border/40 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:bg-card/60">
                  {/* Card glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon */}
                  <div className="relative mb-8">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center border border-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
                      <item.icon className="w-7 h-7 text-primary transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="relative text-xl lg:text-2xl font-serif font-medium text-foreground mb-4 text-left">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="relative text-muted-foreground leading-relaxed text-left">
                    {item.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Statement */}
          <motion.div 
            variants={itemVariants}
            className="relative max-w-3xl mx-auto"
          >
            <div className="relative p-8 md:p-10 rounded-2xl border border-border/30 bg-card/20 backdrop-blur-sm">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-primary/30 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-primary/30 rounded-br-2xl" />
              
              <div className="flex items-center justify-center gap-3 mb-4">
                <BadgeCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary tracking-wider uppercase">Platform Architecture</span>
              </div>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic font-serif">
                "Our platform architecture integrates regulatory compliance at every layer, ensuring seamless adherence to evolving financial regulations while maintaining operational efficiency."
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 blur-[100px] rounded-full" />
    </section>
  );
};
