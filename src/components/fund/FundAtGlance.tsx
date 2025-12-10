import { motion } from "framer-motion";
import { Target, Users, Shield } from "lucide-react";

export const FundAtGlance = () => {
  const cards = [
    {
      icon: Target,
      title: "Instrument",
      subtitle: "Fragma Institutional Performance Note",
      description: "Single flagship note class issued by a Luxembourg securitisation vehicle; all investors share the same risk–return profile and alignment with the Manager."
    },
    {
      icon: Users,
      title: "Investors",
      subtitle: "Designed for",
      description: "Family offices, UHNWIs, holding companies and professional / institutional investors seeking 8%+ distribution objectives with upside in digital infrastructure and tokenisation."
    },
    {
      icon: Shield,
      title: "Profile",
      subtitle: "Dual-engine profile",
      description: "~60% Income Sleeve (SME credit, BTC mining, AI/HPC infra) + ~40% Equity Sleeve (Fragma ecosystem equity and digital infra)."
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-24 bg-navy-surface relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            At a Glance
          </motion.span>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            A single institutional note for diversified yield and growth.
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="card-premium p-8 group"
            >
              <motion.div 
                className="icon-premium w-14 h-14 mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <card.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <p className="text-sm text-primary font-medium tracking-wide mb-1">{card.title}</p>
              <h3 className="text-xl font-serif font-bold text-foreground mb-4 group-hover:text-gradient transition-all duration-300">{card.subtitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
