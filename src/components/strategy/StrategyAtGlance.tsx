import { motion } from "framer-motion";
import { Target, Layers, TrendingUp, AlertTriangle, Clock } from "lucide-react";

export const StrategyAtGlance = () => {
  const benefits = [
    {
      icon: Target,
      title: "Pre-Vetted Quality",
      description: "Every opportunity passes our rigorous due diligence. We reject more than we accept."
    },
    {
      icon: Layers,
      title: "Built-In Diversification",
      description: "Automatic exposure across real estate, private credit, and digital infrastructure."
    },
    {
      icon: TrendingUp,
      title: "Aligned Incentives",
      description: "We invest alongside you. Our returns depend on your returns."
    },
    {
      icon: Clock,
      title: "Time Reclaimed",
      description: "No deal-by-deal decisions. One allocation, ongoing access to our best ideas."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-slate-100/80 rounded-full blur-[120px]" />
      
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
            The Advantage
          </motion.span>
          <h2 
            className="text-3xl lg:text-4xl font-light text-slate-900 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why investors choose
            <br />
            <span className="text-slate-600">the managed approach</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Evaluating deals takes time. Structuring takes expertise. 
            Fragma One handles both—so you can focus on what matters.
          </p>
        </motion.div>

        {/* Risk Warning */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-12 p-4 rounded-xl bg-amber-50 border border-amber-200"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">Capital at Risk</p>
              <p className="text-xs text-amber-700">
                Alternative investments are illiquid and speculative. Past performance does not guarantee future results. 
                You may lose some or all of your investment.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="relative p-8 rounded-2xl bg-gradient-to-b from-slate-50/80 to-white border border-slate-200/60 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
            >
              <motion.div 
                className="w-14 h-14 mb-6 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-slate-200/80 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <benefit.icon className="w-6 h-6 text-slate-600" />
              </motion.div>
              <h3 
                className="text-lg font-medium text-slate-900 mb-3 group-hover:text-slate-700 transition-colors duration-300"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {benefit.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
