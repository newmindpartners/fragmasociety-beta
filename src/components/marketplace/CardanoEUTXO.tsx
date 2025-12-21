import { motion } from "framer-motion";
import { Shield, Zap, Eye, Bot, Cpu, Lock, Check, Sparkles } from "lucide-react";

export const CardanoEUTXO = () => {
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

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-xs font-semibold tracking-widest uppercase rounded-full bg-secondary/80 text-foreground border border-border/50">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            Built on Cardano
          </span>
          
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-[1.1]">
            Why EUTXO Gives You
            <br />
            <span className="text-gradient italic">More Security.</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our marketplace uses Cardano's Extended UTXO model — the same fundamental design Bitcoin pioneered, 
            enhanced for sophisticated smart contracts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 border border-border/50 mb-8">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
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
                    className="flex items-center gap-4 p-4 bg-secondary/30 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary"
            >
              <p className="text-foreground leading-relaxed italic">
                "This is why Genius Yield and Fragma chose Cardano — it is designed for safety-first financial markets."
              </p>
              <p className="text-sm text-primary font-medium mt-3">— Fragma Technical Team</p>
            </motion.div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-card/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-border/50">
              <div className="p-6 bg-secondary/30 border-b border-border/50">
                <h3 className="text-xl font-bold text-foreground">EUTXO vs Account Model</h3>
                <p className="text-muted-foreground text-sm mt-1">Why Cardano's approach is safer</p>
              </div>
              
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Feature</th>
                    <th className="text-center p-4 text-sm font-medium text-primary">EUTXO</th>
                    <th className="text-center p-4 text-sm font-medium text-muted-foreground">Account</th>
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
                      className="border-b border-border/30 last:border-0"
                    >
                      <td className="p-4 text-foreground font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm">
                          <Check className="w-3 h-3" />
                          {row.eutxo}
                        </span>
                      </td>
                      <td className="p-4 text-center text-muted-foreground text-sm">{row.account}</td>
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
                  whileHover={{ y: -4 }}
                  className="p-5 bg-card/50 rounded-2xl border border-border/40 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
