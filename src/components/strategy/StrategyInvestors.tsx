import { motion } from "framer-motion";
import { Users, Building, Landmark } from "lucide-react";

export const StrategyInvestors = () => {
  const personas = [
    {
      icon: Users,
      title: "Family Offices & UHNWIs",
      points: [
        "Seeking income-focused strategies with growth potential.",
        "Preference for single-vehicle exposure instead of multiple direct mandates.",
        "Ability to invest via holding or family office structures."
      ]
    },
    {
      icon: Building,
      title: "Holding Companies & Corporates",
      points: [
        "Seek diversified private credit and digital infrastructure within one note.",
        "Benefit from Luxembourg securitisation and ring-fencing."
      ]
    },
    {
      icon: Landmark,
      title: "Professional & Institutional Investors",
      points: [
        "Require compliance-by-design tokenisation infrastructure and robust governance.",
        "Interested in allocation to SME credit + digital infra through a professionally managed structure."
      ]
    }
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Built for sophisticated capital looking for real yield and growth.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-background border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                <persona.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-serif font-bold text-foreground mb-4">{persona.title}</h3>
              <ul className="space-y-3">
                {persona.points.map((point, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
