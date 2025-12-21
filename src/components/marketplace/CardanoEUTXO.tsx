import { motion } from "framer-motion";
import { Calendar, Target, Sparkles } from "lucide-react";
import { useState } from "react";

export const CardanoEUTXO = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const projections = [
    { 
      period: "2025-2026", 
      title: "Continued appreciation expected in prime coastal and hillside locations" 
    },
    { 
      period: "Post-Fire Rebuild", 
      title: "Pacific Palisades reconstruction creating unique acquisition opportunities" 
    },
  ];

  const highlights = [
    "Limited supply of mid-century modern inventory",
    "Strong international buyer demand",
    "Pacific Palisades fire creating acquisition opportunities",
    "Celebrity and tech executive buyer pool",
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Future Projections */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-14 h-14 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#1e293b]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Future Projections
                </h3>
                <p className="text-sm text-slate-500">Market outlook & forecasts</p>
              </div>
            </motion.div>

            <div className="space-y-6">
              {projections.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-6"
                >
                  {/* Vertical line */}
                  <div className={`absolute left-0 top-1 bottom-0 w-1 rounded-full ${
                    i === 0 ? 'bg-violet-500' : 'bg-violet-400'
                  }`} />
                  
                  <h4 className="text-lg font-medium text-[#1e293b] mb-2">
                    {item.period}
                  </h4>
                  <p className="text-slate-500 leading-relaxed">
                    {item.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Market Highlights */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-14 h-14 bg-[#1e293b] border border-slate-700 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium text-[#1e293b]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Market Highlights
                </h3>
                <p className="text-sm text-slate-500">Key investment drivers</p>
              </div>
            </motion.div>

            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="flex items-center gap-4 p-5 bg-white border border-slate-200 hover:border-slate-300 transition-all cursor-pointer"
                  style={{
                    boxShadow: hoveredIndex === i 
                      ? '0 8px 24px -8px rgba(15, 23, 42, 0.1)'
                      : '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                    hoveredIndex === i 
                      ? 'bg-violet-100' 
                      : 'bg-violet-50'
                  }`}>
                    <Sparkles className={`w-5 h-5 transition-colors ${
                      hoveredIndex === i ? 'text-violet-600' : 'text-violet-400'
                    }`} />
                  </div>
                  <p className="text-slate-600 flex-1">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
