import { motion } from "framer-motion";
import { Shield, Zap, Eye, Bot, Cpu, Lock, Database, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const UTXOVisualization = () => {
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(n => (n + 1) % 6);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { x: 50, y: 20, label: "Order" },
    { x: 20, y: 50, label: "Validate" },
    { x: 80, y: 50, label: "Match" },
    { x: 35, y: 80, label: "Execute" },
    { x: 65, y: 80, label: "Settle" },
    { x: 50, y: 95, label: "Complete" },
  ];

  const connections = [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];

  return (
    <div className="relative">
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-primary/10 rounded-3xl blur-[80px]"
      />

      <div className="glass rounded-3xl p-8 relative z-10">
        <div className="text-center mb-6">
          <Cpu className="w-8 h-8 text-primary mx-auto mb-2" />
          <h3 className="text-xl font-serif font-bold text-foreground">EUTXO Transaction Flow</h3>
          <p className="text-sm text-muted-foreground">Each order is a unique, self-contained piece of data</p>
        </div>

        <div className="relative h-80">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Connection lines */}
            {connections.map((conn, i) => {
              const from = nodes[conn.from];
              const to = nodes[conn.to];
              const isActive = activeNode >= conn.from && activeNode <= conn.to;
              
              return (
                <motion.line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isActive ? "hsl(var(--primary))" : "rgba(255,255,255,0.1)"}
                  strokeWidth={isActive ? 2 : 1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <motion.div
                animate={{
                  scale: activeNode === i ? 1.2 : 1,
                  boxShadow: activeNode === i 
                    ? "0 0 30px rgba(var(--primary), 0.6)"
                    : "0 0 0px rgba(var(--primary), 0)"
                }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xs font-medium ${
                  activeNode >= i 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {activeNode > i ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <Database className="w-5 h-5" />
                )}
              </motion.div>
              <p className="text-xs text-center text-muted-foreground mt-1">{node.label}</p>
            </motion.div>
          ))}

          {/* Traveling data packet */}
          <motion.div
            animate={{
              left: `${nodes[activeNode]?.x || 50}%`,
              top: `${nodes[activeNode]?.y || 50}%`
            }}
            transition={{ type: "spring", damping: 20 }}
            className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-primary rounded-full shadow-lg"
            style={{ boxShadow: "0 0 20px rgba(var(--primary), 0.8)" }}
          />
        </div>
      </div>
    </div>
  );
};

export const CardanoEUTXO = () => {
  const benefits = [
    { icon: Zap, title: "Predictable fees", description: "Know costs upfront" },
    { icon: Shield, title: "Higher security", description: "Self-contained transactions" },
    { icon: Eye, title: "Clear execution", description: "Fully auditable" },
    { icon: Bot, title: "Bot protection", description: "No front-running" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px] -translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              Cardano & EUTXO
            </span>
            
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Why Cardano gives you{" "}
              <span className="text-gradient">more security.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Fragma's marketplace is built on Cardano using the EUTXO model — 
              the same fundamental design Bitcoin uses but improved for smart contracts.
            </p>

            <div className="glass rounded-xl p-6 mb-8">
              <h3 className="text-lg font-medium text-foreground mb-4">In simple terms:</h3>
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
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
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
                  <benefit.icon className="w-6 h-6 text-primary mb-2" />
                  <h4 className="font-medium text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-medium p-4 border-l-2 border-primary bg-primary/5 rounded-r-lg"
            >
              This is why Genius Yield and Fragma chose Cardano — 
              it is designed for safety-first financial markets.
            </motion.p>
          </motion.div>

          {/* Right - EUTXO Visualization */}
          <UTXOVisualization />
        </div>
      </div>
    </section>
  );
};
