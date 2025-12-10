import { motion } from "framer-motion";
import { Factory, Cpu, Server, Network } from "lucide-react";

export const FundPillars = () => {
  const pillars = [
    {
      icon: Factory,
      title: "SME Private Credit & Bonds",
      description: "Growth and transition SMEs financing expansion, acquisitions and capex via senior-secured loans, revenue-linked notes and selected mezzanine structures. Focus on strong underwriting, collateral and covenant discipline.",
      color: "from-emerald-500/20 to-primary/20"
    },
    {
      icon: Cpu,
      title: "BTC Mining Revenue Strategies",
      description: "Structured exposure to professional mining operators through hashrate contracts and revenue-share notes, with emphasis on low-cost power, modern fleets, geographic diversification and stress-tested economics.",
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      icon: Server,
      title: "AI / HPC Datacenter Infrastructure",
      description: "GPU clusters and high-density datacenter capacity contracted to AI/ML and enterprise clients under long-term leases and compute-as-a-service agreements, combining infra-like visibility with AI growth upside.",
      color: "from-violet-500/20 to-purple-500/20"
    },
    {
      icon: Network,
      title: "Fragma Ecosystem Equity",
      description: "High-conviction equity and equity-linked positions in digital infrastructure, tokenisation, fintech and AI/data companies, leveraging Fragma's proprietary deal flow, tokenisation rails and network for value creation and exit routes.",
      color: "from-primary/20 to-accent/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7
      }
    }
  };

  return (
    <section className="py-24 bg-navy-surface relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Investment Strategy
          </motion.span>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground">
            Four pillars of the portfolio.
          </h2>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="card-premium p-8 group shine"
            >
              <div className="flex items-start gap-6">
                <motion.div 
                  className={`icon-premium w-16 h-16 shrink-0 bg-gradient-to-br ${pillar.color}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <pillar.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              </div>
              
              {/* Subtle number indicator */}
              <div className="absolute top-6 right-6 text-6xl font-serif font-bold text-border/30 select-none">
                {String(index + 1).padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
