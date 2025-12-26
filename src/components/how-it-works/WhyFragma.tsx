import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, ShieldCheck, ArrowRightLeft } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Real assets. Real proof.",
    description: "Verified documentation and investor-ready structure behind every opportunity.",
    icon: FileCheck
  },
  {
    number: "02",
    title: "Built for trust, not hype.",
    description: "Security-first infrastructure, serious custody standards, and transparent reporting.",
    icon: ShieldCheck
  },
  {
    number: "03",
    title: "Freedom when you need it.",
    description: "Hold for the long term—or exit when liquidity is available. Your life stays flexible.",
    icon: ArrowRightLeft
  }
];

export const WhyFragma = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16 lg:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 leading-[1.1]">
            Own the extraordinary.
            <br />
            <span className="text-muted-foreground">With rules you can trust.</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Fragma offers curated opportunities—built to feel safe, serious, and real.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="group"
            >
              <div className="relative">
                {/* Number */}
                <span className="text-sm font-medium text-muted-foreground/60 tracking-wider mb-4 block">
                  {pillar.number}
                </span>
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-muted/50 border border-border flex items-center justify-center mb-6 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-all duration-300">
                  <pillar.icon className="w-5 h-5 text-muted-foreground group-hover:text-violet-400 transition-colors" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl lg:text-2xl font-medium text-foreground mb-4 leading-tight">
                  {pillar.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
