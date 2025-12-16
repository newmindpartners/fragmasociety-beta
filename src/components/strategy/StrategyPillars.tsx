import { motion } from "framer-motion";
import { Factory, Cpu, Server, Network } from "lucide-react";

// Import strategy background images (same as hero section)
import smeCreditBg from "@/assets/strategy-sme-credit.jpg";
import btcMiningBg from "@/assets/strategy-btc-mining.jpg";
import aiInfraBg from "@/assets/strategy-ai-infrastructure.jpg";
import ecosystemBg from "@/assets/strategy-ecosystem.jpg";

export const StrategyPillars = () => {
  const pillars = [
    {
      icon: Factory,
      title: "SME Private Credit & Bonds",
      description: "Growth and transition SMEs financing expansion, acquisitions and capex via senior-secured loans, revenue-linked notes and selected mezzanine structures.",
      color: "from-emerald-500/20 to-primary/20",
      bgImage: smeCreditBg
    },
    {
      icon: Cpu,
      title: "BTC Mining Revenue Strategies",
      description: "Structured exposure to professional mining operators through hashrate contracts and revenue-share notes, with emphasis on low-cost power and modern fleets.",
      color: "from-amber-500/20 to-orange-500/20",
      bgImage: btcMiningBg
    },
    {
      icon: Server,
      title: "AI / HPC Datacenter Infrastructure",
      description: "GPU clusters and high-density datacenter capacity contracted to AI/ML and enterprise clients under long-term leases and compute-as-a-service agreements.",
      color: "from-violet-500/20 to-purple-500/20",
      bgImage: aiInfraBg
    },
    {
      icon: Network,
      title: "Fragma Ecosystem Equity",
      description: "Equity and equity-linked positions in digital infrastructure, tokenisation, fintech and AI/data companies within the Fragma network.",
      color: "from-primary/20 to-accent/20",
      bgImage: ecosystemBg
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
    <section className="py-24 bg-card relative overflow-hidden">
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
              className="relative rounded-2xl overflow-hidden group"
            >
              {/* Animated Border Glow */}
              <motion.div 
                className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  backgroundPosition: ['200% 0', '-200% 0'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% 100%' }}
              />
              
              {/* Static Border Glow on Hover */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Background Image with Blur */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img 
                  src={pillar.bgImage} 
                  alt="" 
                  className="w-full h-full object-cover scale-110 blur-[2px] group-hover:scale-115 group-hover:blur-[1px] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-background/80 group-hover:bg-background/75 transition-colors duration-500" />
              </div>
              
              {/* Glass Content Layer */}
              <div className="relative z-10 p-8 backdrop-blur-sm bg-white/5 border border-white/10 group-hover:border-white/20 rounded-2xl h-full transition-colors duration-500">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className={`icon-premium w-16 h-16 shrink-0 bg-gradient-to-br ${pillar.color}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <pillar.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-white transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed group-hover:text-white/80 transition-colors duration-300">{pillar.description}</p>
                  </div>
                </div>
                
                <div className="absolute top-6 right-6 text-6xl font-serif font-bold text-white/10 select-none">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
