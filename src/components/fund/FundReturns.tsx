import { motion } from "framer-motion";

export const FundReturns = () => {
  const distributionLadder = [
    { value: "8%", label: "p.a.", description: "Minimum distribution objective (\"8% Floor\")", highlight: true },
    { value: "10–12%", label: "p.a.", description: "Target annual distribution range" },
    { value: "12–15%", label: "p.a.", description: "Illustrative target net IRR (5–7 year horizon)" }
  ];

  const waterfall = [
    "Operating expenses & debt service (if any).",
    "Distributions to investors up to the 8% Floor.",
    "Allocation to the Distribution Reserve Account until 1–2 years of 8% distributions are provisioned (market conditions permitting).",
    "Top-up distributions and performance remuneration as available above the Floor and Reserve."
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Engineered for resilient distributions with upside.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Distribution Ladder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-6">Distribution Profile</h3>
            <div className="space-y-4">
              {distributionLadder.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${
                    item.highlight 
                      ? 'bg-primary/10 border-primary/30' 
                      : 'bg-card border-border'
                  }`}
                >
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className={`text-2xl font-bold ${item.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {item.value}
                    </span>
                    <span className="text-muted-foreground">{item.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              All combining Income Sleeve cashflows and realised equity gains, net of Fund-level fees and expenses.
            </p>
          </motion.div>

          {/* Waterfall */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-6">Distribution Waterfall</h3>
            <div className="relative">
              {waterfall.map((step, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    {index < waterfall.length - 1 && (
                      <div className="w-px h-full bg-border flex-1 my-2" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-muted-foreground">{step}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4 p-4 bg-card rounded-lg border border-border">
              Performance fees only accrue after the 8% Floor and Reserve targets are satisfied, with Manager co-investment ensuring alignment.
            </p>
          </motion.div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-12">
          All figures are investment objectives only and not guarantees. Actual returns may be materially lower or higher.
        </p>
      </div>
    </section>
  );
};
