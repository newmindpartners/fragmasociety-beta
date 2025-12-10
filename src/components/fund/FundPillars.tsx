import { motion } from "framer-motion";
import { Factory, Cpu, Server, Network } from "lucide-react";

export const FundPillars = () => {
  const pillars = [
    {
      icon: Factory,
      title: "SME Private Credit & Bonds",
      description: "Growth and transition SMEs financing expansion, acquisitions and capex via senior-secured loans, revenue-linked notes and selected mezzanine structures. Focus on strong underwriting, collateral and covenant discipline."
    },
    {
      icon: Cpu,
      title: "BTC Mining Revenue Strategies",
      description: "Structured exposure to professional mining operators through hashrate contracts and revenue-share notes, with emphasis on low-cost power, modern fleets, geographic diversification and stress-tested economics."
    },
    {
      icon: Server,
      title: "AI / HPC Datacenter Infrastructure",
      description: "GPU clusters and high-density datacenter capacity contracted to AI/ML and enterprise clients under long-term leases and compute-as-a-service agreements, combining infra-like visibility with AI growth upside."
    },
    {
      icon: Network,
      title: "Fragma Ecosystem Equity",
      description: "High-conviction equity and equity-linked positions in digital infrastructure, tokenisation, fintech and AI/data companies, leveraging Fragma's proprietary deal flow, tokenisation rails and network for value creation and exit routes."
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
            Four pillars of the portfolio.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card/50 border border-border rounded-xl p-8 hover:border-primary/30 transition-all group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <pillar.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
