import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Target, Clock, Eye, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const tradingAssets = [
  { name: "Malibu Villa", symbol: "MLB-VLA" },
  { name: "Tech Campus", symbol: "TCH-CMP" },
  { name: "Credit Fund", symbol: "CRD-FND" },
];

const AnimatedOrderBook = () => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);
  const currentAsset = tradingAssets[currentAssetIndex];

  const [bids] = useState([
    { price: 1245.50, size: 21628, total: 2.21 },
    { price: 892.25, size: 47056, total: 4.65 },
    { price: 456.80, size: 29241, total: 2.99 },
    { price: 187.35, size: 46023, total: 4.55 },
  ]);

  const [asks] = useState([
    { price: 1248.75, size: 16207, total: 1.72 },
    { price: 895.50, size: 49376, total: 4.97 },
    { price: 459.20, size: 29524, total: 2.92 },
    { price: 189.85, size: 41270, total: 4.05 },
  ]);

  const [lastPrice, setLastPrice] = useState(1247.06);
  const [change24h] = useState(2.39);
  const [showMatch, setShowMatch] = useState(false);

  useEffect(() => {
    const assetInterval = setInterval(() => {
      setCurrentAssetIndex(prev => (prev + 1) % tradingAssets.length);
    }, 5000);
    return () => clearInterval(assetInterval);
  }, []);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      setLastPrice(prev => +(prev + (Math.random() - 0.5) * 0.5).toFixed(2));
    }, 2000);
    
    const matchInterval = setInterval(() => {
      setShowMatch(true);
      setTimeout(() => setShowMatch(false), 1000);
    }, 6000);

    return () => {
      clearInterval(priceInterval);
      clearInterval(matchInterval);
    };
  }, []);

  return (
    <motion.div 
      className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {/* Match Flash */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-3 px-6 py-4 rounded-xl bg-primary/20 border border-primary/40"
            >
              <CheckCircle2 className="w-6 h-6 text-primary" />
              <span className="font-semibold text-primary">Trade Matched!</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {currentAsset.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={currentAsset.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-xl font-bold text-foreground"
                >
                  {currentAsset.name}
                </motion.h3>
              </AnimatePresence>
              <span className="text-xs font-mono text-primary">{currentAsset.symbol}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
            <span className="text-sm text-green-500 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 p-6 bg-secondary/20 border-b border-border/50">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Last Price</p>
          <motion.p 
            key={lastPrice}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-foreground"
          >
            €{lastPrice.toFixed(2)}
          </motion.p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">24h Change</p>
          <p className="text-2xl font-bold text-green-500">+{change24h}%</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Spread</p>
          <p className="text-2xl font-bold text-primary">0.26%</p>
        </div>
      </div>

      {/* Order Book */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Bids */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-muted-foreground">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {bids.map((bid, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-green-500/5 hover:bg-green-500/10 transition-colors relative overflow-hidden"
                >
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-green-500/10"
                    style={{ width: `${(bid.total / 5) * 100}%` }}
                  />
                  <span className="font-semibold text-green-400 relative z-10">€{bid.price.toFixed(2)}</span>
                  <span className="text-center text-foreground relative z-10">{bid.size.toLocaleString()}</span>
                  <span className="text-right text-muted-foreground relative z-10">€{bid.total}M</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-muted-foreground">
              <span>Price</span>
              <span className="text-center">Size</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {asks.map((ask, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-red-500/5 hover:bg-red-500/10 transition-colors relative overflow-hidden"
                >
                  <div 
                    className="absolute right-0 top-0 bottom-0 bg-red-500/10"
                    style={{ width: `${(ask.total / 5) * 100}%` }}
                  />
                  <span className="font-semibold text-red-400 relative z-10">€{ask.price.toFixed(2)}</span>
                  <span className="text-center text-foreground relative z-10">{ask.size.toLocaleString()}</span>
                  <span className="text-right text-muted-foreground relative z-10">€{ask.total}M</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const OrderBookExplainer = () => {
  const benefits = [
    { icon: Target, title: "Choose your price", description: "No forced market rates" },
    { icon: ArrowDown, title: "Buy below market", description: "Set limit orders and wait" },
    { icon: ArrowUp, title: "Sell above market", description: "List at your target price" },
    { icon: Clock, title: "Patient trading", description: "Wait for better offers" },
    { icon: Eye, title: "Full transparency", description: "See all orders live" },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-background">
      {/* Gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 bg-accent/5 rounded-full blur-[100px]" />
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-xs font-semibold tracking-widest uppercase rounded-full bg-secondary/80 text-foreground border border-border/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              How It Works
            </span>
            
            <h2 className="text-5xl lg:text-7xl font-serif font-bold text-foreground mb-8 leading-[1.1]">
              Professional trading,
              <br />
              <span className="text-gradient italic">simplified.</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A traditional exchange uses an order book. We bring this same professional tool to real-world assets.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Order Book */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <AnimatedOrderBook />
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 8 }}
                className="group flex items-start gap-5 p-6 rounded-2xl bg-card/50 border border-border/40 hover:border-primary/40 hover:bg-card/80 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
            >
              <p className="text-foreground font-medium leading-relaxed">
                <span className="text-primary font-semibold">This isn't a "platform price."</span>{" "}
                It's a real marketplace where you set the terms.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
