import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Zap, Shield, Clock, TrendingUp, ArrowLeftRight } from "lucide-react";

export const TwoWayOrders = () => {
  const benefits = [
    { icon: Zap, title: "Instant Execution", description: "Orders execute automatically when conditions are met" },
    { icon: Shield, title: "Price Protection", description: "Set your exact buy and sell prices upfront" },
    { icon: Clock, title: "24/7 Active", description: "Your orders work around the clock" },
    { icon: TrendingUp, title: "Maximize Returns", description: "Capture opportunities on both sides" },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-background">
      {/* Gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
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
            Two-Way Orders
          </span>
          
          <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-6 leading-[1.1]">
            Buy and Sell in
            <br />
            <span className="text-gradient italic">One Order.</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Set your entry and exit prices simultaneously. Let the market work for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Demo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[550px]">
              {/* Buy Order Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute top-0 left-0 right-12 z-20"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">MLV</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Malibu Villa Token</p>
                        <p className="text-lg font-bold text-foreground">MLV-001</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                      <ArrowDownRight className="w-4 h-4" />
                      Buy
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-5 bg-green-500/5 rounded-xl border border-green-500/20">
                    <div>
                      <p className="text-sm text-muted-foreground">Buy Price</p>
                      <p className="text-3xl font-bold text-green-400">$95,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="text-3xl font-bold text-foreground">10</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sell Order Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute top-36 left-12 right-0 z-10"
              >
                <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-accent">LAF</span>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">LA Investment Fund</p>
                        <p className="text-lg font-bold text-foreground">LAF-002</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-sm font-medium">
                      <ArrowUpRight className="w-4 h-4" />
                      Sell
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-5 bg-red-500/5 rounded-xl border border-red-500/20">
                    <div>
                      <p className="text-sm text-muted-foreground">Sell Price</p>
                      <p className="text-3xl font-bold text-red-400">$125,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Quantity</p>
                      <p className="text-3xl font-bold text-foreground">10</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connection */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-[300px] left-1/2 -translate-x-1/2 z-30"
              >
                <div className="relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
                  />
                  <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center">
                    <ArrowLeftRight className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              </motion.div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-0 left-6 right-6"
              >
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground/70 text-sm mb-1">Potential Profit</p>
                      <p className="text-4xl font-bold text-primary-foreground">+$300,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-foreground/70 text-sm mb-1">ROI</p>
                      <p className="text-4xl font-bold text-primary-foreground">31.5%</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-5 p-6 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
            >
              <p className="text-foreground leading-relaxed">
                <span className="font-bold text-primary">How it works:</span> Place a single order that automatically buys at your target price and sells when your profit goal is reached.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
