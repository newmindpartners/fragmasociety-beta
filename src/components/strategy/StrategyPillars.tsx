import { motion } from "framer-motion";
import { Factory, Cpu, Server, Network } from "lucide-react";

// Import strategy background images
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
      bgImage: smeCreditBg,
      category: "Income"
    },
    {
      icon: Cpu,
      title: "BTC Mining Revenue Strategies",
      description: "Structured exposure to professional mining operators through hashrate contracts and revenue-share notes, with emphasis on low-cost power and modern fleets.",
      bgImage: btcMiningBg,
      category: "Income"
    },
    {
      icon: Server,
      title: "AI / HPC Datacenter Infrastructure",
      description: "GPU clusters and high-density datacenter capacity contracted to AI/ML and enterprise clients under long-term leases and compute-as-a-service agreements.",
      bgImage: aiInfraBg,
      category: "Growth"
    },
    {
      icon: Network,
      title: "Fragma Ecosystem Equity",
      description: "Equity and equity-linked positions in digital infrastructure, tokenisation, fintech and AI/data companies within the Fragma network.",
      bgImage: ecosystemBg,
      category: "Growth"
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

  const categoryColors = {
    Income: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Growth: "bg-violet-500/20 text-violet-400 border-violet-500/30"
  };

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-violet-500/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block text-violet-400 text-xs font-medium tracking-[0.2em] uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Investment Strategy
          </motion.span>
          <h2 
            className="text-3xl lg:text-4xl font-light text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Four pillars of the portfolio
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
              {/* Background Image with Blur */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img 
                  src={pillar.bgImage} 
                  alt="" 
                  className="w-full h-full object-cover scale-110 blur-[2px] group-hover:scale-115 group-hover:blur-[1px] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-slate-900/80 group-hover:bg-slate-900/75 transition-colors duration-500" />
              </div>
              
              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-white/20 transition-colors duration-300" />
              
              {/* Content */}
              <div className="relative z-10 p-8 h-full">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="w-16 h-16 shrink-0 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <pillar.icon className="w-8 h-8 text-violet-400" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-medium text-white group-hover:text-violet-200 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {pillar.title}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${categoryColors[pillar.category as keyof typeof categoryColors]}`}>
                        {pillar.category}
                      </span>
                    </div>
                    <p className="text-white/50 leading-relaxed text-sm group-hover:text-white/60 transition-colors duration-300">
                      {pillar.description}
                    </p>
                  </div>
                </div>
                
                {/* Number */}
                <div className="absolute top-6 right-6 text-6xl font-light text-white/5 select-none" style={{ fontFamily: "'Playfair Display', serif" }}>
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
