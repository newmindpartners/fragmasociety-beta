import { motion } from "framer-motion";
import { Building2, Globe, ShieldCheck } from "lucide-react";

export const FundStructure = () => {
  const columns = [
    {
      icon: Building2,
      title: "Structure",
      points: [
        "Luxembourg securitisation vehicle under the Securitisation Law of 22 March 2004 (as amended).",
        "One or more ring-fenced compartments; no cross-contamination between strategies.",
        "Notes are direct, unsecured, limited-recourse obligations of the Issuer; recourse limited to the relevant compartment."
      ]
    },
    {
      icon: Globe,
      title: "Tax & Efficiency",
      points: [
        "Investor payments structured as deductible expenses at vehicle level, targeting tax neutrality.",
        "Intention to pay non-resident investors without Luxembourg withholding tax on interest or redemption, subject to final structuring and law.",
        "Result: economic single layer of taxation, typically in the investor's home jurisdiction."
      ]
    },
    {
      icon: ShieldCheck,
      title: "Governance & Reporting",
      points: [
        "Independent board with clear separation of duties among Manager, administrator, auditor, paying agent and legal counsel.",
        "Quarterly NAV and performance reports, plus audited annual financials.",
        "Transparent breakdown between Income and Equity contributions, key risk metrics and portfolio concentration."
      ]
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
            Luxembourg securitisation. Single-layer taxation. Institutional governance.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {columns.map((column, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <column.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground">{column.title}</h3>
              </div>
              <ul className="space-y-4">
                {column.points.map((point, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-1">•</span>
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
