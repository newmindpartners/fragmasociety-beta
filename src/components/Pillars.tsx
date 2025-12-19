import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pillars = [
  { 
    label: "OWN", 
    title: "Fractional Stakes", 
    desc: "Access tokenized slices of properties and portfolios. Diversify without millions." 
  },
  { 
    label: "EARN", 
    title: "Automated Yield", 
    desc: "Smart contracts handle payouts directly to your wallet with full traceability." 
  },
  { 
    label: "EXIT", 
    title: "Secondary Market", 
    desc: "List, bid and trade tokens when buyers are available. No paperwork." 
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const Pillars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative w-full py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl font-serif font-bold text-foreground text-center mb-16"
        >
          Own. Earn. Exit.
        </motion.h2>
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-8"
        >
          {pillars.map((item, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative p-8 rounded-2xl bg-gradient-card border border-foreground/5 text-center hover:border-primary/30 transition-colors"
            >
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
                className="text-primary font-bold tracking-widest mb-4"
              >
                {item.label}
              </motion.div>
              <h3 className="text-foreground text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
