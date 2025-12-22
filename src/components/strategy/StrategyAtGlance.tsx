import { motion } from "framer-motion";
import { Target, Users, Shield, AlertTriangle, Globe } from "lucide-react";

export const StrategyAtGlance = () => {
  const cards = [
    {
      icon: Target,
      title: "Instrument",
      subtitle: "Luxembourg Securitisation",
      description: "A regulated Luxembourg securitisation vehicle with ring-fenced compartments. Each project is legally separated for investor protection."
    },
    {
      icon: Users,
      title: "Designed For",
      subtitle: "Qualified Investors",
      description: "Certain opportunities are only available to professional or qualified investors. Availability depends on your country of residence and investor profile."
    },
    {
      icon: Shield,
      title: "Strategy",
      subtitle: "Dual-engine approach",
      description: "Income-focused strategies with potential for regular distributions and capital growth through digital infrastructure and real-world assets."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-slate-800/50 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block text-violet-400 text-xs font-medium tracking-[0.2em] uppercase mb-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            At a Glance
          </motion.span>
          <h2 
            className="text-3xl lg:text-4xl font-light text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Luxembourg-based securitisation platform
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto text-sm leading-relaxed">
            Fragma transforms real estate, digital infrastructure, and alternative assets into 
            fractional, tokenized investment products with professional governance.
          </p>
        </motion.div>

        {/* Risk Warning */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-200/80">
              <p className="font-medium mb-1">Important Risk Information</p>
              <p className="text-xs">Investments are high-risk, illiquid and speculative. You may lose all or part of your invested capital. Returns are not guaranteed. Capital at risk.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {cards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors duration-300 group"
            >
              <motion.div 
                className="w-14 h-14 mb-6 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <card.icon className="w-7 h-7 text-violet-400" />
              </motion.div>
              <p className="text-xs text-violet-400 font-medium tracking-wider uppercase mb-1">{card.title}</p>
              <h3 className="text-xl font-medium text-white mb-4 group-hover:text-violet-200 transition-colors duration-300" style={{ fontFamily: "'Playfair Display', serif" }}>
                {card.subtitle}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Access Restriction Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="w-5 h-5 text-white/70" />
              <span className="font-medium text-white">Access Restrictions Apply</span>
            </div>
            <p className="text-sm text-white/50 text-center leading-relaxed">
              Certain opportunities are only available to professional or qualified investors. 
              Availability depends on your country of residence and investor profile. 
              Detailed terms and specific investment parameters are available to verified investors only.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
