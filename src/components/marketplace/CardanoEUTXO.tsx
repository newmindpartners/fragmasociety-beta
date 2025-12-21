import { motion } from "framer-motion";
import { Shield, Zap, Eye, Bot, Cpu, Lock, Check, Sparkles } from "lucide-react";
import { useState } from "react";

const benefits = [
  { icon: Zap, title: "Predictable Fees", description: "Know costs upfront", number: "01" },
  { icon: Shield, title: "Higher Security", description: "Isolated transactions", number: "02" },
  { icon: Eye, title: "Full Transparency", description: "Fully auditable", number: "03" },
  { icon: Bot, title: "Bot Protection", description: "No front-running", number: "04" },
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

export const CardanoEUTXO = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Premium Light Background - matching Features */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-white via-slate-50/60 to-transparent rounded-full blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-slate-100/40 via-slate-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-gradient-radial from-white via-transparent to-transparent rounded-full blur-2xl opacity-90" />
      </div>

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(30,41,59,1) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-16 h-px bg-gradient-to-r from-slate-400 to-transparent" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-slate-400 font-medium">
              Built on Cardano
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-[1.05] mb-8"
          >
            Why EUTXO Gives You
            <br />
            <span className="italic text-slate-500 font-serif">More Security.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl"
          >
            Our marketplace uses Cardano's Extended UTXO model — the same fundamental design Bitcoin pioneered, 
            enhanced for sophisticated smart contracts.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* How it works - Cards with hover effect */}
          <div>
            <div 
              className="bg-white/90 border border-slate-200/80 p-8 mb-8 rounded-sm"
              style={{ boxShadow: '0 4px 30px -10px rgba(0, 0, 0, 0.08)' }}
            >
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
                    className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-sm hover:border-slate-200 transition-colors"
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
              className="p-6 bg-slate-100 border-l-2 border-slate-400 rounded-r-sm"
            >
              <p className="text-slate-600 leading-relaxed italic">
                "This is why Genius Yield and Fragma chose Cardano — it is designed for safety-first financial markets."
              </p>
              <p className="text-sm text-slate-500 font-medium mt-3">— Fragma Technical Team</p>
            </motion.div>
          </div>

          {/* Right side - Table + Benefit Cards */}
          <div>
            {/* Comparison Table */}
            <div 
              className="bg-white/90 border border-slate-200/80 overflow-hidden rounded-sm mb-8"
              style={{ boxShadow: '0 4px 30px -10px rgba(0, 0, 0, 0.08)' }}
            >
              <div className="p-6 bg-slate-50/50 border-b border-slate-100">
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
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-medium rounded-sm">
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

            {/* Benefit Cards - with hover-to-dark effect */}
            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit, index) => {
                const isHovered = hoveredIndex === index;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="group cursor-pointer"
                  >
                    <motion.div
                      className="relative p-5 h-full overflow-hidden rounded-sm"
                      style={{
                        background: isHovered 
                          ? 'linear-gradient(165deg, rgba(15,23,42,0.97) 0%, rgba(30,41,59,0.98) 40%, rgba(51,65,85,0.96) 100%)'
                          : 'rgba(255, 255, 255, 0.9)',
                        border: isHovered 
                          ? '1px solid rgba(139, 92, 246, 0.25)' 
                          : '1px solid rgba(226, 232, 240, 0.8)',
                        boxShadow: isHovered 
                          ? '0 20px 40px -15px rgba(15, 23, 42, 0.5)'
                          : '0 2px 10px -5px rgba(0, 0, 0, 0.05)',
                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      animate={{ 
                        y: isHovered ? -4 : 0,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {/* Large decorative number */}
                      <span 
                        className={`absolute top-2 right-3 text-[50px] font-extralight leading-none ${
                          isHovered ? 'text-white/[0.04]' : 'text-slate-900/[0.04]'
                        }`}
                        style={{ 
                          fontFamily: 'serif',
                          transition: 'color 0.5s'
                        }}
                      >
                        {benefit.number}
                      </span>

                      <div className={`w-10 h-10 border flex items-center justify-center mb-4 transition-all duration-300 ${
                        isHovered 
                          ? 'border-slate-600/30 bg-slate-800/40' 
                          : 'border-slate-200 bg-white'
                      }`}>
                        <benefit.icon className={`w-5 h-5 transition-colors duration-300 ${
                          isHovered ? 'text-violet-300' : 'text-slate-400'
                        }`} strokeWidth={1.5} />
                      </div>
                      <h4 className={`font-medium mb-1 transition-colors duration-300 ${
                        isHovered ? 'text-white/90' : 'text-slate-800'
                      }`}>{benefit.title}</h4>
                      <p className={`text-xs transition-colors duration-300 ${
                        isHovered ? 'text-slate-400' : 'text-slate-500'
                      }`}>{benefit.description}</p>

                      {/* Bottom accent line */}
                      <motion.div 
                        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-violet-500/50 via-violet-400/40 to-slate-600/30"
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? '100%' : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom decorative element */}
        <motion.div 
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
};
