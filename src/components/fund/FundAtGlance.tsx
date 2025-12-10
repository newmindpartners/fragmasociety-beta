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

  return (
    <section className="py-24 bg-navy-surface">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            A single institutional note for diversified yield and growth.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <card.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
              <h3 className="text-lg font-serif font-bold text-foreground mb-3">{card.subtitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
