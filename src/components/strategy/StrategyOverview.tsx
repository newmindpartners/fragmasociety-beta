import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const StrategyDonut = () => (
  <div className="relative w-64 h-64">
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"
    />
    
    <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 relative z-10">
      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
      <motion.circle
        cx="50" cy="50" r="40"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="8"
        strokeDasharray="150.8 251.3"
        initial={{ strokeDashoffset: 251.3 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
      />
      <motion.circle
        cx="50" cy="50" r="40"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="8"
        strokeDasharray="100.5 251.3"
        strokeDashoffset="-150.8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.5 }}
      />
    </svg>
    
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
      <span className="text-3xl font-bold text-foreground">60/40</span>
      <span className="text-sm text-muted-foreground">Split</span>
    </div>
  </div>
);

export const StrategyOverview = () => {
  const incomeBullets = [
    {
      title: "SME bonds & private credit",
      description: "Senior and senior-secured loans, revenue-linked notes and selected mezzanine, typically 2–5 years."
    },
    {
      title: "BTC mining revenue strategies",
      description: "Hashrate contracts, revenue-share notes and mining-linked structured products with professional operators."
    },
    {
      title: "AI / HPC datacenter infrastructure",
      description: "GPU and compute capacity leased under long-term contracts for AI and high-performance computing workloads."
    }
  ];

  const equityBullets = [
    "Equity and equity-linked positions in digital infrastructure, fintech/Web3 infrastructure, AI/data & compute.",
    "Instruments include common / preferred equity, convertibles, SAFEs and structured equity.",
    "Focus on the Fragma ecosystem and digital infrastructure opportunities."
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
            Dual engine: cashflow today, growth for tomorrow.
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            The Strategy is structured around two complementary engines. The Income Sleeve supports regular distributions. The Equity Sleeve provides growth potential from the Fragma ecosystem.
          </p>
        </motion.div>

        {/* Risk disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-200/80">
              All target returns are illustrative only and not guaranteed. Actual results may be materially lower or higher. Past performance is not a reliable indicator of future results.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <StrategyDonut />
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-primary" />
                <h3 className="text-xl font-serif font-bold text-foreground">Income Sleeve (~60% NAV)</h3>
              </div>
              <p className="text-sm text-primary mb-4">Contractual and quasi-contractual income.</p>
              <ul className="space-y-3">
                {incomeBullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{bullet.title}</span> – {bullet.description}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-accent" />
                <h3 className="text-xl font-serif font-bold text-foreground">Equity Sleeve (~40% NAV)</h3>
              </div>
              <p className="text-sm text-accent mb-4">Growth equity in the Fragma ecosystem.</p>
              <ul className="space-y-2">
                {equityBullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
