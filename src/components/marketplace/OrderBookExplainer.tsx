import { motion } from "framer-motion";
import { ArrowDown, ArrowUp, Zap, Target, Clock, Eye } from "lucide-react";
import { useState } from "react";

const AnimatedOrderBook = () => {
  const [matchedIndex, setMatchedIndex] = useState<number | null>(null);

  const buyers = [
    { price: 98, label: "Buyer A" },
    { price: 97, label: "Buyer B" },
    { price: 95, label: "Buyer C" },
  ];

  const sellers = [
    { price: 99, label: "Seller X" },
    { price: 101, label: "Seller Y" },
    { price: 103, label: "Seller Z" },
  ];

  return (
    <div className="relative">
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-primary/10 rounded-2xl blur-3xl"
      />
      
      <div className="glass rounded-2xl p-8 relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-xl font-serif font-bold text-foreground mb-2">Order Book Visualization</h3>
          <p className="text-sm text-muted-foreground">Buyers list prices they're willing to pay • Sellers list prices they want</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Buyers Side */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowUp className="w-5 h-5 text-green-400" />
              <span className="font-medium text-green-400">Buy Orders (Bids)</span>
            </div>
            <div className="space-y-3">
              {buyers.map((buyer, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/20 cursor-pointer"
                >
                  <span className="text-foreground">{buyer.label}</span>
                  <span className="text-green-400 font-bold">€{buyer.price}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sellers Side */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ArrowDown className="w-5 h-5 text-red-400" />
              <span className="font-medium text-red-400">Sell Orders (Asks)</span>
            </div>
            <div className="space-y-3">
              {sellers.map((seller, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ scale: 1.02, x: -5 }}
                  className="flex items-center justify-between p-4 rounded-xl bg-red-500/10 border border-red-500/20 cursor-pointer"
                >
                  <span className="text-foreground">{seller.label}</span>
                  <span className="text-red-400 font-bold">€{seller.price}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Match Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-4 rounded-xl bg-primary/10 border border-primary/20 text-center"
        >
          <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-foreground font-medium">When prices match — trade executes instantly on-chain</p>
        </motion.div>
      </div>
    </div>
  );
};

export const OrderBookExplainer = () => {
  const benefits = [
    { icon: Target, title: "Choose your own price", description: "No forced market rates" },
    { icon: ArrowDown, title: "Buy below market", description: "Set limit orders and wait" },
    { icon: ArrowUp, title: "Sell above market", description: "List at your target price" },
    { icon: Clock, title: "Wait for better offers", description: "Patience can pay off" },
    { icon: Eye, title: "Full transparency", description: "See all orders in real-time" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[200px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Professional order book trading,{" "}
              <span className="text-gradient">simplified.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A traditional exchange uses an order book — a list of "buy orders" and "sell orders."
              We bring this same professional tool to real-world assets.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Order Book Animation */}
          <AnimatedOrderBook />

          {/* Right - Benefits */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-primary font-medium mt-6 pl-4 border-l-2 border-primary"
            >
              This gives you freedom, transparency, and control.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
