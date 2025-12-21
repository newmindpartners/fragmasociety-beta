import { motion } from "framer-motion";
import { Shield, Zap, Eye, Bot, Cpu, Lock, Check, Sparkles } from "lucide-react";
import { useState } from "react";

export const CardanoEUTXO = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const benefits = [
    { icon: Zap, title: "Predictable Fees", description: "Know costs upfront" },
    { icon: Shield, title: "Higher Security", description: "Isolated transactions" },
    { icon: Eye, title: "Full Transparency", description: "Fully auditable" },
    { icon: Bot, title: "Bot Protection", description: "No front-running" },
  ];

  const comparisons = [
    { feature: "Transaction Model", eutxo: "Isolated UTXOs", account: "Shared State" },
    { feature: "Front-running Risk", eutxo: "Not possible", account: "High risk" },
    { feature: "Fee Predictability", eutxo: "100% upfront", account: "Variable" },
    { feature: "Parallel Processing", eutxo: "Native support", account: "Limited" },
    { feature: "Formal Verification", eutxo: "Built-in", account: "Optional" },
  ];

  const howItWorks = [
    { icon: Lock, text: "Each order is a unique, self-contained piece of data (UTXO)" },
    { icon: Shield, text: "Smart contracts validate everything perfectly" },
    { icon: Cpu, text: "No shared global state = no congestion, no race conditions" },
    { icon: Bot, text: "Your trades cannot be front-run or manipulated" },
  ];

  return (
    <section className="py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Subtle pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-px bg-slate-300" />
            <span className="text-xs tracking-[0.3em] uppercase text-slate-400 font-medium">
              Built on Cardano
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-light text-slate-900 leading-[1.1] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why EUTXO Gives You
            <br />
            <span className="italic text-slate-500">More Security.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-xl mt-6 leading-relaxed"
          >
            Our marketplace uses Cardano's Extended UTXO model — the same fundamental design Bitcoin pioneered, 
            enhanced for sophisticated smart contracts.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* How it works */}
          <div>
            <div className="bg-white border border-slate-200 p-8 mb-8" style={{ boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.06)' }}>
              <h3 className="text-lg font-medium text-slate-800 mb-6 flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <Sparkles className="w-5 h-5 text-slate-400" />
                How EUTXO Works
              </h3>
              
              <div className="space-y-4">
                {howItWorks.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100"
                  >
                    <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm text-slate-600">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-slate-100 border-l-2 border-slate-400"
            >
              <p className="text-slate-600 leading-relaxed italic">
                "This is why Genius Yield and Fragma chose Cardano — it is designed for safety-first financial markets."
              </p>
              <p className="text-sm text-slate-500 font-medium mt-3">— Fragma Technical Team</p>
            </motion.div>
          </div>

          {/* Comparison Table */}
          <div>
            <div className="bg-white border border-slate-200 overflow-hidden" style={{ boxShadow: '0 4px 20px -5px rgba(0, 0, 0, 0.06)' }}>
              <div className="p-6 bg-slate-50 border-b border-slate-100">
                <h3 className="text-lg font-medium text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>EUTXO vs Account Model</h3>
                <p className="text-sm text-slate-500 mt-1">Why Cardano's approach is safer</p>
              </div>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left p-4 text-[10px] font-medium text-slate-400 uppercase tracking-wider">Feature</th>
                    <th className="text-center p-4 text-[10px] font-medium text-slate-700 uppercase tracking-wider">EUTXO</th>
                    <th className="text-center p-4 text-[10px] font-medium text-slate-400 uppercase tracking-wider">Account</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="p-4 text-sm text-slate-600 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-medium">
                          <Check className="w-3 h-3" />
                          {row.eutxo}
                        </span>
                      </td>
                      <td className="p-4 text-center text-sm text-slate-400">{row.account}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Benefit Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="p-5 bg-white border border-slate-200 hover:border-slate-400/50 transition-all duration-300 cursor-pointer"
                  style={{
                    boxShadow: hoveredIndex === i 
                      ? '0 8px 24px -8px rgba(15, 23, 42, 0.12)'
                      : '0 1px 3px rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <div className={`w-10 h-10 border flex items-center justify-center mb-4 transition-all duration-300 ${
                    hoveredIndex === i 
                      ? 'border-slate-700 bg-slate-800' 
                      : 'border-slate-200 bg-white'
                  }`}>
                    <benefit.icon className={`w-5 h-5 transition-colors duration-300 ${
                      hoveredIndex === i ? 'text-white' : 'text-slate-400'
                    }`} strokeWidth={1.5} />
                  </div>
                  <h4 className="font-medium text-slate-800 mb-1">{benefit.title}</h4>
                  <p className="text-xs text-slate-500">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
