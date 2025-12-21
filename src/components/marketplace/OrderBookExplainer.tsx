import { motion, AnimatePresence } from "framer-motion";
import { Building2, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const projects = [
  { name: "5901 Filaree Heights", profit: "$7.8M profit" },
  { name: "20737 Cool Oak Way", profit: "$6.0M profit" },
  { name: "2460 Sunset Plaza Dr", profit: "$1.9M profit" },
  { name: "20647 Seaboard Rd", profit: "$645K profit" },
  { name: "8818 Rising Glen Place", profit: "$2.8M profit" },
  { name: "1394 Casiano Rd", profit: "$650K profit" },
  { name: "1061 Loma Vista Dr", profit: "$6.1M profit" },
  { name: "4965 Calvin Avenue", profit: "$980K profit" },
];

export const OrderBookExplainer = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-32 bg-[#0f172a] relative overflow-hidden">
      {/* Subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-16">
          <div className="max-w-2xl mb-8 lg:mb-0">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Case <span className="italic text-violet-300">Studies</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-400 mt-6 leading-relaxed"
            >
              Detailed look at our most successful projects and proven track record
            </motion.p>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <div className="px-8 py-6 border border-violet-500/30 bg-violet-500/10">
              <p className="text-4xl font-light text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>8</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-violet-300">Completed</p>
            </div>
            <div className="px-8 py-6 border border-violet-500/30 bg-violet-500/10">
              <p className="text-4xl font-light text-violet-300 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>$26.9M</p>
              <p className="text-[10px] tracking-[0.2em] uppercase text-violet-300">Total Profit</p>
            </div>
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActiveIndex(i)}
              className={`p-5 border cursor-pointer transition-all duration-300 ${
                i === activeIndex 
                  ? 'bg-[#1e293b] border-slate-600' 
                  : 'bg-[#1e293b]/50 border-slate-700/50 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 border flex items-center justify-center transition-all ${
                  i === activeIndex ? 'border-violet-500/50 bg-violet-500/20' : 'border-slate-600 bg-slate-800'
                }`}>
                  <Building2 className={`w-5 h-5 ${i === activeIndex ? 'text-violet-400' : 'text-slate-400'}`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-base font-medium text-white">{project.name}</h3>
                  <p className="text-sm text-slate-400">{project.profit}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Project Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-12 p-8 bg-[#1e293b] border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {projects[activeIndex].name}
                  </h3>
                  <p className="text-slate-400">{projects[activeIndex].profit}</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-sm font-medium">
                Completed
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
