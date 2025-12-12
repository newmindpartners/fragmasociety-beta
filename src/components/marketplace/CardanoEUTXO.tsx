import { motion } from "framer-motion";
import { Shield, Zap, Eye, Bot, Cpu, Lock } from "lucide-react";

export const CardanoEUTXO = () => {
  const benefits = [
    { icon: Zap, title: "Predictable fees", description: "Know costs upfront" },
    { icon: Shield, title: "Higher security", description: "Self-contained transactions" },
    { icon: Eye, title: "Clear execution", description: "Fully auditable" },
    { icon: Bot, title: "Bot protection", description: "No front-running" },
  ];

  return (
    <section className="py-24 section-gradient-horizontal relative overflow-hidden">
      <div className="absolute inset-0 section-dots opacity-20" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              Cardano & EUTXO
            </span>
            
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Why Cardano gives you{" "}
              <span className="text-gradient">more security.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Fragma's marketplace is built on Cardano using the EUTXO model — 
              the same fundamental design Bitcoin uses but improved for smart contracts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-6 mb-10 text-left max-w-2xl mx-auto"
          >
            <h3 className="text-lg font-medium text-foreground mb-4 text-center">In simple terms:</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Each order is a unique, self-contained piece of data (UTXO)</span>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Smart contracts validate everything perfectly</span>
              </li>
              <li className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>No shared global state = no congestion, no race conditions</span>
              </li>
              <li className="flex items-start gap-3">
                <Bot className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Your trades cannot be front-run or manipulated</span>
              </li>
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all"
              >
                <benefit.icon className="w-6 h-6 text-primary mb-2 mx-auto" />
                <h4 className="font-medium text-foreground mb-1">{benefit.title}</h4>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-medium p-4 border-l-2 border-primary bg-primary/5 rounded-r-lg text-left max-w-2xl mx-auto"
          >
            This is why Genius Yield and Fragma chose Cardano — 
            it is designed for safety-first financial markets.
          </motion.p>
        </div>
      </div>
    </section>
  );
};