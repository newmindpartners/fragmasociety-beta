import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Zap, Shield, Clock, TrendingUp, ArrowLeftRight } from "lucide-react";
import malibuImage from "@/assets/malibu-sea-view.jpg";
import villaImage from "@/assets/rwa-villa.jpg";

export const TwoWayOrders = () => {
  const benefits = [
    {
      icon: Zap,
      title: "Instant Execution",
      description: "Orders execute automatically when conditions are met"
    },
    {
      icon: Shield,
      title: "Price Protection",
      description: "Set your exact buy and sell prices upfront"
    },
    {
      icon: Clock,
      title: "24/7 Active",
      description: "Your orders work around the clock"
    },
    {
      icon: TrendingUp,
      title: "Maximize Returns",
      description: "Capture opportunities on both sides of the market"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-cream">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--light-border)) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
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
            Two-Way Orders
          </span>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-light-text mb-6">
            Buy and Sell in
            <span className="block text-primary">One Order</span>
          </h2>
          <p className="text-xl text-light-text-muted max-w-2xl mx-auto">
            Set your entry and exit prices simultaneously. Let the market work for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Order Cards Stack */}
            <div className="relative h-[500px]">
              {/* Buy Order */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="absolute top-0 left-0 right-12 z-20"
              >
                <div className="bg-white rounded-2xl p-6 shadow-elegant border border-light-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img src={malibuImage} alt="Asset" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-light-text-muted">Malibu Villa Token</p>
                      <p className="text-lg font-bold text-light-text">MLV-001</p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium">
                        <ArrowDownRight className="w-4 h-4" />
                        Buy
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-emerald-50/50 rounded-xl">
                    <div>
                      <p className="text-sm text-light-text-muted">Buy Price</p>
                      <p className="text-2xl font-bold text-emerald-600">$95,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-light-text-muted">Quantity</p>
                      <p className="text-2xl font-bold text-light-text">10</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sell Order */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute top-32 left-12 right-0 z-10"
              >
                <div className="bg-white rounded-2xl p-6 shadow-elegant border border-light-border">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden">
                      <img src={villaImage} alt="Asset" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm text-light-text-muted">LA Investment Fund</p>
                      <p className="text-lg font-bold text-light-text">LAF-002</p>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-sm font-medium">
                        <ArrowUpRight className="w-4 h-4" />
                        Sell
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-rose-50/50 rounded-xl">
                    <div>
                      <p className="text-sm text-light-text-muted">Sell Price</p>
                      <p className="text-2xl font-bold text-rose-600">$125,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-light-text-muted">Quantity</p>
                      <p className="text-2xl font-bold text-light-text">10</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connection Line */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-[280px] left-1/2 -translate-x-1/2 z-30"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-glow">
                    <ArrowLeftRight className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-primary/20"
                  />
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
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-foreground/80 text-sm mb-1">Potential Profit</p>
                      <p className="text-3xl font-bold">+$300,000</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-foreground/80 text-sm mb-1">ROI</p>
                      <p className="text-3xl font-bold">31.5%</p>
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
            <div className="space-y-6">
              {benefits.map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                  className="group flex items-start gap-5 p-6 bg-white rounded-2xl border border-light-border hover:shadow-elegant transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <benefit.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-light-text mb-2">{benefit.title}</h3>
                    <p className="text-light-text-muted">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 bg-primary/5 rounded-2xl border border-primary/10"
            >
              <p className="text-light-text leading-relaxed">
                <span className="font-bold text-primary">How it works:</span> Place a single order that automatically buys at your target price and sells when your profit goal is reached. No need to monitor the market constantly.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
