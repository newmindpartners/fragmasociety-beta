import { motion } from "framer-motion";
import { Shield, Zap, Eye, Bot, Lock, Cpu, Check, ArrowRight } from "lucide-react";
import { useState } from "react";

const benefits = [
  { icon: Zap, title: "Predictable Fees", description: "Know exact costs before execution" },
  { icon: Shield, title: "Maximum Security", description: "Isolated transaction model" },
  { icon: Eye, title: "Full Transparency", description: "100% auditable on-chain" },
  { icon: Bot, title: "Bot Protection", description: "MEV & front-running proof" },
];

const comparisons = [
  { feature: "Transaction Model", eutxo: "Isolated UTXOs", account: "Shared State" },
  { feature: "Front-running Risk", eutxo: "Impossible", account: "High risk" },
  { feature: "Fee Predictability", eutxo: "100% upfront", account: "Variable" },
  { feature: "Parallel Processing", eutxo: "Native support", account: "Limited" },
  { feature: "Formal Verification", eutxo: "Built-in", account: "Optional" },
];

const howItWorks = [
  { icon: Lock, text: "Each order is a unique, self-contained piece of data (UTXO)", step: "01" },
  { icon: Shield, text: "Smart contracts validate everything deterministically", step: "02" },
  { icon: Cpu, text: "No shared global state = no congestion, no race conditions", step: "03" },
  { icon: Bot, text: "Your trades cannot be front-run or manipulated", step: "04" },
];

export const CardanoEUTXO = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[400px] rounded-full"
          style={{ 
            background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.2) 0%, transparent 70%)",
            filter: "blur(80px)" 
          }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full"
          style={{ 
            background: "radial-gradient(ellipse at center, hsl(var(--accent) / 0.15) 0%, transparent 70%)",
            filter: "blur(100px)" 
          }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] bg-muted text-muted-foreground border border-border rounded-sm">
              Built on Cardano
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Why <span className="text-primary italic">EUTXO</span> Gives You
            <br />
            <span className="text-muted-foreground">More Security</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Our marketplace leverages Cardano's Extended UTXO model — the same fundamental design 
            Bitcoin pioneered, enhanced for sophisticated smart contracts.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-20"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="group"
            >
              <div className="relative p-6 lg:p-8 h-full rounded-sm border border-border bg-card hover:bg-accent/5 hover:border-primary/20 transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-sm bg-muted border border-border flex items-center justify-center mb-5 group-hover:border-primary/30 transition-colors duration-300">
                  <benefit.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                </div>
                
                <h4 className="text-lg font-medium text-foreground mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                How <span className="text-primary italic">EUTXO</span> Works
              </h3>
              <p className="text-muted-foreground">Understanding the technology behind secure trades</p>
            </div>

            <div className="space-y-3">
              {howItWorks.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onMouseEnter={() => setActiveStep(i)}
                  className={`relative group cursor-pointer rounded-sm transition-all duration-300 border ${
                    activeStep === i 
                      ? 'bg-primary/5 border-primary/30' 
                      : 'bg-card border-border hover:bg-accent/5 hover:border-primary/20'
                  }`}
                >
                  {/* Active indicator */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: activeStep === i ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  <div className="flex items-center gap-4 p-5">
                    {/* Step number */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-sm flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      activeStep === i
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground group-hover:bg-accent'
                    }`}>
                      {item.step}
                    </div>
                    
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-sm border flex items-center justify-center transition-all duration-300 ${
                      activeStep === i
                        ? 'border-primary/40 bg-primary/10'
                        : 'border-border bg-muted'
                    }`}>
                      <item.icon className={`w-4 h-4 transition-colors duration-300 ${
                        activeStep === i ? 'text-primary' : 'text-muted-foreground'
                      }`} strokeWidth={1.5} />
                    </div>
                    
                    {/* Text */}
                    <p className={`text-sm transition-colors duration-300 ${
                      activeStep === i ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground/80'
                    }`}>
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 relative"
            >
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-primary/40" />
              <div className="pl-8">
                <p className="text-lg text-foreground/80 leading-relaxed italic mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "This is why Fragma chose Cardano — it is designed for safety-first financial markets."
                </p>
                <p className="text-sm text-muted-foreground">
                  — Fragma Technology Team
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-2xl lg:text-3xl font-light text-foreground mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                EUTXO <span className="text-muted-foreground italic">vs</span> Account Model
              </h3>
              <p className="text-muted-foreground">See how Cardano compares to Ethereum L1/L2</p>
            </div>

            <div className="rounded-sm border border-border overflow-hidden bg-card">
              {/* Header */}
              <div className="grid grid-cols-3 bg-muted border-b border-border">
                <div className="p-4 text-xs text-muted-foreground uppercase tracking-wider">Feature</div>
                <div className="p-4 text-xs text-primary uppercase tracking-wider text-center border-l border-border">EUTXO (Cardano)</div>
                <div className="p-4 text-xs text-muted-foreground uppercase tracking-wider text-center border-l border-border">Account (ETH L1/L2)</div>
              </div>
              
              {/* Rows */}
              {comparisons.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`grid grid-cols-3 ${i !== comparisons.length - 1 ? 'border-b border-border' : ''} hover:bg-accent/5 transition-colors duration-200`}
                >
                  <div className="p-4 text-sm text-foreground/80">{row.feature}</div>
                  <div className="p-4 text-sm text-center border-l border-border">
                    <div className="flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{row.eutxo}</span>
                    </div>
                  </div>
                  <div className="p-4 text-sm text-muted-foreground text-center border-l border-border">
                    {row.account}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 rounded-sm border border-border bg-card"
            >
              <p className="text-muted-foreground text-sm mb-4">
                Ready to experience truly secure on-chain trading?
              </p>
              <button className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors duration-200">
                <span>Learn more about our technology</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
