import { motion } from "framer-motion";
import { Building2, Landmark, Server, Gem } from "lucide-react";

// Import strategy background images
import smeCreditBg from "@/assets/strategy-sme-credit.jpg";
import btcMiningBg from "@/assets/strategy-btc-mining.jpg";
import aiInfraBg from "@/assets/strategy-ai-infrastructure.jpg";
import ecosystemBg from "@/assets/strategy-ecosystem.jpg";

export const StrategyPillars = () => {
  const pillars = [
    {
      icon: Building2,
      title: "Prime Real Estate",
      description: "Curated residential and commercial opportunities in high-demand markets. Development, repositioning, and income-generating assets.",
      bgImage: smeCreditBg,
      allocation: "30-40%"
    },
    {
      icon: Landmark,
      title: "Private Credit",
      description: "Senior-secured lending to established businesses with stable cash flows. Consistent income with downside protection.",
      bgImage: btcMiningBg,
      allocation: "25-35%"
    },
    {
      icon: Server,
      title: "Digital Infrastructure",
      description: "GPU clusters, data centers, and compute capacity powering AI and enterprise workloads under long-term contracts.",
      bgImage: aiInfraBg,
      allocation: "15-25%"
    },
    {
      icon: Gem,
      title: "Signature Deals",
      description: "Exclusive co-investment opportunities in exceptional assets—from film finance to luxury collectibles.",
      bgImage: ecosystemBg,
      allocation: "10-20%"
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
      transition: { duration: 0.7 }
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-slate-200/50 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-100 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block text-slate-500 text-xs font-medium tracking-[0.2em] uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What You Get
          </motion.span>
          <h2 
            className="text-3xl lg:text-4xl font-light text-slate-900 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Broad exposure, carefully balanced
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Each allocation is weighted for risk-adjusted returns. 
            You get the diversification of a fund with the selectivity of direct investment.
          </p>
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
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative rounded-2xl overflow-hidden group"
            >
              {/* Background Image with Blur */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img 
                  src={pillar.bgImage} 
                  alt="" 
                  className="w-full h-full object-cover scale-110 blur-[2px] group-hover:scale-115 group-hover:blur-[1px] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-white/88 group-hover:bg-white/85 transition-colors duration-500" />
              </div>
              
              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-slate-200 group-hover:border-slate-300 transition-colors duration-300" />
              
              {/* Content */}
              <div className="relative z-10 p-8 h-full">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="w-16 h-16 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200/80 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <pillar.icon className="w-7 h-7 text-slate-600" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 
                        className="text-xl font-medium text-slate-900 group-hover:text-slate-700 transition-colors duration-300" 
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {pillar.title}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full border bg-slate-100 text-slate-600 border-slate-200">
                        {pillar.allocation}
                      </span>
                    </div>
                    <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-600 transition-colors duration-300">
                      {pillar.description}
                    </p>
                  </div>
                </div>
                
                {/* Number */}
                <div 
                  className="absolute top-6 right-6 text-6xl font-light text-slate-200/80 select-none" 
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
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
