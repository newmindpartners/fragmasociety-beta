import { motion } from "framer-motion";
import { Shield, Zap, Eye, Bot, Cpu, Lock, Check, Sparkles } from "lucide-react";
import cardanoBg from "@/assets/cardano-bg.jpg";

export const CardanoEUTXO = () => {
  const benefits = [
    { icon: Zap, title: "Predictable Fees", description: "Know costs upfront before executing" },
    { icon: Shield, title: "Higher Security", description: "Self-contained, isolated transactions" },
    { icon: Eye, title: "Full Transparency", description: "Every action is fully auditable" },
    { icon: Bot, title: "Bot Protection", description: "No front-running or manipulation" },
  ];

  const comparisons = [
    { feature: "Transaction Model", eutxo: "Isolated UTXOs", account: "Shared State" },
    { feature: "Front-running Risk", eutxo: "Not possible", account: "High risk" },
    { feature: "Fee Predictability", eutxo: "100% upfront", account: "Variable" },
    { feature: "Parallel Processing", eutxo: "Native support", account: "Limited" },
    { feature: "Formal Verification", eutxo: "Built-in", account: "Optional" },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-cream">
      {/* Subtle geometric pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `linear-gradient(135deg, hsl(var(--light-border)) 1px, transparent 1px), linear-gradient(-135deg, hsl(var(--light-border)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      {/* Background Image Accent */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cardanoBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-cream to-cream" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 mb-6 text-xs font-bold tracking-[0.2em] uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            Built on Cardano
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-light-text mb-6">
            Why EUTXO Gives You
            <span className="block text-primary">More Security</span>
          </h2>
          <p className="text-xl text-light-text-muted max-w-3xl mx-auto">
            Our marketplace uses Cardano's Extended UTXO model — the same fundamental design Bitcoin pioneered, 
            enhanced for sophisticated smart contracts and institutional-grade trading.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Visual Explanation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* EUTXO Visualization */}
            <div className="relative bg-white rounded-3xl p-8 shadow-elegant border border-light-border mb-8">
              <h3 className="text-xl font-bold text-light-text mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                How EUTXO Works
              </h3>
              
              <div className="space-y-4">
                {[
                  { icon: Lock, text: "Each order is a unique, self-contained piece of data (UTXO)" },
                  { icon: Shield, text: "Smart contracts validate everything perfectly" },
                  { icon: Cpu, text: "No shared global state = no congestion, no race conditions" },
                  { icon: Bot, text: "Your trades cannot be front-run or manipulated" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-cream rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-light-text">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-primary/5 rounded-2xl border-l-4 border-primary"
            >
              <p className="text-light-text leading-relaxed italic">
                "This is why Genius Yield and Fragma chose Cardano — it is designed for safety-first financial markets."
              </p>
              <p className="text-sm text-primary font-medium mt-3">— Fragma Technical Team</p>
            </motion.div>
          </motion.div>

          {/* Right: Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl overflow-hidden shadow-elegant border border-light-border">
              <div className="p-6 bg-light-surface border-b border-light-border">
                <h3 className="text-xl font-bold text-light-text">EUTXO vs Account Model</h3>
                <p className="text-light-text-muted text-sm mt-1">Why Cardano's approach is safer for trading</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-light-border">
                      <th className="text-left p-4 text-sm font-medium text-light-text-muted">Feature</th>
                      <th className="text-center p-4 text-sm font-medium text-primary">EUTXO (Cardano)</th>
                      <th className="text-center p-4 text-sm font-medium text-light-text-muted">Account Model</th>
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
                        className="border-b border-light-border last:border-0"
                      >
                        <td className="p-4 text-light-text font-medium">{row.feature}</td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm">
                            <Check className="w-3 h-3" />
                            {row.eutxo}
                          </span>
                        </td>
                        <td className="p-4 text-center text-light-text-muted text-sm">{row.account}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="p-5 bg-white rounded-2xl border border-light-border hover:shadow-elegant transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-light-text mb-1">{benefit.title}</h4>
                  <p className="text-sm text-light-text-muted">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
